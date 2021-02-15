import React from 'react';
import { Grid } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

const styles = {
	icon: {
		width: '50px',
		height: '50px',
		marginRight: '18px',
	},
};

const PageHeader = ({ mainTitle }) => {
	return (
		<Grid className="pageheader">
			<Grid className="pageheader-maintitle">
				<AssignmentIcon style={styles.icon} />
				<Grid>{mainTitle}</Grid>
			</Grid>
		</Grid>
	);
};

export default PageHeader;
