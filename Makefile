COMPOSE_BASE = compose.yaml
COMPOSE_DEV  = compose.dev.yaml
COMPOSE_PROD = compose.prod.yaml
NETWORK_NAME = shared_network

.PHONY: dev prod down rebuild logs ps

dev:
	docker compose --env-file .env -f $(COMPOSE_BASE) -f $(COMPOSE_DEV) up --build --remove-orphans

prod: create-network
	docker compose --env-file .env -f $(COMPOSE_BASE) -f $(COMPOSE_PROD) up --build -d --remove-orphans

down:
	docker compose --env-file .env -f $(COMPOSE_BASE) -f $(COMPOSE_DEV) -f $(COMPOSE_PROD) down --remove-orphans --volumes

rebuild:
	docker compose --env-file .env -f $(COMPOSE_BASE) -f $(COMPOSE_DEV) build --no-cache

logs:
	docker compose --env-file .env -f $(COMPOSE_BASE) -f $(COMPOSE_DEV) logs -f

ps:
	docker compose ps

create-network:
	@docker network inspect $(NETWORK_NAME) > /dev/null 2>&1 || \
	docker network create $(NETWORK_NAME)
	@echo "Network '$(NETWORK_NAME)' is ready"

remove-network:
	@docker network rm $(NETWORK_NAME) 2>/dev/null || \
	echo "Network '$(NETWORK_NAME)' does not exist"
	@echo "Network '$(NETWORK_NAME)' removed"

list-networks:
	@docker network ls
