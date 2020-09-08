import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/organisms/Navbar';
import CustomAlert from './components/atoms/CustomAlert';
import Register from './components/organisms/auth/Register';
import Login from './components/organisms/auth/Login';
import Landing from './components/pages/Landing';
import Dashboard from './components/pages/Dashboard';
import PrivateRoute from './components/molecules/PrivateRoute';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import store from './store';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token) // @TODO: No local storage
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <>
            <CustomAlert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </>
        </>
      </Router>
    </Provider>
  )
}

export default App;
