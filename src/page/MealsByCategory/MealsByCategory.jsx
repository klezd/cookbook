import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';

import MealListComp from '../../component/MealListComp/MealListComp';
import { getMealsByCategory } from '../../store/action/dataAction';

import styles from './styles.module.css';
function MealsByCategory() {
	const { category } = useParams();
	const dispatch = useDispatch();

	const loading = useSelector((s) => s.data.dataLoading);
	const mealReducer = useSelector((s) => s.data.meals);
	const mealsList = mealReducer[category.toUpperCase()]
		? mealReducer[category.toUpperCase()].meals
		: [];

	useEffect(() => {
		dispatch(getMealsByCategory(category));
	}, [category]);

	return (
		<Paper className={styles.root}>
			<MealListComp
				title={category.toUpperCase()}
				loading={loading}
				mealList={mealsList}
			/>
		</Paper>
	);
}

export default MealsByCategory;
