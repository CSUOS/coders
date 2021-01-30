import React from 'react';
import {
	Grid,
	Paper,
	MenuList,
	MenuItem,
	ListItemIcon,
} from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CreateIcon from '@material-ui/icons/Create';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import StarIcon from '@material-ui/icons/Star';

const UserMenu = () => {
	return (
		<Paper className="user-menu">
			<MenuList className="menu-list">
				<MenuItem className="menu-item">
					<ListItemIcon className="menu-icon">
						<StarIcon fontSize="big" />
					</ListItemIcon>
					즐겨찾기
				</MenuItem>
				<MenuItem className="menu-item">
					<ListItemIcon className="menu-icon">
						<DoneOutlineIcon fontSize="big" />
					</ListItemIcon>
					제출 문제
				</MenuItem>
				<MenuItem className="menu-item">
					<ListItemIcon className="menu-icon">
						<QuestionAnswerIcon fontSize="big" />
					</ListItemIcon>
					작성 질문
				</MenuItem>
				<MenuItem className="menu-item">
					<ListItemIcon className="menu-icon">
						<CreateIcon fontSize="big" />
					</ListItemIcon>
					출제 문제
				</MenuItem>
			</MenuList>
		</Paper>
	);
};

export default UserMenu;
