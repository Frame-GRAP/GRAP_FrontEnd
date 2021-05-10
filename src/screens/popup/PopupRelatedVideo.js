import React from 'react'
import "./PopupRelatedVideo.css"
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import Related_Image1 from "../../img/Related_Image1.png"
import Related_Image2 from "../../img/Related_Image2.png"
import Related_Image3 from "../../img/Related_Image3.png"
import Related_Image4 from "../../img/Related_Image4.png"


function PopupRelatedVideo({videoData, popupGameData}) {
    const img_url = [
        Related_Image1, 
        Related_Image2, 
        Related_Image3,
        Related_Image4
    ];

    return (
        <div className="popup__Related_Video">
            <div className="title__font">Related Video</div><br />

            <img className="related_poster" src={img_url[0]} alt="game"/>         
            <img className="related_poster" src={img_url[1]} alt="game"/>         
            <img className="related_poster" src={img_url[2]} alt="game"/>            
            <img className="related_poster" src={img_url[3]} alt="game"/>       
            <img className="related_poster" src={img_url[0]} alt="game"/>         
            <img className="related_poster" src={img_url[1]} alt="game"/>         
            <img className="related_poster" src={img_url[2]} alt="game"/>            
            <img className="related_poster" src={img_url[3]} alt="game"/>    
            {/* popupGameData에서 Id 받아서 VideoData 에 id값이 같은 것의 객체들을 map으로 하여 썸네일(image)들을 연결.*/}
            {/* url 누르면 setPopupGameData 해서 새로운 id주면 바뀌지 않을까?? 되면 좋겠다 ㅠㅠ..... */}

        </div>
    )
}

export default PopupRelatedVideo
