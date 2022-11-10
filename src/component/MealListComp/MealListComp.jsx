import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/system/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import MealCard from '../MealCard/MealCard';

import styles from './styles.module.css';

function List(props) {
	const { title, mealList, loading, displayIfNull, textIfNull } = props;

	const [listData, setData] = useState([]);

	useEffect(() => {
		setData(mealList);
	}, [mealList]);

	if ((loading || !listData || listData.length === 0) && !displayIfNull) {
		return <Box>Loading</Box>;
	}

	if (displayIfNull && (!listData || listData.length === 0)) {
		return (
			<Container className={styles.root}>
				<Paper sx={{ boxShadow: 0 }}>
					<Box className={styles.meals}>
						<Typography variant="h5">{title}</Typography>
						<Box sx={{ boxShadow: 0 }}>{textIfNull}</Box>
					</Box>
				</Paper>
			</Container>
		);
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
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	loading: PropTypes.bool,
	// Two props below for search page, before and after search
	displayIfNull: PropTypes.bool,
	textIfNull: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

List.defaultProps = {
	title: <> Don&apos;t know what to eat? Try these!</>,
	loading: true,
	displayIfNull: false,
	textIfNull: <></>
};

export default List;
