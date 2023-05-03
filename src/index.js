// scroll bar
// import 'simplebar/src/simplebar.css';
// import 'https://unpkg.com/scrollreveal';
// import 'https://kit.fontawesome.com/17655efe07.js';
// import 'https://unpkg.com/scrollreveal';
// import 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js'
		// integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
		// crossorigin="anonymous"></script>
// import 'my_public/particles.js';
// import 'my_public/app.js';
import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Web3ReactProvider } from '@web3-react/core';
import { SnackbarProvider } from 'notistack';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { SearchProvider } from './contexts/SearchContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import { store, persistor } from 'redux/store';
import { getLibrary } from 'utils/web3React';
import { ModalProvider } from 'redrum-pancake-uikit';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import LoadingScreen from './components/LoadingScreen';
//
import App from './App';
import { subscribePush } from './subscription';
import * as serviceWorker from './serviceWorker';

// ----------------------------------------------------------------------
ReactDOM.render(
  <StrictMode>
    <HelmetProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <ReduxProvider store={store}>
            <PersistGate loading={<LoadingScreen />} persistor={persistor}>
              <SettingsProvider>
                <CollapseDrawerProvider>
                  <SearchProvider>
                    <BrowserRouter>
                      <ModalProvider>
                        {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                          <App />
                        {/*</LocalizationProvider>*/}
                      </ModalProvider>
                    </BrowserRouter>
                  </SearchProvider>
                </CollapseDrawerProvider>
              </SettingsProvider>
            </PersistGate>
          </ReduxProvider>
        </SnackbarProvider>
      </Web3ReactProvider>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root')
);

// serviceWorker.register();

// subscribePush();

////