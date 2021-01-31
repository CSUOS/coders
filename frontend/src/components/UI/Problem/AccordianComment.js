import React, { useState } from 'react';
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

const AccordianComment = ({ comments }) => {
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen(!open);
	};

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
