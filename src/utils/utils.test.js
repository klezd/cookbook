import { getIngredientLists, modifiedmealObj } from '.';
import meal from '../mock/a_meal.json';
import mealIngredient from '../mock/test_a_meal_ingredient.json';
import mealModified from '../mock/test_a_meal_modified.json';

const initArrObj = [
	{ id: 1, name: 'A' },
	{ id: 2, name: 'B' },
	{ id: 3, name: 'C' }
];

const resArr = ['A', 'B', 'C'];

describe('test utils', () => {
	test('getIngredientLists', () => {
		const res = mealIngredient['res'];
		expect(getIngredientLists(meal)).toEqual(res);
	});
	test('modifiedmealObj', () => {
		expect(modifiedmealObj(meal)).toEqual(mealModified);
	});
});
