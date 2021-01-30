import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';

import { Home, Login, User, Problem, Question, Rangking, Submit } from './View';
import { Header, MenuBar } from './UI';

import {
	useProblemDataContext,
	useProblemDispatchContext,
	usePInfoContext,
	usePInfoDispatchContext,
	useUserDataContext,
	useUserDispatchContext,
} from './Model';

const ViewModel = () => {
	const [hasMenu, setHasMenu] = useState(false);
	const userName = '사용자';

	const problems = useProblemDataContext();
	const setProblem = useProblemDispatchContext();

	const pInfo = usePInfoContext();
	const setPInfo = usePInfoDispatchContext();

	const users = useUserDataContext();
	const setUserInfo = useUserDispatchContext();

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
				<Route
					path="/user"
					render={() => <User users={users} problems={problems} />}
				/>
				<Route
					path="/problem"
					render={() => <Problem pInfo={pInfo} />}
				/>
				<Route path="/question" component={Question} />
				<Route path="/submit" component={Submit} />
				<Route
					path="/ranking"
					render={() => <Rangking users={users} />}
				/>
			</Grid>
		</>
	);
};

export default ViewModel;
