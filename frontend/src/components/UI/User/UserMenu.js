import React from 'react';
import { Grid, MenuList, MenuItem, ListItemIcon } from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CreateIcon from '@material-ui/icons/Create';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import StarIcon from '@material-ui/icons/Star';

const UserMenu = () => {
	return (
		<Grid className="user-menu">
			<MenuList>
				<MenuItem>
					<ListItemIcon>
						<StarIcon fontSize="small" />
					</ListItemIcon>
					즐겨찾기
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<DoneOutlineIcon fontSize="small" />
					</ListItemIcon>
					제출 문제
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<QuestionAnswerIcon fontSize="small" />
					</ListItemIcon>
					작성 질문
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<CreateIcon fontSize="small" />
					</ListItemIcon>
					출제 문제
				</MenuItem>
			</MenuList>
		</Grid>
	);
};

export default UserMenu;
