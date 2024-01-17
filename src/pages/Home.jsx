import qs from 'qs'; //  //npm i qs
import { useContext, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
	setCategoryId,
	setCurrentPage,
	setFilters,
	setSortType,
} from '../redux/slices/filterSlice';

import axios from 'axios';

import { SearchContext } from '../App';
import Pagination from '../components/Pagination';
import Categories from '../components/categories';
import PizzaBlock from '../components/pizza-block';
import Skeleton from '../components/pizza-block/Skeleton';
import Sort, { kindsSort } from '../components/sort';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const categoryId = useSelector(state => state.filter.categoryId);
	const sortType = useSelector(state => state.filter.sort);
	const { currentPage } = useSelector(state => state.filter);

	const onChangeCategoryId = id => {
		dispatch(setCategoryId(id));
		//console.log(id)
	};

	const onChangeCurrentPage = number => {
		dispatch(setCurrentPage(number));
	};
	const onChangeSortType = id => {
		dispatch(setSortType(id)); // {type: 'sadsada', setSort: action.payload}
	};

	const fetchPizzas = () => {
		setIsLoading(true);
		const sortBy = sortType.sortProperty.replace('-', '');
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `${categoryId}` : '';
		// const search = valueInputSearch ? `&search=${valueInputSearch}` : ''; // search thank to back-end
		// fetch(
		//   `https://6465dc6d9c09d77a62f60a25.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortby=${sortBy}&order=${order}`,
		// )
		//   .then((res) => res.json())
		//   .then((arr) => {
		//     setItems(arr);
		//     setIsLoading(false);
		//   });
		axios
			.get(
				`https://6465dc6d9c09d77a62f60a25.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortby=${sortBy}&order=${order}`
			)
			.then(res => {
				setItems(res.data);
				setIsLoading(false);
			});
	};

	const { valueInputSearch } = useContext(SearchContext);

	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	//const [categoryId, setCategoryId] = useState(0);
	//const [currentPage, setCurrentPage] = useState(1);
	// const [sortType, setSortType] = useState({
	//   name: 'popular',
	//   sortProperty: 'rating',
	// });

	useEffect(() => {
		if (isMounted.current) {
			// false- no first renderer - no stitching
			const queryString = qs.stringify({
				// directly sews parameters at first render
				sortType: sortType,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`); // push to adress
			// console.log("queryString", queryString)
		}
		isMounted.current = true; // the second time the renderer changes the 2nd 3rd time
	}, [categoryId, sortType, currentPage, valueInputSearch]);

	// ЕIf there was the first renderer, check the URL - params and save to REDUX
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)); // without ?

			const sort = kindsSort.find(
				obj => obj.sortProperty === params.sortType.sortProperty
			);

			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
			isSearch.current = true; // Make so that, the request was sent when the parameters in the URL changed!!!
		}
		// EL DISPATCH works, then the track useEffect makes a query with parameters with REDUX
	}, []);
	// If there was the first renderer, requested pizzas
	useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			fetchPizzas();
		}

		isSearch.current = false;
	}, [categoryId, sortType, currentPage, valueInputSearch]); //valueInputSearch

	// Fitst variant for static arrays
	const pizzas = items
		.filter(obj =>
			obj.title.toLowerCase().includes(valueInputSearch.toLowerCase())
		)
		.map(obj => <PizzaBlock key={obj.id} {...obj} />);
	//const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />) // search thank to back-end
	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<div className='container'>
			<div className='content__top'>
				{/* <Categories value={categoryId} onClickCategory={(i) => setActiveCategory(i)} /> */}
				<Categories
					value={categoryId}
					onChangeCategoryId={onChangeCategoryId}
				/>

				<Sort value={sortType} onChangeSortType={onChangeSortType} />
			</div>
			<h2 className='content__title'>All Pizzas</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination
				currentPage={currentPage}
				onChangeCurrentPage={onChangeCurrentPage}
			/>
		</div>
	);
};

export default Home;
