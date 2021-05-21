import React, {useState, useEffect} from 'react'
import "./PopupRelatedVideo.css"

function PopupRelatedVideo({popupGameData, setPopupMainVideoIndex}) {
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
    }, [popupGameData]);

    
    function toggleMainVideo(e){
        const relatedVideoIndex = Number(e.target.id);
        setPopupMainVideoIndex(relatedVideoIndex);
    }

    return (
        <div className="popup__Related_Video">
            <div className="related__Title title__font">Related Video</div>
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
                                <div className="video_title">머니게임 8화 리뷰</div>
                                <div className="video_uploader">논리왕 전기</div>
                                <div className="video_visitednum">조회수 311만회 · 1일 전</div>
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
