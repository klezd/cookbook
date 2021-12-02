import React, { useState } from 'react';

import Login from './Login';
import Signup from './Signup';
import styles from './styles.module.css';

function AuthBox() {
	const [dialog, setDialog] = useState('login');
	return (
		<div className={styles.root}>
			{dialog === 'login' ? (
				<Login setDialog={setDialog} />
			) : (
				<Signup setDialog={setDialog} />
			)}
		</div>
	);
}

export default AuthBox;
