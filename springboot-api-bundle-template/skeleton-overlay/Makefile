.DEFAULT_GOAL := help

.PHONY: help init run

help:
	@echo "Usage:"
	@echo "  make init   — Generate and inline API sources (run once after clone)"
	@echo "  make run    — Start the service locally"

init: ## Run once after clone: generate API sources, inline them, clean up pom.xml
	bash scripts/generate-api.sh
	mvn compile -q
	@echo ""
	@echo "✅ Ready. Implement your *ApiDelegate beans then run: make run"

run: ## Start the service locally
	mvn spring-boot:run -Plocal
