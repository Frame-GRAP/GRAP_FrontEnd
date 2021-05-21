import React from 'react'
import "./PopupGameDescription.css"


function PopupGameDescription({popupGameData}) {

    return (
        <div className="popup__Description">
            {/* <div className="title__font">Game Description</div> */}
            <h1 className="detail__gameName">Game Name : {popupGameData.name}</h1><br/>

            <div className="description__contents">
                <div className="game__Poster">
                    <img src={popupGameData.headerImg} />
                </div>
                <div className="game__Description">
                    <p className="detail__Description">
                        <div className="detail__content"> 
                            <div className="detail__title">Description</div>
                            <div className="detail__desc">{popupGameData.description}</div>
                        </div>
                        <div className="detail__content"> 
                            <div className="detail__title">Developer</div>
                            <div className="detail__desc">{popupGameData.developer}</div>
                        </div>
                        <div className="detail__content"> 
                            <div className="detail__title">Publisher</div>
                            <div className="detail__desc">{popupGameData.publisher}</div>
                        </div>
                        <div className="detail__content"> 
                            <div className="detail__title">ReleaseDate</div>
                            <div className="detail__desc">{popupGameData.releaseDate}</div>
                        </div>
                        <div className="detail__content"> 
                            <div className="detail__title">Crawling Date</div>
                            <div className="detail__desc">{popupGameData.lastVideoCrawled}</div>
                        </div>
                    </p>   
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
