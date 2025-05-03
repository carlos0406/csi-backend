import 'reflect-metadata';

import { initialize } from './cluster';
import cliProgress from 'cli-progress';
import { setTimeout } from 'node:timers/promises';
import axios from 'axios';
import { db } from './db';

const ITEMS_PER_PAGE = 700;
const CLUSTER_SIZE = 5;

const TASK_FILE = new URL('./background-task.ts', import.meta.url).pathname;

async function* getAllPagedData(itemsPerPage, page = 0) {
  const response = await axios.get(
    'https://db.ygoprodeck.com/api/v7/cardinfo.php',
    {
      params: { num: 700, offset: page * 700 },
    },
  );
  const items = response.data.data;
  if (!items.length) return;
  yield items;
  yield* getAllPagedData(itemsPerPage, (page += 1));
} // Aqui estava faltando fechar a função

//pegar o valor total antes de rotdar o script
const total = 13597;
// console.log(`total items on DB: ${total}`)

const progress = new cliProgress.SingleBar(
  {
    format: 'progress [{bar}] {percentage}% | {value}/{total} | {duration}s',
    clearOnComplete: false,
  },
  cliProgress.Presets.shades_classic,
);

progress.start(total, 0);
let totalProcessed = 0;
const cp = initialize({
  backgroundTaskFile: TASK_FILE,
  clusterSize: CLUSTER_SIZE,
  async onMessage(message) {
    progress.increment();

    if (++totalProcessed !== total) return;
    // console.log(`all ${amountToBeProcessed} processed! Exiting...`)
    progress.stop();
    cp.killAll();

    const insertedOnSQLite = await db.count();
    console.log(
      `total on MongoDB ${total} and total on PostGres ${insertedOnSQLite}`,
    );
    console.log(`are the same? ${total === insertedOnSQLite ? 'yes' : 'no'}`);
    process.exit();
  },
});
await setTimeout(1000);

for await (const data of getAllPagedData(ITEMS_PER_PAGE)) {
  cp.sendToChild(data);
}
