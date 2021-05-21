import React, {useState, useEffect} from "react";
import $ from "jquery"
import './Video.css';
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";

function Video({setPopupUrl, OneOfGameData, setVisible, posY, myGame}) {
    const [loading, setLoading] = useState(true);
    const [content, toggleContent] = useState(true);
    const [delayHandler, setDelayHandler] = useState(null);
    const [videoData, setVideoData] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const user = useSelector(selectUser);

    // console.log(OneOfGameData);
    useEffect(() => {
        async function fetchData() {
            const gameId = OneOfGameData.id;
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/video/all`)
                .then( (res) => {
                    setVideoData(res.data[0]);
                }).catch((err)=> {
                    console.log(err);
                });
            return videoData;
        }
        async function check() {
            myGame.map((gameId) => {
                if(gameId === OneOfGameData.id){
                    setIsAdded(true);
                }
            })
        }
        fetchData();
        check();
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [OneOfGameData]);

    const show = () => {
        setDelayHandler(setTimeout(() => {
            toggleContent(false);
        }, 700));
        clearTimeout(delayHandler);
    }

    const hide = () => {
        setDelayHandler(setTimeout(() => {
            toggleContent(true);
        }, 700));
        clearTimeout(delayHandler);
    }

    function OpenModal(e){
        e.preventDefault();
        const popupId = Number(e.target.id);
        setPopupUrl(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${popupId}`);

        setVisible(true);
        posY = Math.round($(window).scrollTop());

        $("#homeScreen").addClass('not_scroll')
        $(".not_scroll").css("top", -posY)
    }

    const addMyList = (gameId, e) => {
        e.preventDefault();
        const userId = user.user_id;
        axios({
            method: 'post',
            url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/game/${gameId}/favor`,
        }).then((res) => {
            setIsAdded(true);
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const deleteMyList = (gameId, e) => {
        e.preventDefault();
        const userId = user.user_id;
        axios({
            method: 'delete',
            url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/game/${gameId}/favor`,
        }).then((res) => {
            setIsAdded(false);
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }

    let player_Url;
    if(videoData.platform === "twitch"){
        player_Url = `https://clips.twitch.tv/embed?clip=${videoData.urlKey}&parent=localhost&autoplay=true&origin=http://localhost:3000`
    }else if(videoData.platform === "youtube"){
        player_Url = `https://www.youtube.com/embed/${videoData.urlKey}?autoplay=1&mute=0`
    }


    if(loading) return (<div>Loading...</div>);
    return (
        <div className="row_container" onMouseEnter={show} onMouseLeave={hide}>
            { content ? (
                <div className="row_item">
                    <img className="row_img" src={OneOfGameData.headerImg} alt="game"/>
                </div>
            ) : (
                <div className="row_item">
                    <iframe
                        className="row_video"
                        width="95%" height="95%"
                        src={player_Url}
                        scrolling="no"
                        frameBorder="0"
                        allow="autoplay"/>
                    <button
                        className="game_info"
                        id={OneOfGameData.id}
                        onClick={OpenModal}
                    >상세정보</button>
                    {!isAdded ? (
                        <button
                            className="add_mylist"
                            onClick={(e) => addMyList(OneOfGameData.id, e)}
                        >찜</button>
                    ) : (
                        <button
                            className="add_mylist"
                            onClick={(e) => deleteMyList(OneOfGameData.id, e)}
                        >찜 취소</button>)}

                </div>
            )}
        </div>
    );
}

export default Video;
