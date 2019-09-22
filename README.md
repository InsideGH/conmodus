# CONMODUS

React SSR with docker.

## GET STARTED

Set the following in you etc/hosts file.

```
127.0.0.1 local.conmodus.com
```

There are 5 modes available.

> Client side only development
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

This mode can be used to test production locally.
```
    * make prod (in one terminal)
    * make prod_logs (in another terminal)
    * To tear down, CTRL-C the prod_logs terminal and do make prod_stop
```

> Production without SSR (static serve)

This mode can be used to test production of client side only rendered locally.
```
    * make prod-nossr (in one terminal)
    * make prod-nossr_logs (in another terminal)
    * To tear down, CTRL-C the prod-nossr_logs terminal and do make prod-nossr_stop
```

> Live

This mode is building images and using the built images and is targeting live mode.

```
    ./push_to_dockerhub.sh
```

The above script will build all microservices. Each microservice build results in 2 images, one __latest__ and a specific __version__ (decided by VERSION variable in the .env file). Then all imagas are pushed to docker hub. This means in total 6 images.

On your server (EC2, Ubuntu server, etc ...) you use the `docker-compose-live.yml` along with the `deploy.sh` script.

If you have multiple projects on your server, your server nginx can route subdomains to the different projects port. Currently the `docker-compose-live.yml` exposes port 3000.

---

## MICROSERVICES

These are the three services that are created.
> FRONTEND

> API-GATEWAY

> NGINX

---
### FRONTEND

There are five variants

> Client side rendering (__dev__)

> Server side rendering (__devssr__)

> Production (__prod__). Note, local production

> Production without SSR but instead static serving (__prod-nossr__). Note, local production.

> Live (__live__) (based of built images on docker hub)

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

There are two variants mapped to five modes like follows.

> Development. Used with __dev__, __devssr__.

> Production. Used with __prod__, __prod-nossr__, __live__.

Following features are supported

* REST based API.

* Graphql endpoint.


### NGINX

There are two variants mapped to five modes like follows.

> Local configuration. Used with __dev__, __devssr__, __prod__, __prod-nossr__.

> Live configuration. Used with __live__.

> Routing request from client to API-GATEWAY from both browser and frontend server side rendering.

Following features are supported

* Routing / to `frontend` service.

* Routing /api-gateway to `api-gateway` service.

> If you change the nginx configuration, you can do 'make nginx_reload' to reload nginx.


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
`src/conmodus/client-prod-nossr.js` | Referenced from the `webpack.prod-nossr.js` file.
`src/conmodus/client-serverside.js` | Used by server (`src/server/server.js -> src/conmodus/ssr.js`) when rendering on server.
`src/conmodus/css-styles.js` | Helper to create css style string to insert into html when SSR.
`src/conmodus/html-template.js` | Since no template engine is used, this helper is used to insert data into the html file (`src/conmodus/html/index.html`) when SSR.
`src/conmodus/loadable-stats.js` | Helper to create bundle script tags to insert into html when SSR.
`src/conmodus/ssr.js` | The SSR.
`src/html/index.html` | The html file referenced from `webpack.dev-ssr.js` and server side rendering (both for devssr and prod)
`src/html/index-loading-spinner.html` | The html file referenced from `webpack.dev.js` and server static serving (both for dev and prod-nossr)
`src/server` | The server folder.
`src/server/assets` | Just the favicon.
`src/server/config.js` | File that validates environment variable existens and exports them.
`src/server/server.js` | The server main file when SSR.
`src/server/server-nossr.js` | The server main file when serving as static resource only.

---
### DOCKER

There are six docker compose files

* docker-compose-dev.yml
    >React client side only development with hot reloading.

* docker-compose-devssr.yml
    >React with SSR and hot reloading.

* docker-compose-prod.yml
    >React SSR production.

* docker-compose-prod-nossr.yml
    >React static served client production.

* docker-compose-live_build.yml
    >Build images using args.

* docker-compose-live.yml
    >React SSR production based of images.

---

### ALL COMMANDS AVAILABLE IN MAKEFILE
>To build
* make dev_build
* make devssr_build
* make prod_build
* make prod-nossr_build
* make live_build
* make build_all

>To start
* make dev
* make devssr
* make prod
* make prod-nossr
* make live

>To show logs
* make dev_logs
* make devssr_logs
* make prod_logs
* make prod-nossr_logs
* make live_logs

>To stop
* make dev_stop
* make devssr_stop
* make prod_stop
* make prod-nossr_stop
* make live_stop

>To restart
* make dev_restart
* make devssr_restart
* make prod_restart
* make prod-nossr_restart
* make live_restart

>To reload nginx
* make nginx_reload