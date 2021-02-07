import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { EditorBox, NoticeDialog, LeavingGuard } from '..';

const ProblemInput = ({ language, initValue, handleProblemCode }) => {
	const { id } = useParams();
	const styles = { width: '100%', height: '90%' };
	// 제출하려는 값 관리
	const [currentCode, setCurrentCode] = useState(initValue);
	// input 언어 설정
	let lang = 'c_cpp';
	const [notice, setNotice] = useState(false);
	const [guard, setGuard] = useState(true);
	const history = useHistory();
	const samePage = [
		`/problem/${id}`,
		`/problem/${id}/rank`,
		`/problem/${id}/score`,
		`/login`,
	];
	const showNotice = () => {
		setNotice(!notice);
	};
	switch (language) {
		case 'C++':
			lang = 'c_cpp';
			break;
		case 'Java':
			lang = 'java';
			break;
		case 'Python':
			lang = 'python';
			break;
		default:
			break;
	}
	const setText = (e) => {
		setCurrentCode(e);
	};
	// put 요청하는 제출 부분
	const onSubmit = () => {
		handleProblemCode(id, lang, currentCode);
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

			<Grid container direction="row">
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
							path={`/problem/${id}/score`}
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
