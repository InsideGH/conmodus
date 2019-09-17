# CONMODUS

React SSR with docker.

## GET STARTED

Set the following in you etc/hosts file.

```
127.0.0.1 local.conmodus.com
```

>Client side only development
```
    * make dev (in one terminal)
    * make dev_logs (in another terminal)
    * To tear down, CTRL-C the dev_logs terminal and do make dev_stop
```

> Development with SSR
```
    * make devssr (in one terminal)
    * make devssr_logs (in another terminal)
    * To tear down, CTRL-C the devssr_logs terminal and do make devssr_stop
```

> Production
```
    * make prod (in one terminal)
    * make prod_logs (in another terminal)
    * To tear down, CTRL-C the prod_logs terminal and do make prod_stop
```

* If you change the nginx configuration, you can do 'make nginx_reload' to reload nginx.

---

## MICROSERVICES

These are the three services that are created.
>FRONTEND

> API-GATEWAY

> NGINX

---
### FRONTEND

There are three variants

* Client side rendering (dev)
* Server side rendering (devssr)
* Production (prod)

Following features are supported for __both__ 'client side only rendering' and 'SSR'. Both support hot reloading.

* Graphql using Apollo client
* Loadable components
* Helmet
* Redirects
* Redux
* React context provider with ssr support.
* Plain css
* SCSS
* Styled components
* Configurable render loop with timeout and max number of renders to handle nested async tasks and loadable components.


### API-GATEWAY

* REST based API
* Graphql endpoint


### NGINX

* Routing request from client to API-GATEWAY from both browser and frontend server side rendering.

---
### STRUCTURE

All configuration variables are solely in the docker-compose files and nowhere else with the exception of the nginx configuration. If any required configration is missing, an error is thrown.

The `services` folder contains 3 folders with `frontend`, `api-gateway` and `nginx` code.

All the frontend source code is located in the `services/frontend/src` folder.

Folder | Content
------------ | -------------
`src/client` | Client side (frontend code).
`src/client/apollo` | A hoc helper to provide apollo client to class based components.
`src/client/app` | A bunch of components that are used to test various parts of the system.
`src/client/conmodus-provider` | A setup file for the SSR Context provider.
`src/client/redux` | Redux reducer, actions creator and store.
`src/config.js` | File that validates environment variable existens and exports them.
`src/conmodus` | Isomorphic code use both by client and server.
`src/conmodus/provider` | Code for two providers.
`src/conmodus/provider/ssr-data-handler` | Context provider with SSR support.
`src/conmodus/provider/thunk-handler` | Redux thunks SSR.
`src/conmodus/utils` | Isomorpic win and dom utils.
`src/conmodus/client*` | Various wrappers.
`src/conmodus/client-dev-ssr.js` | Referenced from the `webpack.dev-ssr.js` file.
`src/conmodus/client-dev.js` | Referenced from the `webpack.dev.js` file.
`src/conmodus/client-prod.js` | Referenced from the `webpack.prod.js` file.
`src/conmodus/client-serverside.js` | Used by server (`src/server/server.js -> src/conmodus/ssr.js`) when rendering on server.
`src/conmodus/css-styles.js` | Helper to create css style string to insert into html when SSR.
`src/conmodus/html-template.js` | Since no template engine is used, this helper is used to insert data into the html file (`src/conmodus/html/index.html`) when SSR.
`src/conmodus/loadable-stats.js` | Helper to create bundle script tags to insert into html when SSR.
`src/conmodus/ssr.js` | The SSR.
`src/html/index.html` | The html file referenced from `webpack.dev.js` and server side rendering (both for devssr and prod)
`src/server` | The server folder.
`src/server/assets` | Just the favicon.
`src/server/config.js` | File that validates environment variable existens and exports them.
`src/server/server.js` | The server main file.

---
### DOCKER

There are three docker compose files
* docker-compose-dev.yml
    >React client side only development with hot reloading.

* docker-compose-devssr.yml
    >React with SSR and hot reloading.

* docker-compose-prod.yml
    >React SSR production.

---

### ALL COMMANDS AVAILABLE IN MAKEFILE
>To build
* make dev_build
* make devssr_build
* make prod_build

>To start
* make dev
* make devssr
* make prod

>To show logs
* make dev_logs
* make devssr_logs
* make prod_logs

>To stop
* make dev_stop
* make devssr_stop
* make prod_stop

>To restart
* make dev_restart
* make devssr_restart
* make prod_restart

>To reload nginx
* make nginx_reload