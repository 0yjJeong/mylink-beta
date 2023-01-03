import express from 'express';
import cors from 'cors';
import knex from 'knex';
import 'dotenv/config';

import resource from './plugins/resource';

const DEFAULT_PORT = 5000;
const PORT = parseInt(process.env.PORT ?? '', 10) || DEFAULT_PORT;

const DATABASE_URL = process.env.DATABASE_URL;
console.log('DATABASE_URL ', DATABASE_URL);

function resourceEnv() {
  return {
    database: knex({
      client: 'pg',
      connection: DATABASE_URL,
    }),
  };
}

async function run() {
  const app = express();

  app.use(express.json());
  app.use(cors({ origin: 'http://127.0.0.1:5173' }));

  app.use('/resource', await resource(resourceEnv()));
  app.use('/ping', (_, res) => {
    res.status(200).send('pong');
  });

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

run();
