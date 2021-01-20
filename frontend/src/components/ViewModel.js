import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';

import { Home, Login, User, Problem, Question, Rangking, Submit } from './View';
import { Header, MenuBar } from './UI';

import { useProblemDataContext, useProblemDispatchContext } from './Model';

const ViewModel = () => {
	const [hasMenu, setHasMenu] = useState(false);
	const userName = '사용자';

	const problems = useProblemDataContext();
	const setProblem = useProblemDispatchContext();

	return (
		<>
			<Header userName={userName} />
			<Grid>
				{hasMenu && <MenuBar />}
				<Route
					exact
					path="/"
					render={() => {
						setHasMenu(true);
						return <Home problems={problems} />;
					}}
				/>
				<Route exact path="/login" component={Login} />
				<Route path="/problem" component={Problem} />
				<Route exact path="/user" component={User} />
				<Route path="/question" component={Question} />
				<Route path="/submit" component={Submit} />
				<Route path="/ranking" component={Rangking} />
			</Grid>
		</>
	);
};

export default ViewModel;
