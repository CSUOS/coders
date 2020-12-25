import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Login, Main } from './components/View';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Noto Sans KR',
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/" component={Login} /> */}
          {/* <Route path="/home" component={Main} /> */}
          <Route path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
