import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '../redux/store';
import { persistStore } from 'redux-persist';
import { RouterConfig } from '../routes';
import { HelmetProvider } from 'react-helmet-async';
import { AlertProvider } from './providers/AlertProvider';
import { ProcessingLineProvider } from './providers/ProcessingLineProvider';

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <PersistGate loading={null} persistor={persistor}>
          <AlertProvider>
            <ProcessingLineProvider>
              <RouterConfig />
            </ProcessingLineProvider>
          </AlertProvider>
        </PersistGate>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
