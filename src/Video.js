import React from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";

function Video({embedId, onMouseLeave}) {
    const history = useHistory();

    return (
        <div className="video_responsive" onMouseLeave={onMouseLeave}>
            <ReactPlayer url={embedId} ></ReactPlayer>
            <button className="game_info" onClick={() => history.push("/login")}>상세정보</button>
        </div>
    );
}

export default Video;
