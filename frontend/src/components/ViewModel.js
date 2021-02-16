import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
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
	const handleProblemInfo = async (id) => {
		try {
			const info = await axios.get(`/api/v1/problems/${id}`);
			setProblemInfo(info.data.description);
		} catch (e) {
			setProblemInfo(null);
		}
	};

	const comments = useCommentsContext();
	const setComments = useCommentsDispatchContext();
	const handleComments = async (type, commentData) => {
		switch (type) {
			case 'get':
				try {
					const info = await axios.get(
						`/api/v1/pcomments/${commentData}`
					);
					setComments(info.data);
				} catch (e) {
					setComments(undefined);
				}
				break;
			case 'post':
				try {
					await axios.post(`/api/v1/pcomments`, commentData);
					const info = await axios.get(
						`/api/v1/pcomments/${commentData.problemId}`
					);
					setComments(info.data);
				} catch (e) {
					console.log(e);
					setComments(undefined);
				}
				break;
			case 'delete':
				try {
					await axios.delete(
						`/api/v1/pcomments/${commentData.commentId}`
					);
					const info = await axios.get(
						`/api/v1/pcomments/${commentData.problemId}`
					);
					setComments(info.data);
				} catch (e) {
					setComments(undefined);
				}
				break;
			case 'patch':
				try {
					await axios.patch(
						`/api/v1/pcomments/${commentData.commentId}`,
						commentData
					);
					const info = await axios.get(
						`/api/v1/pcomments/${commentData.problemId}`
					);
					setComments(info.data);
				} catch (e) {
					setComments(undefined);
				}
				break;

			default:
				break;
		}
	};

	const submissions = useSubmissionsContext();
	const setSubmissions = useSubmissionsDispatchContext();
	const handleSubmissions = (problemId, memberId, language) => {
		setSubmissions(data.submit_log);
	};

	const mySubmissions = useMySubmissionsContext();
	const setMySubmissions = useMySubmissionsDispatchContext();
	const handleMySubmissions = (problemId, memberId, language) => {
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
