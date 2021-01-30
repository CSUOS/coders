import React from 'react';
import { Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';
import { Header, MenuBar } from '../UI';
import { Home, User, Problem, Question, Rangking, Submit } from '.';

const MainView = () => {
	const userName = '사용자';

	return (
		<>
			<Header userName={userName} />
			<MenuBar />
			<Grid>
				<Route exact path="/" component={Home} />
				<Route path="/user" component={User} />
				<Route path="/problem" component={Problem} />
				<Route path="/question" component={Question} />
				<Route path="/submit" component={Submit} />
				<Route path="/ranking" component={Rangking} />
			</Grid>
		</>
	);
};

export default MainView;
