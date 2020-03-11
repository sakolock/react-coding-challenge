import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/index';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Page from './components/Page/page';

const NewApp = require('./components/Page/page').default;

function renderApp(App) {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>,
    document.getElementById('root')
  );
}

renderApp(Page);

if (module.hot) {
  module.hot.accept('./components/Page/page', () => {
    renderApp(NewApp);
  });
}
