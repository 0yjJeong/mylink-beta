import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useData } from '../../api';

interface TagsProps {}

const Tags: React.FC<TagsProps> = ({}) => {
  const resource = useData();
  const { id } = useParams();
  const { data, isFetching } = useQuery(`resource/sub-list/${id}`, () => {
    return resource.subLists(id);
  });

  if (isFetching) {
    return <>...</>;
  }

  return (
    <div>
      {data.data.map((list) => (
        <div key={list.id}>{list.title}</div>
      ))}
    </div>
  );
};

export default Tags;
