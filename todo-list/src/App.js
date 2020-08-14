import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// Pages
// import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';
import Login from './components/Login';
import Todolist from './components/Todolist';
import PrivateRoute from './components/PrivateRoute';
// import EditTodo from './components/EditTodo';
// Action
import { loadUser } from './action/auth';
// Set Token
import setAuthToken from './utils/setAuthtoken';
//Redux
import { Provider } from 'react-redux';
import store from './store';
//

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          {/* <PrivateRoute exact path='/' component={Navbar} /> */}
          <PrivateRoute exact path='/' component={Todolist} />
          {/* <PrivateRoute exact path='/edit/:id' component={EditTodo} /> */}
          <Route path='*' component={PageNotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
