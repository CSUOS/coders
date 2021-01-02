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
	const [star, setStar] = useState(false);
	const [like, setLike] = useState(false);
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
						title="문제 좋아요"
						className="toggle toggleThumb"
					>
						{like ? <ThumbUp /> : <ThumbUpAltOutlinedIcon />}
					</IconButton>
					<IconButton
						onClick={clickStar}
						title="북마크 설정"
						className="toggle"
					>
						{star ? (
							<div>
								<Star style={{ fontSize: '1.8rem' }} />
							</div>
						) : (
							<div>
								<StarBorderIcon
									style={{ fontSize: '1.8rem' }}
								/>
							</div>
						)}
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
				<Grid container className="problem-info">
					<Route
						exact
						path={`${match.path}`}
						render={() => (
							<ProblemInfo
								title="카카오 블라인드 테스트"
								problemInfo="두 정수 a, b가 주어졌을 때, a+b를 출력하는 알고리즘을 작성하시오."
								inputType="한 줄에 0 이상 10 이하의 정수가 공백으로 나뉘어 주어진다."
								outputType="한 줄에 두 정수의 합을 출력한다."
							/>
						)}
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
