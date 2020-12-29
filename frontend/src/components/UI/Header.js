import React from 'react';
import { Link } from 'react-router-dom';
import {
	LocalLibraryRoundedIcon,
	AccountCircleIcon,
	ExitToAppIcon,
} from '@material-ui/icons';
import { Grid, Button } from '@material-ui/core';

const Header = ({ userName }) => {
	return (
		<Grid className="header">
			<Link to="/">
				<Button startIcon={<LocalLibraryRoundedIcon />}>Coders</Button>
			</Link>
			<Grid className="header-buttons">
				<Grid>
					{userName}
					님, 환영합니다!
				</Grid>
				<Link to="/user">
					<Button startIcon={<AccountCircleIcon />}>회원정보</Button>
				</Link>
				<Link to="/login">
					<Button startIcon={<ExitToAppIcon />}>로그아웃</Button>
				</Link>
			</Grid>
		</Grid>
	);
};

export default Header;
