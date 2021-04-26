import React, { useState, useEffect } from "react";
import "./HomeScreen.css"
import $ from "jquery"
import styled from 'styled-components'

// HomeScreen의 구성 요소
import Nav from "../../Nav";
import Banner from "../../Banner";
import Row from "../../Row";
import Modal from "../../Modal"

// Modal의 구성 요소
import PopupMainVideo from '../popup/PopupMainVideo'
import PopupRecomend from '../popup/PopupRecomend'
import PopupRelatedVideo from '../popup/PopupRelatedVideo'
import PopupReview from '../popup/PopupRelatedVideo'



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
    }, [coordY])

    return (
        <div id="homeScreen" className="homeScreen">
            <Nav />

            <Banner />
            <button className="popup_btn">Popup Page</button>

            <Row title="금주의 인기순위" />
            <Row title="인기 급상승" />
            <Row title="RPG" />
            <Row title="FPS" />
            <Row title="AOS" />

            <Modal 
                visible={visible} 
                setVisible={setVisible}
                coordY={coordY}
                setCoordY={setCoordY} > 
                <img 
                    className='modal__logo'
                    src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"    
                    alt="" 
                />
                <div className="popUp">
                    <div className="video">
                        Video Info
                        <PopupMainVideo />
                        <PopupReview />
                        <PopupRecomend />
                    </div>
                    <div className="video">
                        Related Video
                        <PopupRelatedVideo />
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default HomeScreen;
