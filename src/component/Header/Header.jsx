import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/system/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';

import MenuList from '../common/MenuList';
import Dialog from '../common/Dialog';
import Auth from '../AuthBox/Auth';
import HideOnScroll from './HideOnScroll';

import { getUser } from '../../store/action/userAction';
import styles from './styles.module.css';

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [auth, setAuth] = useState(false);
	const [drawer, setDrawer] = useState(false);

	React.useEffect(() => {
		dispatch(getUser());
	}, []);

	React.useEffect(() => {}, []);

	const openAuth = () => {
		setAuth(true);
	};

	const handleClose = () => {
		setAuth(false);
	};

	const toggleDrawer = (open) => {
		setDrawer(open);
	};

	return (
		<React.Fragment>
			<HideOnScroll>
				<AppBar>
					<Toolbar className={styles.appbar}>
						<Box
							component="button"
							sx={{
								display: { xs: 'flex', md: 'none' },
								border: 'none',
								background: 'none',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}
							onClick={() => toggleDrawer(true)}
						>
							<MenuIcon sx={{ color: 'white' }} fontSize="large" />
							&nbsp;
							<Typography
								variant="h6"
								component="div"
								sx={{ fontWeight: 'bold' }}
							>
								Your CookBook
							</Typography>
						</Box>
						<Box
							component="div"
							sx={{ display: { xs: 'none', md: 'flex' } }}
							className={styles.headerMenu}
						>
							<div onClick={() => navigate('/')}>
								<span>
									<img src="/Logo2.png" className={styles.logo} />
								</span>
								<Typography
									variant="h6"
									component="div"
									sx={{ fontWeight: 'bold' }}
								>
									Cookbook
								</Typography>
							</div>
							<MenuList
								direction="row"
								showPageTitle={false}
								showIcon={false}
								toggleDrawer={toggleDrawer}
							/>
						</Box>

						<div className={styles.appBtn}>
							<div onClick={openAuth}>
								<PersonIcon />
							</div>
						</div>
					</Toolbar>
				</AppBar>
			</HideOnScroll>

			<Dialog open={auth} handleClose={handleClose} label="Auth-dialog">
				<Auth />
			</Dialog>

			<Drawer anchor="left" open={drawer} onClose={() => toggleDrawer(false)}>
				<MenuList
					direction="column"
					showPageTitle
					showIcon
					toggleDrawer={toggleDrawer}
				/>
			</Drawer>
		</React.Fragment>
	);
}

export default Header;
