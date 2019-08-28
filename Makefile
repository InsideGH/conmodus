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

clean_dangling_images:
	$(shell docker rmi $(shell docker images -f "dangling=true" -q) | true)

clean_containers:
	$(shell docker rm $(shell docker ps -f status=exited -aq) | true)

clean_dangling_volumes:
	$(shell docker volume rm $(shell docker volume ls -qf dangling=true) | true)

clean_conmodus_images:
	docker rmi conmodus_api_gateway:dev -f | true
	docker rmi conmodus_api_gateway:devssr | true
	docker rmi conmodus_api_gateway:prod | true
	docker rmi conmodus_frontend:dev | true
	docker rmi conmodus_frontend:devssr | true
	docker rmi conmodus_frontend:prod -f | true

clean_docker: clean_conmodus_images clean_dangling_images clean_containers clean_dangling_volumes


nginx_reload:
	docker container exec conmodus_nginx_1 nginx -s reload
