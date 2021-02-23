import React, { useState } from 'react';
import {
	Grid,
	TextField,
	Button,
	Paper,
	Checkbox,
	FormControlLabel,
} from '@material-ui/core';
import axios from 'axios';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

const LoginView = () => {
	const [id, setId] = useState('');
	const [password, setPw] = useState('');
	const [checked, setChecked] = useState(true);
	const movePath = () => {
		window.location.replace('/');
	};
	const handleLogin = async () => {
		try {
			await axios
				.post(`/api/v1/members/login`, {
					id,
					password,
				})
				.then(() => {
					movePath();
				});
		} catch (e) {
			console.log('log', e);
			const { status } = e.response;
			if (status === 400) {
				alert('아이디 또는 비밀번호가 기입되었는지 확인해주세요.');
				console.log('log', id, password);
			} else if (status === 401) {
				alert('아이디 또는 비밀번호를 확인해주세요.');
			} else if (status === 500) {
				alert('내부 서버 오류입니다.');
			} else {
				alert('알 수 없는 오류입니다.');
			}
		}
	};
	const handleJoin = () => {
		// history.replace('rabums register 주소');
	};
	const changeId = (e) => {
		setId(e.target.value);
	};

	const changePw = (e) => {
		setPw(e.target.value);
	};

	const handleCheck = (e) => {
		setChecked(e.target.checked);
	};
	return (
		<Grid className="login">
			<Paper className="login-box">
				<Grid container direction="row" className="login-container">
					<Grid className="login-text">로그인</Grid>
					<Grid container className="login-field">
						<AccountCircle />
						<TextField label="아이디" onChange={changeId} />
					</Grid>
					<Grid container className="login-field">
						<LockIcon />
						<TextField
							label="비밀번호"
							type="password"
							onChange={changePw}
						/>
					</Grid>
					<Grid container className="login-check">
						<FormControlLabel
							control={
								<Checkbox
									checked={checked}
									onChange={handleCheck}
									color="secondary"
								/>
							}
							label="로그인 상태 유지"
						/>
					</Grid>
					<Grid container direction="column" className="login-btn">
						<Button
							variant="contained"
							color="primary"
							className="login-btn"
							onClick={() => {
								handleLogin();
							}}
						>
							로그인
						</Button>
						<Button
							variant="outlined"
							color="primary"
							className="login-btn"
							onClick={() => {
								handleJoin();
							}}
						>
							회원가입
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default LoginView;
