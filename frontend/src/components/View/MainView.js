import React from 'react';
import { Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';
import { Header } from '../UI';
import { Home, User, Problem } from '.';

const MainView = () => {
	const userName = '사용자';

	return (
		<>
			<Header userName={userName} />
			<Grid>
				<Route exact path="/" component={Home} />
				<Route exact path="/user" component={User} />
				<Route path="/problem" component={Problem} />
			</Grid>
		</>
	);
};

export default MainView;
