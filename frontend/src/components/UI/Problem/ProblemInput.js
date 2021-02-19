import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { EditorBox, NoticeDialog, LeavingGuard } from '..';
import GetToken from '../../../function/GetToken';

const ProblemInput = ({ language, initValue, handleProblemResult }) => {
	const { id: problemId } = useParams();
	const { id: memberId } = GetToken();
	const styles = { width: '100%', height: '90%' };
	// 제출하려는 코드 관리
	const [currentCode, setCurrentCode] = useState(initValue);
	const [notice, setNotice] = useState(false);
	const [guard, setGuard] = useState(true);
	const history = useHistory();
	const samePage = [
		`/problem/${problemId}`,
		`/problem/${problemId}/rank`,
		`/problem/${problemId}/score`,
		`/login`,
	];
	const showNotice = () => {
		setNotice(!notice);
	};
	// input 언어 설정
	let lang = 'C11';
	switch (language) {
		case 'C11':
			lang = 'C11';
			break;
		case 'Java8':
			lang = 'Java8';
			break;
		case 'Python3':
			lang = 'PY3';
			break;
		case 'C++20':
			lang = 'CPP20';
			break;
		default:
			break;
	}
	const setText = (e) => {
		setCurrentCode(e);
	};
	// post 요청하는 제출 후 get 을 통해 상태 갱신
	const onSubmit = () => {
		handleProblemResult({
			problemId: Number(problemId),
			language: lang,
			source: currentCode,
			meta: 'metaData', // 변경 예정
			memberId,
		});
	};

	const checkPage = (location) => {
		return samePage.indexOf(location.pathname) > -1;
	};
	return (
		<Grid
			container
			className="problem-input-container"
			direction="column"
			xs={6}
		>
			{!notice && guard ? (
				<LeavingGuard
					when={guard}
					navigate={(p) => {
						history.push(p);
					}}
					shouldBlockNavigation={(location) => {
						console.log('log', location);
						if (guard && !checkPage(location)) {
							return true;
						}
						return false;
					}}
				/>
			) : null}
			<EditorBox
				className="problem-input-code"
				styles={styles}
				lang={lang}
				handleChange={setText}
				initValue={initValue}
			/>

			<Grid container direction="row" className="problem-input-btns">
				<Button className="problem-input-btn" variant="contained">
					예제 실행
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={() => {
						showNotice();
					}}
				>
					{notice ? (
						<NoticeDialog
							visible={notice}
							title="제출 확인"
							info="문제를 제출하시겠습니까?"
							path={`/problem/${problemId}/score`}
							onConfirm={onSubmit}
							onCancel={showNotice}
						/>
					) : null}
					제출
				</Button>
			</Grid>
		</Grid>
	);
};

export default ProblemInput;
