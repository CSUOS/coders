import React from 'react';
import { Grid } from '@material-ui/core';

const ProblemInfo = ({ title, problemInfo, inputType, outputType }) => {
	return (
		<Grid className="problem-info-container">
			<h1>{title}</h1>
			<b>{problemInfo}</b>
			<h1>입력 형식</h1>
			<b>{inputType}</b>
			<h1>출력 형식</h1>
			<b>{outputType}</b>
		</Grid>
	);
};

export default ProblemInfo;
