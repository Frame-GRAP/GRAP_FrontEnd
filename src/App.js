import React from 'react';
import './App.css';
import HomeScreen from './screens/home/HomeScreen';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import LoginScreen from "./screens/LoginScreen";

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
              <Route exact path="/login">
                  {/* <LoginScreen /> */}
              </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
