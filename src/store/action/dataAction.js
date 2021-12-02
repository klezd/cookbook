import axios from 'axios';
import {
	GET_A_RANDOM_MEAL,
	GET_CATEGORIES,
	GET_MEALS_BY_CATEGORY,
	GET_MEAL_BY_ID,
	GET_RANDOM_LIST,
	SEARCH_MEAL_BY_INGRDIENT,
	SEARCH_MEAL_BY_NAME
} from '../types';
import { reqHeader } from '../../utils/rapidAPI';

export const callAPI =
	(opt, type, extra = {}) =>
	async (dispatch) => {
		dispatch({
			type: type + '_PENDING'
		});
		axios
			.request(opt)
			.then((response) => {
				console.log(response.data);
				if (response.status === 200) {
					const json = response.data;
					return dispatch({
						type: `${type}_SUCCESS`,
						payload: {
							...extra,
							data: json
						}
					});
				} else {
					return dispatch({
						type: `${type}_ERROR`,
						payload: {
							errorCode: response.status,
							errorMsg: response.data.message
						}
					});
				}
			})
			.catch((e) => {
				console.error(e);
				return dispatch({
					type: `${type}_ERROR`,
					payload: {
						errorCode: e.code,
						errorMsg: e.message
					}
				});
			});
	};

export const getMealsByCategory = (category) => async (dispatch) => {
	const options = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/filter.php',
		params: { c: category },
		headers: reqHeader
	};
	dispatch(callAPI(options, GET_MEALS_BY_CATEGORY, { category }));
};

export const getMealById = (id) => (dispatch) => {
	const options = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/lookup.php',
		params: { i: id },
		headers: reqHeader
	};
	dispatch(callAPI(options, GET_MEAL_BY_ID));
};

export const getAllCategories = () => (dispatch) => {
	const options = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/list.php',
		params: { c: 'list' },
		headers: reqHeader
	};
	dispatch(callAPI(options, GET_CATEGORIES));
};

export const searchMealByIngredient = (ingredient) => (dispatch) => {
	const options = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/filter.php',
		params: { i: ingredient },
		headers: reqHeader
	};
	dispatch(callAPI(options, SEARCH_MEAL_BY_INGRDIENT, { query: ingredient }));
};

export const searchMealByName = (query) => (dispatch) => {
	const options = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/search.php',
		params: { s: query },
		headers: reqHeader
	};
	dispatch(callAPI(options, SEARCH_MEAL_BY_NAME, { query }));
};

export const getRandomList = () => (dispatch) => {
	const options = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/randomselection.php',
		headers: reqHeader
	};
	dispatch(callAPI(options, GET_RANDOM_LIST));
};

export const getARandomMeal = () => (dispatch) => {
	const options = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/random.php',
		headers: reqHeader
	};
	dispatch(callAPI(options, GET_A_RANDOM_MEAL));
};
