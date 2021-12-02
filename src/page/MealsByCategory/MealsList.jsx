import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import ProductItem from '../../component/common/MealItem';
import styles from './styles.module.css';

function MealsList() {
	const navigate = useNavigate();
	const params = useParams();
	const dispatch = useDispatch();

	React.useEffect(() => {}, []);

	return (
		<Paper className={styles.root}>
			<Container></Container>
		</Paper>
	);
}

export default MealsList;
