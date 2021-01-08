import React from 'react';
import { Grid } from '@material-ui/core';
import { Dropdown } from '..';

const QuestionInputBox = ({ title, size }) => {
	const label = '분류';
	const value = ['질문', '자유', '공지'];
	return (
		<Grid direction="row" className="input-box">
			<Grid className="title">{title}</Grid>
			<Grid container className="input-drop">
				<Dropdown label={label} values={value} />
			</Grid>
		</Grid>
	);
};

export default QuestionInputBox;
