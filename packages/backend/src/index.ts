import express from 'express';
import knex from 'knex';
import resource from './plugins/resource';

const DEFAULT_PORT = 5000;
const PORT = parseInt(process.env.PORT ?? '', 10) || DEFAULT_PORT;

function resourceEnv() {
  return {
    database: knex({
      client: 'pg',
      connection: 'postgres://dorong:dorong@localhost:5432/mylinkbeta',
    }),
  };
}

async function run() {
  const app = express();

  app.use(express.json());
  app.use('/resource', await resource(resourceEnv()));

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

run();
