import React, {useState} from "react";
import ReactPlayer from "react-player";
import $ from "jquery"
import './Video.css';

function Video({url, setVisible, posY}) {
    const [content, toggleContent] = useState(true);
    const [delayHandler, setDelayHandler] = useState(null)

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
        setVisible(true);
        posY = Math.round($(window).scrollTop());
        console.log(posY);
        $("#homeScreen").addClass('not_scroll')
        $(".not_scroll").css("top", -posY)

        // 상세정보 누른 target의 index를 받아와서 setGameId를 이용하여 Id 실시간 갱신
        // console.log(e.target.value); // 누른 상세정보의 id 출력 확인
        // setGameId(e.target.value);
    }

    return (
        <div className="row_container" onMouseEnter={show} onMouseLeave={hide}>
            { content ? (
                <div className="row_item">
                    <img className="row_img" src={url[0]} alt="game"/>
                </div>
            ) : (
                <div className="row_item">
                    <ReactPlayer className="row_video" url={url[1]} width='95%' height='95%' playing={false}/>
                    <button className="game_info" onClick={OpenModal}>상세정보</button>
                </div>
            )}
        </div>
    );
}

export default Video;