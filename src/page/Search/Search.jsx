import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.css';
import {
	searchMealByIngredient,
	getAllIngredients,
	searchMealByName
} from '../../store/action/dataAction';
import MealListComp from '../../component/MealListComp/MealListComp';

function Product() {
	// const params = useParams();
	const dispatch = useDispatch();
	const ingList = useSelector((s) => s.data.ingNameList);
	const [valueI, setValueI] = useState([]);
	const [valueN, setValueN] = useState('');
	const [res, setRes] = useState('Search meal with ingredients!');

	const [mode, setMode] = useState('ingredients');
	const loading = useSelector((s) => s.data.dataLoading);
	const mealReducer = useSelector((s) => s.data.mealsByQuery);
	const mealsList = mealReducer['SEARCH'] ? mealReducer['SEARCH'] : [];

	useEffect(() => {
		dispatch(getAllIngredients());
	}, []);

	const setModeV = (e) => {
		let m = e.target.value;
		if (m !== mode) {
			setMode(m);
			setValueI([]);
			setValueI('');
		}
	};
	const handleChangeI = (e, nv) => {
		console.log(nv);
		setValueI(nv);
	};

	const handleChangeN = (e) => {
		setValueN(e.target.value);
	};

	const onSearch = () => {
		const withStr = mode === 'ingredients' ? valueI.join() : valueN;

		const searchStr =
			mode === 'ingredients'
				? valueI.map((i) => i.toLowerCase().replaceAll(' ', '_')).join()
				: valueN;

		if (mode === 'ingredients') {
			dispatch(searchMealByIngredient(searchStr, true));
		} else {
			dispatch(searchMealByName(searchStr));
		}

		// Set result for no meals found case
		const r = `No meals found with ${withStr}`;
		setRes(r);
		// Reset search query value
		setValueI([]);
		setValueN('');
	};

	return (
		<Paper sx={{ boxShadow: 0 }}>
			<Box className={styles.selectionBox}>
				<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
					<InputLabel id="demo-select-small">Search by</InputLabel>
					<Select
						labelId="demo-select-small"
						id="demo-select-small"
						value={mode}
						label="Age"
						onChange={setModeV}
					>
						<MenuItem value="ingredients">Ingredients</MenuItem>
						<MenuItem value="name">Name</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<Box className={styles.searchBox}>
				<Box className={styles.pageTitle}>
					<FontAwesomeIcon icon="search" size="lg" />
					{mode === 'ingredients' ? (
						<Typography variant="h5">Find meal with ingredients...</Typography>
					) : (
						<Typography variant="h5">Find meal with name...</Typography>
					)}
					<FontAwesomeIcon icon="question" size="lg" />
				</Box>
				{mode === 'ingredients' ? (
					<Autocomplete
						multiple
						disableCloseOnSelect
						id="filter-ings"
						value={valueI}
						onChange={(e, nv) => handleChangeI(e, nv)}
						options={ingList}
						renderTags={(tagValue, getTagProps) =>
							tagValue.map((option, index) => (
								<Chip
									key={`${index}_${option}`}
									label={option}
									{...getTagProps({ index })}
								/>
							))
						}
						fullWidth
						renderInput={(params) => (
							<TextField {...params} label="Search" placeholder="Ingredients" />
						)}
					/>
				) : (
					<TextField
						label="Search"
						placeholder="Meal name"
						value={valueN}
						onChange={handleChangeN}
						fullWidth
					/>
				)}
			</Box>

			<Button
				variant="contained"
				fullWidth
				className={styles.searchBtn}
				onClick={onSearch}
			>
				Search
			</Button>
			<MealListComp
				title={<>Search Results</>}
				loading={loading}
				mealList={mealsList}
				displayIfNull={true}
				textIfNull={res ? res : <></>}
			/>
		</Paper>
	);
}

export default Product;
