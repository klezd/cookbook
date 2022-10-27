import {
	GET_A_RANDOM_MEAL,
	GET_CATEGORIES,
	GET_MEALS_BY_CATEGORY,
	GET_MEALS_BY_AREA,
	GET_MEAL_BY_ID,
	GET_RANDOM_LIST,
	SEARCH_MEAL_BY_INGRDIENT,
	SEARCH_MEAL_BY_NAME
} from '../types';

const initialState = {
	dataLoading: false,
	categories: [],
	singleMeal: null,
	meals: {},
	mealsByQuery: {}
};

function userReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case `${GET_RANDOM_LIST}_PENDING`:
		case `${SEARCH_MEAL_BY_NAME}_PENDING`:
		case `${SEARCH_MEAL_BY_INGRDIENT}_PENDING`:
		case `${GET_CATEGORIES}_PENDING`:
		case `${GET_MEALS_BY_CATEGORY}_PENDING`:
		case `${GET_MEALS_BY_AREA}_PENDING`:
		case `${GET_MEAL_BY_ID}_PENDING`:
		case `${GET_A_RANDOM_MEAL}_PENDING`:
			return {
				...state,
				dataLoading: true,
				error: null,
				errorCode: null,
				errorMsg: null
			};

		case `${GET_MEAL_BY_ID}_SUCCESS`:
		case `${GET_A_RANDOM_MEAL}_SUCCESS`:
			return {
				...state,
				dataLoading: false,
				singleMeal: payload.data,
				errorCode: null,
				errorMsg: null
			};
		case `${GET_CATEGORIES}_SUCCESS`:
			return {
				...state,
				dataLoading: false,
				categories: payload.data,
				errorCode: null,
				errorMsg: null
			};
		case `${GET_MEALS_BY_CATEGORY}_SUCCESS`:
			return {
				...state,
				dataLoading: false,
				meals: {
					...state.products,
					[payload.category]: payload.data
				},
				errorCode: null,
				errorMsg: null
			};
		case `${GET_RANDOM_LIST}_SUCCESS`:
			return {
				...state,
				dataLoading: false,
				meals: {
					...state.products,
					['random']: payload.data.meals
				},
				errorCode: null,
				errorMsg: null
			};
		case `${SEARCH_MEAL_BY_NAME}_SUCCESS`:
		case `${SEARCH_MEAL_BY_INGRDIENT}_SUCCESS`:
		case `${GET_MEALS_BY_AREA}_SUCCESS`:
			return {
				...state,
				dataLoading: false,
				mealsByQuery: {
					...state.products,
					[payload.query]: payload.data
				},
				errorCode: null,
				errorMsg: null
			};

		case `${GET_RANDOM_LIST}_ERROR`:
		case `${SEARCH_MEAL_BY_NAME}_ERROR`:
		case `${SEARCH_MEAL_BY_INGRDIENT}_ERROR`:
		case `${GET_CATEGORIES}_ERROR`:
		case `${GET_MEALS_BY_CATEGORY}_ERROR`:
		case `${GET_MEALS_BY_AREA}_ERROR`:
		case `${GET_MEAL_BY_ID}_ERROR`:
		case `${GET_A_RANDOM_MEAL}_ERROR`:
			return {
				...state,
				dataLoading: false,
				errorCode: payload.errorCode,
				errorMsg: payload.errorMsg
			};

		default:
			return {
				...state
			};
	}
}

export default userReducer;
