import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '../redux/store';
import { persistStore } from 'redux-persist';
import { AlertProvider } from '@app/providers/AlertProvider';
import { ProcessingLineProvider } from '@app/providers/ProcessingLineProvider';
import '../styles/reset.css';
import '../styles/base.css';

const persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
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
