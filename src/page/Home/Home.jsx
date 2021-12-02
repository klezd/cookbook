import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/system/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import { getAllCategories } from '../../store/action/dataAction';

import styles from './styles.module.css';

function Home(/* props */) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const loading = useSelector((s) => s.data.dataLoading);

	useEffect(() => {
		dispatch(getAllCategories());
	}, []);

	useEffect(() => {}, []);

	return (
		<Container className={styles.root}>
			{!loading ? (
				<Paper sx={{ boxShadow: 0 }}></Paper>
			) : (
				<Paper>Loading</Paper>
			)}
		</Container>
	);
}

export default Home;
