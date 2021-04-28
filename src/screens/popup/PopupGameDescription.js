import React from 'react'
import "./PopupGameDescription.css"


function PopupGameDescription() {

    return (
        <div className="popup__Description">
            <div className="title__font">Game Description</div>
            {/* 이름, 설명, download url */}
            <div className="description__contents">
                Name : Leauge Of Legend <br/>
                Description : <br/>            
                Download URL :&nbsp;&nbsp;<a href="www.naver.com" className="down_link">https://www.naver.com</a>
                <br/>
            </div>
        </div>
    )
}

export default PopupGameDescription
