import { Router } from 'express';
import { Resource } from './database';
import { isSameSource } from './utils';

export function createRouter(resource: Resource) {
  const router = Router();

  // Lists
  router
    .get('/list/:id', async (req, res) => {
      const { id } = req.params;
      const list = await resource.getOne('lists', id);
      res.status(200).send(list);
    })
    .get('/sub-list/:id', async (req, res) => {
      const { id } = req.params;
      const list = await resource.subLists(id);
      res.status(200).send(list);
    })
    .post('/list/:id', async (req, res) => {
      const list = await resource.addOrUpdateItem('lists', req.body);
      res.status(200).send(list);
    })
    .delete('/list/:id', async (req, res) => {
      const { id } = req.params;
      await resource.deleteItem('lists', id);
      res.status(200).send();
    });

  // Links
  router
    .post('/links', async (req, res) => {
      const links = await resource.links(req.body);
      res.status(200).send(links);
    })
    .post('/link', async (req, res) => {
      const result = isSameSource(process.env.REACT_APP_URL, req.body.url)
        ? await resource.addOrUpdateItem('lists_lists', {
            source_id: req.body.list_id,
            target_id: req.body.url
              .match(/\/list\/([a-zA-Z0-9-])+/g)[0]
              .split('/')[2],
          })
        : await resource.addLink(req.body);
      res.status(200).send(result);
    })
    .delete('/link/:id', async (req, res) => {
      const { id } = req.params;
      await resource.deleteItem('links', id);
      res.status(200).send();
    });

  return router;
}
