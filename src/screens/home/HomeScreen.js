import React, { useState, useEffect, useRef, useCallback } from "react";
import "./HomeScreen.css"
import $ from "jquery"
import styled from 'styled-components'
import axios from 'axios'
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
import Footer from "../../Footer";
import RowCustom from "../../RowCustom";
import TempRow from "../../TempRow";

function HomeScreen(){
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const [popupUrl, setPopupUrl] = useState("");
    const [popupGameData, setPopupGameData] = useState([]);
    const [popupMainVideoIndex, setPopupMainVideoIndex] = useState(0);

    const [declare_visible, setDeclare_visible] = useState(false);
    const [declare_part, setDeclare_part] = useState(true);
    const [declare_contents, setDeclare_contents] = useState("");
    const [declare_reviewId, setDeclare_reviewId] = useState(0);

    const [categoryResult, setCategoryResult] = useState([]);

    const [userOwnCategory, setUserOwnCategory] = useState([]);
    const [popGame, setPopGame] = useState([]);
    const [mainGameName, setMainGameName] = useState("");
    const [relatedGame, setRelatedGame] = useState([]);
    const user = useSelector(selectUser);

    useEffect(()=> {
        async function fetchUserData() {
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/userCategoryPreference/all`)
                .then((res) => {
                    setUserOwnCategory(res.data[1]);
                    setCategoryResult(res.data);
                })
            return categoryResult;
        }

        ///인기급상승 api 추가
        async function fetchCustomData() {
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/gameAndCustomTab/all`)
                .then((res) => {
                    setPopGame(res.data);
                })
            return popGame;
        }

        //관련잇는게임
        async function fetchRelatedData() {
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/userGamePreference`)
                .then((res) => {
                    const main_id = res.data.gameId;
                    axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${main_id}/relatedGame`)
                        .then((res) => {
                            const gameIds = res.data.relatedGameId.split(" ");
                            const gameName = res.data.gameName;
                            const arr = new Array();
                            gameIds.map((gameId, index) => {
                                const temp = new Object();
                                temp.gameId = gameId;
                                arr.push(temp);
                            })
                            setRelatedGame(arr);
                            setMainGameName(gameName);
                        })
                })
        }

        fetchUserData();
        fetchCustomData();
        fetchRelatedData();

        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [])

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


    if(loading) return (<div>Loading...</div>);
    return (
        <>
            <div id="homeScreen" className="homeScreen">
                <Nav />

                <Banner />


                <Row
                    title={`${user.nickname}님을 위한 맞춤 콘텐츠`}
                    category={userOwnCategory}
                    setPopupUrl={setPopupUrl}
                    setVisible={setVisible}
                    posY={posY}
                />


                <RowCustom
                    title="실시간 인기 급상승"
                    gameArr={popGame}
                    setPopupUrl={setPopupUrl}
                    setVisible={setVisible}
                    posY={posY}
                />

                <RowCustom
                    title={`${mainGameName}과 관련된 컨텐츠`}
                    gameArr={relatedGame}
                    setPopupUrl={setPopupUrl}
                    setVisible={setVisible}
                    posY={posY}
                />

                {/*<TempRow
                title="신규 게임"
                setPopupUrl={setPopupUrl}
                setVisible={setVisible}
                posY={posY}
            />*/}
               {categoryResult.map((set, index) => {
                    return(
                        <Row
                            key={index}
                            title={`${set.uiName} 게임`}
                            category={set}
                            setPopupUrl={setPopupUrl}
                            setVisible={setVisible}
                            posY={posY}
                        />
                    )
                })}


            </div>
            <div>
                <Modal
                    modalRef={modalRef}
                    visible={visible}
                    posY={posY} >
                    {(visible &&
                        <>
                            <img
                                className='popup__logo'
                                src={grap_logo}
                                alt=""
                            />

                            <div className="popUp">
                                <div className="videos">
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
            <Footer />
        </>

    )
}

export default HomeScreen;
