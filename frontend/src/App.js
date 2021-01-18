import React from 'react';

import { Grid } from '@material-ui/core';

import Provider from './components/Provider';

import './scss/main.scss';

function App() {
	return (
		<Grid className="app">
			<Provider />
		</Grid>
	);
}

export default App;
