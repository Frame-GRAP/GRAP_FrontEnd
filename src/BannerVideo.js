import React, {useEffect, useState} from "react";
import axios from "axios";

function BannerVideo({mainGameData = []}){
    const [content, toggleContent] = useState(true);
    const [delayHandler, setDelayHandler] = useState(null);
    const [videoData, setVideoData] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.addEventListener("scroll", playAuto);
        return () => window.removeEventListener("scroll", playAuto);
    }, [loading]);


    useEffect(() => {
        async function fetchData(gameId) {
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/video/all`)
                .then( (res) => {
                    setVideoData(res.data[0]);
                }).catch((err)=> {
                    console.log(err);
                });
            return videoData;
        }
        if(mainGameData !== undefined){
            fetchData(mainGameData.id).then(r => {
                setLoading(false);
            })
        }

        return () => {
            setLoading(true);
        }
    }, [mainGameData]);

    /*let player_Url;
    if(videoData.platform === "twitch"){
        player_Url = `https://clips.twitch.tv/embed?clip=${videoData.urlKey}&parent=localhost&controls=0&autoplay=true&origin=http://localhost:3000`
    }else if(videoData.platform === "youtube"){
        player_Url = `https://www.youtube.com/embed/${videoData.urlKey}?autoplay=1&controls=0&mute=0`
    }*/

    const playAuto = () => {
        if(window.scrollY < 100){
            toggleContent(false);
            setDelayHandler(setTimeout(() => {
                toggleContent(false);
            }, 700));
            clearTimeout(delayHandler);
        } else {
            setDelayHandler(setTimeout(() => {
                toggleContent(true);
            }, 700));
            clearTimeout(delayHandler);
        }
    }

    if(loading) return (<div>Loading...</div>);
    return (
        <div className="banner_item">
            {content ? (
                <img className="banner_img" src={mainGameData.headerImg} alt="game"/>
            ) : (
                <iframe
                    className="row_video"
                    width="100%" height="600px"
                    src={"https://www.youtube.com/embed/OYOrBlNdZ9E?autoplay=1&controls=0&mute=0"}
                    scrolling="no"
                    frameBorder="0"
                    allow="autoplay"
                />
            )}
        </div>
    );
}

export default BannerVideo;
