import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';

import HomeScreen from './screens/home/HomeScreen';
import SignupScreen from "./screens/SignupScreen";
import Mypage from './screens/mypage/Mypage'


function App() {
    const user = null;

  return (
    <div className="app">
        {/*<Router>
            {!user ? (<LoginScreen />)
                : ( <Switch>
                    <Route exact path="/">
                        <HomeScreen />
                    </Route>
                </Switch>)}
            <Switch>
                <Route exact path="/">
                    <HomeScreen />
                </Route>
            </Switch>
        </Router>*/}

      <Router>
          <Switch>
              <Route exact path="/">
                <HomeScreen />
              </Route>
              <Route exact path="/signup">
                <SignupScreen />
              </Route>
              <Route exact path="/login">
                
              </Route>
              <Route exact path="/mypage">
                <Mypage />
              </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
