import React, {useEffect, useRef} from 'react'
import "./PopupGameDescription.css"


function PopupGameDescription({gameData, gameId}) {
    return (
        <div className="popup__Description">
            <div className="title__font">Game Description</div>
            {/* 이름, 설명, download url */}
            <div className="description__contents">

                <div className="game__Poster">
                    <img 
                        src="https://steamcdn-a.akamaihd.net/steam/apps/291550/header.jpg"
                        // src={gameData[gameId].headerImg}
                    />
                </div>


                <div className="game__description">
                    <h2>Name : Brawlhalla</h2> <br/>
                    {/* <h2>Name : {gameData[gameId].name}</h2> <br/> */}
                    <p className="description">
                        Description : This game's genre is RPG.This game's genre is RPG.This game's genre is RPG.This game's genre is RPG.This game's genre is RPG.This game's genre is RPG.This game's genre is RPG.This game's genre is RPG.This game's genre is RPG.This game's genre is RPG.This game's genre is RPG.This game's genre is RPG.
                        {/* {gameData[gameId].description} */}
                    </p><br/>        
                    <h4>Download URL </h4>
                    <a 
                        href="www.naver.com"
                        // href={gameData[gameId].downloadedUrl}
                        className="down_link">
                        www.naver.com
                        {/* {gameData[gameId].downloadedUrl} */}
                    </a>
                    <br/>
                </div>
                

            </div>
        </div>
    )
}

export default PopupGameDescription
