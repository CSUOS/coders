import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';

import { Home, Login, User, Problem, Question, Rangking, Submit } from './View';
import { Header, MenuBar } from './UI';
import data from '../data.json';
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
	useProblemCodeContext,
	useProblemCodeDispatchContext,
	useUserDataContext,
	useUserDispatchContext,
} from './Model';

const ViewModel = () => {
	const userName = '사용자';

	const problems = useProblemDataContext();
	const setProblem = useProblemDispatchContext();

	const problemInfo = usePInfoContext();
	const setProblemInfo = usePInfoDispatchContext();
	const handleProblemInfo = (id) => {
		setProblemInfo(data.problem_info[id - 1].desc); // get요청으로 바꿀 예정
	};

	const comments = useCommentsContext();
	const setComments = useCommentsDispatchContext();
	const handleComments = (id) => {
		setComments(data.P_Comment);
	};

	const submissions = useSubmissionsContext();
	const setSubmissions = useSubmissionsDispatchContext();
	const handleSubmissions = (id) => {
		setSubmissions(data.submit_log);
	};

	const mySubmissions = useMySubmissionsContext();
	const setMySubmissions = useMySubmissionsDispatchContext();
	const handleMySubmissions = (id) => {
		setMySubmissions(data.mySubmit_log);
	};

	const problemCode = useProblemCodeContext();
	const setProblemCode = useProblemCodeDispatchContext();
	const handleProblemCode = (id, lang, text) => {
		setProblemCode(text);
		console.log('id :', id, ', language : ', lang, ',code : ', text);
	};

	const users = useUserDataContext();
	const setUserInfo = useUserDispatchContext();

	return (
		<>
			<Header userName={userName} />
			<Grid>
				<MenuBar />
				<Route
					exact
					path="/"
					render={() => {
						return <Home problems={problems} />;
					}}
				/>
				<Route exact path="/login" component={Login} />
				<Route
					path="/user"
					render={() => <User users={users} problems={problems} />}
				/>
				<Route
					path="/problem/:id"
					render={() => (
						<Problem
							problemInfo={problemInfo}
							handleProblemInfo={handleProblemInfo}
							comments={comments}
							handleComments={handleComments}
							submissions={submissions}
							handleSubmissions={handleSubmissions}
							mySubmissions={mySubmissions}
							handleMySubmissions={handleMySubmissions}
							problemCode={problemCode}
							handleProblemCode={handleProblemCode}
						/>
					)}
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
