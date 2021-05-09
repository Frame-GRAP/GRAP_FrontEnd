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


                <div className="game__description">
                    <h2>Name : Brawlhalla</h2> <br/>
                    {/* <h2>Name : {popupGameData[0].name}</h2> <br/> */}
                    <p className="description">
                        {/* {popupGameData[0].description} */}
                        {popupGameData[0].lastVideoCrawled}

                    </p><br/>        
                    <h4>Download URL </h4>
                    <a 
                        href="www.naver.com"
                        // href={popupGameData[0].downloadedUrl}
                        className="down_link">
                        www.naver.com
                        {/* {popupGameData[0].downloadedUrl} */}
                    </a>
                    <br/>
                </div>
                

            </div>
        </div>
    )
}

export default PopupGameDescription
