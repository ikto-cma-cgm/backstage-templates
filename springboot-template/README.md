# Spring Boot Microservice Template

Scaffolds a minimal Spring Boot 3 microservice with Maven, Docker, PostgreSQL and Backstage integration.

## Purpose

This template generates a production-ready Spring Boot microservice skeleton including:
- Maven project structure (`pom.xml` with templated dependencies)
- Docker configuration (`Dockerfile`)
- Application configuration (`application.yml`, `bootstrap.yml`, `logback.xml`)
- Backstage `catalog-info.yaml` for automatic catalog registration
- TechDocs scaffolding (`mkdocs.yml` + `docs/`)
- Standard CI pipeline configuration (`pipeline.yml`)

## Usage

This template is consumed via the Backstage Developer Portal. Navigate to **Create → Spring Boot Microservice** and fill in the form.

## Ownership

- **Owner**: `group:default/it-development-software-engineering-developer-platform` (Developer Portal Team)
- **Maintainers**: Developer Portal Team members. Pull requests welcome via the repository's standard review process.
- **Support**: open an issue on the repository, or reach out to the Developer Portal Team channel.
- **Contribution**: changes must pass the R01–R19 lint check (`./scripts/lint.sh output/templates/springboot-service-template/`). Breaking changes follow Semantic Versioning — see `CHANGELOG.md`.

## Compliance with ADR-0001 Composable Service Governance

| Rule | Status | Notes |
|---|---|---|
| **R1** SemVer | ✅ See `CHANGELOG.md` and Git tags (`v<MAJOR>.<MINOR>.<PATCH>`) |
| **R2** Pinning | N/A (unit template, not a composite consuming skeleton references) |
| **R3** Lifecycle | ✅ Generated `catalog-info.yaml` uses `lifecycle: experimental` |
| **R4** Ownership | ✅ This section + `CHANGELOG.md` + notification of consumer-breaking changes per Rule 4 |
| **R5** Cascade | N/A (unit template) |

## Linter status

Latest run: **19/19** R01–R19 rules passed.

## Related

- ADR-0001 — Composable Service Governance
- SMT-99 — Composable Service standards (TechDocs in `backstage-documentation` repo)
