import React, { useState, useEffect, useRef, useCallback } from "react";
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
import PopupDeclaration from '../popup/PopupDeclaration'

import {selectUser} from './../../features/userSlice'
import {useSelector} from "react-redux";

function HomeScreen(){
    const [visible, setVisible] = useState(false);

    const [gameData, setGameData] = useState([]);
    const [videoData, setVideoData] = useState([]);

    const [popupUrl, setPopupUrl] = useState("");
    const [popupGameData, setPopupGameData] = useState([]);
    const [popupMainVideoIndex, setPopupMainVideoIndex] = useState(0);

    const [declare_visible, setDeclare_visible] = useState(false);
    const [declare_part, setDeclare_part] = useState(true);
    const [declare_contents, setDeclare_contents] = useState("");
    const [declare_reviewId, setDeclare_reviewId] = useState(0);


    // Data Fetch
    const axios = require('axios');
    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get("http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/all");

            setGameData(request.data);
            return request;
        }

        fetchData();
    }, []);

    // popupGameData Fetch (popupUrl이 바뀔때 마다)
    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get(popupUrl);

            setPopupGameData(request.data);
            return request;
        }
        fetchData();

    }, [popupUrl])
        
    // ESC 누르면 팝업창 사라짐
    const keyPress = useCallback(e=> {
        if(e.key === 'Escape'&& visible){
            setVisible(false);
            $(".not_scroll").css("top", '');
            $("#homeScreen").removeClass("not_scroll")
            document.getElementById('homeScreen').classList.remove("not_scroll")
        }
    }, [visible, setVisible])
    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
    }, [keyPress])



    // 배경 누르면 팝업창 닫기 위한 변수
    const modalRef = useRef();

    var posY;
    useEffect(()=> {
        $(".modal_closeBtn").click(function(e) {
            setVisible(false);
            $("#homeScreen").removeClass("not_scroll")
            $("#homeScreen").scrollTop(posY);
        })

        $(".modal_background").click(function(e) {
            if(modalRef.current === e.target){
              setVisible(false);
              $("#homeScreen").removeClass("not_scroll");
              $("#homeScreen").scrollTop(posY);
            }
        })
    }, [])
    

    return (
        <>
        <div id="homeScreen" className="homeScreen">
            <Nav />

            <Banner />

            <Row 
                title="All Games" 
                gameData={gameData}
                setPopupUrl={setPopupUrl}
                setVisible={setVisible}
                posY={posY}
            />
            <Row 
                title="All Games" 
                gameData={gameData}
                setPopupUrl={setPopupUrl}
                setVisible={setVisible}
                posY={posY}
            />
            <Row 
                title="All Games" 
                gameData={gameData}
                setPopupUrl={setPopupUrl}
                setVisible={setVisible}
                posY={posY}
            />

        </div>
        <div>
            <Modal
                modalRef={modalRef}
                visible={visible} 
                gameData={gameData}
                posY={posY} >
                {(visible && 
                <>
                    <img
                        className='modal__logo'
                        src={grap_logo}    
                        alt="" 
                    />

                    <div className="popUp">
                        <div className="video">
                            <PopupMainVideo
                                popupGameData={popupGameData}
                                popupMainVideoIndex={popupMainVideoIndex}
                                setDeclare_visible={setDeclare_visible} 
                                setDeclare_part={setDeclare_part}
                            />
                            <PopupGameDescription 
                                popupGameData={popupGameData} 
                            />
                            <PopupReview 
                                popupGameData={popupGameData}  
                                setDeclare_visible={setDeclare_visible} 
                                setDeclare_part={setDeclare_part}  
                                setDeclare_reviewId={setDeclare_reviewId}           
                            />
                        </div>
                        <div className="video">
                            <PopupRelatedVideo 
                                popupGameData={popupGameData}
                                setPopupMainVideoIndex={setPopupMainVideoIndex}
                            />
                        </div>
                    </div>
                </>
                )}
            </Modal>
            
            <PopupDeclaration 
                popupGameData={popupGameData}
                popupMainVideoIndex={popupMainVideoIndex}
                declare_visible={declare_visible} 
                setDeclare_visible={setDeclare_visible}
                declare_part={declare_part} 
                declare_contents={declare_contents}
                setDeclare_contents={setDeclare_contents}
                declare_reviewId={declare_reviewId}
            />
        </div>
        </>
       
    )
}

export default HomeScreen;
