import React, {useState} from "react";
import ReactPlayer from "react-player";
import $ from "jquery"
import './Video.css';
import {useHistory} from "react-router-dom";
import temp from "./img/grap_logo2-2.png";

function Video({url, popupGameData, setPopupGameData, OneOfGameData, gameData, videoData, setVisible, posY}) {
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
        // 상세정보 누른 target의 id 값을 받아와서 setPopupGameData 이용하여 Popup에 쓰일 데이터 실시간 갱신
        const popupId = Number(e.target.id);
        console.log("popupId : " + popupId);

        const data = gameData.filter(function(e) {
            return e.id === popupId;
        });
        // console.log(data);
        setPopupGameData(data);

        // console.log("popupGameData is")
        console.log(popupGameData);

        setVisible(true);
        posY = Math.round($(window).scrollTop());
        // console.log(posY);
        $("#homeScreen").addClass('not_scroll')
        $(".not_scroll").css("top", -posY)
    }

    return (
        <div className="row_container" onMouseEnter={show} onMouseLeave={hide}>
            { content ? (
                <div className="row_item">
                    <img className="row_img" src={temp} alt="game"/>
                </div>
            ) : (
                <div className="row_item">
                    <ReactPlayer className="row_video" url={"https://www.youtube.com/watch?v=MOLTi3aI7D4"} width='95%' height='95%' playing={true}/>
                    <button className="game_info" id={OneOfGameData.id} onClick={OpenModal}>상세정보</button>
                    <button className="add_mylist" onClick={() => history.push("/register")}>찜</button>
                </div>
            )}
        </div>
    );
}

export default Video;
