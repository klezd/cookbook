import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/system/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import MealListComp from '../../component/MealListComp/MealListComp';

import { initLoadHomepage } from '../../store/action/dataAction';

import styles from './styles.module.css';

function Home(/* props */) {
	const dispatch = useDispatch();

	const mealReducer = useSelector((s) => s.data.meals);
	console.log('mealReducer ', mealReducer);
	console.log(
		'data ',
		useSelector((s) => s.data)
	);
	const mealsRandomList = mealReducer['random'] ? mealReducer['random'] : [];
	const mealsLatestList = mealReducer['LATEST']
		? mealReducer['LATEST'].meals
		: [];

	console.log('random ', mealsRandomList);
	console.log('latest ', mealsLatestList);

	useEffect(() => {
		dispatch(initLoadHomepage());
	}, []);

	return (
		<Container className={styles.root}>
			<Paper sx={{ boxShadow: 0 }}>
				<Box className={styles.search}></Box>
				<MealListComp
					loading={mealsRandomList.length == 0}
					mealList={mealsRandomList}
				/>
				<MealListComp
					title={<>Or try with these latest update</>}
					loading={mealsLatestList.length == 0}
					mealList={mealsLatestList}
				/>
			</Paper>
		</Container>
	);
}

export default Home;
