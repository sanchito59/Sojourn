import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/organisms/Navbar';
import CustomAlert from './components/atoms/CustomAlert';
import Register from './components/organisms/auth/Register';
import Login from './components/organisms/auth/Login';
import Landing from './components/pages/Landing';
import Dashboard from './components/pages/Dashboard';
import Profiles from './components/pages/Profiles';
import Profile from './components/pages/Profile';
import Posts from './components/pages/Posts';
import PrivateRoute from './components/molecules/PrivateRoute';
import CreateProfile from './components/molecules/Forms/CreateProfile';
import EditProfile from './components/molecules/Forms/EditProfile';
import AddExperience from './components/molecules/Forms/AddExperience';
import AddEducation from './components/molecules/Forms/AddEducation';
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
              <Route exact path="/explorers" component={Profiles} />
              <Route exact path="/explorer/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              <PrivateRoute exact path="/posts" component={Posts} />
            </Switch>
          </>
        </>
      </Router>
    </Provider>
  )
}

export default App;
