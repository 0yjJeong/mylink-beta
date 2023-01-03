import { Knex } from 'knex';
import { createDatabase, createRouter } from '@ml/backend-plugin-resource';

export default async function resource({ database }: { database: Knex }) {
  const db = await createDatabase(database);
  return createRouter(db);
}
