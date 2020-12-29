import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { Login, Main } from './components/View';
import './scss/main.scss';

function App() {
	return (
		<Grid className="app">
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route path="/" component={Main} />
			</Switch>
		</Grid>
	);
}

export default App;
