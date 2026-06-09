# Overview

`${{ values.name }}` is a Liquibase resource project attached to the `${{ values.system }}` system. It centralises database schema changes and their deployment metadata in one repository.

## Responsibilities

- version SQL migrations
- expose a single master changelog
- package deployable assets for XL Deploy
- document operational steps for database teams

## Migration organisation

Migrations start in `src/001_scripts/` with a master changelog referencing one or more SQL-backed changeSets. Extend the sequence with additional XML or SQL files as the schema evolves.

## Repository

The generated repository URL is `https://${{ values.repoProvider }}.com/${{ values.repoOwner }}/${{ values.name }}`.
