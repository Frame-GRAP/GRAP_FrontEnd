import React, {useEffect, useRef, useState} from "react";
import './Nav.css';
import grap_logo from './img/grap_logo2-1.png';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "./features/userSlice";
import {IconButton} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";
import SearchIcon from '@material-ui/icons/Search';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

function Nav({setSearchWord, setSearching}) {
    const history = useHistory();
    const [show, handleShow] = useState(false);
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
        localStorage.removeItem('user_id');
        localStorage.removeItem('name');
        localStorage.removeItem('nickname');
        history.push("/");
    }

    const handleChange = (e) => {
        setTimeout(() => {
            const temp = e.target.value;
            if(temp.length > 0){
                setSearching(true);
                setSearchWord(temp);
            }
            else{
                setSearching(false);
            }
        }, 1000);

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
                        <li className="nav_category" onClick={() => history.push("/category")}>카테고리</li>
                        <li className="nav_zzim" onClick={() => history.push("/myList")}>내가 찜한 콘텐츠</li>
                    </ul>
                </div>
                <div className="nav_secondary">
                    <div className="secondary_element">
                        <div className="search_element">
                            <input className="search expandright" id="searchright"
                                   type="search" name="q" placeholder="Search" onChange={handleChange}/>
                            <label className="button searchbutton" htmlFor="searchright">
                                <IconButton
                                    aria-label="delete"
                                    className="nav_search"
                                    /*onClick={() => history.push("/")}*/
                                >
                                    <SearchIcon style={{ fontSize: 40, color: grey[50]}}/>
                                </IconButton>
                            </label>
                        </div>
                    </div>
                    <div className="secondary_element">
                        <div className="membership_element">
                            <IconButton
                                aria-label="delete"
                                className="nav_membership"
                                onClick={() => history.push("/")}
                            >
                                <VpnKeyIcon style={{ fontSize: 40, color: grey[50]}}/>
                            </IconButton>
                        </div>
                    </div>
                    <div className="secondary_element">
                        <div className="dropdown_element">
                            <IconButton
                                aria-label="delete"
                                className="dropdown_user"
                            >
                                <AccountBoxIcon style={{ fontSize: 40, color: grey[50]}}/>
                            </IconButton>
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
