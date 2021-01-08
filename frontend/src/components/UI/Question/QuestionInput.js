import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, TextField } from '@material-ui/core';
import { InputBox, InputDropDown } from '..';

const QuestionInput = () => {
	return (
		<Grid container className="question-input" direction="column">
			<InputBox title="제목" size="10" />
			<InputDropDown title="분류 " size="2" />
			<InputBox title="문제 번호 " size="1" />

			<TextField
				rows={15}
				className="question-text"
				multiline
				variant="outlined"
			/>
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
