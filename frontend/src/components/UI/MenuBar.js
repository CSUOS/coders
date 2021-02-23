import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const MenuBar = () => {
	const menus = [
		['질문 게시판', '/question'],
		['문제 출제하기', '/submit'],
		['회원 랭킹', '/ranking'],
	];
	const location = useLocation();
	const checkUrl =
		location.pathname.indexOf('login') !== -1 ||
		location.pathname.indexOf('problem') !== -1;

	return (
		<>
			{checkUrl ? undefined : (
				<Grid className="menubar">
					{menus.map((menu) => (
						<Grid className="menubar-menu">
							<Link to={menu[1]}>{menu[0]}</Link>
						</Grid>
					))}
				</Grid>
			)}
		</>
	);
};

export default MenuBar;
