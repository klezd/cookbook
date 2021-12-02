import React from 'react';
import PropTypes from 'prop-types';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';

export default function HideOnScroll(props) {
	const { children, window } = props;
	const trigger = useScrollTrigger({
		target: window ? window() : undefined
	});

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func
};
