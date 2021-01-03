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
<<<<<<< HEAD
				<Route exact path="/problem" component={Problem} />
				<Route exact path="/login" component={Login} />
=======
				<Route path="/problem" component={Problem} />
>>>>>>> parent of f62b0bc... Fix conflicts
			</Grid>
		</>
	);
};

export default MainView;
