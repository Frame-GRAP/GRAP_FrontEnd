import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import ReactPlayer from "react-player";
import $ from "jquery"
import './Video.css';
import axios from "axios"
import {useSelector} from "react-redux";
import {selectUser} from './features/userSlice'

function Video({OneOfGameData, setVisible, setPopupUrl, posY}) {
    const [content, toggleContent] = useState(true);
    const [delayHandler, setDelayHandler] = useState(null)
    const history = useHistory();
    const [urlKey, setUrlKey] = useState("");
    const [platform, setPlatform] = useState("");

    const user = useSelector(selectUser);
    let player_Url;
    if(platform === "twitch"){
        player_Url = `https://clips.twitch.tv/embed?clip=${urlKey}&parent=localhost`
    }else if(platform === "youtube"){
        player_Url = `https://www.youtube.com/embed/${urlKey}?autoplay=1&mute=0`
    }  

    const show = (e) => {
        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${OneOfGameData.id}/video/all`).then((res) => {
            if(res){
                // console.log(res.data[0].platform)
                setUrlKey(res.data[0].urlKey);
                setPlatform(res.data[0].platform);
            }else{
                console.log("error");
            }
        })

        setDelayHandler(setTimeout(() => {
            toggleContent(false);
        }, 700))
        clearTimeout(delayHandler);
    }

    const hide = () => {
        setDelayHandler(setTimeout(() => {
            toggleContent(true);
        }, 700))
        clearTimeout(delayHandler);
    }

    function OpenModal(e) {
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
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }


    return (
        <div className="row_container" id="" onMouseEnter={show} onMouseLeave={hide}>
            { content ? (
                <div className="row_item" >
                    <img className="row_img" src={OneOfGameData.headerImg} alt="game"/>
                </div>
            ) : (
                <div className="row_item" >
                    <iframe
                        className="game__video"
                        src={player_Url}
                        scrolling="no"
                        width='95%' 
                        height='95%' 
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    />
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
