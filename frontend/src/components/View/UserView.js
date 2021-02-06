import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import AssistantPhotoOutlinedIcon from '@material-ui/icons/AssistantPhotoOutlined';
import {
	PageHeader,
	UserMenu,
	UserBookmark,
	UserEdit,
	UserProblem,
	UserSubmit,
} from '../UI';

const mainTitle = '회원 정보';

const UserView = ({ users, problems }) => {
	return (
		<Grid className="user">
			<PageHeader mainTitle={mainTitle} />
			{window.location.pathname === '/user/edit' ? (
				<UserEdit users={users} />
			) : (
				<Grid container direction="column" className="user-container">
					<Grid container className="user-info">
						<Grid
							container
							direction="row"
							className="profile-info"
						>
							<Grid className="user-name">{users[0].name}님</Grid>
							<Grid className="user-icon">
								<AssistantPhotoOutlinedIcon />
							</Grid>
							<Grid className="user-rank">
								랭킹: {users[0].rank}위
							</Grid>
						</Grid>
						<Grid className="user-intro">
							<Grid>{users[0].intro}</Grid>
						</Grid>
					</Grid>
					<Grid container direction="row" className="user-context">
						<Grid className="user-menu">
							<UserMenu />
						</Grid>
						<Route
							exact
							path="/user"
							render={() => <UserBookmark problems={problems} />}
						/>
						<Route
							exact
							path="/user/problem"
							render={() => <UserProblem problems={problems} />}
						/>
						<Route
							exact
							path="/user/submit"
							render={() => <UserSubmit problems={problems} />}
						/>
					</Grid>
				</Grid>
			)}
		</Grid>
	);
};

export default UserView;
