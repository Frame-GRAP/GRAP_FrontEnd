import React, {useEffect, useRef, useState} from "react";
import './Nav.css';
import grap_logo from './img/grap_logo2-2.png';
import search from './img/search.jpg';
import profile from './img/profile_big.png';
import membership from './img/membership.jpg';
import {useHistory} from "react-router-dom";
import {CgSearch} from 'react-icons/cg'
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "./features/userSlice";
import axios from "axios";


function Nav() {
    const history = useHistory();
    const [show, handleShow] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const transitionNavBar = () => {
        if(window.scrollY > 100){
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, []);

    const SignOut = async event => {
        dispatch(logout())
        console.log(user);
        history.push("/");
    }

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <div className="nav_contents">
                <div className="nav_logo">
                    <img className='logo' src={grap_logo} alt="logo"/>
                </div>
                <div className="nav_menu">
                    <ul className="nav_menu">
                        <li className="nav_home" onClick={() => history.push("/")}>홈</li>
                        <li className="nav_zzim" onClick={() => history.push("/myList")}>내가 찜한 콘텐츠</li>
                    </ul>
                </div>
                <div className="nav_secondary">
                    <div className="secondary_element">
                        <div className="search_element">
                            {/* <img className="nav_search" src={search} alt="search" onClick={() => history.push("/")}/> */}
                            <CgSearch
                                className="nav_search"
                                onClick={() => history.push("/")}
                            />
                        </div>
                    </div>
                    <div className="secondary_element">
                        <div className="membership_element">
                            <img className="nav_membership" src={membership} alt="membership" onClick={() => history.push("/")}/>
                        </div>
                    </div>
                    <div className="secondary_element">
                        <div className="dropdown_element">
                            <img className="dropdown_user" src={profile} alt="profile"/>
                            <div className="dropdown_content">
                                <ul className="drop_list">
                                    <li className="drop_item">
                                        <span onClick={() => {history.push("/mypage")}}>마이페이지</span>
                                    </li>
                                    <li className="drop_item">
                                        <span onClick={SignOut}>로그아웃</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav;
