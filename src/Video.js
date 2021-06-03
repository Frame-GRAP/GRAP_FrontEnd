import React, {useState, useEffect} from "react";
import './Video.css';
import axios from "axios";
import HoverIntent from "react-hoverintent/src/components";

function Video({setVideoShow, setX, setY, setPopupUrl, OneOfGameData = [], setVisible, posY, setCurGame}) {
    const [loading, setLoading] = useState(true);
    const [videoData, setVideoData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const gameId = OneOfGameData.id;
            //await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/video/all`)
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/8842/video/all`)
                .then( (res) => {
                    setVideoData(res.data[0]);
                }).catch((err)=> {
                    console.log(err);
                });
            return videoData;
        }

        if(OneOfGameData.length !== 0){
            fetchData();
            setCurGame(OneOfGameData);
        }
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [OneOfGameData]);

    const handleOver = event => {
        setX(event.getBoundingClientRect().top);
        setY(event.getBoundingClientRect().left);
        setVideoShow(true);
        setCurGame(OneOfGameData);
    };

    const handleOut = event => {

    }

    if(loading) return (<div>Loading...</div>);
    return (
        <div className="row_container">
            <HoverIntent
                onMouseOver={handleOver}
                onMouseOut={handleOut}
                sensitivity={10}
                interval={200}
                timeout={0}
            >
                <div className="row_item">
                    <img className="row_img" src={OneOfGameData.headerImg} alt="game"/>
                </div>
            </HoverIntent>
        </div>
    );
}

export default Video;
