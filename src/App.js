
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Store, { Context } from './utils/Store'
import { useState } from "react";
import Login from './components/Login';
import IsLoggedin from './utils/IsLoggedin';
import Mint from './components/Mint';
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router';
import Button from './components/Button';


function App() {
let history = useHistory();

  return (
    <div className="App">
      <Store>
        <BrowserRouter>
        <IsLoggedin />
        <Button />
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/">
              <Mint/>
            </Route>
          </Switch>
        </BrowserRouter>
      </Store>
    </div>

  );
}

export default App;
