import React from 'react'
import "./PopupRelatedVideo.css"
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import Related_Image1 from "../../img/Related_Image1.png"
import Related_Image2 from "../../img/Related_Image2.png"
import Related_Image3 from "../../img/Related_Image3.png"
import Related_Image4 from "../../img/Related_Image4.png"


function PopupRelatedVideo() {
    const img_url = [
        Related_Image1, 
        Related_Image2,
        Related_Image3,
        Related_Image4
    ];
    // hover하면 영상 내용 나오게
    return (
        <div className="popup__Related_Video">
            <div className="title__font">Related Video</div><br />
            <img className="related_poster" src={img_url[0]} alt="game"/>         
            <img className="related_poster" src={img_url[1]} alt="game"/>         
            <img className="related_poster" src={img_url[2]} alt="game"/>            
            <img className="related_poster" src={img_url[3]} alt="game"/>    
            <img className="related_poster" src={img_url[0]} alt="game"/>           

        </div>
    )
}

export default PopupRelatedVideo
