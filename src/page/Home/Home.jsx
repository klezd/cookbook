import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/system/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import MealCard from '../../component/MealCard/MealCard';
import { getRandomList } from '../../store/action/dataAction';

import styles from './styles.module.css';

function Home(/* props */) {
	// const navigate = useNavigate();
	const dispatch = useDispatch();

	const loading = useSelector((s) => s.data.dataLoading);
	const mealReducer = useSelector((s) => s.data.meals);
	const mealsList = mealReducer['random'] ? mealReducer['random'] : [];

	useEffect(() => {
		dispatch(getRandomList());
	}, []);

	useEffect(() => {}, []);

	return (
		<Container className={styles.root}>
			<Paper sx={{ boxShadow: 0 }}>
				<Box className={styles.search}></Box>
				<Box className={styles.meals}>
					<Typography variant="h5">
						Don&apos;t know what to eat? Try these!
					</Typography>
					{!loading ? (
						<Box sx={{ boxShadow: 0 }} className={styles.cardsRoot}>
							{mealsList.length !== 0 &&
								mealsList.map((m, i) => {
									return <MealCard key={`random_${i}`} item={m} />;
								})}
						</Box>
					) : (
						<Box>Loading</Box>
					)}
				</Box>
			</Paper>
		</Container>
	);
}

export default Home;
