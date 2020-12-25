import React from 'react'
import { Link } from 'react-router-dom'
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Grid, Button, Box, Typography, Input } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "0% 0%",
		padding: "0 5px",
		borderBottom: "1.8px solid #9E9B9A"
	},
	link: {
		textDecoration: 'none',
		padding: 0
	},
	buttons: {
		fontSize: 18,
	}
}));

const Header = () => {
	const classes = useStyles();

	return (
		<Grid container direction="row" justify="space-between" alignItems="center" className={classes.root}>
			<Link to="/" className={classes.link}>
				<Button startIcon={<LocalLibraryRoundedIcon style={{ width: 40, height: 40 }} />} style={{ fontSize: "24px", fontWeight: "bold" }}>Coders</Button>
			</Link>
			<Box display="flex" justifyContent="flex-end" alignItems="center">
				<Typography style={{ fontSize: 18, display: 'inline-block', padding: '0px 8px' }}>
					사용자 님, 환영합니다!
				</Typography>
				<Link to="/user" className={classes.link}>
					<Button startIcon={<AccountCircleIcon />}
						className={classes.buttons}>회원 정보</Button>
				</Link>
				<Button startIcon={<ExitToAppIcon />}
					className={classes.buttons}>로그아웃</Button>
			</Box>
		</Grid>
	)
}

export default Header
