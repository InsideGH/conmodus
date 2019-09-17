# CONMODUS

React SSR with docker.

## GET STARTED
* Client side only development
    * make dev (in one terminal)
    * make dev_logs (in another terminal)
    * To tear down, CTRL-C the dev_logs terminal and do make dev_stop

* Development with SSR
    * make devssr (in one terminal)
    * make devssr_logs (in another terminal)
    * To tear down, CTRL-C the devssr_logs terminal and do make devssr_stop

* Production
    * make prod (in one terminal)
    * make prod_logs (in another terminal)
    * To tear down, CTRL-C the prod_logs terminal and do make prod_stop

* If you change the nginx configuration, you can do 'make nginx_reload' to reload nginx.


### MICROSERVICES

* FRONTEND
* API-GATEWAY
* NGINX


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


### DOCKER

There are three docker compose files
* docker-compose-dev.yml
    * React client side only development with hot reloading.

* docker-compose-devssr.yml
    * React with SSR and hot reloading.

* docker-compose-prod.yml
    * React SSR production.


### ALL COMMANDS AVAILABLE
To build
* make dev_build
* make devssr_build
* make prod_build

To start
* make dev
* make devssr
* make prod

To show logs
* make dev_logs
* make devssr_logs
* make prod_logs

To stop
* make dev_stop
* make devssr_stop
* make prod_stop

To restart
* make dev_restart
* make devssr_restart
* make prod_restart

To reload nginx
* make nginx_reload