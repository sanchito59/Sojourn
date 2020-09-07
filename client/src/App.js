import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/organisms/Navbar';
import Register from './components/organisms/auth/Register';
import Login from './components/organisms/auth/Login';
import Landing from './components/pages/Landing';

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </>
      </>
    </Router>
  )
}

export default App;
