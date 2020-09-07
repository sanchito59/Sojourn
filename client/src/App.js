import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/organisms/Navbar';
import CustomAlert from './components/atoms/CustomAlert';
import Register from './components/organisms/auth/Register';
import Login from './components/organisms/auth/Login';
import Landing from './components/pages/Landing';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
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
            </Switch>
          </>
        </>
      </Router>
    </Provider>
  )
}

export default App;
