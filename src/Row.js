import React, {useRef, useState, useEffect} from "react";
import './Row.css';
import Video from "./Video";
import $ from "jquery"
import Image2 from "./img/Related_Image2.png"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReactPlayer from "react-player";

function Row({ title, gameData, videoData, popupGameData, setPopupGameData, visible, setVisible, gameId, setGameId, posY }) {
    //플랫폼 + code 한번에 받아야함
    const video_url = "https://www.youtube.com/watch?v=ubzs4LQdJrc";
    const url = [video_url, video_url, video_url, video_url, video_url, video_url, video_url, video_url];
    const thumbnail = [Image2, Image2, Image2, Image2, Image2, Image2, Image2, Image2];
    const results = [];

    for(let i = 0; i < 20; i++){
        let col = [];
        col[0] = thumbnail[i];
        col[1] = url[i];
        results[i] = col;
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    // console.log(gameData);
    // console.log(videoData);

    // gameData.forEach((set, index) => {
    //     console.log(set);
    // })

    return (
        <div className="row">            
            <h2>{title}</h2>
            <div className="row_posters">
                <Carousel className="row_carousel"
                          swipeable={false}
                          draggable={false}
                          showDots={true}
                          infinite={true}
                          responsive={responsive}
                          itemClass="list_item"
                          sliderClass="row_posters"
                          dotListClass="dot_list">
                    {/* {results.map((set, index) =>
                        <Video 
                            className="row_poster" 
                            url={set} 
                            setVisible={setVisible} 
                            posY={posY}
                            gameData={gameData}
                        />
                    )} */}
                    {
                        gameData.map((set, index) => ( 
                            // (set.videosId.length>0) &&                   
                            <Video 
                                className="row_poster" 
                                OneOfGameData={set}
                                gameData={gameData}
                                videoData={videoData}
                                popupGameData={popupGameData}
                                setPopupGameData={setPopupGameData}
                                setVisible={setVisible} 
                                posY={posY}
                            />
                        ))  
                    }
                    
                    
                </Carousel>

                {/* {results.map((set, index) =>
                    <div className="row_poster">
                        <div className="row_visible">
                            <img className="row_img" src={set[0]} alt="game"/>
                        </div>
                        <div className="row_hidden">
                            <ReactPlayer className="row_video" url={set[1]} width='100%' height='100%' playing={false}></ReactPlayer>
                            <button className="game_info">상세정보</button>
                        </div>
                    </div>
                )} */}
            </div>


            {/* <h2>{title}</h2>
            <div className="row_posters">
                {gameData.map((set, index) =>
                    <div className="row_poster">
                        <div className="row_visible">
                            <img className="row_img" src={gameData[index].headerImg} alt="game"/>
                        </div>
                        <div className="row_hidden">
                            <ReactPlayer 
                                className="row_video" 
                                url={set[1]} 
                                width='100%' height='100%' 
                                playing={false}></ReactPlayer>
                            <button 
                                className="game_info" 
                                // value={gameData[index].id}
                            >상세정보</button>
                        </div>
                    </div>
                )}
            </div> */}
        </div>
    )
}

export default Row;
