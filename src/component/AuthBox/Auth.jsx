import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AuthBox from './AuthBox';
import styles from './styles.module.css';
import { signout } from '../../store/action/userAction';

function Auth() {
	const isLogged = useSelector((s) => s.user.isLogged);
	const dispatch = useDispatch();

	const user = useSelector((s) => s.user.user);
	const uid = isLogged ? user.uid : null;
	const userInfo = useSelector((s) => s.user.userInfo);
	const info = isLogged && uid && userInfo ? userInfo[uid] : null;

	const logout = () => {
		dispatch(signout());
	};

	return (
		<div className={styles.root}>
			{isLogged ? (
				<Paper>
					<Box className={styles.userContainer}>
						<Typography variant="h4">Welcome</Typography>

						{info && (
							<>
								<Box className={styles.userAvatar}></Box>
								<Typography variant="h6">{info.name && info.name}</Typography>
								<Box>
									<div>Email: {info.email && info.email}</div>
								</Box>
							</>
						)}
						<Box>
							<Button
								fullWidth
								variant="contained"
								onClick={() => {
									console.log('todo');
								}}
							>
								Edit Your Information
							</Button>
							<Button fullWidth variant="contained" onClick={() => logout()}>
								Log out
							</Button>
						</Box>
					</Box>
				</Paper>
			) : (
				<AuthBox />
			)}
		</div>
	);
}

export default Auth;
