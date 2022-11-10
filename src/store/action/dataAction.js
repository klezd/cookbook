import axios from 'axios';
import {
	GET_A_RANDOM_MEAL,
	GET_CATEGORIES,
	GET_MEALS_BY_CATEGORY,
	GET_MEALS_BY_AREA,
	GET_MEAL_BY_ID,
	GET_RANDOM_LIST,
	SEARCH_MEAL_BY_INGRDIENT,
	SEARCH_MEAL_BY_NAME,
	GET_LATEST_LIST,
	GET_AREAS,
	GET_INGREDIENTS,
	RESET_SEARCH
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
	dispatch(callAPI(options, GET_MEALS_BY_CATEGORY, { query: category }));
};

export const getMealsByArea = (area) => async (dispatch) => {
	const options = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/filter.php',
		params: { a: area },
		headers: reqHeader
	};
	dispatch(callAPI(options, GET_MEALS_BY_AREA, { query: area }));
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
		url: 'https://themealdb.p.rapidapi.com/categories.php',
		params: { c: 'list' },
		headers: reqHeader
	};
	dispatch(callAPI(options, GET_CATEGORIES));
};

export const getAllAreas = () => (dispatch) => {
	const options = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/list.php',
		params: { a: 'list' },
		headers: reqHeader
	};
	dispatch(callAPI(options, GET_AREAS));
};

export const getAllIngredients = () => (dispatch) => {
	const options = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/list.php',
		params: { i: 'list' },
		headers: reqHeader
	};
	dispatch(callAPI(options, GET_INGREDIENTS));
};

export const searchMealByIngredient =
	(ingredient, search = false) =>
	(dispatch) => {
		// Reset the search opt
		dispatch({ type: RESET_SEARCH });
		const options = {
			method: 'GET',
			url: 'https://themealdb.p.rapidapi.com/filter.php',
			params: { i: ingredient },
			headers: reqHeader
		};
		// if query contains ',' then this search is with multiple ingredient
		const query = ingredient.includes(',') || search ? 'search' : ingredient;
		dispatch(callAPI(options, SEARCH_MEAL_BY_INGRDIENT, { query }));
	};

export const searchMealByName = (query) => (dispatch) => {
	const options = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/search.php',
		params: { s: query },
		headers: reqHeader
	};
	dispatch(callAPI(options, SEARCH_MEAL_BY_NAME, { query: 'search' }));
};

export const getRandomList = () => (dispatch) => {
	const options = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/randomselection.php',
		headers: reqHeader
	};
	dispatch(callAPI(options, GET_RANDOM_LIST));
};

export const getLatestList = () => (dispatch) => {
	const options = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/latest.php',
		headers: reqHeader
	};
	dispatch(callAPI(options, GET_LATEST_LIST, { query: 'LATEST' }));
};

export const getARandomMeal = () => (dispatch) => {
	const options = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/random.php',
		headers: reqHeader
	};
	dispatch(callAPI(options, GET_A_RANDOM_MEAL));
};

export const initLoadHomepage = () => async (dispatch) => {
	await dispatch(getRandomList());
	await dispatch(getLatestList());
};

// Save to user db
export const addHistoryToLS = (search) => {
	const searchTermLS = localStorage.getItem('searchQ');
	if (!searchTermLS || (searchTermLS && searchTermLS.length === 0)) {
		let array = [search];
		localStorage.setItem('searchQ', array);
	} else if (
		searchTermLS &&
		typeof searchTermLS === 'object' &&
		searchTermLS.length !== 0
	) {
		let array = [search].concat(searchTermLS);
		localStorage.setItem('searchQ', array);
	}
};
