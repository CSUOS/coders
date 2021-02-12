import React from 'react';
import { Paper, InputBase } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = ({ label }) => {
	return (
		<Paper component="form" className="searchbar">
			<IconButton className="icon-btn">
				<MenuIcon />
			</IconButton>
			<InputBase className="input" placeholder={label} />
			<IconButton type="submit" className="submit">
				<SearchIcon />
			</IconButton>
		</Paper>
	);
};

export default SearchBar;
