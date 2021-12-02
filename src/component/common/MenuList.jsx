import React from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CategoryIcon from '@mui/icons-material/Category';
import Divider from '@mui/material/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.css';

export default function MenuList(props) {
	const navigate = useNavigate();

	const openLink = (link) => {
		console.log(link);
		navigate(link);
		if (props.direction !== 'row') props.toggleDrawer(false);
	};

	return (
		<List component={Stack} direction={{ xs: 'column', md: 'row' }} spacing={2}>
			{props.showPageTitle && (
				<>
					<ListItem disablePadding>
						<ListItemButton onClick={() => openLink('/')}>
							<ListItemIcon>
								<img src="/Logo2.png" className={styles.logo} />
							</ListItemIcon>
							<ListItemText primary="Your CookBook" />
						</ListItemButton>
					</ListItem>
					<Divider />
				</>
			)}

			<ListItem disablePadding>
				<ListItemButton onClick={() => openLink('/category')}>
					{props.showIcon && (
						<ListItemIcon>
							<CategoryIcon />
						</ListItemIcon>
					)}
					<ListItemText primary="Category" />
				</ListItemButton>
			</ListItem>

			<ListItem disablePadding>
				<ListItemButton onClick={() => openLink('/my-page')}>
					{props.showIcon && (
						<ListItemIcon>
							<FontAwesomeIcon icon="user" />
						</ListItemIcon>
					)}
					<ListItemText primary="My Page" />
				</ListItemButton>
			</ListItem>
		</List>
	);
}

MenuList.propTypes = {
	showPageTitle: PropTypes.bool,
	showIcon: PropTypes.bool,
	direction: PropTypes.oneOf(['row', 'column']),
	toggleDrawer: PropTypes.func.isRequired
};

MenuList.defaultProps = {
	showPageTitle: false,
	showIcon: false,
	direction: 'row'
};
