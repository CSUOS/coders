import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const ProblemView = () => {
	return (
		<Grid className="problem">
			<Grid className="problem-menu">
				<Button>문제 설명</Button>
				<Button>맞은 사람</Button>
				<Button>채점 현황</Button>
			</Grid>
		</Grid>
	);
};

export default ProblemView;
