import React, { useState, useEffect } from 'react';
import { Grid, Button, IconButton, Typography } from '@material-ui/core';
import { Route, Link, useParams, useHistory } from 'react-router-dom';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import {
	ProblemInput,
	ProblemRank,
	ProblemScore,
	SelectForm,
	MarkdownViewer,
	AccordianComment,
} from '../UI';

const ProblemView = (props) => {
	const {
		problemInfo,
		handleProblemInfo,
		comments,
		handleComments,
		submissions,
		handleSubmissions,
		mySubmissions,
		handleMySubmissions,
		problemCode,
		handleProblemCode,
	} = props;
	const { id } = useParams();
	const [star, setStar] = useState(false);
	const [like, setLike] = useState(false);
	const [language, setLanguage] = useState('C++');
	const clickStar = () => {
		setStar(!star);
	};

	const clickLike = () => {
		setLike(!like);
	};
	const changeLang = (e) => {
		setLanguage(e.target.value);
	};
	useEffect(() => {
		handleProblemInfo(id);
		handleComments(id);
	}, [problemInfo, id]);
	return (
		<Grid className="problem">
			<Grid container direction="row" className="problem-container">
				<Grid className="problem-bar">
					<Grid className="bar-item">
						<Link to={`/problem/${id}`}>
							<Button>문제 설명</Button>
						</Link>
						<Link to={`/problem/${id}/rank`}>
							<Button>맞은 사람</Button>
						</Link>
						<Link to={`/problem/${id}/score`}>
							<Button>채점 현황</Button>
						</Link>
					</Grid>
					<Grid className="bar-item">
						<IconButton
							onClick={clickLike}
							title="문제 좋아요"
							className="toggle"
						>
							{like ? (
								<ThumbUp style={{ fontSize: '1.8rem' }} />
							) : (
								<ThumbUpAltOutlinedIcon
									style={{ fontSize: '1.8rem' }}
								/>
							)}
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
							<Typography>북마크 추가</Typography>
						</IconButton>
					</Grid>
				</Grid>
				<Grid className="problem-bar">
					<SelectForm
						defaultValue="C++"
						values={['C++', 'Java', 'Python']}
						handelChange={changeLang}
					/>
				</Grid>
				<Grid container className="problem-info">
					<Route
						exact
						path="/problem/:id"
						render={() => <MarkdownViewer source={problemInfo} />}
					/>
					<Route
						exact
						path="/problem/:id/rank"
						render={() => (
							<ProblemRank
								submissions={submissions}
								handleSubmissions={handleSubmissions}
							/>
						)}
					/>
					<Route
						exact
						path="/problem/:id/score"
						render={() => (
							<ProblemScore
								mySubmissions={mySubmissions}
								handleMySubmissions={handleMySubmissions}
							/>
						)}
					/>
				</Grid>
				{/* ace Editor 소스 코드 입력 */}
				<ProblemInput
					language={language}
					handleProblemCode={handleProblemCode}
				/>
				<AccordianComment comments={comments} />
			</Grid>
		</Grid>
	);
};

export default ProblemView;
