import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { library } from '@fortawesome/fontawesome-svg-core';

import { fab, faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {
	fas,
	faGem,
	faFemale,
	faMale,
	faBolt
} from '@fortawesome/free-solid-svg-icons';

import Layout from './page/Layout';
import Home from './page/Home';
import NotFound from './page/NotFound';
import Search from './page/Search';
import MealsList from './page/MealsByCategory';
import Meal from './page/Meal';
import Category from './page/Category';
import MyPage from './page/User';

import theme from './utils/theme';

import './App.css';

library.add(
	fab,
	fas,
	far,
	faGoogle,
	faFacebookF,
	faGem,
	faFemale,
	faMale,
	faBolt
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
									<Route index element={<MealsList></MealsList>} />
								</Route>
							</Route>
							<Route path="/search">
								<Route index element={<Search></Search>} />
								<Route path="/search/:ingredient">
									<Route index element={<Search></Search>} />
								</Route>
							</Route>
							<Route path="/meal">
								<Route path="/meal/:id/:name">
									<Route index element={<Meal></Meal>} />
								</Route>
							</Route>
							<Route path="/my-page">
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
