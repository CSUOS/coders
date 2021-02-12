import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	Grid,
	AccordionDetails,
	AccordionSummary,
	Fab,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { CommentForm } from '..';

const Accordion = withStyles({
	root: {
		boxShadow: 'none',
	},
	expanded: {},
})(MuiAccordion);

const AccordianComment = ({ comments, handleComments }) => {
	const { id } = useParams();
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen(!open);
	};
	useEffect(() => {
		handleComments(id);
	}, [comments, id]);
	return (
		<Grid xs={6}>
			<Accordion className="accordion">
				<AccordionSummary expanded={open} onClick={handleClick}>
					<Fab className={open ? 'arrow-icon-on' : 'arrow-icon'}>
						<DoubleArrowIcon size="large" />
					</Fab>
				</AccordionSummary>
				<AccordionDetails>
					<Grid className="accordion-detail">
						<CommentForm comments={comments} />
					</Grid>
				</AccordionDetails>
			</Accordion>
		</Grid>
	);
};

export default AccordianComment;
