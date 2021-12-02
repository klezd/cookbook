import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {
	signin,
	loginWithGoogleAction,
	loginWithFacebookAction
} from '../../store/action/userAction';
import styles from './styles.module.css';

function Login(props) {
	const { setDialog } = props;
	const dispatch = useDispatch();
	const errorMsg = useSelector((s) => s.user.errorMsg);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleChange = (e, type) => {
		if (type === 'email') {
			setEmail(e.target.value);
		} else {
			setPassword(e.target.value);
		}
	};

	const submitLogin = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(signin(email, password));
	};

	const loginWithFacebook = () => {
		dispatch(loginWithFacebookAction());
	};
	const loginWithGoogle = () => {
		dispatch(loginWithGoogleAction());
	};

	return (
		<Paper className={styles.formRoot}>
			<Typography variant="h5">Login</Typography>
			<Box
				component="form"
				className={styles.form}
				sx={{
					width: 500,
					maxWidth: '100%'
				}}
				onSubmit={submitLogin}
			>
				<TextField
					fullWidth
					id="email-login"
					label="Email"
					variant="standard"
					value={email}
					onChange={(e) => handleChange(e, 'email')}
				/>
				<TextField
					fullWidth
					id="password-login"
					type="password"
					label="Password"
					variant="standard"
					value={password}
					onChange={(e) => handleChange(e, 'password')}
				/>
				<div className={styles.errorText}>{errorMsg}</div>
				<Button type="submit" fullWidth variant="contained">
					Login
				</Button>
				<Button
					fullWidth
					variant="contained"
					onClick={() => setDialog('signup')}
				>
					Create new account
				</Button>
				<Button fullWidth variant="contained" onClick={loginWithGoogle}>
					Login With Google
				</Button>
				<Button fullWidth variant="contained" onClick={loginWithFacebook}>
					Login With Facebook
				</Button>
			</Box>
		</Paper>
	);
}

export default Login;

Login.propTypes = {
	setDialog: PropTypes.func.isRequired
};

Login.defaultProps = {};
