# ${{ values.name }}

${{ values.description }}

## Technologies

- Node.js ${{ values.nodeVersion }}
- Express
- TypeScript
- Docker

## Local run

```bash
npm install
npm run dev
```

## Build and start

```bash
npm run build
npm run start
```

## Health endpoint

Le endpoint de santé est exposé sur `http://localhost:${{ values.port }}/health` et retourne `{ "status": "UP" }`.
