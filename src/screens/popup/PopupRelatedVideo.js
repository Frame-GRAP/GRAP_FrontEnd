import React, {useState, useEffect} from 'react'
import "./PopupRelatedVideo.css"
import {AiOutlineDislike, AiOutlineLike, AiFillLike, AiFillDislike} from 'react-icons/ai'

function PopupRelatedVideo({popupGameData, setPopupMainVideoIndex}) {
    const [videoData, setVideoData] = useState([]);

    // Video Data Fetch
    const axios = require('axios');
    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${popupGameData.id}/video/all`);

            console.log(request.data);
            setVideoData(request.data);
            return request;
        }
        
        fetchData();
        console.log(videoData);
    }, [popupGameData]);

    
    function toggleMainVideo(e){
        const relatedVideoIndex = Number(e.target.id);
        setPopupMainVideoIndex(relatedVideoIndex);
    }

    return (
        <div className="popup__Related_Video">
            {/* <div className="related__Title title__font">Related Video</div> */}
            <div className="related__Video">
                {videoData.map((set, index) => {
                    return (
                        <>
                            {/* <img 
                                className="related_poster" 
                                src={set.image} 
                                id={index}
                                alt="game"
                                key={index}
                                onClick={toggleMainVideo}
                            /> */}
                        <div className="related__contents">
                            <img 
                                className="related_poster" 
                                src={set.image} 
                                id={index}
                                alt="game"
                                key={index}
                                onClick={toggleMainVideo}
                            />
                            <div className="related_desc">
                                <div 
                                    className="video_title" 
                                    id={index}
                                    onClick={toggleMainVideo}
                                >{set.title}</div>
                                <div className="video_uploader">{set.uploader}</div>
                                <div className="video_length">
                                    {/* <AiFillLike size="17" className="likeBtns"/>&nbsp;{set.liked===0 ? 0 : set.like} · {set.length} */}
                                    {set.length}
                                </div>
                            </div>
                        </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default PopupRelatedVideo
