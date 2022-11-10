import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/system/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import MealCard from '../MealCard/MealCard';

import styles from './styles.module.css';

function List(props) {
	const { title, mealList, loading } = props;

	const [listData, setData] = useState([]);

	useEffect(() => {
		setData(mealList);
	}, [mealList]);

	if (loading || !listData || listData.length === 0) {
		return <Box>Loading</Box>;
	}

	return (
		<Container className={styles.root}>
			<Paper sx={{ boxShadow: 0 }}>
				<Box className={styles.meals}>
					<Typography variant="h5">{title}</Typography>
					<Box sx={{ boxShadow: 0 }} className={styles.cardsRoot}>
						{listData.length !== 0 &&
							listData.map((m, i) => {
								return <MealCard key={`${title}_${i}`} item={m} />;
							})}
					</Box>
				</Box>
			</Paper>
		</Container>
	);
}

List.propTypes = {
	// getList: 'random' | 'category' | 'area' | 'ingredients' | 'name',
	mealList: PropTypes.array.isRequired,
	title: PropTypes.ReactElementLike || PropTypes.string,
	loading: PropTypes.bool
};

List.defaultProps = {
	title: <> Don&apos;t know what to eat? Try these!</>,
	loading: true
};

export default List;
