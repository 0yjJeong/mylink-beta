export type List = {
  id: string;
  title: string;
  created_at: string;
};

export type Link = {
  id: string;
  list_id: string;
  url: string;
  title: string;
  image: string;
  description: string;
  created_at: string;
};
