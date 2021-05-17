import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import ReactPlayer from "react-player";
import $ from "jquery"
import './Video.css';
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";

function Video({setPopupUrl, OneOfGameData, setVisible, posY}) {
    const [content, toggleContent] = useState(true);
    const [delayHandler, setDelayHandler] = useState(null);
    const [videoData, setVideoData] = useState([]);
    const user = useSelector(selectUser);

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
        fetchData();
    }, [])

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
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }

    let player_Url;
    if(videoData.platform === "twitch"){
        player_Url = `https://clips.twitch.tv/embed?clip=${videoData.urlKey}&parent=localhost&autoplay=true`
    }else if(videoData.platform === "youtube"){
        player_Url = `https://www.youtube.com/watch?v=${videoData.urlKey}`
    }

    return (
        <div className="row_container" onMouseEnter={show} onMouseLeave={hide}>
            { content ? (
                <div className="row_item">
                    <img className="row_img" src={OneOfGameData.headerImg} alt="game"/>
                </div>
            ) : (
                <div className="row_item">
                    {(videoData.platform === "youtube") ? (
                        <ReactPlayer
                            className="row_video"
                            url={player_Url}
                            width='95%'
                            height='95%'
                            playing={true}
                        />) : (
                        <iframe
                            className="row_video"
                            src={player_Url}
                            scrolling="no"
                            width='95%'
                            height='95%'
                            frameBorder="0"
                        />)
                    }
                    <button
                        className="game_info"
                        id={OneOfGameData.id}
                        onClick={OpenModal}
                    >상세정보</button>
                    <button
                        className="add_mylist"
                        onClick={(e) => addMyList(OneOfGameData.id, e)}
                    >찜</button>
                </div>
            )}
        </div>
    );
}

export default Video;
