import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

import styles from './styles.module.css';
import { getAllIngredients } from '../../store/action/dataAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Area() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loading = useSelector((s) => s.data.dataLoading);
	const ingList = useSelector((s) => s.data.ingNameList);

	useEffect(() => {
		dispatch(getAllIngredients());
	}, []);

	useEffect(() => {
		setList(ingList);
	}, [ingList]);

	const openLink = (ing) => {
		navigate('/meals/ingredients/' + ing);
	};
	const [list, setList] = useState(ingList);
	const [searchVal, setValue] = useState('');

	const handleChange = (e) => {
		const val = e.target.value;
		console.log(val);
		setValue(val);
	};

	const onSearch = () => {
		if (searchVal.length === 0) {
			setList(ingList);
		} else {
			setList(
				ingList.filter((i) => i.toUpperCase().includes(searchVal.toUpperCase()))
			);
		}
	};

	return (
		<Paper sx={{ boxShadow: 0 }}>
			<Typography variant="h5">All Ingredients</Typography>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-end',
					width: '100%'
				}}
			>
				<FontAwesomeIcon icon="search" size="lg" style={{ margin: 6 }} />
				<TextField
					id="input-search-ingredients"
					label="Search A Ingredient"
					variant="standard"
					fullWidth
					value={searchVal}
					onChange={handleChange}
					onBlur={onSearch}
					onKeyPress={(event) => {
						if (event.key === 'Enter') {
							onSearch();
						}
					}}
				/>
			</Box>
			{!loading && list ? (
				<Box sx={{ boxShadow: 0 }} className={styles.cardsRoot}>
					{list.length !== 0 &&
						list.map((m, i) => {
							return (
								<Card
									key={`cuisine_${i}`}
									className={styles.card}
									onClick={() => openLink(m)}
								>
									<CardContent className={styles.content}>
										<Typography variant="body1" className={styles.title}>
											{m}
										</Typography>
									</CardContent>
								</Card>
							);
						})}
				</Box>
			) : (
				<Box>Loading</Box>
			)}
		</Paper>
	);
}

export default Area;
