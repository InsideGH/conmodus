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