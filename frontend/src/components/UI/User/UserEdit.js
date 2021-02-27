import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import axios from 'axios';
import { UserInputBox, NoticeDialog } from '..';

const UserEdit = ({ users }) => {
	const readOnly = true;
	const [name, setName] = useState(users.name);
	const [intro, setIntro] = useState(users.intro);
	const [notice, setNotice] = useState(false);

	// 회원 정보 수정 함수
	const changeInfo = async () => {
		try {
			await axios
				.patch(`/api/v1/members/${users.id}`, {
					name,
					intro,
				})
				.then(() => {
					window.location.replace('/user');
					alert('회원 정보가 수정되었습니다.');
				});
		} catch (e) {
			console.log(e);
		}
	};

	// 쿠키 값을 삭제하기 위한 함수 > 로그아웃이 필요 없다면 바꿔보겠습니다
	const deleteInfo = async () => {
		try {
			await axios.post(`/api/v1/members/logout`).then(() => {
				window.location.replace('/');
				alert('회원 탈퇴 되었습니다.');
			});
		} catch (e) {
			console.log(e);
		}
	};

	/*
		회원 정보 삭제 함수 > DB에 회원 id가 없다면 오류
		수정 필요 > 회원 id가 외래키인 submissions, problem, p_comment가 존재한다면 오류 발생
	*/
	const deleteUser = async () => {
		try {
			await axios.delete(`/api/v1/members/${users.id}`).then(() => {
				deleteInfo();
			});
		} catch (e) {
			console.log(e);
			alert(
				'탈퇴 오류입니다. 로그인 상태를 확인하거나 다시 시도해주세요.'
			);
		}
	};

	// 회원 탈퇴 경고창 visible 여부 설정
	const showNotice = () => {
		setNotice(!notice);
	};

	// 회원 탈퇴 경고창 확인 버튼을 눌렀을 때 회원 정보 삭제
	const getConfirm = (e) => {
		if (e === true) {
			deleteUser();
		}
	};

	const getName = (e) => {
		setName(e);
	};

	const getIntro = (e) => {
		setIntro(e);
	};

	return (
		<Grid container direction="column" className="user-container">
			<Grid container className="user-edit">
				<Grid container dirction="row" className="edit-subtitle">
					<Grid className="subtitle-title">정보 수정</Grid>
				</Grid>
				<UserInputBox
					title="아이디"
					size="1"
					readOnly={readOnly}
					value={users.id}
				/>
				<UserInputBox
					title="이름"
					size="1"
					value={users.name}
					getInput={(e) => getName(e)}
				/>
				<UserInputBox
					title="상태 메세지"
					size="5"
					value={users.intro}
					getInput={(e) => getIntro(e)}
				/>
				<UserInputBox title="비밀번호" size="2" password="password" />
			</Grid>
			<Grid container className="edit-btn-container">
				<Button
					className="edit-btn"
					variant="contained"
					onClick={showNotice}
				>
					{notice ? (
						<NoticeDialog
							visible={notice}
							title="회원 탈퇴"
							info="모든 정보가 사라집니다. 정말 탈퇴 하시겠습니까?"
							path="/"
							getConfirm={(e) => getConfirm(e)}
						/>
					) : null}
					회원 탈퇴
				</Button>
				<Button
					className="edit-btn"
					variant="contained"
					color="secondary"
					onClick={changeInfo}
				>
					수정
				</Button>
			</Grid>
		</Grid>
	);
};

export default UserEdit;
