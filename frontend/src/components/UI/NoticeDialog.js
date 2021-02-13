import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

/*
 페이지 벗어남 방지 LeavingGuard를 사용할 때만 onCancel, onConfirm 메서드가 필요합니다.
 visible(bool): Dialog 띄움 여부, title: 알림창 제목, info: 내용
 path: 확인 클릭 후 이동할 경로
*/
const NoticeDialog = ({ visible, title, info, path, onCancel, onConfirm }) => {
	const confirm = () => {
		onCancel();
		onConfirm();
	};
	return (
		<div>
			<Grid>
				<Dialog open={visible}>
					<DialogTitle>{title}</DialogTitle>
					<DialogContent>
						<DialogContentText>{info}</DialogContentText>
					</DialogContent>
					<DialogActions>
						{onConfirm ? (
							<div>
								<Button
									color="primary"
									onClick={() => onCancel()}
								>
									취소
								</Button>
								{path ? (
									<Link to={path}>
										<Button
											variant="contained"
											color="secondary"
											onClick={confirm}
										>
											확인
										</Button>
									</Link>
								) : (
									<Button
										variant="contained"
										color="secondary"
										onClick={confirm}
									>
										확인
									</Button>
								)}
							</div>
						) : (
							<div>
								<Button color="primary">취소</Button>
								<Link to={path}>
									<Button
										variant="contained"
										color="secondary"
									>
										확인
									</Button>
								</Link>
							</div>
						)}
					</DialogActions>
				</Dialog>
			</Grid>
		</div>
	);
};
export default NoticeDialog;
