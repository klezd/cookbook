import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';

import MealListComp from '../../component/MealListComp/MealListComp';
import { searchMealByIngredient } from '../../store/action/dataAction';

import styles from './styles.module.css';
function MealsByIngs() {
	const { ingredients } = useParams();
	const dispatch = useDispatch();

	const loading = useSelector((s) => s.data.dataLoading);
	const mealReducer = useSelector((s) => s.data.mealsByQuery);
	const mealsList = mealReducer[ingredients.toUpperCase()]
		? mealReducer[ingredients.toUpperCase()]
		: [];

	useEffect(() => {
		dispatch(searchMealByIngredient(ingredients));
	}, [ingredients]);

	return (
		<Paper className={styles.root}>
			<MealListComp
				title={ingredients}
				loading={loading}
				mealList={mealsList}
			/>
		</Paper>
	);
}

export default MealsByIngs;
