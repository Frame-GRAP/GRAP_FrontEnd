import React, {useState, useEffect} from 'react'
import "./PopupMainVideo.css"
import $ from "jquery"

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
        player_Url = `https://clips.twitch.tv/embed?clip=${mainVideo.urlKey}?autoplay=true&mute=0&parent=localhost`
    }else if(mainVideo.platform === "youtube"){
        player_Url = `https://www.youtube.com/embed/${mainVideo.urlKey}`
    }  

    function OpenVideoDeclaration(){
        $(".video__modify__ul").css("display","none")
        setDeclare_visible(true);
        setDeclare_part(true);
    }

    function OpenVideoTab(e){
        console.log($(".video__modify__ul")[0])
        if($(".video__modify__ul")[0].style.display === "none"){
            $(".video__modify__ul").css("display","block")
        }else{
            $(".video__modify__ul").css("display","none")
        }
    }
    
    return (
        <>
        <div className="popup__Main_video">
            <div className="Main__title title__font">Streamer Video</div><br/>
            <iframe
                className="game__video"
                src={player_Url}
                scrolling="no"
                height="600px"
                width="100%"
                frameborder="0"
                allowFullScreen
            />
            {/* <span className="Video__declaration2" onClick={OpenVideoDeclaration}>신고</span> */}
            <div className="Video__btns">
                <button className="modify_VideoBtn" onClick={OpenVideoTab}>▼</button>
                <div className="video_tab1 video_tab2">
                    <ul className="video__modify__ul" >
                        <li onClick={OpenVideoDeclaration}>신고</li>
                    </ul>
                </div>
            </div>
        </div>       
        </>
    )
}

export default PopupMainVideo