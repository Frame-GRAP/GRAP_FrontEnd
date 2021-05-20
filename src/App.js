import React, {useEffect} from 'react';
import './App.css';
import HomeScreen from './screens/home/HomeScreen';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "./features/userSlice";
import MyListScreen from "./screens/MyListScreen";

function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!user){
            dispatch(logout());
        }
    }, [dispatch]);

    console.log(user);

    return (
        <div className="app">
            <Router>
                {!user ? (
                    <LoginScreen />
                ) : (
                    <Switch>
                        <Route exact path="/">
                            <HomeScreen />
                        </Route>
                        <Route exact path="/myList">
                            <MyListScreen />
                        </Route>
                    </Switch>
                )}
            </Router>
        </div>
    );
}

export default App;
