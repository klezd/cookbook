export function getTimeAgo(date) {
	const seconds = Math.floor((new Date() - date) / 1000);

	const minuteInterval = seconds / 60;
	const hourInterval = seconds / (60 * 60);
	const dayInterval = seconds / (60 * 60 * 24);

	if (dayInterval > 7) {
		if (Math.floor(dayInterval) === 7) return '1 week ago';
		return 'More than 1 week ago';
	} else if (dayInterval > 1 && dayInterval <= 7) {
		if (Math.floor(dayInterval) === 1) return '1 day ago';
		return Math.floor(dayInterval) + ' days ago';
	} else if (hourInterval > 1) {
		if (Math.floor(hourInterval) === 1) return '1 hour ago';
		return Math.floor(hourInterval) + ' hours ago';
	} else if (minuteInterval > 1) {
		if (Math.floor(minuteInterval) === 1) return '1 minute ago';
		return Math.floor(minuteInterval) + ' minutes ago';
	} else {
		return Math.floor(minuteInterval) + ' seconds ago';
	}
}

export const prepareUserObjToUploadFirebase = (object) => {
	let newObj = {};
	if (object.email) {
		newObj['email'] = object.email;
	}
	if (object.name) {
		newObj['name'] = object.name;
	}
	if (object.url) {
		newObj['profileImage'] = object.url;
	}
	if (object.status) {
		newObj['status'] = object.status;
	}

	return newObj;
};

export const getIngredientLists = (mealItem) => {
	let keyNameList = Object.keys(mealItem).filter(
		(key) =>
			key.includes('strIngredient') &&
			mealItem[key] &&
			mealItem[key].length !== 0
	);
	let res = keyNameList.map((key) => {
		let order = key.split('strIngredient')[1];
		return { [order]: { [mealItem[key]]: mealItem[`strMeasure${order}`] } };
	});
	return res;
};

export const modifiedmealObj = (mealItem) => {
	const ingredients = getIngredientLists(mealItem);
	let res = {
		id: mealItem['idMeal'],
		title: mealItem['strMeal'],
		tags: mealItem['strTags'].split(','),
		thumbnail: mealItem['strMealThumb'] ? mealItem['strMealThumb'] : null,
		category: mealItem['strCategory'],
		area: mealItem['strArea'],
		modified: mealItem['strModified'] ? mealItem['strModified'] : null,
		source: mealItem['strSource'],
		ingredients,
		instructions: mealItem['strInstructions'],
		youtubeLink: mealItem['strYoutube'],
		drinkAlternate: mealItem['strDrinkAlternate']
			? mealItem['strDrinkAlternate']
			: null
	};
	return res;
};
