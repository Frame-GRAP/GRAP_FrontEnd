import React, {useState, useEffect} from 'react'
import "./PopupMainVideo.css"
import ReactPlayer from "react-player";
import PopupDeclaration from "./PopupDeclaration"

function PopupMainVideo({setDeclare_visible, setDeclare_part, popupGameData, vidoeData}) {
    const url = ["https://www.youtube.com/watch?v=s0fD66ncSbk"];
    const url2 = ["https://clips.twitch.tv/embed?clip=SpookyAbstemiousDiscSeemsGood-dX0ZurIT4rxawcOU&parent=127.0.0.1"];
    // const url3 = `https://clips.twitch.tv/embed?clip=${urlKey}=127.0.0.1`;

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
                playing={true}
            /> */}
            <iframe
                className="game__video"
                src={url2}
                frameborder="0"
                allowfullscreen="true"
                scrolling="no"
                height="600px"
                width="100%"
                allow="autoplay"
            />
        </div>

        <button className="Video__declaration" onClick={OpenVideoDeclaration}>영상 신고</button>
        </>
    )
}

export default PopupMainVideo