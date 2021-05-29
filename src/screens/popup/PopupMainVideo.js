import React, {useState, useEffect} from 'react'
import "./PopupMainVideo.css"

function PopupMainVideo({popupGameData, popupMainVideoIndex, setDeclare_visible, setDeclare_part }) {
    const [mainVideo, setMainVideo] = useState([]);

    // Data Fetch
    const axios = require('axios');
    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${popupGameData.id}/video/all`);

            setMainVideo(request.data[popupMainVideoIndex]);
        }
        fetchData();
    }, [popupGameData, popupMainVideoIndex]);

    let player_Url;
    if(mainVideo.platform === "twitch"){
        player_Url = `https://clips.twitch.tv/embed?clip=${mainVideo.urlKey}&parent=localhost&controls=0&origin=http://localhost:3000`
    }else if(mainVideo.platform === "youtube"){
        player_Url = `https://www.youtube.com/embed/${mainVideo.urlKey}?mute=0&controls=0`
    }

    function OpenVideoDeclaration(){
        setDeclare_visible(true);
        setDeclare_part(true);
    }

    return (
        <>
        <div className="popup__Main_video">
            <div className="Main__title title__font">Streamer Video</div><br/>
            <iframe
                className="game__video"
                width="100%" height="600px"
                src={player_Url}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay"/>
            <span className="Video__declaration2" onClick={OpenVideoDeclaration}>신고</span>
        </div>
        </>
    )
}

export default PopupMainVideo
