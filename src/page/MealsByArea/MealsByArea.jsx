import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';

import MealListComp from '../../component/MealListComp/MealListComp';
import { getMealsByArea } from '../../store/action/dataAction';

import styles from './styles.module.css';
function MealsByArea() {
	const { area } = useParams();
	const dispatch = useDispatch();

	const loading = useSelector((s) => s.data.dataLoading);
	const mealReducer = useSelector((s) => s.data.meals);
	const mealsList = mealReducer[area.toUpperCase()]
		? mealReducer[area.toUpperCase()].meals
		: [];

	useEffect(() => {
		dispatch(getMealsByArea(area));
	}, [area]);

	const title =
		area.toUpperCase() === 'UNKNOWN'
			? 'OTHER'
			: area.toUpperCase() + ' CUISINE';

	return (
		<Paper className={styles.root}>
			<MealListComp title={title} loading={loading} mealList={mealsList} />
		</Paper>
	);
}

export default MealsByArea;
