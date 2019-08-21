# Local (without docker)
clean:
	npm run clean
	
dev:
	npm run dev

devssr:
	npm run dev:ssr

prod:
	npm run prod

# 'Up' with docker
docker_dev:
	docker-compose -f docker-compose-dev.yml up -d

docker_devssr:
	docker-compose -f docker-compose-devssr.yml up -d

docker_prod:
	docker-compose -f docker-compose-prod.yml up -d


# 'Stop' with docker
docker_dev_stop:
	docker-compose -f docker-compose-dev.yml stop

docker_devssr_stop:
	docker-compose -f docker-compose-devssr.yml stop

docker_prod_stop:
	docker-compose -f docker-compose-prod.yml stop


# 'Logs' with docker
docker_dev_logs:
	docker-compose -f docker-compose-dev.yml logs -f

docker_devssr_logs:
	docker-compose -f docker-compose-devssr.yml logs -f

docker_prod_logs:
	docker-compose -f docker-compose-prod.yml logs -f
