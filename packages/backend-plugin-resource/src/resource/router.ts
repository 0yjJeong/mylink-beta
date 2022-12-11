import express, { Router } from 'express';
import pluralize from 'pluralize';
import urlMetadata from 'url-metadata';
import { Resource } from './resourceDatabase';

type RouterOptions = {
  resource: Resource;
};

function createRouterMiddleware(resourceId: string, options: RouterOptions) {
  const app = express();
  app
    .get('/:id', async (req, res) => {
      const { id } = req.params;
      const item = await options.resource.getOne(resourceId, id);
      res.status(200).send(item);
    })
    .post('/', async (req, res) => {
      const { id } = req.body;
      const output = await options.resource.addOrUpdate(
        resourceId,
        id,
        req.body
      );
      res.status(201).send(output);
    })
    .delete('/:id', async (req, res) => {
      const { id } = req.params;
      await options.resource.deleteOne(resourceId, id);
      res.status(201).send();
    });

  return app;
}

export async function createRouter(options: RouterOptions) {
  const router = Router();

  // Lists
  const List = 'list';
  router.get('/list/:id', async (req, res) => {
    const list = await options.resource.list('list', req.params.id);
    res.status(200).send(list);
  });
  router.use(`/${List}`, createRouterMiddleware(pluralize(List), options));

  // Links
  const Link = 'link';
  router.post('/link', async (req, res) => {
    const { url, id } = req.body;
    const result = await urlMetadata(url);
    if (!result) {
      throw new Error(`Found no result on url ${url}`);
    }
    const output = await options.resource.addOrUpdate('links', undefined, {
      list_id: id,
      name: result.title,
      url: result.url,
      description: result.description,
    });
    res.status(201).send(output);
  });
  // router.post('/link/:id', async (req, res) => {});
  router.use(`/${Link}`, createRouterMiddleware(pluralize(Link), options));

  // List-lists
  const List_List = 'list_list';
  router.use(`/list-list`, createRouterMiddleware('list_lists', options));

  return router;
}
