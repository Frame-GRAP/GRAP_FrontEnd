import React, {useState, useRef} from "react";
import './Row.css';
import ReactPlayer from "react-player";
import {useHistory} from "react-router-dom";

function Row({ title }) {
    //플랫폼 + code 한번에 받아야함
    const img_url = "https://assets.brand.microsites.netflix.io/assets/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png?v=49";
    const video_url = "https://www.youtube.com/watch?v=7C2z4GqqS5E";
    const url = [video_url, video_url, video_url, video_url, video_url, video_url, video_url, video_url];
    const thumbnail = [img_url, img_url, img_url, img_url, img_url, img_url, img_url, img_url];
    const results = [];
    const history = useHistory();
    const isHover = useRef(0);


for(let i = 0; i < url.length; i++){
    let col = [];
    col[0] = thumbnail[i];
    col[1] = url[i];
    col[2] = false;

        results[i] = col;
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {results.map((set, index) =>
                    <div className="row_poster">
                        <div className="row_visible">
                            <img className="row_img" src={set[0]} alt="game"/>
                        </div>
                        <div className="row_hidden">
                            <ReactPlayer className="row_video" url={set[1]} width='100%' height='100%' playing={false}></ReactPlayer>
                            <button className="game_info" onClick={() => history.push("/login")}>상세정보</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
)
}

export default Row;
