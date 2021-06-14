import React, {useCallback, useEffect, useState, useRef} from "react";
import Nav from "../Nav";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import './MyListScreen.css';
import Video from "../Video";
import Footer from "../Footer";
import SearchScreen from "./search/SearchScreen";
import VideoModal from "../VideoModal";
import grap_logo from '../img/grap_logo2-1.png'
import $ from "jquery"

// Modal의 구성 요소
import PopupMainVideo from './popup/PopupMainVideo'
import PopupRelatedVideo from './popup/PopupRelatedVideo'
import PopupReview from './popup/PopupReview'
import PopupGameDescription from "./popup/PopupGameDescription";
import PopupDeclaration from './popup/PopupDeclaration'

import Modal from "../Modal"

function MyListScreen() {
    const [popupUrl, setPopupUrl] = useState("");
    const [popupGameData, setPopupGameData] = useState([]);
    const [popupMainVideoIndex, setPopupMainVideoIndex] = useState(0);

    const [declare_visible, setDeclare_visible] = useState(false);
    const [declare_part, setDeclare_part] = useState(true);
    const [declare_contents, setDeclare_contents] = useState("");
    const [declare_reviewId, setDeclare_reviewId] = useState(1);

    const modalRef = useRef();

    const [myGameData, setMyGameData] = useState([]);
    const [myGame, setMyGame] = useState([]);
    const [visible, setVisible] = useState(false);
    const [posY, setPosY] = useState(false);
    const user = useSelector(selectUser);
    const [loading, setLoading] = useState(true);

    const [searching, setSearching] = useState(false);
    const [searchWord, setSearchWord] = useState("");

    const [videoShow, setVideoShow] = useState(false);
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);
    const [curGame, setCurGame] = useState([]);

    useEffect(() => {
        async function fetchMyData() {
            setMyGame([]);
            setMyGameData([]);
            const userId = user.user_id;
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/favor/all`)
                .then((res) => {
                    res.data.map((game, index) => {
                        const id = game.gameId;
                        setMyGame(myGame => [...myGame, id]);
                        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${id}`)
                            .then((res) => {
                                setMyGameData(myGameData => [...myGameData, res.data]);
                            })
                    })
                });
            return myGameData;
        }
        fetchMyData();
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, []);

    // popupGameData Fetch (popupUrl이 바뀔때 마다)
    useEffect(()=> {
        axios.get(popupUrl).then((res)=>{
            console.log(res.data.id);
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
            // $(".not_scroll").css("top", '');
            // $("#homeScreen").removeClass("not_scroll")
            // document.getElementById('homeScreen').classList.remove("not_scroll")
        }
    }, [visible, setVisible])
    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
    }, [keyPress])

    if(loading) return (<div>Loading...</div>);
    return (
        <>
            <div className="myListScreen">
                <Nav setSearchWord={setSearchWord} setSearching={setSearching} />
                { searching ? (
                    <SearchScreen searchWord={searchWord} />
                ) : (
                    <div className="myListScreen_body">
                        <h2>내가 찜한 목록</h2>
                        <div className="myListScreen_result">
                            {myGameData.map((set,index) => (
                                <Video
                                    key={index}
                                    setVideoShow={setVideoShow}
                                    setX={setX}
                                    setY={setY}
                                    OneOfGameData={set}
                                    setCurGame={setCurGame}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="video_modal">
                {videoShow &&
                <VideoModal
                    setVideoShow={setVideoShow}
                    setPopupUrl={setPopupUrl}
                    setVisible={setVisible}
                    X={X} Y={Y}
                    OneOfGameData={curGame}
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
            <Footer />
        </>
    )
}

export default MyListScreen;
