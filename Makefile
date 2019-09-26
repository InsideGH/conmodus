DOT_ENV_FILE = .env
IMAGE_PREFIX := $(shell grep IMAGE_PREFIX $(DOT_ENV_FILE)| cut -d '=' -f 2-)
DEV_MODE := $(shell grep DEV_MODE $(DOT_ENV_FILE)| cut -d '=' -f 2-)

info:
	@echo Using mode = $(DEV_MODE)

up: info
	docker-compose -f docker-compose-$(DEV_MODE).yml up -d

stop: info
	docker-compose -f docker-compose-$(DEV_MODE).yml stop

restart: info
	docker-compose -f docker-compose-$(DEV_MODE).yml restart

logs: info
	docker-compose -f docker-compose-$(DEV_MODE).yml logs -f

build: info
	docker-compose -f docker-compose-$(DEV_MODE).yml build

live_build:
	docker-compose -f docker-compose-live-build.yml build

ps: info
	docker-compose -f docker-compose-$(DEV_MODE).yml ps

lint: info
	cd services/frontend; make lint; cd -
	cd services/api; make lint; cd -

# clean
clean_dangling_images:
	$(shell docker rmi $(shell docker images -f "dangling=true" -q) | true)

clean_containers:
	$(shell docker rm $(shell docker ps -f status=exited -aq) | true)

clean_dangling_volumes:
	$(shell docker volume rm $(shell docker volume ls -qf dangling=true) | true)

clean_docker: clean_dangling_images clean_containers clean_dangling_volumes


nginx_reload:
	docker container exec $(IMAGE_PREFIX)_nginx_1 nginx -s reload
