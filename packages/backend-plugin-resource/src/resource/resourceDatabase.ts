import { Knex } from 'knex';
import path from 'path';

export type ID = string | number;

export type Result = {
  id: ID;
  [key: string]: any;
  [key: number]: any;
};

export type GetListResult = {
  data: Result[];
};

export type GetOneResult = {};

export type AddOrUpdateResult = {};

export type DeleteOneResult = {};

export type AddOrUpdateListResult = {};

export interface Resource {
  list(resourceId: string, id: string): Promise<Result>;
  getList(resourceId: string): Promise<Result[]>;
  getOne(resourceId: string, id: string): Promise<GetOneResult>;
  addOrUpdate(
    resourceId: string,
    id: string | undefined,
    params: any
  ): Promise<AddOrUpdateResult>;
  deleteOne(resourceId: string, id: string): Promise<DeleteOneResult>;
}

export default async function resourceDatabase(
  database: Knex
): Promise<Resource> {
  await database.migrate.latest({
    directory: path.resolve(__dirname, '..', 'src', 'migrations'),
  });

  return {
    async list(resourceId, id) {
      const ids = await database('list_lists')
        .where({ list_source_id: id })
        .select('list_target_id');
      const parsedIds = ids.map((id) => id.list_target_id);

      return {
        ...((await database(resourceId).where({ id }).select()[0]) as Result),
        links: await database('links').whereIn('list_id', [id, ...parsedIds]),
        link_links: await database('list_lists')
          .where({ list_source_id: id })
          .innerJoin('lists', 'list_target_id', 'lists.id'),
      };
    },
    async getList(resourceId) {
      return await database(resourceId).select();
    },
    async getOne(resourceId, id) {
      const items = await database(resourceId).where({ id });
      if (!items.length) {
        throw new Error(`Found no item with name ${id}`);
      }
      return items[0];
    },
    async addOrUpdate(resourceId, id, params) {
      await database.transaction(async (tx) => {
        await tx(resourceId)
          .insert(params)
          .catch(() => tx(resourceId).where({ id }).update(params));
      });
      return params;
    },
    async deleteOne(resourceId, id) {
      const result = await database(resourceId).where({ id }).del();

      if (!result) {
        throw new Error(`Found no item with ID ${id}`);
      }

      return result;
    },
  };
}
