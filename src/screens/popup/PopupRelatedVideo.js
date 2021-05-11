import React, {useState, useEffect} from 'react'
import "./PopupRelatedVideo.css"
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";

function PopupRelatedVideo({popupGameData}) {
    const [videoData, setVideoData] = useState([]);

    // Video Data Fetch
    const axios = require('axios');
    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${popupGameData.id}/video/all`);

            setVideoData(request.data);
            return request;
        }
        
        fetchData();
    }, []);

    return (
        <div className="popup__Related_Video">
            <div className="title__font">Related Video</div><br />

            {videoData.map((set, index) => {
                return (
                    <img className="related_poster" src={set.image} alt="game" key={index}/>
                )
            })}
        </div>
    )
}

export default PopupRelatedVideo
