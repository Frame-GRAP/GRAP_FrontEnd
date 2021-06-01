import React, {useEffect} from 'react';
import './App.css';
import HomeScreen from './screens/home/HomeScreen';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import {useDispatch, useSelector} from "react-redux";
import {login, logout, selectUser} from "./features/userSlice";
import MyListScreen from "./screens/MyListScreen";
import Mypage from "./screens/mypage/Mypage";
import UserInfo from './screens/mypage/UserInfo';
import MembershipScreen from "./screens/membership/MembershipScreen";
import CategoryScreen from "./screens/category/CategoryScreen";

function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const id = window.localStorage.getItem('user_id');
        const name = window.localStorage.getItem('name');
        const nickname = window.localStorage.getItem('nickname');
        if(id) {
            dispatch(login({
                user_id : id,
                name : name,
                nickname: nickname
            }))
        }
        else {
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
                        <Route exact path="/mypage">
                            <Mypage />
                        </Route>
                        <Route exact path="/userInfo">
                            <UserInfo />
                        </Route>
                        <Route exact path="/membership">
                            <MembershipScreen />
                        </Route>
                        <Route exact path="/category">
                            <CategoryScreen />
                        </Route>
                    </Switch>
                )}
            </Router>
        </div>
    );
}

export default App;
