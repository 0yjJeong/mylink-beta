import React from 'react';
import { Route, Routes } from 'react-router-dom';

interface Props {
  name: string;
  listElement: React.ElementType;
}

const Resource: React.FC<Props> = ({ name, listElement: List }) => {
  const basePath = `/${name}`;

  return (
    <Routes>{<Route path={`${basePath}/:id`} element={<List />} />}</Routes>
  );
};

export default Resource;
