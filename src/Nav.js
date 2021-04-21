import React, {useEffect, useState} from "react";
import './Nav.css';
import grap_logo from './img/grap_logo2-2.png';
import profile from './img/profile_big.png';

function Nav() {
    const [show, handleShow] = useState(false);

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

    return (
        /*{`nav ${show && "nav_black"}`}*/
        /*"nav nav_black"*/
        <div className={`nav ${show && "nav_black"}`}>
            <div className="nav_contents">
                <img className="nav_logo" src={grap_logo} alt="logo"/>
                <img className="nav_avatar" src={profile} alt="profile"/>
            </div>
        </div>
    )
}

export default Nav;
