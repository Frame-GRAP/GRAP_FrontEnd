import React, { useState, useEffect, useRef, useCallback } from "react";
import "./HomeScreen.css"
import $ from "jquery"
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
import SearchScreen from "../search/SearchScreen";
import VideoModal from "../../VideoModal";

function HomeScreen(){
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [myGame, setMyGame] = useState([]);

    const [popupUrl, setPopupUrl] = useState("");
    const [popupGameData, setPopupGameData] = useState([]);
    const [popupMainVideoIndex, setPopupMainVideoIndex] = useState(0);
    // const [popupMainVideoIndex, setPopupMainVideoIndex] = useState(80);

    const [declare_visible, setDeclare_visible] = useState(false);
    const [declare_part, setDeclare_part] = useState(true);
    const [declare_contents, setDeclare_contents] = useState("");
    const [declare_reviewId, setDeclare_reviewId] = useState(1);

    const [categoryResult, setCategoryResult] = useState([]);

    const [userOwnCategory, setUserOwnCategory] = useState([]);
    const [popGame, setPopGame] = useState([]);
    const [forUserGame, setForUserGame] = useState([]);
    const [mainGameName, setMainGameName] = useState("");
    const [relatedGame, setRelatedGame] = useState([]);
    const user = useSelector(selectUser);


    const [searching, setSearching] = useState(false);
    const [searchWord, setSearchWord] = useState("");

    const [videoShow, setVideoShow] = useState(false);
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);
    const [curGame, setCurGame] = useState([]);

    useEffect(()=> {

        //유저맞춤형
        async function fetchForUserData() {
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/RecommendGameForUser`)
                .then((res) => {
                    setForUserGame(res.data);
                })
            return forUserGame;
        }

        //유저가 즐겨하는 카테고리
        async function fetchUserData() {
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/userCategoryPreference/all`)
                .then((res) => {
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
        async function fetchMyData() {
            setMyGame([]);
            const userId = user.user_id;
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/favor/all`)
                .then((res) => {
                    res.data.map((game, index) => {
                        const id = game.gameId;
                        setMyGame(myGame => [...myGame, id]);
                    })
                });
            return myGame;
        }

        fetchForUserData();
        fetchUserData();
        fetchCustomData();
        fetchRelatedData();
        fetchMyData();

        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [])

    // popupGameData Fetch (popupUrl이 바뀔때 마다)
    useEffect(()=> {
        axios.get(popupUrl).then((res)=>{
            setPopupGameData(res.data);
            axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${res.data.id}/video/all`).then((res)=>{

                // 영상 없으면 1번 영상으로 대체하는 코드
                if(res.data.length==0){
                    axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/1/video/all`).then((res)=>{
                        setPopupMainVideoIndex(res.data[0].id);
                    })
                }else{
                    setPopupMainVideoIndex(res.data[0].id);
                }
            })
        })
        setLoading(false);
        return () => {
            setLoading(true);
        }
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
    }, []);

    if(loading) return (<div>Loading...</div>);
    return (
        <>
            <div id="homeScreen" className="homeScreen">
                <Nav setSearchWord={setSearchWord} setSearching={setSearching}/>
                { searching ? (
                    <SearchScreen searchWord={searchWord} />
                ) : (
                    <>
                        <Banner />
                        {(forUserGame.length > 0) &&
                        <RowCustom
                            videoShow={videoShow}
                            setVideoShow={setVideoShow}
                            setX={setX}
                            setY={setY}
                            title={`${user.nickname}님을 위한 맞춤 콘텐츠`}
                            gameArr={forUserGame}
                            setPopupUrl={setPopupUrl}
                            setVisible={setVisible}
                            posY={posY}
                            setCurGame={setCurGame}
                        />}


                        <RowCustom
                            videoShow={videoShow}
                            setVideoShow={setVideoShow}
                            setX={setX}
                            setY={setY}
                            title="실시간 인기 급상승"
                            gameArr={popGame}
                            setPopupUrl={setPopupUrl}
                            setVisible={setVisible}
                            posY={posY}
                            setCurGame={setCurGame}
                        />

                        <RowCustom
                            videoShow={videoShow}
                            setVideoShow={setVideoShow}
                            setX={setX}
                            setY={setY}
                            title={`${mainGameName}과 관련된 컨텐츠`}
                            gameArr={relatedGame}
                            setPopupUrl={setPopupUrl}
                            setVisible={setVisible}
                            posY={posY}
                            setCurGame={setCurGame}
                        />
                        {categoryResult.map((set, index) => {
                            return(
                                <Row
                                    key={index}
                                    index={index}
                                    videoShow={videoShow}
                                    setVideoShow={setVideoShow}
                                    setX={setX}
                                    setY={setY}
                                    title={`${set.uiName} 게임`}
                                    category={set}
                                    setPopupUrl={setPopupUrl}
                                    setVisible={setVisible}
                                    posY={posY}
                                    setCurGame={setCurGame}
                                />
                            )
                        })}
                    </>
                )}
            </div>
            <div>
                <div className="video_modal">
                    {videoShow &&
                        <VideoModal
                            setVideoShow={setVideoShow}
                            X={X} Y={Y}
                            setPopupUrl={setPopupUrl}
                            OneOfGameData={curGame}
                            setOneOfGameData={setCurGame}
                            setVisible={setVisible}
                            posY={posY}
                            myGame={myGame}
                        />
                    }
                </div>

                <Modal
                    modalRef={modalRef}
                    visible={visible}
                    setVisible={setVisible}
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
                                            popupMainVideoIndex={popupMainVideoIndex}
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
    );
}

export default HomeScreen;
