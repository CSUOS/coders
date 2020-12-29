import React from 'react';
import { Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';
import { Header } from '../UI';
import { Home, User, Problem } from '.';

const MainView = () => {
	return (
		<Grid className="main">
			<Header />
			<Grid className="page">
				<Route exact path="/" component={Home} />
				<Route exact path="/user" component={User} />
				<Route exact path="/problem" component={Problem} />
			</Grid>
		</Grid>
	);
};

export default MainView;
