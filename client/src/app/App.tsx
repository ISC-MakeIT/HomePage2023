import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '../redux/store';
import { persistStore } from 'redux-persist';
import { RouterConfig } from '../routes';

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterConfig />
      </PersistGate>
    </Provider>
  );
}

export default App;
