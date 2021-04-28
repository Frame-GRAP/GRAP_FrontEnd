import React from 'react'
import "./PopupMainVideo.css"
import ReactPlayer from "react-player";

function PopupMainVideo() {
    const url = ["https://www.youtube.com/watch?v=s0fD66ncSbk"];


    return (
        <div className="popup__Main_video">
            <div className="Main__title title__font">Streamer Video</div><br/>
            <ReactPlayer className="game_video" url={url} width='100%' height='450px' ></ReactPlayer>

        </div>
    )
}

export default PopupMainVideo
