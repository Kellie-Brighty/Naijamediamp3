import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import './App.css'

import Home from './Components/Home';

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
    <div className="App">
      <ThemeProvider theme={themes[theme]}>
      <Router>
        <Switch>
          <Route exact path='/' ><Home theme={theme} setTheme={setTheme} /></Route>
        </Switch>
      </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
