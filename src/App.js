import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		if (window.localStorage.getItem('products')) {
			return setCart([...JSON.parse(window.localStorage.getItem('products'))])
		}
	}, [])

	const addItem = item => {
		// add the given item to the cart
		setCart([...cart, item])
		window.localStorage.setItem('products', JSON.stringify([...cart, item]))
	};

	const removeItem = (id) => {
		const newCart = cart.filter(item => item.id !== id)
		setCart(newCart)
		window.localStorage.setItem('products', JSON.stringify(newCart))
	}

	return (
		<div className="App">
			<ProductContext.Provider value={{products, addItem, removeItem}}>
				<CartContext.Provider value={cart}>
					<Navigation/>
					<Route exact path="/" component={Products}/>
					<Route path="/cart" component={ShoppingCart}/>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
