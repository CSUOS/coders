import React from 'react';
import { Grid } from '@material-ui/core';
import { Dropdown } from '..';

const QuestionInputBox = ({ title, value }) => {
	return (
		<Grid direction="row" className="input-box">
			<Grid className="title">{title}</Grid>
			<Grid container className="input-content">
				<Dropdown label={title} values={value} />
			</Grid>
		</Grid>
	);
};

export default QuestionInputBox;
