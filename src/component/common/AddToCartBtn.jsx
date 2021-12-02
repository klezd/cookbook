import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import Dialog from './Dialog';
import styles from './styles.module.css';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddToCart(props) {
	const [open, setOpen] = useState(false);
	const [noti, setNoti] = useState(false);
	const [amount, setAmount] = useState(1);
	const { onAddToCart, fullWidth } = props;

	const error = useSelector((s) => s.cart.error);

	const addToCart = (e) => {
		e.preventDefault();
		setOpen(true);
	};

	const submitForm = (e) => {
		e.preventDefault();
		onAddToCart(amount);
		setOpen(false);
		setNoti(true);
	};

	const closeNoti = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setNoti(false);
	};

	return (
		<Box sx={{ width: '100%', textAlign: 'left' }}>
			<Button
				className={styles.addCartBtn}
				fullWidth={fullWidth}
				variant="contained"
				color="dark"
				onClick={addToCart}
				sx={fullWidth ? {} : { textAlign: 'left' }}
			>
				Add To Cart
			</Button>
			<Dialog
				open={open}
				handleClose={() => setOpen(false)}
				title="Add to cart"
				width="xs"
			>
				<Box
					component="form"
					sx={{ width: '100%' }}
					onSubmit={submitForm}
					className={styles.dialogForm}
				>
					<TextField
						color="dark"
						id="amount-of-product"
						label="Choose an amount"
						variant="standard"
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						sx={{ textAlign: 'right !important' }}
					/>
					<Button type="submit" color="dark">
						<AddShoppingCartIcon />
					</Button>
				</Box>
			</Dialog>
			<Snackbar open={noti} autoHideDuration={3500} onClose={closeNoti}>
				<Alert
					severity={error === null ? 'success' : 'error'}
					sx={{ width: '100%' }}
					onClose={closeNoti}
				>
					{error === null ? 'Updated cart successfully!' : error}
				</Alert>
			</Snackbar>
		</Box>
	);
}

AddToCart.propTypes = {
	onAddToCart: PropTypes.func,
	fullWidth: PropTypes.bool
};

AddToCart.defaultProps = {
	onAddToCart: () => {},
	fullWidth: true
};
