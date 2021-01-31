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
	useCommentsContext,
	useCommentsDispatchContext,
	useSubmissionsContext,
	useSubmissionsDispatchContext,
	useMySubmissionsContext,
	useMySubmissionsDispatchContext,
	useProblemSubmitContext,
	useProblemDispatchSubmitContext,
} from './Model';

const ViewModel = () => {
	const [hasMenu, setHasMenu] = useState(false);
	const userName = '사용자';

	const problems = useProblemDataContext();
	const setProblem = useProblemDispatchContext();

	const problemInfo = usePInfoContext();
	const setProblemInfo = usePInfoDispatchContext();
	const handleProblemInfo = (id) => {
		setProblemInfo();
	};
	const comments = useCommentsContext();
	const setComments = useCommentsDispatchContext();
	const handleComments = (id) => {
		setComments();
	};
	const submissions = useSubmissionsContext();
	const setSubmissions = useSubmissionsDispatchContext();
	const handleSubmissions = (id) => {
		setSubmissions();
	};
	const mySubmissions = useMySubmissionsContext();
	const setMySubmissions = useMySubmissionsDispatchContext();
	const handleMySubmissions = (id) => {
		setMySubmissions();
	};

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
				<Route exact path="/user" component={User} />
				<Route
					path="/problem"
					render={() => (
						<Problem
							problemInfo={problemInfo}
							setProblemInfo={setProblemInfo}
							comments={comments}
							setComments={setComments}
							submissions={submissions}
							setSubmissions={setSubmissions}
							mySubmissions={mySubmissions}
							setMySubmissions={setMySubmissions}
						/>
					)}
				/>
				<Route path="/question" component={Question} />
				<Route path="/submit" component={Submit} />
				<Route path="/ranking" component={Rangking} />
			</Grid>
		</>
	);
};

export default ViewModel;
