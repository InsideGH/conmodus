import React from 'react';
import PropTypes from 'prop-types';
import ssrThunkHandler from './thunk-handler';
import { ssrDataHandlerServer, ssrDataHandlerClient } from './ssr-data-handler';

import dom from '../utils/dom';
import win from '../utils/win';

let ssrDataListFromServer = (function(entries) {
    if (win.hasKey('__CONMODUS_TASK_DATA')) {
        dom.removeChild('__CONMODUS_TASK_DATA');
        if (Array.isArray(window.__CONMODUS_TASK_DATA)) {
            entries = window.__CONMODUS_TASK_DATA;
            delete window.__CONMODUS_TASK_DATA;
        }
    }
    return entries;
})([]);

export default class Provider extends React.PureComponent {
    constructor(props) {
        super(props);

        const initialStore = {};

        if (dom.canUse) {
            ssrDataListFromServer.forEach(entry => (initialStore[entry.id] = entry.result));
        } else {
            this.props.entries.ssrDataList.filter(entry => entry.resolved).map(entry => (initialStore[entry.id] = entry.result));
        }

        this.state = {
            ssrThunk: this.ssrThunk,
            ssrData: {
                register: this.ssrDataRegister,
                store: initialStore,
                update: this.ssrDataUpdate,
            },
        };
    }

    ssrDataRegister = (...args) => {
        const { ssrDataList } = this.props.entries;
        if (!dom.canUse) {
            ssrDataHandlerServer(ssrDataList, ...args);
        } else {
            ssrDataHandlerClient(ssrDataListFromServer, this.ssrDataUpdate, ...args);
        }
    };

    ssrDataUpdate = (key, value) => {
        this.setState({
            ...this.state,
            ssrData: {
                ...this.state.ssrData,
                store: {
                    ...this.state.ssrData.store,
                    [key]: value,
                },
            },
        });
    };

    ssrThunk = (...args) => {
        const { thunks } = this.props.entries;
        return ssrThunkHandler(thunks, ...args);
    };

    render() {
        const { children, Context } = this.props;
        return <Context.Provider value={this.state}>{children}</Context.Provider>;
    }

    static propTypes = {
        children: PropTypes.any.isRequired,
        entries: PropTypes.shape({
            thunks: PropTypes.array.isRequired,
            ssrDataList: PropTypes.array.isRequired,
        }).isRequired,
        Context: PropTypes.any.isRequired,
    };
}
