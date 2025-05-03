Migrado de: https://ygoprodeck.com/api-guide/
usando como base:
https://github.com/ErickWendel/parallelizing-nodejs-ops/tree/main
pnpm tsx migrate-card/index

npx typeorm migration:generate -d dist/data-source.js  
npx typeorm migration:generate -d dist/data-source.js create-purchases 
npx typeorm migration:run -d dist/data-source.js
