// /meal/:id/:name
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import CardMedia from '@mui/material/CardMedia';

import styles from './styles.module.css';
import { getMealById } from '../../store/action/dataAction';
import { modifiedmealObj } from '../../utils';

function Meal() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [mealData, setData] = useState(null);

	const loading = useSelector((s) => s.data.dataLoading);
	const meal = useSelector((s) => s.data.singleMeal);

	let modifiedMeal = null;

	React.useEffect(() => {
		dispatch(getMealById(id));
	}, [id]);

	React.useEffect(() => {
		if (meal) modifiedMeal = modifiedmealObj(meal);
		setData(modifiedMeal);
	}, [meal]);

	if (!mealData || loading) {
		return (
			<Paper className={styles.root}>
				<Box>Loading</Box>{' '}
			</Paper>
		);
	}

	const {
		thumbnail,
		youtubeLink,
		title,
		area,
		tags,
		category,
		source,
		ingredients,
		instructions,
		drinkAlternate
	} = mealData;

	let youtubeId = null;
	if (youtubeLink) {
		youtubeId = youtubeLink.split('v=')[1];
	}
	let hostname = null;
	if (source) {
		const url = new URL(source);
		hostname = url.hostname;
	}

	return (
		<Paper className={styles.root}>
			<Box className={styles.title}>
				<Typography variant="h4">{title}</Typography>
			</Box>
			<Box sx={{ boxShadow: 0 }} className={styles.cardsRoot}>
				<Box className={styles.mediaHolder}>
					<Card className={styles.video}>
						<iframe
							allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							height="100%"
							width="100%"
							src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
						/>
					</Card>
					<Card className={styles.thumbnail}>
						<CardMedia
							image={thumbnail}
							component="img"
							height="95%"
							width="95%"
						/>
					</Card>
				</Box>
				<Box className={styles.content}>
					<Box className={styles.ingredient}>
						<List>
							<Typography className={styles.instructionstitle} variant="button">
								Ingredients
							</Typography>
							{ingredients.map((ing, idx) => {
								const ingredientName = Object.keys(Object.values(ing)[0])[0];
								const ingredientAmount = Object.values(
									Object.values(ing)[0]
								)[0];
								return (
									<ListItem sx={{ padding: '4px' }} key={`ingredients_${idx}`}>
										<ListItemText
											primary={`${ingredientName}: ${ingredientAmount}`}
										/>
									</ListItem>
								);
							})}
						</List>
					</Box>
					<Box className={styles.instructions}>
						<Typography className={styles.instructionstitle} variant="button">
							Instructions
						</Typography>
						<br />
						<ol>
							{instructions
								.split('.')
								.slice(0, -1)
								.map((ins, idx) => (
									<li
										key={`step_${idx + 1}`}
										className={styles.instructionsItem}
									>
										{ins} <br />
									</li>
								))}
						</ol>
					</Box>
				</Box>
			</Box>

			<Card className={styles.outsource}>
				<List>
					<ListSubheader>Other information</ListSubheader>
					{source && (
						<ListItem>
							<ListItemIcon>
								<FontAwesomeIcon
									icon={['fas', 'link']}
									size="lg"
									color="rgb(71,169,219)"
								/>
							</ListItemIcon>
							<ListItemText
								primary={
									<>
										Inspired by <a href={source}>{hostname}</a>
									</>
								}
							/>
						</ListItem>
					)}

					<ListItem>
						<ListItemIcon>
							<FontAwesomeIcon icon="map-marker-alt" size="lg" color="orange" />
						</ListItemIcon>
						<ListItemText primary={<Link to={`/area/${area}`}>{area}</Link>} />
					</ListItem>

					{category && category.length !== 0 && (
						<ListItem>
							<ListItemIcon>
								<FontAwesomeIcon icon="utensils" size="lg" color="red" />
							</ListItemIcon>
							<ListItemText
								primary={<Link to={`/category/${category}`}>{category}</Link>}
							/>
						</ListItem>
					)}

					{tags && tags.length !== 0 && (
						<ListItem>
							<ListItemIcon>
								<FontAwesomeIcon icon="tags" size="lg" color="green" />
							</ListItemIcon>
							<ListItemText
								primary={
									<>
										{tags.map((tag) => {
											return (
												<>
													<a href="#">{tag}</a> &nbsp;
												</>
											);
										})}
									</>
								}
							/>
						</ListItem>
					)}

					{drinkAlternate && (
						<ListItem>
							<ListItemIcon>
								<FontAwesomeIcon
									icon={['fas', 'glass-cheers']}
									size="lg"
									color="rgb(201,6,8)"
								/>
							</ListItemIcon>
							<ListItemText primary={drinkAlternate} />
						</ListItem>
					)}
				</List>
			</Card>
		</Paper>
	);
}

export default Meal;
