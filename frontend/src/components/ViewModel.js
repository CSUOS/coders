import React from 'react';

import { Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';

import { Home, Login, User, Problem, Question, Rangking, Submit } from './View';
import { Header } from './UI';

import { useProblemDataContext, useProblemDispatchContext } from './Model';

const ViewModel = () => {
	const userName = '사용자';

	const problems = useProblemDataContext();
	const setProblem = useProblemDispatchContext();

	return (
		<>
			<Header userName={userName} />
			<Grid>
				<Route
					exact
					path="/"
					render={() => <Home problems={problems} />}
				/>
				<Route exact path="/login" component={Login} />
				<Route exact path="/user" component={User} />
				<Route path="/problem" component={Problem} />
				<Route path="/question" component={Question} />
				<Route path="/submit" component={Submit} />
				<Route path="/ranking" component={Rangking} />
			</Grid>
		</>
	);
};

export default ViewModel;
