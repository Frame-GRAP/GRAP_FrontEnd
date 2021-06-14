import React, {useState, useEffect} from 'react'
import "./PopupRelatedVideo.css"
import {AiOutlineDislike, AiOutlineLike, AiFillLike, AiFillDislike} from 'react-icons/ai'

function PopupRelatedVideo({popupGameData, popupMainVideoIndex, setPopupMainVideoIndex}) {
    const [videoData, setVideoData] = useState([]);
    

    // Video Data Fetch
    const axios = require('axios');
    useEffect(()=> {
        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${popupGameData.id}/video/all`)
            .then((res)=>{
                // 영상 없으면 1번 영상으로 대체하는 코드
                if(res.data.length==0){
                    axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/1/video/all`).then((res)=>{
                        const sortedArrayByLength = [...res.data].sort(function(a, b){ 
                            return parseFloat(b.length) - parseFloat(a.length);
                        })
        
                        setVideoData(sortedArrayByLength);
                    })
                }else{
                    const sortedArrayByLength = [...res.data].sort(function(a, b){ 
                        return parseFloat(b.length) - parseFloat(a.length);
                    })
    
                    setVideoData(sortedArrayByLength);
                }


                // setVideoData(res.data);

                // console.log(videoData);
            })
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
                    if(set.id == popupMainVideoIndex) {
                        return;
                    }
                    else return (
                        <>
                            {/* <img
                                className="related_poster"
                                src={set.image}
                                id={index}
                                alt="game"
                                key={index}
                                onClick={toggleMainVideo}
                            /> */}
                            {<div className="related__contents">
                                <img
                                    className="related_poster"
                                    src={set.image}
                                    id={set.id}
                                    alt="game"
                                    key={index} // index -> id로 바꿔야 함.
                                    onClick={toggleMainVideo}
                                />
                                <div className="related_desc">
                                    <div
                                        className="video_title"
                                        id={set.id}
                                        onClick={toggleMainVideo}
                                    >{set.title}</div>
                                    <div className="video_uploader">{set.uploader}</div>
                                    <div className="video_length">
                                        {/* <AiFillLike size="17" className="likeBtns"/>&nbsp; {set.liked} ·  */}
                                        {set.length.substring(0, 5)}
                                    </div>
                                </div>
                            </div>}
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default PopupRelatedVideo
