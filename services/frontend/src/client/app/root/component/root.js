import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import LoadableFallback from '../../../util/loadable-fallback';
import loadable from '@loadable/component';
import {VERSION} from '../../../config';

// import ExampleHook from '../../hook/component/hook';
// import ExampleAbout from '../../about/component/about';
// import ExampleDynamic from '../../dynamic/component/dynamic';
// import ExampleFetch from '../../fetch/component/fetch';
// import ExampleReduxClass from '../../redux/class/container/redux-class';
// import ExampleDeep from '../../deep/component/deep';
// import ExampleAboutWithCss from '../../about-with-css/component/about-with-css';
// import ExampleAboutWithScss from '../../about-with-scss/component/about-with-scss';
// import ExampleAboutWithStyled from '../../about-with-styled/component/about-with-styled';
// import ExampleAboutWithLoadable from '../../about-with-loadable/component/about-with-loadable';
// import ExampleRedirect from '../../redirect/component/redirect';
// import ExampleAboutWithHelmet from '../../about-with-helmet/component/about-with-helmet';
// import ExampleWeather from '../../weather/component/weather';
// import ExampleWeatherGraphql from '../../weather-graphql/component/weather-graphql';
// import ExampleContext from '../../context/component/example-context';

const ExampleHook = loadable(() => import(/* webpackPrefetch: true */ '../../hook/component/hook'), { fallback: <LoadableFallback /> });
const ExampleAbout = loadable(() => import(/* webpackPrefetch: true */ '../../about/component/about'), { fallback: <LoadableFallback /> });
const ExampleDynamic = loadable(() => import(/* webpackPrefetch: true */ '../../dynamic/component/dynamic'), { fallback: <LoadableFallback /> });
const ExampleFetch = loadable(() => import(/* webpackPrefetch: true */ '../../fetch/component/fetch'), { fallback: <LoadableFallback /> });
const ExampleReduxClass = loadable(() => import(/* webpackPrefetch: true */ '../../redux/class/container/redux-class'), { fallback: <LoadableFallback /> });
const ExampleDeep = loadable(() => import(/* webpackPrefetch: true */ '../../deep/component/deep'), { fallback: <LoadableFallback /> });
const ExampleAboutWithCss = loadable(() => import(/* webpackPrefetch: true */ '../../about-with-css/component/about-with-css'), { fallback: <LoadableFallback /> });
const ExampleAboutWithScss = loadable(() => import(/* webpackPrefetch: true */ '../../about-with-scss/component/about-with-scss'), { fallback: <LoadableFallback /> });
const ExampleAboutWithStyled = loadable(() => import(/* webpackPrefetch: true */ '../../about-with-styled/component/about-with-styled'), { fallback: <LoadableFallback /> });
const ExampleAboutWithLoadable = loadable(() => import(/* webpackPrefetch: true */ '../../about-with-loadable/component/about-with-loadable'), { fallback: <LoadableFallback /> });
const ExampleRedirect = loadable(() => import(/* webpackPrefetch: true */ '../../redirect/component/redirect'), { fallback: <LoadableFallback /> });
const ExampleAboutWithHelmet = loadable(() => import(/* webpackPrefetch: true */ '../../about-with-helmet/component/about-with-helmet'), { fallback: <LoadableFallback /> });
const ExampleWeather = loadable(() => import(/* webpackPrefetch: true */ '../../weather/component/weather'), { fallback: <LoadableFallback /> });
const ExampleWeatherGraphql = loadable(() => import(/* webpackPrefetch: true */ '../../weather-graphql/component/weather-graphql'), { fallback: <LoadableFallback /> });
const ExampleContext = loadable(() => import(/* webpackPrefetch: true */ '../../context/component/example-context'), { fallback: <LoadableFallback /> });

const App = () => {
    return (
        <>
            <h1>Welcome {VERSION}</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Hook</Link>
                    </li>
                    <li>
                        <Link to="/about/">About</Link>
                    </li>
                    <li>
                        <Link to="/dynamic/peter">Dynamic</Link>
                    </li>
                    <li>
                        <Link to="/fetch">Fetch</Link>
                    </li>
                    <li>
                        <Link to="/redux-class">Redux component</Link>
                    </li>
                    <li>
                        <Link to="/deep">Deep</Link>
                    </li>
                    <li>
                        <Link to="/about-with-css/">About with css</Link>
                    </li>
                    <li>
                        <Link to="/about-with-scss/">About with scss</Link>
                    </li>
                    <li>
                        <Link to="/about-with-styled/">About with styled</Link>
                    </li>
                    <li>
                        <Link to="/about-with-loadable/">About with loadable</Link>
                    </li>
                    <li>
                        <Link to="/redirect/">Redirect to deep</Link>
                    </li>
                    <li>
                        <Link to="/about-with-helmet/">About with helmet</Link>
                    </li>
                    <li>
                        <Link to="/weather-today/">Weather today (api)</Link>
                    </li>
                    <li>
                        <Link to="/weather-graphql/">Weather (graphql)</Link>
                    </li>
                    <li>
                        <Link to="/context/">Context</Link>
                    </li>
                </ul>
            </nav>

            <Switch>
                <Route path="/" exact component={ExampleHook} />
                <Route path="/about" exact component={ExampleAbout} />
                <Route path="/dynamic/:name" exact component={ExampleDynamic} />
                <Route path="/fetch" exact component={ExampleFetch} />
                <Route path="/redux-class" exact component={ExampleReduxClass} />
                <Route path="/deep" exact component={ExampleDeep} />
                <Route path="/about-with-css" exact component={ExampleAboutWithCss} />
                <Route path="/about-with-scss" exact component={ExampleAboutWithScss} />
                <Route path="/about-with-styled" exact component={ExampleAboutWithStyled} />
                <Route path="/about-with-loadable" exact component={ExampleAboutWithLoadable} />
                <Route path="/redirect" exact component={ExampleRedirect} />
                <Route path="/about-with-helmet" exact component={ExampleAboutWithHelmet} />
                <Route path="/weather-today" exact component={ExampleWeather} />
                <Route path="/weather-graphql" exact component={ExampleWeatherGraphql} />
                <Route path="/context" exact component={ExampleContext} />
                <Route render={props => <h3>Not found</h3>} />
            </Switch>
        </>
    );
};

App.propTypes = {};

export default App;
