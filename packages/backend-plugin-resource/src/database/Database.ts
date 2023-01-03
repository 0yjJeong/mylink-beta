import { Knex } from 'knex';
import urlMetadata from 'url-metadata';
import { v4 as uuidv4 } from 'uuid';
import { Result, Params, Resource, AddDatabaseLink, ID } from './types';

export default class Database implements Resource {
  constructor(private readonly database: Knex) {}

  async getOne(resourceId: string, id: ID): Promise<Result> {
    return (await this.database<Result>(resourceId).where({ id }).select())[0];
  }

  async getList(resourceId: string, ids?: ID[]): Promise<Result[]> {
    return await this.database<Result>(resourceId).whereIn('id', ids).select();
  }

  async addOrUpdateItem(name: string, data: any): Promise<any> {
    await this.database.transaction(async (tx) => {
      await tx(name)
        .insert({ ...data, id: uuidv4() })
        .catch(() => tx(name).where({ id: data.id }).update(data));
    });
    return data;
  }

  async deleteItem(name: string, id: ID): Promise<void> {
    const result = await this.database<Result>(name).where({ id }).del();
    if (!result) {
      throw new Error(`Found no item with it ID ${id}`);
    }
  }

  async subLists(id: ID): Promise<Result[]> {
    return await this.database<Result>('lists_lists')
      .where({ source_id: id })
      .innerJoin('lists', 'target_id', 'lists.id')
      .select('lists.id', 'lists.title', 'lists.created_at');
  }

  async links(params: Params): Promise<Result[]> {
    const tx = this.database<Result>('links');

    if (params?.sort) {
      tx.orderBy(params?.sort.field, params?.sort.order);
    }

    if (params?.pagination) {
      tx.offset(params?.pagination.offset).limit(params?.pagination.limit);
    }

    if (params?.filter) {
      tx.whereIn('list_id', params?.filter);
    }

    return await tx.select();
  }

  async addLink(link: AddDatabaseLink): Promise<Result> {
    const { url, list_id } = link;
    const item = await urlMetadata(url);
    if (!item) {
      throw new Error(`Found no metadata with url ${url}`);
    }
    const id = uuidv4();
    await this.database<Result>('links').insert({
      id,
      url: item.url,
      title: item.title,
      image: item.image,
      description: item.description,
      list_id,
    });
    return this.getOne('links', id);
  }
}

//   return {
//     async getList(id: string) {},
//     // async list(resourceId, id) {
//     //   const ids = await database('list_lists')
//     //     .where({ list_source_id: id })
//     //     .select('list_target_id');
//     //   const parsedIds = ids.map((id) => id.list_target_id);
//     //   return {
//     //     ...((await database(resourceId).where({ id }).select()[0]) as Result),
//     //     links: await database('links').whereIn('list_id', [id, ...parsedIds]),
//     //     link_links: await database('list_lists')
//     //       .where({ list_source_id: id })
//     //       .innerJoin('lists', 'list_target_id', 'lists.id'),
//     //   };
//     // },
//     // async getList(resourceId) {
//     //   return await database(resourceId).select();
//     // },
//     // async getOne(resourceId, id) {
//     //   const items = await database(resourceId).where({ id });
//     //   if (!items.length) {
//     //     throw new Error(`Found no item with name ${id}`);
//     //   }
//     //   return items[0];
//     // },
//     // async addOrUpdate(resourceId, id, params) {
//     //   await database.transaction(async (tx) => {
//     //     await tx(resourceId)
//     //       .insert(params)
//     //       .catch(() => tx(resourceId).where({ id }).update(params));
//     //   });
//     //   return params;
//     // },
//     // async deleteOne(resourceId, id) {
//     //   const result = await database(resourceId).where({ id }).del();
//     //   if (!result) {
//     //     throw new Error(`Found no item with ID ${id}`);
//     //   }
//     //   return result;
//     // },
//   };
// }
