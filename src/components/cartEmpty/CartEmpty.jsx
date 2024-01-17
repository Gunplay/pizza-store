import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../../assets/img/empty-cart.png';
const CartEmpty = () => {
	return (
		<>
			<div class='cart cart--empty'>
				<h2>
					Waste basket <icon>😕</icon>
				</h2>
				<p>
					Most likely, you did not order more pizza. .
					<br />
					To order pizza, go to the main page..
				</p>
				<img src={cartEmptyImg} alt='Empty cart' />
				<Link to='/' class='button button--black'>
					<span>Come back to main page with Pizza</span>
				</Link>
			</div>
		</>
	);
};

export default CartEmpty;
