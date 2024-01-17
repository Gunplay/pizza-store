import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import '../pizza-block/_button.scss';
import '../pizza-block/_pizza-block.scss';

const typeNames = ['Slim', 'Traditional'];

const PizzaBlock = ({ id, title, price, imageUrl, sizes, types }) => {
	// console.log("types", types[0])
	const dispatch = useDispatch();
	const cartItem = useSelector(state =>
		state.cart.items.find(obj => obj.id === id)
	);
	console.log('cartItem', cartItem);
	const [pizzaCount, setPizzaCount] = useState(0);
	const [typeActivePizze, setTypeActivePizze] = useState(0);
	const [pizzaSize, setPizzaSize] = useState(0);

	const addedCount = cartItem ? cartItem.count : 0;

	const onClickAdd = () => {
		const item = {
			id,
			title,
			price,
			imageUrl,
			type: typeNames[typeActivePizze],
			size: sizes[pizzaSize], //26/30/45
		};
		dispatch(addItem(item));
	};
	//{types.map((type, index) => <li onClick={ () => hadnlePizzaType(index)} className={typeActivePizze === index ? 'active' : ''}>{type === 0 ? 'Slim' : 'Traditional'}</li>)}
	const handlePizzaCount = i => {
		if (pizzaCount + i >= 0) {
			setPizzaCount(pizzaCount + i);
		}
	};

	const handlePizzaSize = size => {
		setPizzaSize(size);
	};

	return (
		<div className='pizza_block-wrapper'>
			<div className='pizza-block'>
				<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
				<h4 className='pizza-block__title'>{title}</h4>
				<div className='pizza-block__selector'>
					<ul>
						{types.map((typeId, i) => (
							<li
								key={i}
								onClick={() => setTypeActivePizze(typeId)}
								className={typeActivePizze === typeId ? 'active' : ''}
							>
								{typeNames[typeId]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((item, i) => (
							<li
								key={i}
								onClick={() => handlePizzaSize(i)}
								className={pizzaSize === i ? 'active' : ''}
							>
								{' '}
								{item} sm
							</li>
						))}
					</ul>
				</div>
				<div className='pizza-block__bottom'>
					<div className='pizza-block__price'> {price} UAH</div>
					<button
						onClick={onClickAdd}
						className='button button--outline button--add'
					>
						<svg
							onClick={() => handlePizzaCount(1)}
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
						<span>Add pizza</span>

						{cartItem ? <i>{addedCount}</i> : null}
						<svg
							onClick={() => handlePizzaCount(-1)}
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.8 4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default PizzaBlock;
