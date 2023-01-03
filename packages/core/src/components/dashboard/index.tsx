import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useData } from '../../api';

import Tags from './Tags';

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const resource = useData();
  const { id } = useParams();
  const { data, isFetching } = useQuery(`resource/list/${id}`, () => {
    return resource.list(id);
  });

  if (isFetching) {
    return null;
  }

  // const childrenWithProps = React.Children.map(children, (child, key) => {
  //   if (React.isValidElement(child)) {
  //     return React.cloneElement(child, {
  //       key,
  //     });
  //   }
  // });

  return (
    <div className='h-screen flex flex-col'>
      <nav>
        <p>{data?.data.title}</p>
      </nav>
      {children}
      <footer>바닦</footer>
    </div>
  );
};

export { Tags };
export default Dashboard;
