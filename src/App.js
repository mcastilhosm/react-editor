import React from 'react';

import Routes from './routes';
import GlobalStyle from './styles/global';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Routes />
      <GlobalStyle />
    </Provider>
  );
}

export default App;
