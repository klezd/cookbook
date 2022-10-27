import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import styles from './styles.module.css';
import { getAllCategories } from '../../store/action/dataAction';

function Category() {
	const dispatch = useDispatch();

	const loading = useSelector((s) => s.data.dataLoading);
	const categoriesReducer = useSelector((s) => s.data.categories);
	const categoriesList = categoriesReducer.categories;

	React.useEffect(() => {
		dispatch(getAllCategories());
	}, []);

	return (
		<Paper className={styles.root}>
			<Typography variant="h3">Food Categories</Typography>
			{!loading && categoriesList ? (
				<Box sx={{ boxShadow: 0 }} className={styles.cardsRoot}>
					{categoriesList.length !== 0 &&
						categoriesList.map((m, i) => {
							const {
								strCategory,
								idCategory,
								strCategoryDescription,
								strCategoryThumb
							} = m;
							return (
								<Card
									key={`category_${i}_${idCategory}`}
									className={styles.card}
								>
									<CardContent className={styles}>
										<Typography variant="h5" className={styles.title}>
											{strCategory}
										</Typography>
									</CardContent>

									<CardMedia
										className={styles.thumbnail}
										component="img"
										image={strCategoryThumb}
										alt={strCategory}
									/>
									<CardContent className={styles.content}>
										<Box className={styles.description}>
											{strCategoryDescription}
										</Box>
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

export default Category;
