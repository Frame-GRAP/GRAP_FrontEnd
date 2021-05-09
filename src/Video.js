import React, {useState} from "react";
import ReactPlayer from "react-player";
import $ from "jquery"
import './Video.css';

function Video({url, popupGameData, setPopupGameData, OneOfGameData, gameData, videoData, setVisible, posY}) {
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

    // console.log(videoData.filter(function(e) {
    //     return e.id === gameData[89].videosId[0];
    // })[0].urlKey)

    /*const urlKey = videoData.filter(function(e) {
        return e.id === OneOfGameData.id;
    })[0].urlKey;

    const platform = videoData.filter(function(e) {
        return e.id === OneOfGameData.id;
    })[0].platform;

    // console.log(platform, urlKey)*/


    /*import axios from 'axios';

    export const checkEmailExists = (email) => axios.get('/api/auth/exists/email/' + email);
    export const checkUsernameExists = (username) => axios.get('/api/auth/exists/username/' + username);
    
    export const localRegister = ({email, username, password}) => axios.post('/api/auth/register/local', { email, username, password });
    export const localLogin = ({email, password}) => axios.post('/api/auth/login/local', { email, password });
    
    export const checkStatus = () => axios.get('/api/auth/check');
    export const logout = () => axios.post('/api/auth/logout');*/


    return (
        <div className="row_container" onMouseEnter={show} onMouseLeave={hide}>
            {
                <div className="row_item">
                    <ReactPlayer 
                        className="row_video" 
                        url={"https://www.youtube.com/watch?v=MOLTi3aI7D4"}
                        width='95%' 
                        height='95%' 
                        playing={false}/>
                    <button 
                        className="game_info" 
                        id={OneOfGameData.id} 
                        onClick={OpenModal}
                    >상세정보</button>
                </div>
            }
            {/* { content ? (
                <div className="row_item">
                    <img 
                        className="row_img" 
                        src={url[0]}
                        // src={OneOfGameData.headerImg} 
                        alt="game"
                    />
                </div>
            ) : (
                <div className="row_item">
                    <ReactPlayer 
                        className="row_video" 
                        url={url[1]}
                        width='95%' 
                        height='95%' 
                        playing={false}/>
                    <button 
                        className="game_info" 
                        id="1"
                        // id={OneOfGameData.id} 
                        onClick={OpenModal}
                    >상세정보</button>
                </div>
            )} */}
        </div>
    );
}

export default Video;