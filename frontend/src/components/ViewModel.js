import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';
import axios from 'axios';
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
	useProblemResultContext,
	useProblemResultDispatchContext,
} from './Model';
import GetToken from '../function/GetToken';

const ViewModel = () => {
	const [user, setUser] = useState(null);
	const cookies = GetToken();
	useEffect(() => {
		setUser(cookies);
		console.log('log', cookies);
	}, []);

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
					// setComments(undefined);
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
					// setComments(undefined);
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
					// setComments(undefined);
				}
				break;

			default:
				break;
		}
	};

	const submissions = useSubmissionsContext();
	const setSubmissions = useSubmissionsDispatchContext();
	// 특정 문제의 모든 정답기록 가져오기
	const handleSubmissions = async (props) => {
		const { problemId, language, memberId } = props;
		let url = `/api/v1/submissions?result=AC&problemId=${problemId}`;
		if (language !== undefined) {
			url = url.concat('&language=', language);
		}
		if (memberId !== undefined) {
			url = url.concat('&memberId=', memberId);
		}
		console.log(url);
		try {
			const info = await axios.get(url);
			console.log(info);
			setSubmissions(info.data);
		} catch (e) {
			console.log(e);
		}
	};

	const mySubmissions = useMySubmissionsContext();
	const setMySubmissions = useMySubmissionsDispatchContext();
	const handleMySubmissions = async (props) => {
		const { problemId, memberId } = props;
		const url = `/api/v1/submissions?memberId=${memberId}&problemId=${problemId}`;
		try {
			const info = await axios.get(url);
			setMySubmissions(info.data);
		} catch (e) {
			console.log(e);
		}
	};

	const problemResult = useProblemResultContext();
	const setProblemResult = useProblemResultDispatchContext();
	const handleProblemResult = async (props) => {
		const { language, source, memberId, meta, problemId } = props;

		try {
			// 제출 전 해당 문제의 정보 저장
			const { data } = await axios.get(`/api/v1/problems/${problemId}`);
			const postData = props;
			postData.timeLimit = data.timeLimit;
			postData.memoryLimit = data.memoryLimit;
			postData.shortCircuit = data.shortCircuit;

			// 문제 제출후 받아온 제출 번호를 통해 제출 상태 확인
			const { data: problem } = await axios.post(
				`/api/v1/submissions`,
				postData
			);
			// 해당 로직에서 달성률이 100이 되는동안 1초간격 반복하는 로직으로 바꿀 예정
			const result = await axios.get(`/api/v1/submissions/${problem.id}`);
			setProblemResult(result.data);
		} catch (e) {
			console.log(e);
		}

		// setProblemCode(text);
		// console.log('id :', id, ', language : ', lang, ',code : ', text);
	};

	return (
		<>
			<Header changedUser={user} />
			<Grid>
				<MenuBar />
				<Route
					exact
					path="/"
					render={() => {
						return <Home problems={problems} />;
					}}
				/>
				<Route exact path="/login" render={() => <Login />} />
				<Route
					path="/user"
					render={() => <User users={user} problems={problems} />}
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
							problemResult={problemResult}
							handleProblemResult={handleProblemResult}
						/>
					)}
				/>
				<Route path="/question" component={Question} />
				<Route path="/submit" render={() => <Submit user={user} />} />
				<Route path="/ranking" render={() => <Rangking />} />
			</Grid>
		</>
	);
};

export default ViewModel;
