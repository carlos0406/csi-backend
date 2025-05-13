npx ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:run -d src/data-source.ts 

npx ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:generate -d src/data-source.ts src/migrations/create-rarity