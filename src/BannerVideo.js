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
        window.addEventListener("scroll", playAuto);
        return () => window.removeEventListener("scroll", playAuto);
    }, []);

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

    useEffect(() => {
        const video = document.querySelector('iframe');

        video.addEventListener('ended', (event) => {
            console.log("end");
        });

    }, []);

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

    let player_Url;
    if(videoData.platform === "twitch"){
        player_Url = `https://clips.twitch.tv/embed?clip=${videoData.urlKey}&parent=localhost&controls=0&autoplay=true&origin=http://localhost:3000`
    }else if(videoData.platform === "youtube"){
        player_Url = `https://www.youtube.com/embed/${videoData.urlKey}?autoplay=1&controls=0&mute=0`
    }

    const playAuto = () => {
        if(window.scrollY < 100){
            setDelayHandler(setTimeout(() => {
                toggleContent(false);
            }, 1000));
            clearTimeout(delayHandler);
        } else {
            setDelayHandler(setTimeout(() => {
                toggleContent(true);
            }, 1000));
            clearTimeout(delayHandler);
        }
    }

    if(loading) return (<div>Loading...</div>);
    return (
        <div className="banner_item">
            {content ? (
                <img className="banner_img" src={mainGameData.headerImg} alt="game"/>
            ) : (
                <ReactPlayer
                    className="row_video"
                    width="100%" height="100%"
                    url={player_Url}
                    playing={true}
                    onEnded={toggleContent(true)}
                />
            )}
        </div>
    );
}

export default BannerVideo;
