import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const ProblemInfo = ({ title, problemInfo, inputType, outputType }) => {
	return (
		<Grid>
			<h1>{title}</h1>
			{problemInfo}
			<h2>입력 형식</h2>
			{inputType}
			<h2>출력 형식</h2>
			{outputType}
		</Grid>
	);
};

export default ProblemInfo;
