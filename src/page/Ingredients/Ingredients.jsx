import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import styles from './styles.module.css';
import { getAllIngredients } from '../../store/action/dataAction';
import { List, ListItem, ListItemText } from '@mui/material';

function Area() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loading = useSelector((s) => s.data.dataLoading);
	const ingReducer = useSelector((s) => s.data.ingredients);
	const ingList = ingReducer.meals;

	React.useEffect(() => {
		dispatch(getAllIngredients());
	}, []);

	const openLink = (ing) => {
		navigate('/meals/ingredients/' + ing);
	};

	return (
		<Paper sx={{ boxShadow: 0 }}>
			<Typography variant="h5">All Ingredients</Typography>
			{!loading && ingList ? (
				<Box sx={{ boxShadow: 0 }} className={styles.cardsRoot}>
					{ingList.length !== 0 &&
						ingList.map((m, i) => {
							const { strIngredient } = m;
							return (
								<Card
									key={`cuisine_${i}`}
									className={styles.card}
									onClick={() => openLink(strIngredient)}
								>
									<CardContent className={styles.content}>
										<Typography variant="body1" className={styles.title}>
											{strIngredient}
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
