# Changelog

All notable changes to this template are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this template adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) per ADR-0001 Rule R1.

## [Unreleased]

### Added
- Initial template implementation: Maven `pom.xml`, Docker `Dockerfile`, application configuration, Backstage `catalog-info.yaml`, TechDocs scaffolding, CI `pipeline.yml`.
- Catalog ownership documentation (this CHANGELOG + README Ownership section) — ADR-0001 R4.

### Notes
- Currently scaffolds to GitHub (`publish:github`). Migration to GitLab CMA planned.
- `kind: Component` generated with `lifecycle: experimental` — ADR-0001 R3.
