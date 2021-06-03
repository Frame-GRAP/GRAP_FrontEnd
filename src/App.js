import React, {useEffect} from 'react';
import './App.css';
import HomeScreen from './screens/home/HomeScreen';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import {useDispatch, useSelector} from "react-redux";
import {login, logout, selectUser} from "./features/userSlice";
import MyListScreen from "./screens/MyListScreen";
import Mypage from "./screens/mypage/Mypage";
import UserInfo from './screens/userInfo/UserInfo';
import MembershipScreen from "./screens/membership/MembershipScreen";
import CategoryScreen from "./screens/category/CategoryScreen";
import CouponList from './screens/coupon/CouponList';

function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const user_id = window.localStorage.getItem('user_id');
        const name = window.localStorage.getItem('name');
        const nickname = window.localStorage.getItem('nickname');
        const membershipName = window.localStorage.getItem("membershipName");
        const availableCoupon = window.localStorage.getItem("availableCoupon");
        const nextPaymentDay = window.localStorage.getItem("nextPaymentDay");

        if(user_id) {
            dispatch(login({
                user_id : user_id,
                name : name,
                nickname: nickname,
                membershipName: membershipName,
                availableCoupon: availableCoupon,
                nextPaymentDay: nextPaymentDay
            }))
        }
        else {
            dispatch(logout());
        }
    }, [dispatch]);

    console.log(user);


    const check = () => {
        if(!user){
            return <LoginScreen />
        }
        if(user.nickname == null)
            return <UserInfo />
    }

    return (
        <div className="app">
            <Router>
                {!user ? (
                    check()
                ) : (
                    <Switch>
                        <Route exact path="/">
                            <HomeScreen />
                        </Route>
                        <Route exact path="/login">
                            <LoginScreen />
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
                        <Route exact path="/coupon">
                            <CouponList />
                        </Route>
                    </Switch>
                )}
            </Router>
        </div>
    );
}

export default App;
