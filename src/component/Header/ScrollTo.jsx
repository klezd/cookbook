import React from 'react';

import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';

export default function ScrollTo(props) {
	const { children, window, idTo, autoShown, pos } = props;

	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100
	});
	const shown = autoShown ? true : trigger;

	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector(
			'#' + idTo
		);

		if (anchor) {
			anchor.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			});
		}
	};

	return (
		<Zoom in={shown}>
			<Box
				onClick={handleClick}
				role="presentation"
				sx={
					Object.keys(pos).length === 0
						? { position: 'fixed', bottom: 16, right: 16 }
						: pos
				}
			>
				{children}
			</Box>
		</Zoom>
	);
}

ScrollTo.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
	idTo: PropTypes.string,
	autoShown: PropTypes.bool,
	pos: PropTypes.object
};

ScrollTo.defaultProps = {
	autoShown: false,
	pos: {}
};
