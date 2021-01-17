import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { EditorBox } from '..';

const ProblemInput = ({ language }) => {
	// input 언어 설정
	const styles = { width: '100%', height: '90%' };
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
			/>

			<Grid container direction="row">
				<Button className="problem-input-btn" variant="contained">
					예제 실행
				</Button>
				<Button variant="contained" color="primary">
					제출
				</Button>
			</Grid>
		</Grid>
	);
};

export default ProblemInput;
