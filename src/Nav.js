import React, {useEffect, useState} from "react";
import './Nav.css';
import grap_logo from './img/grap_logo2-1.png';
import profile from './img/profile_big.png';
import {IoSearchCircleSharp} from "react-icons/io5"
import styled from 'styled-components'

function Nav() {
    const [show, handleShow] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);

    const transitionNavBar = () => {
        if(window.scrollY > 100){
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    function searchBtn(){
        setSearchVisible(prev=>!prev);
        console.log("search : "+searchVisible);
    }
    function preventEvent(e){
        e.preventDefault();
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, []);

    return (
        /*{`nav ${show && "nav_black"}`}*/
        /*"nav nav_black"*/
        <div className={`nav ${show && "nav_black"}`}>
            <div className="nav_contents">
                <img className="nav_logo" src={grap_logo} alt="logo"/>
                { searchVisible ? (
                    <form className="Search__form">
                        <input type="text" className="search__typing"></input>
                        <input type="submit" className="search__submit" onClick={preventEvent}></input> {/* 일단 이동하는거 멈추려고 prevent Default 걸어놨음. */}
                        <img src="" ></img> {/* 축소하는 버튼 아이콘 */}
                    </form>
                ): ""}           
                <SearchButton onClick={searchBtn}/>
                <img className="nav_avatar" src={profile} alt="profile"/>
            </div>
        </div>
    )
}

const SearchButton = styled(IoSearchCircleSharp)`
    cursor: pointer;
    color: #fff;
    position: fixed;
    right: 13%;
    width: 60px;
    height: 60px;
`

export default Nav;
