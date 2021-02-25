import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, MenuList, MenuItem, ListItemIcon } from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CreateIconOutlinedIcon from '@material-ui/icons/CreateOutlined';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import StarIcon from '@material-ui/icons/Star';
import PersonPinIcon from '@material-ui/icons/PersonPin';

const UserMenu = () => {
	return (
		<Paper className="user-menu">
			<MenuList className="menu-list">
				<Link to="/user">
					<MenuItem className="menu-item">
						<ListItemIcon className="menu-icon">
							<StarIcon fontSize="big" />
						</ListItemIcon>
						즐겨찾기
					</MenuItem>
				</Link>
				<Link to="/user/problem">
					<MenuItem className="menu-item">
						<ListItemIcon className="menu-icon">
							<DoneOutlineIcon fontSize="big" />
						</ListItemIcon>
						제출 문제
					</MenuItem>
				</Link>
				<Link to="/user/question">
					<MenuItem className="menu-item">
						<ListItemIcon className="menu-icon">
							<QuestionAnswerIcon fontSize="big" />
						</ListItemIcon>
						작성 질문
					</MenuItem>
				</Link>
				<Link to="/user/submit">
					<MenuItem className="menu-item">
						<ListItemIcon className="menu-icon">
							<CreateIconOutlinedIcon fontSize="big" />
						</ListItemIcon>
						출제 문제
					</MenuItem>
				</Link>
				<Link to="/user/edit">
					<MenuItem className="menu-item">
						<ListItemIcon className="menu-icon">
							<PersonPinIcon fontSize="big" />
						</ListItemIcon>
						정보 수정
					</MenuItem>
				</Link>
			</MenuList>
		</Paper>
	);
};

export default UserMenu;
