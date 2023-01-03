import { Dashboard, Tags, Table, Head } from '@ml/core';

const rows = [
  {
    name: '제목1',
    url: 'https://www.lainyzine.com/ko/article/docker-rm-removing-docker-containers/',
    createdAt: '1h ago',
    from: null,
    description: '이것은 제목1의 제목입니다',
  },
  {
    name: '제목2',
    url: 'https://url-2',
    createdAt: '1/12/2020',
    from: 10,
    description: '이것은 제목2의 제목입니다',
  },
  {
    name: '제목3',
    url: 'https://github.com/docker/compose/issues/4950',
    createdAt: '11/4/2022',
    from: null,
    description: '이것은 제목3의 제목입니다',
  },
];

function List() {
  return (
    <Dashboard>
      <Tags />
      <Table rows={rows}>
        <Head name='index'>#</Head>
        <Head name='image'>이미지</Head>
        <Head name='title'>제목</Head>
        <Head name='url'>URL</Head>
        <Head name='created_at'>추가일</Head>
        <Head name='list_id'>소속</Head>
        <Head name='description'>설명</Head>
        <Head name='actions'>액션</Head>
      </Table>
    </Dashboard>
  );
}

export default List;
