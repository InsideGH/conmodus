import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { ChunkExtractor } from '@loadable/server';
import { Helmet } from 'react-helmet';

import { ssrResolveThunks } from './provider/thunk-handler/server';
import { ssrResolveData, getTasksState } from './provider/ssr-data-handler/server';
import htmlTemplate from './html-template';

const getLoadableStats = require('./loadable-stats');
const getCssStyles = require('./css-styles');

const createTime = timeout => {
    const timeStart = process.hrtime();
    const logs = [];
    return {
        isTimeout: () => Math.ceil(process.hrtime(timeStart)[1] / 1000000) > timeout,
        used: () => Math.ceil(process.hrtime(timeStart)[1] / 1000000),
        left: () => timeout - Math.ceil(process.hrtime(timeStart)[1] / 1000000),
        log: entry => logs.push(entry),
        logs: () => logs,
    };
};

const renderer = async ({ url, config, stats }) => {
    const time = createTime(config.timeout);
    let markup;
    let index;
    let timeUp;
    let sheet;
    let extractor;

    const store = config.makeStore();
    const entries = {
        thunks: [],
        ssrDataList: [],
    };
    const context = {};
    let helmet;

    for (index = 0; index < config.maxRenders; index++) {
        if (index != 0) {
            await ssrResolveThunks(entries.thunks, store.dispatch, time);
            await ssrResolveData(entries.ssrDataList, time);
        }

        sheet = new ServerStyleSheet();
        extractor = new ChunkExtractor({ stats });

        markup = renderToString(<config.Client url={url} entries={entries} context={context} store={store} sheet={sheet} extractor={extractor} />);
        helmet = Helmet.renderStatic();

        timeUp = time.isTimeout();
        time.log(time.used());

        if (timeUp) {
            break;
        }
        if (context.url || entries.thunks.filter(e => !e.resolved).length + entries.ssrDataList.filter(e => !e.resolved).length == 0) {
            break;
        }
    }

    const state = {
        redux: store.getState(),
        tasks: getTasksState(entries.ssrDataList),
        styleTags: sheet.getStyleTags(),
        extractor,
        helmet,
    };

    console.log({
        render: {
            url,
            maxFrames: config.maxRenders,
            maxTime: config.timeout,
            timeup: timeUp ? 'yes' : 'no',
            frames: time.logs(),
        },
        thunks: {
            total: entries.thunks.length,
            resolved: entries.thunks.filter(e => e.resolved).length,
        },
        tasks: {
            total: entries.ssrDataList.length,
            resolved: entries.ssrDataList.filter(e => e.resolved).length,
        },
        redux_state: state.redux,
        tasks_state: JSON.stringify(state.tasks, null, 4),
        style_tags_state: state.styleTags,
        helmet_state: {
            base: state.helmet.base.toString(),
            link: state.helmet.link.toString(),
            meta: state.helmet.meta.toString(),
            noscript: state.helmet.noscript.toString(),
            script: state.helmet.script.toString(),
            style: state.helmet.style.toString(),
            title: state.helmet.title.toString(),
            htmlAttributes: state.helmet.htmlAttributes.toString(),
            bodyAttributes: state.helmet.bodyAttributes.toString(),
        },
        static_router_context: context,
    });

    return {
        context,
        markup,
        state,
    };
};

const validate = (url, config) => {
    if (!url) {
        throw new Error("Missing 'url'");
    }
    if (!config) {
        throw new Error("Missing 'config'");
    }
    if (!config.timeout) {
        throw new Error("Missing 'config.timeout' - Maximum number of milliseconds the request/render should take.");
    }
    if (!config.maxRenders) {
        throw new Error("Missing 'config.maxRenders' - Maximum number of render iterations per request/render.");
    }
    if (!config.indexHtml) {
        throw new Error("Missing 'config.indexHtml' - index html as a string.");
    }
    if (!config.reactRoot) {
        throw new Error("Missing 'config.reactRoot' - id of <div> where react should attach.");
    }
    if (!config.Client) {
        throw new Error("Missing 'config.Client' -  react client.");
    }
    if (!config.makeStore) {
        throw new Error("Missing 'config.makeStore' -  function returning a redux store.");
    }
};

const ssr = async (url, config) => {
    validate(url, config);

    const stats = await getLoadableStats();

    const { markup, state, context } = await renderer({ url, config, stats });

    if (context.url) {
        return {
            redirect: context.url,
        };
    }

    const cssString = await getCssStyles();

    const helmetHeadData = ['base', 'link', 'meta', 'noscript', 'script', 'style', 'title']
        .map(key => state.helmet[key].toString())
        .filter(x => x)
        .join('\n');

    const htmlBuilder = htmlTemplate({ src: config.indexHtml, reactRoot: config.reactRoot });
    const html = htmlBuilder()
        .insertMarkup(markup)
        .insertBody(state.extractor.getScriptTags())
        .insertHead(cssString)
        .insertHead(state.extractor.getStyleTags())
        .insertHead(state.styleTags)
        .insertHead(helmetHeadData)
        .insertHtmlOpeningTag(state.helmet.htmlAttributes.toString())
        .insertBodyOpeningTag(state.helmet.bodyAttributes.toString())
        .insertStateHead([{ id: '__CONMODUS_REDUX_DATA', data: state.redux }, { id: '__CONMODUS_TASK_DATA', data: state.tasks }])
        .html();

    return {
        html,
    };
};

module.exports = ssr;
