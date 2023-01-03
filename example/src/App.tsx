import { Core, Resource, DataManager } from '@ml/core';
import List from './list';

function App() {
  const dataManager = new DataManager('/resource');
  return (
    <Core dataManager={dataManager}>
      <Resource name='list' listElement={List} />
    </Core>
  );
}

export default App;
