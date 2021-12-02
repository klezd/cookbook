import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import Box from '@mui/system/Box';
// import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
// import StarIcon from '@mui/icons-material/Star';

import styles from './styles.module.css';

function Product() {
	const params = useParams();
	const dispatch = useDispatch();

	React.useEffect(() => {}, []);

	return <Paper className={styles.root}></Paper>;
}

export default Product;
