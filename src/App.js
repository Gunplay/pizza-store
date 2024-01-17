import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './scss/app.scss';

export const SearchContext = createContext();
// import pizzas from './assets/pizzaDB.json';

// Ctrl + H - replace
// Ctrl + D - mul insert

function App() {
	const [valueInputSearch, setValueInputSearch] = useState('');
	// const count = useSelector((state) => state.filter.value)
	// const dispatch = useDispatch() // object type and payload counter.incrament
	//const pathname = window.location.pathname;
	// {path === '/' && <Home/>}
	return (
		<div className='wrapper'>
			<SearchContext.Provider value={{ valueInputSearch, setValueInputSearch }}>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</SearchContext.Provider>
		</div>
	);
}

export default App;
