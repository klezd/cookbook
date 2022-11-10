import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
	fab,
	faGoogle,
	faFacebookF,
	faYoutube
} from '@fortawesome/free-brands-svg-icons';
import {
	far,
	faHeart as farHeart,
	faCircle
} from '@fortawesome/free-regular-svg-icons';
import {
	fas,
	faMapMarkerAlt,
	faHeart as fasHeart,
	faLink
} from '@fortawesome/free-solid-svg-icons';

import Layout from './page/Layout';
import Home from './page/Home';
import NotFound from './page/NotFound';
import Search from './page/Search';
import MealsByCategory from './page/MealsByCategory';
import MealsByArea from './page/MealsByArea';
import MealsByIngs from './page/MealsByIngs/MealsByIngs';
import Meal from './page/Meal';
import Category from './page/Category';
import Area from './page/Area';
import Ingredients from './page/Ingredients';
import MyPage from './page/User';

import theme from './utils/theme';

import './App.css';

library.add(
	fab,
	fas,
	far,
	faGoogle,
	faFacebookF,
	faYoutube,
	faMapMarkerAlt,
	farHeart,
	fasHeart,
	faCircle,
	faLink
);

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Router>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="/category">
								<Route index element={<Category></Category>} />
								<Route path="/category/:category">
									<Route index element={<MealsByCategory></MealsByCategory>} />
								</Route>
							</Route>
							<Route path="/area">
								<Route index element={<Area></Area>} />
								<Route path="/area/:area">
									<Route index element={<MealsByArea></MealsByArea>} />
								</Route>
							</Route>
							<Route path="/search">
								<Route index element={<Search></Search>} />
								<Route path="/search/:ingredient">
									<Route index element={<Search></Search>} />
								</Route>
							</Route>
							<Route path="/meals">
								<Route index element={<Ingredients></Ingredients>} />
								<Route path="/meals/ingredients/:ingredients">
									<Route index element={<MealsByIngs></MealsByIngs>} />
								</Route>
								<Route path="/meals/:id">
									<Route index element={<Meal></Meal>} />
								</Route>
							</Route>
							<Route path="/my-page">
								<Route index element={<MyPage></MyPage>} />
							</Route>
							<Route path="/my-personal-info">
								<Route index element={<MyPage></MyPage>} />
							</Route>
							<Route path="*">
								<Route index element={<NotFound></NotFound>} />
							</Route>
						</Route>
					</Routes>
				</Router>
			</div>
		</ThemeProvider>
	);
}

export default App;
