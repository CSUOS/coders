import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, TextField, Button, Box } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { LoginHeader } from '../UI';

const LoginView = () => {
	return (
		<Grid className="login">
			<LoginHeader />
			<Box
				borderColor="primary.main"
				borderRadius="5%"
				className="login-box"
			>
				<Grid container direction="row" className="login-container">
					<Grid className="login-text">로그인</Grid>
					<Grid container className="login-field">
						<AccountCircle />
						<TextField label="아이디" />
					</Grid>
					<Grid container className="login-field">
						<LockIcon />
						<TextField label="비밀번호" />
					</Grid>
					<Grid>
						<Link to="/">
							<Button
								variant="outlined"
								color="primary"
								className="login-btn"
							>
								로그인
							</Button>
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Grid>
	);
};

export default LoginView;
