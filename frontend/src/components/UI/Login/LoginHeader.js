import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';

const styles = {
	logoButton: {
		width: 40,
		height: 40,
	},
};

const LoginHeader = () => {
	return (
		<Grid className="header">
			<Link to="/">
				<Button
					startIcon={
						<LocalLibraryRoundedIcon style={styles.logoButton} />
					}
				>
					Coders
				</Button>
			</Link>
		</Grid>
	);
};

export default LoginHeader;
