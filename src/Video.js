import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import ReactPlayer from "react-player";
import $ from "jquery"
import './Video.css';

function Video({setPopupUrl, OneOfGameData, setVisible, posY}) {
    const [content, toggleContent] = useState(true);
    const [delayHandler, setDelayHandler] = useState(null)
    const history = useHistory();

    const show = () => {
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

    function OpenModal(e){
        const popupId = Number(e.target.id);
        setPopupUrl(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${popupId}`);

        setVisible(true);
        posY = Math.round($(window).scrollTop());

        $("#homeScreen").addClass('not_scroll')
        $(".not_scroll").css("top", -posY)
    }
    
    return (
        <div className="row_container" onMouseEnter={show} onMouseLeave={hide}>
            { content ? (
                <div className="row_item">
                    <img className="row_img" src={OneOfGameData.headerImg} alt="game"/>
                </div>
            ) : (
                <div className="row_item">
                    <ReactPlayer 
                        className="row_video"
                        url={"https://www.youtube.com/watch?v=siMrYkh8F44"} 
                        width='95%' 
                        height='95%' 
                        playing={true}
                    />
                    <button 
                        className="game_info" 
                        id={OneOfGameData.id} 
                        onClick={OpenModal}
                    >상세정보</button>
                    <button 
                        className="add_mylist" 
                        onClick={() => history.push("/register")}
                    >찜</button>
                </div>
            )}
        </div>
    );
}

export default Video;
