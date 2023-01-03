export type ID = string | number;

export type Result = {
  id: ID;
  [key: string]: any;
};

export type Params = {
  pagination?: {
    offset: number;
    limit: number;
  };
  sort?: {
    field: string;
    order: 'desc' | 'asc';
  };
  filter?: string[];
};

export type AddDatabaseLink = {
  url: string;
  list_id: ID;
};

export interface Resource {
  getOne(resourceId: string, id: ID): Promise<Result>;
  getList(resourceId: string, ids?: ID[]): Promise<Result[]>;
  addOrUpdateItem(name: string, data: any): Promise<Result>;
  deleteItem(name: string, id: ID): Promise<void>;
  subLists(id: ID): Promise<Result[]>;
  links(queries: Params): Promise<Result[]>;
  addLink(link: AddDatabaseLink): Promise<Result>;
}
