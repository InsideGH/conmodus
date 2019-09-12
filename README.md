# Conmodus

React SSR with docker.

## Stuff

### Microservices

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

### Docker

There are three docker compose files
* docker-compose-dev.yml
    * React client side only development with hot reloading.

* docker-compose-devssr.yml
    * React with SSR and hot reloading.

* docker-compose-prod.yml
    * React SSR production.

### INSTRUCTIONS
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