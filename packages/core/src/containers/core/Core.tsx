import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataContextProvider, DataManager } from '../../api';

interface Props {
  dataManager: DataManager;
  Homepage?: React.ElementType;
  children?: React.ReactNode;
}

const Core: React.FC<Props> = ({
  dataManager,
  Homepage = () => <>Homepage</>,
  children,
}) => {
  const queryClient = new QueryClient();

  return (
    <DataContextProvider dataManager={dataManager}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={children} />
            <Route index element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DataContextProvider>
  );
};

export default Core;
