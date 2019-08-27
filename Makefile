# 'up' with docker
dev:
	docker-compose -f docker-compose-dev.yml up -d

devssr:
	docker-compose -f docker-compose-devssr.yml up -d

prod:
	docker-compose -f docker-compose-prod.yml up -d


# 'stop' with docker
dev_stop:
	docker-compose -f docker-compose-dev.yml stop

devssr_stop:
	docker-compose -f docker-compose-devssr.yml stop

prod_stop:
	docker-compose -f docker-compose-prod.yml stop


# 'restart' with docker
dev_restart:
	docker-compose -f docker-compose-dev.yml restart

devssr_restart:
	docker-compose -f docker-compose-devssr.yml restart

prod_restart:
	docker-compose -f docker-compose-prod.yml restart


# 'logs' with docker
dev_logs:
	docker-compose -f docker-compose-dev.yml logs -f

devssr_logs:
	docker-compose -f docker-compose-devssr.yml logs -f

prod_logs:
	docker-compose -f docker-compose-prod.yml logs -f


# 'build' with docker
dev_build:
	docker-compose -f docker-compose-dev.yml build

devssr_build:
	docker-compose -f docker-compose-devssr.yml build

prod_build:
	docker-compose -f docker-compose-prod.yml build


# 'ps with docker
dev_ps:
	docker-compose -f docker-compose-dev.yml ps

devssr_ps:
	docker-compose -f docker-compose-devssr.yml ps

prod_ps:
	docker-compose -f docker-compose-prod.yml ps


# general 
lint:
	cd services/frontend; make lint; cd -
	cd services/api; make lint; cd -

clean:
	docker rmi $(docker images -f "dangling=true" -q)
	docker rm $(docker ps -f status=exited -aq)
	docker volume rm $(docker volume ls -qf dangling=true)
	docker container exec conmodus_nginx_dev_1 nginx -s reload

nginx_reload:
	docker container exec conmodus_nginx_1 nginx -s reload
