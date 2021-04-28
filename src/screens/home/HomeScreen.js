import React, { useState, useEffect } from "react";
import "./HomeScreen.css"
import $ from "jquery"
import styled from 'styled-components'
import grap_logo from '../../img/grap_logo2-1.png'


// HomeScreen의 구성 요소
import Nav from "../../Nav";
import Banner from "../../Banner";
import Row from "../../Row";
import Modal from "../../Modal"

// Modal의 구성 요소
import PopupMainVideo from '../popup/PopupMainVideo'
import PopupRelatedVideo from '../popup/PopupRelatedVideo'
import PopupReview from '../popup/PopupReview'
import PopupGameDescription from "../popup/PopupGameDescription";



function HomeScreen(){
    const [visible, setVisible] = useState(false);
    const [coordY, setCoordY] = useState(0);
    useEffect(()=> {
        $(".popup_btn").mouseup(function() {
            setVisible(true);
            setCoordY(window.scrollY);
            console.log(coordY)

            $("#homeScreen").addClass('layer-open');
            $(".layer-open").css({
                // "transform" : "translateY("+coordY+")"
                // "top" : -coordY
                // "background-color" : "green"
            })
        })
        $(".game_info").mouseup(function() {
            setVisible(true);
        })
    }, [coordY])

    return (
        <div id="homeScreen" className="homeScreen">
            <Nav />

            <Banner />

            <Row title="금주의 인기순위" visible={visible} setVisible={setVisible}/>
            <Row title="인기 급상승" visible={visible} setVisible={setVisible} />
            <Row title="RPG" visible={visible} setVisible={setVisible} />
            <Row title="FPS" visible={visible} setVisible={setVisible} />
            <Row title="AOS" visible={visible} setVisible={setVisible} />

            <Modal 
                visible={visible} 
                setVisible={setVisible}
                coordY={coordY}
                setCoordY={setCoordY} > 
                <img 
                    className='modal__logo'
                    src={grap_logo}    
                    alt="" 
                />
                <div className="popUp">
                    <div className="video">
                        <PopupMainVideo />
                        {/* <hr className="contour"></hr> */}
                        <PopupGameDescription />
                        {/* <hr className="contour"></hr> */}
                        <PopupReview />
                    </div>
                    <div className="video">
                        <PopupRelatedVideo />
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default HomeScreen;
