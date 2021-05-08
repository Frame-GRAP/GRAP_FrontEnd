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

function HomeScreen(){
    const [gameId, setGameId] = useState(0);
    const [gameData, setGameData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [declare_visible, setDeclare_visible] = useState(false);
    const [declare_part, setDeclare_part] = useState(true);
    const [declare_contents, setDeclare_contents] = useState("");

    // Data Fetch
    const axios = require('axios');
    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get("http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/all");
            setGameData(request.data);
            return request;
        }
    
        // fetchData();
    }, []);
    // console.log(gameData); // gameData 출력 확인

    function CancleDeclare() {
        setDeclare_visible(false);
    }
    function SubmitDeclare() {
        // Post할 내용 : {신고내용, 유저Id} - DB 나오는 내용에 따라 변동 가능.
        console.log(declare_contents);
        alert("댓글 신고가 완료되었습니다.");
        setDeclare_visible(false);
    }
    function GetReport(e){
        setDeclare_contents(e.target.innerText);
    }
        
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
                title="금주의 인기순위" 
                gameData={gameData} 
                visible={visible}
                setVisible={setVisible}   
                gameId={gameId}
                setGameId={setGameId}
                posY={posY}
            />
            <Row 
                title="인기 급상승" 
                gameData={gameData} 
                visible={visible} 
                setVisible={setVisible}       
                gameId={gameId}
                setGameId={setGameId}
                posY={posY}
            />
            <Row 
                title="RPG" 
                gameData={gameData} 
                visible={visible} 
                setVisible={setVisible}       
                gameId={gameId}
                setGameId={setGameId}
                posY={posY}
            />
            <Row 
                title="FPS" 
                gameData={gameData} 
                visible={visible} 
                setVisible={setVisible}       
                gameId={gameId}
                setGameId={setGameId}
                posY={posY}
            />
            <Row 
                title="AOS" 
                gameData={gameData} 
                visible={visible} 
                setVisible={setVisible}       
                gameId={gameId}
                setGameId={setGameId}
                posY={posY}
            />

        </div>
        <div>
            <Modal
                modalRef={modalRef}
                visible={visible} 
                gameData={gameData}
                gameId={gameId}
                posY={posY} >
                <img
                    className='modal__logo'
                    src={grap_logo}    
                    alt="" 
                />
                <div className="popUp">
                    <div className="video">
                        <PopupMainVideo setDeclare_visible={setDeclare_visible} setDeclare_part={setDeclare_part}/>
                        <PopupGameDescription gameData={gameData} gameId={gameId} />
                        <PopupReview setDeclare_visible={setDeclare_visible} setDeclare_part={setDeclare_part}/>
                    </div>
                    <div className="video">
                        <PopupRelatedVideo />
                    </div>
                </div>
            </Modal>
            <PopupDeclaration 
                declare_visible={declare_visible}
                setDeclare_visible={setDeclare_visible}
            >
                <h3 className="declare_part">
                    {declare_part ? "동영상 신고" : "댓글 신고"}  
                </h3><br/>

                <div className="declare_item">
                    <input type="radio" name="declare_radio" className="declare_radio" id="type1"  />
                    <label for="type1" className="declare_selection" onClick={GetReport}>{declare_part ? "성적인 콘텐츠":"성적인 댓글"}</label><br/>
                </div>
                <div className="declare_item">
                    <input type="radio" name="declare_radio" className="declare_radio" id="type2" />
                    <label for="type2" className="declare_selection" onClick={GetReport}>{declare_part ? "폭력적 또는 혐오스러운 콘텐츠":"폭력적 또는 혐오스러운 댓글"}</label><br/>
                </div>
                <div className="declare_item">
                    <input type="radio" name="declare_radio" className="declare_radio" id="type3" />
                    <label for="type3" className="declare_selection" onClick={GetReport}>{declare_part ? "증오 또는 학대하는 콘텐츠":"증오 또는 학대하는 댓글"}</label><br/>
                </div>
                <div className="declare_item">
                    <input type="radio" name="declare_radio" className="declare_radio" id="type4" />
                    <label for="type4" className="declare_selection" onClick={GetReport}>{declare_part ? "유해하거나 위험한 행위":"스팸 또는 사용자를 현혹하는 댓글"}</label><br/>
                </div>
                { declare_part && <div className="declare_item">
                    <input type="radio" name="declare_radio" className="declare_radio" id="type5" />
                    <label for="type5" className="declare_selection" onClick={GetReport}>스팸 또는 사용자를 현혹하는 콘텐츠</label><br/>
                </div> }

                <hr className="hr_tag"/>

                <div className="declare_submit_part">
                    <button onClick={CancleDeclare} className="declare_cancel">취소</button>
                    <button onClick={SubmitDeclare} className="declare_submit">신고</button>
                </div>

            </PopupDeclaration>
        </div>
        </>
       
    )
}

export default HomeScreen;
