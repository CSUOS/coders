import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NoticeDialog } from '.';

const styles = {
	logoButton: {
		width: 40,
		height: 40,
	},
};

const Header = ({ userName, authorized = true }) => {
	const [notice, setNotice] = useState(false);
	const showNotice = () => {
		setNotice(!notice);
	};
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
					<Button
						startIcon={<ExitToAppIcon />}
						onClick={() => {
							showNotice();
						}}
					>
						{notice ? (
							<NoticeDialog
								visible={notice}
								title="확인"
								info="로그아웃 하시겠습니까?"
								path="/login"
							/>
						) : null}
						로그아웃
					</Button>
				</Grid>
			)}
		</Grid>
	);
};

export default Header;
