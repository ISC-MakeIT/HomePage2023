import '@src/styles/reset.css';
import '@src/styles/base.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '@src/redux/store';
import { persistStore } from 'redux-persist';
import { AlertProvider } from '@src/app/providers/AlertProvider';
import { ProcessingLineProvider } from '@src/app/providers/ProcessingLineProvider';
import type { AppProps } from 'next/app';

const persistor = persistStore(store);

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider>
          <ProcessingLineProvider>
            <Component {...pageProps} />
          </ProcessingLineProvider>
        </AlertProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
