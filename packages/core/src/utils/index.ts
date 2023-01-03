import { Link } from '../types/resource';

export function defaultParsedLinks(links: Link[]) {
  return links.reduce(
    (
      parsedItem,
      { id, image, title, url, created_at, list_id, description }
    ) => {
      parsedItem.push({
        image,
        title,
        url,
        created_at,
        list_id,
        description,
      });
      return parsedItem;
    },
    []
  );
}
