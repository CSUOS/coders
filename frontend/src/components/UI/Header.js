import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { NoticeDialog } from '.';

const styles = {
	logoButton: {
		width: 40,
		height: 40,
	},
};

const Header = ({ changedUser }) => {
	const [notice, setNotice] = useState(false);
	const [user, setUser] = useState(null);
	const showNotice = () => {
		setNotice(!notice);
	};
	useEffect(() => {
		setUser(changedUser);
	}, [changedUser]);

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

			{user !== null ? (
				<Grid className="header-buttons">
					<Grid>
						{user.name}
						님, 환영합니다!
					</Grid>
					<Link to="/user">
						<Button startIcon={<AccountCircleIcon />}>
							회원 정보
						</Button>
					</Link>
					<Button
						startIcon={<ExitToAppIcon />}
						onClick={() => {
							showNotice();
						}}
					>
						{notice && (
							<NoticeDialog
								visible={notice}
								title="확인"
								info="로그아웃 하시겠습니까?"
								path="/login"
								logout
							/>
						)}
						로그아웃
					</Button>
				</Grid>
			) : (
				<Grid className="header-buttons">
					<Link to="/login">
						<Button size="big" startIcon={<HowToRegIcon />}>
							로그인
						</Button>
					</Link>
				</Grid>
			)}
		</Grid>
	);
};

export default Header;
