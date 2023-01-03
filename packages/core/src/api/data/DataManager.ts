import axios from 'axios';
import queryString from 'query-string';
import { List, Link } from '../../types/resource';

type ListResponse = {
  data: List;
};

type ListsResponse = {
  data: List[];
};

type LinksResponse = {
  data: Link[];
};

type DeleteLinkResponse = void;

interface DataManagerResponses {
  list(id: string): Promise<ListResponse>;
  subLists(id: string): Promise<ListsResponse>;
  links(): Promise<LinksResponse>;
  deleteLink(id: string): Promise<DeleteLinkResponse>;
}

export default class DataManager implements DataManagerResponses {
  constructor(private readonly apiUrl: string) {}

  async list(id: string): Promise<ListResponse> {
    const { data } = await axios.get<List>(`${this.apiUrl}/list/${id}`);
    return { data };
  }

  async subLists(id: string): Promise<ListsResponse> {
    const { data } = await axios.get<List[]>(`${this.apiUrl}/sub-list/${id}`);
    return { data };
  }

  async links(): Promise<LinksResponse> {
    const { field, order, offset, limit, filter } = queryString.parse(
      location.search
    );

    const params = {};

    if (field !== undefined && order !== undefined) {
      params['sort'] = {};
      params['sort'].field = field;
      params['sort'].order = order;
    }

    if (offset !== undefined && limit !== undefined) {
      params['pagination'] = {};
      params['pagination'].offset = (Number(offset) - 1) * Number(limit);
      params['pagination'].limit = limit;
    }

    if (filter !== undefined) {
      params['filter'] = filter;
    }

    const { data } = await axios.post<Link[]>(`${this.apiUrl}/links`, params);
    return { data };
  }

  async deleteLink(id: string): Promise<DeleteLinkResponse> {
    await axios.delete<void>(`${this.apiUrl}/link/${id}`);
  }
}
