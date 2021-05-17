import React, {useEffect, useRef, useState} from "react";
import ReactPlayer from "react-player";
import axios from "axios";

function BannerVideo({check, mainGameData}){
    const [content, toggleContent] = useState(true);
    const [selected, setSelected] = useState(false);
    const [delayHandler, setDelayHandler] = useState(null);
    const [videoData, setVideoData] = useState("");

    useEffect(() => {
        async function fetchData() {
            const gameId = mainGameData.id;
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/video/all`)
                .then( (res) => {
                    setVideoData(res.data[0]);
                });
            return videoData;
        }
        fetchData();
    }, [])

    const show = () => {
        setDelayHandler(setTimeout(() => {
            toggleContent(false);
        }, 700));
        clearTimeout(delayHandler);
    }

    const hide = () => {
        setDelayHandler(setTimeout(() => {
            toggleContent(true);
        }, 700));
        clearTimeout(delayHandler);
    }

    const changeToImg = () => {
        setSelected(false);
    }

    let player_Url;
    if(videoData.platform === "twitch"){
        player_Url = `https://clips.twitch.tv/embed?clip=${videoData.urlKey}&parent=localhost&autoplay=true`
    }else if(videoData.platform === "youtube"){
        player_Url = `https://www.youtube.com/watch?v=${videoData.urlKey}`
    }

    return (
        <div className="banner_item" onMouseEnter={show} onMouseLeave={hide}>
            {content ? (
                <img className="banner_img" src={mainGameData.headerImg} alt="game"/>
            ) : (
                (videoData.platform === "youtube") ? (
                    <ReactPlayer
                        className="row_video"
                        url={player_Url}
                        width='95%'
                        height='95%'
                        playing={true}
                    />) : (
                    <iframe
                        className="row_video"
                        src={player_Url}
                        scrolling="no"
                        width='95%'
                        height='95%'
                        frameBorder="0"
                    />)
            )}
        </div>
    );
}

export default BannerVideo;
