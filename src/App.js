import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {PostProvider} from './Components/Context';

import SignUp from './Components/Sign Up/SignUp';

import './App.css'

import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import Content from './Components/Content/Content';

const LightTheme = {
  
}

const DarkTheme = {
  
}

const themes = {
  light: LightTheme,
  dark: DarkTheme
}


function App() {
  const [theme, setTheme] = useState('light');
  return (
    <PostProvider>
      <div className="App">
      <ThemeProvider theme={themes[theme]}>
      <Router>
        <Switch>
          <Route exact path='/' ><Home theme={theme} setTheme={setTheme} /></Route>
          <Route path='/sign-up' ><SignUp theme={theme} setTheme={setTheme} /></Route>
          <Route path='/my-account/:username' component={Dashboard} ></Route>
          <Route path='/:title' component={Content} ></Route>
        </Switch>
      </Router>
      </ThemeProvider>
    </div>
    </PostProvider>
  );
}

export default App;
