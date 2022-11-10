import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/system/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';

import MealListComp from '../../component/MealListComp/MealListComp';
import ScrollTo from '../../component/Header/ScrollTo';

import { initLoadHomepage } from '../../store/action/dataAction';

import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Home(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const mealReducer = useSelector((s) => s.data.meals);
	const mealsRandomList = mealReducer['random'] ? mealReducer['random'] : [];
	const mealsLatestList = mealReducer['LATEST'] ? mealReducer['LATEST'] : [];

	useEffect(() => {
		dispatch(initLoadHomepage());
	}, []);

	const goRandom = () => {
		navigate('/meals/random');
	};

	return (
		<Container className={styles.root}>
			<ScrollTo
				{...props}
				idTo="go-random"
				autoShown={true}
				pos={{ position: 'fixed', bottom: 16, left: 16 }}
			>
				<Fab color="info" size="small" aria-label="scroll to bottom">
					<FontAwesomeIcon size="lg" icon="random" color="orange" />
				</Fab>
			</ScrollTo>

			<Paper sx={{ boxShadow: 0 }}>
				<Box className={styles.search}></Box>
				<MealListComp
					loading={mealsRandomList.length == 0}
					mealList={mealsRandomList}
				/>
				<MealListComp
					title={<>Or try with these latest update</>}
					loading={mealsLatestList.length == 0}
					mealList={mealsLatestList}
				/>
				<Button
					onClick={() => goRandom()}
					color="warning"
					variant="contained"
					size="large"
					sx={{ marginTop: 3 }}
					id="go-random"
				>
					<FontAwesomeIcon size="lg" icon="random" />
					<span style={{ margin: '0 12px' }}>
						Still not know what to have? Try a random one!
					</span>
					<FontAwesomeIcon size="lg" icon="random" />
				</Button>
			</Paper>
		</Container>
	);
}

export default Home;
