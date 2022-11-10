import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { getAllAreas } from '../../store/action/dataAction';

import styles from './styles.module.css';

function Area() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loading = useSelector((s) => s.data.dataLoading);
	const areasReducer = useSelector((s) => s.data.areas);
	const areasList = areasReducer.meals;

	React.useEffect(() => {
		dispatch(getAllAreas());
	}, []);

	const openLink = (link) => {
		navigate(link);
	};

	return (
		<Paper sx={{ boxShadow: 0 }}>
			<Typography variant="h5">Cuisine from all of the world</Typography>
			{!loading && areasList ? (
				<Box sx={{ boxShadow: 0 }} className={styles.cardsRoot}>
					{areasList.length !== 0 &&
						areasList.map((m, i) => {
							const { strArea } = m;
							return (
								<Card
									key={`cuisine_${i}`}
									className={styles.card}
									onClick={() => openLink(strArea)}
								>
									<CardContent className={styles.content}>
										<Typography variant="body1" className={styles.title}>
											{strArea.toUpperCase() === 'UNKNOWN' ? (
												<>Other</>
											) : (
												<>{strArea} Cuisine</>
											)}
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
