import '../categories/_categories.scss';

const Categories = ({ value, onChangeCategoryId }) => {
	// const [activeCategory, setActiveCategory] = useState(0)

	const categories = [
		'All pizzas',
		'Meat',
		'Vegetarian',
		'Grill',
		'Spicy',
		'Private',
	];

	// const handleCategory = (index) => {
	//   setActiveCategory(index)
	// }

	return (
		<div className='categories'>
			<ul>
				{/* {categories.map((categoryName, i) => <li key={ i} onClick={ () => onClickCategory(i)} className={value === i  ? 'active' : ''}>{categoryName}</li>)} */}
				{categories.map((categoryName, i) => (
					<li
						key={i}
						onClick={() => onChangeCategoryId(i)}
						className={value === i ? 'active' : ''}
					>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
