# ${{ values.name }}

${{ values.description }}

## Stack

- **Runtime** : Node.js ${{ values.nodeVersion }} + Express
- **Validation** : express-openapi-validator (spec-first)
- **Types** : openapi-typescript
- **API liée** : `${{ values.apiRef }}`

## Démarrage rapide

```bash
npm install
npm run fetch-spec   # télécharge la spec depuis ${{ values.apiEntityName }}
npm run dev          # port ${{ values.port }}
```
