import { Knex } from 'knex';
import { resourceDatabase, createRouter } from '@ml/backend-plugin-resource';

export default async function resource({ database }: { database: Knex }) {
  const resource = await resourceDatabase(database);

  return createRouter({ resource });
}
