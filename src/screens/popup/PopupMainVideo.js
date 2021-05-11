import React, {useState, useEffect} from 'react'
import "./PopupMainVideo.css"
import ReactPlayer from "react-player";
import PopupDeclaration from "./PopupDeclaration"
import {TiFlag} from 'react-icons/ti'

function PopupMainVideo({setDeclare_visible, setDeclare_part, popupGameData, vidoeData}) {
    // const url = ["https://www.youtube.com/watch?v=s0fD66ncSbk"];
    // const url2 = ["https://clips.twitch.tv/embed?clip=SpookyAbstemiousDiscSeemsGood-dX0ZurIT4rxawcOU&parent=localhost"];
    // const url3 = `https://clips.twitch.tv/embed?clip=${urlKey}&parent=localhost`;
    
    const [reviewData, setReviewData] = useState([]);
    // Data Fetch
    const axios = require('axios');
    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${popupGameData.id}/video/all`);
    
            setReviewData(request.data[0]);
        }
        fetchData();
    }, []);

    let player_Url;
    if(reviewData.platform === "twitch"){
        player_Url = `https://clips.twitch.tv/embed?clip=${reviewData.urlKey}&parent=localhost`
    }else if(reviewData.platform === "youtube"){
        player_Url = `https://www.youtube.com/watch?v=${reviewData.urlKey}`
    }  

    function OpenVideoDeclaration(){
        setDeclare_visible(true);
        setDeclare_part(true);
    }

    return (
        <>
        <div className="popup__Main_video">
            <div className="Main__title title__font">Streamer Video</div><br/>
            {/* <ReactPlayer
                className="game__video" 
                url={url}
                width='100%' height='600px'
                playing={false}
            /> */}
            {/* <iframe
                className="game__video"
                // src={player_Url}
                src={url2}
                frameborder="0"
                allowfullscreen="true"
                scrolling="no"
                height="600px"
                width="100%"
            /> */}

            {(reviewData.platform === "youtube") ? (
            <ReactPlayer
                className="game__video" 
                url={player_Url}
                width='100%' height='600px'
                playing={false}
            />) : (
            <iframe
                className="game__video"
                src={player_Url}
                scrolling="no"
                height="600px"
                width="100%"
                frameborder="0"
                // allowfullscreen="true"
            />)
            }
            <span className="Video__declaration2" onClick={OpenVideoDeclaration}>신고</span>
        </div>        
        </>
    )
}

export default PopupMainVideo