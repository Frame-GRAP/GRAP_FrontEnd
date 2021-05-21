import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import axios from "axios";

function BannerVideo({mainGameData}){
    const [mainGame, setMainGame] = useState([]);
    const [content, toggleContent] = useState(true);
    const [selected, setSelected] = useState(false);
    const [delayHandler, setDelayHandler] = useState(null);
    const [videoData, setVideoData] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const gameId = mainGameData.id;
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/video/all`)
                .then( (res) => {
                    setVideoData(res.data[0]);
                }).catch((err)=> {
                    console.log(err);
                });
            return videoData;
        }
        fetchData();

        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [mainGameData]);

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
        player_Url = `https://clips.twitch.tv/embed?clip=${videoData.urlKey}&parent=localhost&autoplay=true&origin=http://localhost:3000`
    }else if(videoData.platform === "youtube"){
        player_Url = `https://www.youtube.com/embed/${videoData.urlKey}?autoplay=1&mute=0`
    }
    

    if(loading) return (<div>Loading...</div>);
    return (
        <div className="banner_item" onMouseEnter={show} onMouseLeave={hide}>
            {content ? (
                <img className="banner_img" src={mainGameData.headerImg} alt="game"/>
            ) : (
                <iframe
                    className="row_video"
                    width="95%" height="95%"
                    src={player_Url}
                    scrolling="no"
                    frameBorder="0"
                    allow="autoplay"/>
            )}
        </div>
    );
}

export default BannerVideo;
