import React from 'react';
import { Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';
import { Header } from '../UI';
import { Home, User, Problem, Login } from '.';

const MainView = () => {
	const userName = '사용자';

	return (
		<>
			<Header userName={userName} />
			<Grid>
				<Route exact path="/" component={Home} />
				<Route exact path="/user" component={User} />
				<Route exact path="/problem" component={Problem} />
				<Route exact path="/login" component={Login} />
			</Grid>
		</>
	);
};

export default MainView;
