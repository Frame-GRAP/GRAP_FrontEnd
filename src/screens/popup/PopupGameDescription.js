import React from 'react'
import "./PopupGameDescription.css"


function PopupGameDescription({popupGameData}) {

    return (
        <div className="popup__Description">
            <div className="title__font">Game Description</div>
            {/* 이름, 설명, download url */}
            <div className="description__contents">

                <div className="game__Poster">
                    <img 
                        src="https://steamcdn-a.akamaihd.net/steam/apps/291550/header.jpg"
                        // src={popupGameData[0].headerImg}
                    />
                </div>


                <div className="game__Description">
                    <h2>Name : {popupGameData[0].name}</h2><br/>
                    <p className="detail__Description">
                        Description : {popupGameData[0].description}<br/>
                        Developer : {popupGameData[0].developer}<br/>
                        Publisher : {popupGameData[0].publisher}<br/>
                        ReleaseDate : {popupGameData[0].releaseDate}<br/>
                        Crawling Date : {popupGameData[0].lastVideoCrawled}<br/>
                    </p><br/>        
                    <h4>Download URL </h4>
                    <a 
                        href={popupGameData[0].downloadUrl}
                        className="down_link">
                        {popupGameData[0].downloadUrl}
                    </a>
                    <br/>
                </div>
            </div>
        </div>
    )
}

export default PopupGameDescription
