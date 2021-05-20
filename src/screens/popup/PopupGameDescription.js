import React from 'react'
import "./PopupGameDescription.css"


function PopupGameDescription({popupGameData}) {

    return (
        <div className="popup__Description">
            <div className="title__font">Game Description</div>
            <div className="description__contents">
                <div className="game__Poster">
                    <img src={popupGameData.headerImg} />
                </div>

                <div className="game__Description">
                    <h2>{popupGameData.name}</h2><br/>
                    <p className="detail__Description">
                        Description : {popupGameData.description}<br/>
                        Developer : {popupGameData.developer}<br/>
                        Publisher : {popupGameData.publisher}<br/>
                        ReleaseDate : {popupGameData.releaseDate}<br/>
                        Crawling Date : {popupGameData.lastVideoCrawled}<br/>
                    </p><br/>        
                    <h4>Download URL </h4>
                    <a 
                        href={popupGameData.downloadUrl}
                        className="down_link">
                        {popupGameData.downloadUrl}
                    </a>
                    <br/>
                </div>
            </div>
        </div>
    )
}

export default PopupGameDescription
