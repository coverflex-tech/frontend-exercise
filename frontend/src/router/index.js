import {
  BrowserRouter as Router,
	Switch,
  Route
} from 'react-router-dom';

import Products from '../pages/products';
import Login from '../pages/login';
import User from '../pages/user';

import ProtectedRoute from './protected';

export function RouterApp() {
	return <Router>
		<Switch>
			<ProtectedRoute path='/products'>
				<Products />
			</ProtectedRoute>
			<ProtectedRoute path='/user/:userId'>
				<User />
			</ProtectedRoute>
			<Route>
				<Login />
			</Route>
		</Switch>
	</Router>
}
