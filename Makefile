DC_PROFILE := dev
DC_ENV_FILE := .conf/development/conf.env

.PHONY: dcbuild
dcbuild:
	docker compose --env-file $(DC_ENV_FILE) --profile $(DC_PROFILE) build

.PHONY: dcupd
dcupd:
	docker compose --env-file $(DC_ENV_FILE) --profile $(DC_PROFILE) up -d

.PHONY: dcstop
dcstop:
	docker compose --env-file $(DC_ENV_FILE) --profile $(DC_PROFILE) stop

.PHONY: dcdown
dcdown:
	docker compose --env-file $(DC_ENV_FILE) --profile $(DC_PROFILE) down

.PHONY: dclf
dclf:
	docker compose --env-file $(DC_ENV_FILE) --profile $(DC_PROFILE) logs -f

.PHONY: dcpull
dcpull:
	docker compose --env-file $(DC_ENV_FILE) --profile $(DC_PROFILE) pull

.PHONY: dcps
dcps:
	docker compose --env-file $(DC_ENV_FILE) --profile $(DC_PROFILE) ps

.PHONY: dcclean
dcclean:
	docker compose --env-file $(DC_ENV_FILE) --profile $(DC_PROFILE) down --volumes
	docker rmi --force $(shell docker images -q -a --filter=reference='MesseBasseProduction/*:*')
