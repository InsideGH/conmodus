# CONMODUS

React SSR with docker, demo [web.thelarsson.com](http://web.thelarsson.com). Note, it's served from my old gaming PC running Ubuntu server that isn't online all the time.

## GET STARTED

Set the following in you etc/hosts file.

```
127.0.0.1 local.conmodus.com cms.local.conmodus.com
```

Set the following in your .env file.

> VERSION - choose your version.

> USERNAME - your docker hub account user name.

> PORT_LOCAL - the port used when developing locally.

> PORT_LIVE - the port used when running live.

> IMAGE_PREFIX - prefix used for all docker images created.

> POSTGRES_DB - name of the postgres database.

> POSTGRES_PASSWORD - postgres password.

> POSTGRES_USER - postgres username.

> DEV_MODE - Select which mode you want to run ['dev', 'devssr', 'prod', 'prod-nossr', 'live']


Example of a `.env` file.

```
VERSION=v0.64
USERNAME=insidedocker
PORT_LOCAL=80
PORT_LIVE=3000
IMAGE_PREFIX=conmodus
POSTGRES_DB=cms_dev
POSTGRES_PASSWORD=my_db_dev_password
POSTGRES_USER=my_db_dev_username
DEV_MODE=dev
```

There are 5 modes available. The mode is controlled by the .env file and the variable called DEV_MODE.

> If DEV_MODE==dev. Client side only development. Using `PORT_LOCAL`.

> If DEV_MODE==devssr. Development with SSR. Using `PORT_LOCAL`.

> If DEV_MODE==prod. Production. Using `PORT_LOCAL`.

> If DEV_MODE==prod-nossr. Production without SSR (static serve). Using `PORT_LOCAL`.

> If DEV_MODE==live. This mode is using the built images and is targeting live mode. Using `PORT_LIVE`.

<br>
To start just do the following

```
    * make up (in one terminal)
    * make logs (in another terminal)
    * To tear down, CTRL-C the logs terminal and do make stop
```

<br>

---

## MICROSERVICES

These are the 5 services.

> FRONTEND

> API-GATEWAY

> CMS

> POSTGRES

> NGINX


---


### FRONTEND MICROSERVICE

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


### API-GATEWAY MICROSERVICE

There are two variants mapped to five modes like follows.

> Development. Used with __dev__, __devssr__.

> Production. Used with __prod__, __prod-nossr__, __live__.

Following features are supported

* REST based API (for example GET `local.conmodus.com/api-gateway/weather`)

* Graphql endpoint (`local.conmodus.com/api-gateway/graphql`).


### CMS MICROSERVICE

There are two variants mapped to five modes like follows.

> Development. Used with __dev__, __devssr__.

> Production. Used with __prod__, __prod-nossr__, __live__.

Following features are supported

* CMS builder and CMS (ongoing...)

* Installtion and create initital user.


### POSTGRES MICROSERVICE

There is one variant. Dependent on that the following variables are set on environment both when running locally and __live__.

* POSTGRES_DB=cms_dev
* POSTGRES_PASSWORD=1
* POSTGRES_USER=1


### NGINX MICROSERVICE

There two configuration used with all five modes like follows.

> `nginx.conf` used for __dev__, __devssr__, __prod__, __prod-nossr__.

* Routing / to `frontend` service for `local.conmodus.com`.

* Routing / to `cms` service for `cms.local.conmodus.com`

* Routing /api-gateway to `api-gateway` service for both `local.conmodus.com` and `cms.local.conmodus.com`.

> `nginx-live.conf` used for __live__.

* Routing / to `frontend` service for `web.thelarsson.com`.

* Routing / to `cms` service for `web-cms.thelarsson.com`

* Routing /api-gateway to `api-gateway` service for both `web.thelarsson.com` and `web-cms.thelarsson.com`.


> If you change the nginx configuration, you can do 'make nginx_reload' to reload nginx.


---


### FRONTEND STRUCTURE

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


### LIVE

```
    ./push_to_dockerhub.sh
```

The above script will build all microservices. Each microservice build results in 2 images, one __latest__ and a specific __version__ (decided by VERSION variable in the .env file). Then all images are pushed to docker hub. This means in total 10 images.

On your server (EC2, Ubuntu server, etc ...) you use the `docker-compose-live.yml` (renamed to `docker-compose.yml`) along with the `deploy.sh` script and the `.env` file. Just scp these 3 files to your server and run `./deploy.sh`.

The above assumes that you have a nginx setup on your server routing traffic to the currect port (`PORT_LIVE`).

If you have multiple projects on your server, your server nginx can route subdomains to the different projects port. Currently the `docker-compose-live.yml` exposes port 3000.

---

### LIVE

```
    ./push_to_dockerhub.sh
```

The above script will build all microservices. Each microservice build results in 2 images, one __latest__ and a specific __version__ (decided by VERSION variable in the .env file). Then all imagas are pushed to docker hub. This means in total 6 images.

On your server (EC2, Ubuntu server, etc ...) you use the `docker-compose-live.yml` (renamed to `docker-compose.yml`) along with the `deploy.sh` script and a `.env` file with `PORT_LIVE` set to what you want to use. Just scp these 3 files to your server and run `./deploy.sh`.

The above assumes that you have a nginx setup on your server routing traffic to the currect port (`PORT_LIVE`).

If you have multiple projects on your server, your server nginx can route subdomains to the different projects port. Currently the `docker-compose-live.yml` exposes port 3000.

---

### ALL COMMANDS AVAILABLE IN MAKEFILE

>To build
* make build
* make build_all

>To start in detached mode
* make up

>To show logs
* make logs

>To stop
* make stop

>To restart
* make restart

>To reload nginx
* make nginx_reload