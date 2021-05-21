import React from 'react'
import "./PopupGameDescription.css"
import moment from 'moment'



function PopupGameDescription({popupGameData}) {

    return (
        <div className="popup__Description">
            {/* <div className="title__font">Game Description</div> */}
            <h1 className="detail__gameName"> {popupGameData.name}</h1><br/>

            <div className="description__contents">
                <div className="game__Poster">
                    <img src={popupGameData.headerImg} />
                </div>
                <div className="game__Description">
                    <p className="detail__Description">
                        <div className="detail__content"> 
                            <div className="detail__title">Game Name</div>
                            <div className="detail__desc">{popupGameData.name}</div>
                        </div>
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
                            <div className="detail__desc">
                                {moment(popupGameData.lastVideoCrawled).format('YYYY-MM-DD HH:mm:ss')}
                            </div>
                        </div><br/><br />
                        <div className="detail__content"> 
                            <div className="detail__title">Download</div>
                            <div className="detail__desc">
                                <a href={popupGameData.downloadUrl}>
                                    {popupGameData.downloadUrl}
                                </a>
                            </div>
                        </div>
                    </p>
                </div>      
            </div>
        </div>
    )
}

export default PopupGameDescription
