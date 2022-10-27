import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MealCard(props) {
	const { item } = props;
	const navigate = useNavigate();
	const [fav, setFav] = useState(false);

	console.log(item);
	if (!item) return <></>;

	const {
		idMeal,
		strMealThumb,
		strMeal,
		strSource,
		strCategory,
		strArea,
		strYoutube
	} = item;

	const addToFav = () => {
		const currentState = fav;
		setFav(!currentState);
	};

	const openYoutube = () => {
		return window.open(strYoutube, '_blank');
	};

	const viewOnSource = () => {
		return window.open(strSource, '_blank');
	};

	const openMealDescription = () => {
		navigate(`/meal/${idMeal}/${strMeal}`);
	};

	return (
		<Card sx={{ padding: 2, maxWidth: 360 }} className={styles.root}>
			<CardMedia
				className={styles.thumbnail}
				component="img"
				height="240"
				width="300"
				image={strMealThumb}
				alt={strMeal}
				onClick={openMealDescription}
			></CardMedia>
			<CardContent className={styles.description} onClick={openMealDescription}>
				<Typography variant="h6" className={styles.title}>
					{strMeal}
				</Typography>
				<div className={styles.shortDescription}>
					<div>{strCategory}</div>
					<div>
						<FontAwesomeIcon icon="map-marker-alt" size="lg" color="orange" />
						<span style={{ marginLeft: 6 }}>{strArea}</span>
					</div>
				</div>
			</CardContent>
			<CardActions className={styles.shortDescription}>
				<span className={styles.iconBtn} onClick={addToFav}>
					{fav ? (
						<FontAwesomeIcon
							icon={['fas', 'heart']}
							size="lg"
							color="rgba(236, 11, 0 , 80%)"
						/>
					) : (
						<FontAwesomeIcon
							icon={['far', 'heart']}
							size="lg"
							color="rgb(236, 20, 0)"
						/>
					)}
				</span>
				{strSource && strSource.length !== 0 && (
					<span className={styles.iconBtn} onClick={viewOnSource}>
						<FontAwesomeIcon
							icon={['fas', 'link']}
							size="lg"
							color="rgb(71,169,219)"
						/>
					</span>
				)}
				{strYoutube && strYoutube.length !== 0 && (
					<span className={styles.iconBtn} onClick={openYoutube}>
						<FontAwesomeIcon
							icon={['fab', 'youtube']}
							size="lg"
							color="rgb(256, 11, 0)"
						/>
					</span>
				)}
			</CardActions>
		</Card>
	);
}

export default MealCard;

MealCard.propTypes = {
	item: PropTypes.object.isRequired
};
