import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { EditorBox } from '..';

const ProblemInput = ({ language, initValue }) => {
	const styles = { width: '100%', height: '90%' };
	// 제출하려는 값 관리
	const [submitValue, setSubmitValue] = useState(initValue);
	// input 언어 설정
	let lang = 'c_cpp';
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
		setSubmitValue(e);
	};
	// put 요청하는 제출 부분
	const onSubmit = () => {
		console.log(submitValue);
		console.log(lang);
	};

	return (
		<Grid
			container
			className="problem-input-container"
			direction="column"
			xs={6}
		>
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
				<Button variant="contained" color="primary" onClick={onSubmit}>
					제출
				</Button>
			</Grid>
		</Grid>
	);
};

export default ProblemInput;
