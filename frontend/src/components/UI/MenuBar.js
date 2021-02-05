import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const MenuBar = () => {
	const menus = [
		['질문 게시판', '/question'],
		['문제 출제하기', '/submit'],
		['회원 랭킹', '/ranking'],
	];
	const checkUrl =
		window.location.href.indexOf('login') !== -1 ||
		window.location.href.indexOf('problem') !== -1;
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
