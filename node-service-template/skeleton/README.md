# ${{ values.name }}

${{ values.description }}

## Technologies

- Node.js ${{ values.nodeVersion }}
- Express ${{ values.expressVersion }}
- TypeScript ${{ values.typescriptVersion }}
- npm

## Lancement local

```bash
npm install
npm run dev
```

## Monitoring

Health check exposé sur `http://localhost:3000/health`.
