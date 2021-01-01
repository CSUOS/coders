import React, { useState } from 'react';
import {
	Grid,
	Button,
	IconButton,
	NativeSelect,
	FormControl,
} from '@material-ui/core';
import { Route, Link } from 'react-router-dom';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { ProblemInfo, ProblemInput, ProblemRank, ProblemScore } from '../UI';

const ProblemView = ({ match }) => {
	const [menuIdx, setMenuIdx] = useState(0);
	const [star, setStar] = useState(false);
	const [like, setLike] = useState(false);
	const clickMenu = (index) => {};
	const clickStar = () => {
		setStar(!star);
	};
	const clickLike = () => {
		setLike(!like);
	};

	return (
		<Grid className="problem">
			<Grid container direction="row" className="problem-container">
				<Grid className="problem-menu">
					<Link to={`${match.path}`}>
						<Button>문제 설명</Button>
					</Link>
					<Link to={`${match.path}/rank`}>
						<Button>맞은 사람</Button>
					</Link>
					<Link to={`${match.path}/score`}>
						<Button>채점 현황</Button>
					</Link>
					<IconButton
						onClick={clickLike}
						className="toggle toggleThumb"
					>
						{like ? <ThumbUp /> : <ThumbUpAltOutlinedIcon />}
					</IconButton>
					<IconButton onClick={clickStar} className="toggle">
						{star ? <Star /> : <StarBorderIcon />}
					</IconButton>
				</Grid>
				<Grid className="problem-menu">
					<FormControl className="select">
						<NativeSelect defaultValue="C++">
							<option value="C++">C++</option>
							<option value="Java">Java</option>
							<option value="Python">Python</option>
						</NativeSelect>
					</FormControl>
				</Grid>
				<Grid container className="problem-info" xs={6}>
					<Route
						exact
						path={`${match.path}`}
						component={ProblemInfo}
					/>
					<Route
						exact
						path={`${match.path}/Rank`}
						component={ProblemRank}
					/>
					<Route
						exact
						path={`${match.path}/score`}
						component={ProblemScore}
					/>
				</Grid>
				<ProblemInput />
			</Grid>
		</Grid>
	);
};

export default ProblemView;
