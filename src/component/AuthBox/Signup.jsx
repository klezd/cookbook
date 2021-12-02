import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { signup } from '../../store/action/userAction';
import styles from './styles.module.css';

function Signup(props) {
	const { setDialog } = props;
	const dispatch = useDispatch();
	const errorMsg = useSelector((s) => s.user.errorMsg);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repassword, setRePassword] = useState('');
	const [errorLocal, setError] = useState('');
	const [ready, setReady] = useState(false);

	const handleChange = (e, type) => {
		if (type === 'name') {
			setName(e.target.value);
		} else if (type === 'email') {
			setEmail(e.target.value);
		} else if (type === 'password') {
			setPassword(e.target.value);
		} else {
			setRePassword(e.target.value);
			if (password !== e.target.value) {
				setError('Your password are not matched!');
			} else if (password.length === 0) {
				setReady(false);
			} else {
				setError('');
				setReady(true);
			}
		}
	};

	const submitSignup = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setError('');
		dispatch(signup(name, email, password));
	};

	return (
		<Paper className={styles.formRoot}>
			<Typography variant="h5">Signup</Typography>
			<Box
				component="form"
				className={styles.form}
				sx={{
					width: 500,
					maxWidth: '100%'
				}}
				onSubmit={submitSignup}
			>
				<TextField
					fullWidth
					id="name-signup"
					label="Your Name"
					variant="standard"
					value={name}
					onChange={(e) => handleChange(e, 'name')}
				/>
				<TextField
					fullWidth
					id="email-signup"
					label="Email"
					variant="standard"
					value={email}
					onChange={(e) => handleChange(e, 'email')}
				/>
				<TextField
					fullWidth
					id="password-signup"
					type="password"
					label="Password"
					variant="standard"
					value={password}
					onChange={(e) => handleChange(e, 'password')}
				/>
				<TextField
					fullWidth
					id="re-password-signup"
					type="password"
					label="Repeat Password"
					variant="standard"
					value={repassword}
					onChange={(e) => handleChange(e, 'repassword')}
				/>
				<div className={styles.errorText}>
					{errorLocal}
					<br />
					{errorMsg}
				</div>
				<Button type="submit" fullWidth variant="contained">
					Signup
				</Button>
				<Button
					fullWidth
					variant="contained"
					onClick={() => setDialog('login')}
					disabled={!ready}
				>
					Back to Login
				</Button>
			</Box>
		</Paper>
	);
}

export default Signup;

Signup.propTypes = {
	setDialog: PropTypes.func.isRequired
};

Signup.defaultProps = {};
