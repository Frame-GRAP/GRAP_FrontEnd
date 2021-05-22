import React, {useEffect, useState} from "react";
import './Banner.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import BannerVideo from "./BannerVideo";
import axios from "axios";
import banner from "../src/img/asd.jpg";

function Banner() {
    const [mainGame, setMainGame] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cur, setCur] = useState(0);

    useEffect(() => {
        async function fetchData() {
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/1`)
                .then(async (res) => {
                    setMainGame(res.data);
                });
            return mainGame;
        }
        fetchData();
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, []);

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

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

    if(loading) return (<div>Loading...</div>);
    return (
        <header className="banner">
            <div className="banner_contents">
                <Carousel
                    className="banner_carousel"
                    infiniteLoop={true}
                    showThumbs={false}
                    onChange={onChange}>
                    <div className="banner_container">
                        <div className="banner_item">
                            {/*<BannerVideo check={curVideo(0)} mainGameData={mainGame}/>*/}
                        </div>
                        <div className="banner_info">
                            <h1 className="banner_title">{mainGame.name}</h1>
                            <img className="banner_title" src={banner} alt=""/>
                            <h1 className="banner_description">{truncate(mainGame?.description, 150)}</h1>
                            <div className="banner_buttons">
                                <button className="banner_button">상세정보</button>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>

            <div className="banner_fadeBottom" />
        </header>
    )
}

export default Banner;
