# ${{ values.name }}

${{ values.description }}

## Overview

**${{ values.name }}** is a Spring Boot 3 service that implements the OpenAPI contract **[${{ values.apiName }}](${{ values.existingApiRef }})**.

The API contract is defined in a separate repository and versioned independently. This service consumes the contract at **build time** via `openapi-generator-maven-plugin` and generates the Java interfaces and model classes automatically.

## Key Components

| Layer | Class | Role |
|---|---|---|
| Generated controller | `HealthApiController` | Routes HTTP to delegate (regenerated each build) |
| Generated controller | `ResourcesApiController` | Routes HTTP to delegate (regenerated each build) |
| Delegate impl | `HealthController` | Returns health status — **edit this** |
| Delegate impl | `ResourcesController` | Handles resource CRUD — **edit this** |
| Service | `ResourceService` | Business logic — **edit this** |

## System Context

- **System**: ${{ values.system }}
- **Domain**: ${{ values.domain }}
- **Owner**: ${{ values.owner }}
- **Provides API**: `${{ values.existingApiRef }}`

## Quick Links

- [Repository](https://${{ values.repoProvider }}.com/${{ values.repoOwner }}/${{ values.name }})
- [CI Pipeline](https://jenkins.cma-cgm.com/job/cma-cgm/${{ values.name }}/main)
- [SonarQube](https://sonarqube.cma-cgm.com/dashboard?id=cma-cgm:${{ values.name }})
