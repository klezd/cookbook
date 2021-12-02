import React from 'react';
import PropTypes from 'prop-types';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';

export default function CDialog(props) {
	const { footerAction, children, handleClose, open, label, title, width } =
		props;
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down(width));

	return (
		<Dialog
			fullScreen={fullScreen}
			maxWidth={width}
			fullWidth
			open={open}
			onClose={handleClose}
			aria-labelledby={label}
		>
			{title ? (
				<DialogTitle sx={{ textAlign: 'center', fontWeight: 800 }}>
					{title}
				</DialogTitle>
			) : (
				<DialogActions>
					<IconButton aria-label="close" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogActions>
			)}
			<DialogContent>{children}</DialogContent>
			{footerAction && <DialogActions>{footerAction}</DialogActions>}
		</Dialog>
	);
}

CDialog.propTypes = {
	children: PropTypes.node,
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	footerAction: PropTypes.node,
	label: PropTypes.string,
	title: PropTypes.node,
	width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg'])
};

CDialog.defaultProps = {
	footerAction: null,
	label: 'form-dialog',
	title: null,
	width: 'sm'
};
