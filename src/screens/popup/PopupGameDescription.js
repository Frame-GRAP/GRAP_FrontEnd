import React, { useEffect, useState } from 'react'
import "./PopupGameDescription.css"
import moment from 'moment'



function PopupGameDescription({popupGameData}) {
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [popupGameData])

    if(loading) return (<div>Loading...</div>);
    return (
        <div className="popup__Description">
            {/* <div className="title__font">Game Description</div> */}
            <h2 className="detail__gameName"> {popupGameData.name}</h2><br/>

            <div className="description__contents">
                <div className="game__Poster">
                    <img src={popupGameData.headerImg} />
                </div>
                <div className="game__Description">
                    <div className="detail__Description">
                        {popupGameData.description}
                    </div>
                    <div className="detail__content">
                        <div className="detail__title">
                            <div className="detail__name">Developer</div>
                            <div className="detail__name">Publisher</div>
                            <div className="detail__name">ReleaseDate</div>
                        </div>
                        <div className="detail__desc">
                            <div className="detail__detail">
                                {popupGameData.developer ? (
                                    popupGameData.developer.replaceAll("\"", "").replace("[","").replace("]","")
                                    ) : (
                                    popupGameData.developer
                                )}
                            </div>
                            <div className="detail__detail">
                                {popupGameData.publisher ? (
                                    popupGameData.publisher.replaceAll("\"", "").replace("[","").replace("]","")
                                    ) : (
                                    popupGameData.publisher
                                )}
                            </div>
                            <div className="detail__detail">{popupGameData.releaseDate}</div>
                        </div>

                    </div>
                    <div className="detail_download">
                        <a
                            href={popupGameData.downloadUrl}
                        >
                            <button className="download_btn">다운로드</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupGameDescription
