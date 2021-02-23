import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { UserInputBox } from '..';

const UserEdit = ({ users }) => {
	const readOnly = true;

	return (
		<Grid container direction="column" className="user-container">
			<Grid container className="user-edit">
				<Grid container dirction="row" className="edit-subtitle">
					<PersonPinIcon
						className="subtitle-icon"
						style={{ fontSize: '28px' }}
					/>
					<Grid className="subtitle-title">정보 수정</Grid>
				</Grid>
				<UserInputBox
					title="아이디"
					size="1"
					readOnly={readOnly}
					value="아이디"
				/>
				<UserInputBox title="이름" size="1" value={users.name} />
				<UserInputBox
					title="상태 메세지"
					size="5"
					value={users.intro}
				/>
				<UserInputBox title="비밀번호" size="2" password="password" />
			</Grid>
			<Grid container className="edit-btn">
				<Link to="/user">
					<Button variant="contained" color="primary">
						수정
					</Button>
				</Link>
			</Grid>
		</Grid>
	);
};

export default UserEdit;
