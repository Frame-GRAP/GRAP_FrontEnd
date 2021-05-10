import React, {useEffect, useState} from "react";
import './Banner.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image2 from "./img/Related_Image2.png";
import Video from "./Video";
import ReactPlayer from "react-player";
import BannerVideo from "./BannerVideo";

function Banner() {
    const video_url2 = "https://www.youtube.com/watch?v=ubzs4LQdJrc";
    const url = [video_url2, video_url2, video_url2];
    const thumbnail = [Image2, Image2, Image2];
    const results = [];
    const [loading, setLoading] = useState(true);
    const [cur, setCur] = useState(0);

    for(let i = 0; i < 3; i++){
        let col = [];
        col[0] = thumbnail[i];
        col[1] = url[i];
        results[i] = col;
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, []);

    const onChange = (index) => {
        setCur(index);
    }

    const curVideo = (idx) => {
        if(cur === idx && loading === false){
            return true;
        }
        else{
            return false;
        }
    }

    return (
        <header className="banner">
            <Carousel
                className="banner_carousel"
                infiniteLoop={true}
                showThumbs={false}
                onChange={onChange}>
                {results.map((set, idx) =>
                    <div className="banner_container">
                        <div className="banner_item">
                            <BannerVideo check={curVideo(idx)} url={set}/>
                        </div>
                        <div className="banner_contents">
                            <h1 className="banner_title">League of Legend</h1>
                            <h1 className="banner_description">게임설명</h1>
                            <div className="banner_buttons">
                                <button className="banner_button">상세정보</button>
                            </div>
                        </div>
                    </div>
                )}
            </Carousel>
            <div className="banner_fadeBottom" />
        </header>
    )
}

export default Banner;
