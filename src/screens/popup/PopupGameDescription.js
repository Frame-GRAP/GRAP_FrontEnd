import React from 'react'
import "./PopupGameDescription.css"


function PopupGameDescription() {

    return (
        <div className="popup__Description">
            <div className="title__font">Game Description</div>
            {/* 이름, 설명, download url */}
            <div className="description__contents">

                <div className="game__Poster">
                    <img src="https://steamcdn-a.akamaihd.net/steam/apps/291550/header.jpg" />
                </div>


                <div className="game__description">
                    <h2>Name : Brawlhalla</h2> <br/>
                    <p className="description">
                        Description : This game's genre is RPG.This game's genre is RPG.This game's genre is RPG.This game's genre is RPG.
                    </p><br/>        
                    <h4>Download URL </h4><a href="www.naver.com" className="down_link">https://www.naver.com</a>
                    <br/>
                </div>

            </div>
        </div>
    )
}

export default PopupGameDescription
