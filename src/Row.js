import React, {useRef, useState, useEffect} from "react";
import './Row.css';
import Video from "./Video";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import $ from "jquery"


import Image2 from "./img/Related_Image2.png"
import Image3 from "./img/Related_Image3.png"
import Image5 from "./img/Related_Image5.png"

function Row({ title, visible, setVisible }) {
    //플랫폼 + code 한번에 받아야함
    const img_url = Image5;
    // const img_url = "https://assets.brand.microsites.netflix.io/assets/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png?v=49";


    const url = [
        "https://www.youtube.com/watch?v=s0fD66ncSbk", "https://www.youtube.com/watch?v=2IA573fvHOs", "https://www.youtube.com/watch?v=NPN1lhzCfbY"
    ];
    const thumbnail = [Image5, Image3, Image2];
    const results = [];
    const history = useHistory();

    for(let i = 0; i < url.length; i++){
        let col = [];
        col[0] = thumbnail[i];
        col[1] = url[i];
        col[2] = false;

        results[i] = col;
    }

    useEffect(()=> {
        $(".game_info").mouseup(function() {
            setVisible(true);
            $("#homeScreen").addClass('layer-open');
        })
    }, [visible])

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {results.map((set, index) =>
                    <div className="cover">
                        <img className="row_poster" src={set[0]} alt="game"/>
                        <div className="row_video">
                            <ReactPlayer className="game_video" url={set[1]} width='100%' height='100%' ></ReactPlayer>
                            <button className="game_info">상세정보</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Row;