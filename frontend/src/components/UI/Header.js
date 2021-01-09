import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styles = {
	logoButton: {
		width: 40,
		height: 40,
	},
};

const Header = ({ userName, authorized = true }) => {
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
			{authorized && (
				<Grid className="header-buttons">
					<Grid>
						{userName}
						님, 환영합니다!
					</Grid>
					<Link to="/user">
						<Button startIcon={<AccountCircleIcon />}>
							회원 정보
						</Button>
					</Link>
					<Link to="/login">
						<Button startIcon={<ExitToAppIcon />}>로그아웃</Button>
					</Link>
				</Grid>
			)}
		</Grid>
	);
};

export default Header;
