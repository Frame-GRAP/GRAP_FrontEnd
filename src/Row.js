import React, {useRef, useState} from "react";
import './Row.css';
import Video from "./Video";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";

function Row({ title }) {
    //플랫폼 + code 한번에 받아야함
const img_url = "https://assets.brand.microsites.netflix.io/assets/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png?v=49";
const url = ["https://www.youtube.com/watch?v=ubzs4LQdJrc", "https://www.youtube.com/watch?v=ubzs4LQdJrc", "https://www.youtube.com/watch?v=ubzs4LQdJrc"];
const thumbnail = [img_url, img_url, img_url];
const results = [];
const history = useHistory();

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
                <div className="cover">
                    <img className="row_poster" src={set[0]} alt="game"/>
                    <div className="row_video">
                        <ReactPlayer className="game_video" url={set[1]} width='100%' height='100%' ></ReactPlayer>
                        <button className="game_info" onClick={() => history.push("/login")}>상세정보</button>
                    </div>
                </div>
            )}
        </div>
    </div>
)
}

export default Row;
