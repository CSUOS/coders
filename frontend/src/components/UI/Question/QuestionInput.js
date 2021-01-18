import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, TextField } from '@material-ui/core';
import { InputBox, InputDropDown, EditorBox } from '..';

const QuestionInput = () => {
	const values = ['질문', '자유', '공지'];
	const styles = { width: '100%', height: '400px' };
	const lang = 'c_cpp';
	return (
		<Grid container className="question-input" direction="column">
			<InputBox title="제목" size="10" />
			<InputDropDown title="분류 " value={values} />
			<InputBox title="문제 번호 " size="1" />

			<TextField
				rows={7}
				className="question-text"
				multiline
				variant="outlined"
			/>
			<Grid className="question-text">
				<EditorBox styles={styles} lang={lang} />
			</Grid>
			<Grid className="btn">
				<Link to="/question">
					<Button variant="outlined" color="primary">
						제출
					</Button>
				</Link>
			</Grid>
		</Grid>
	);
};

export default QuestionInput;
