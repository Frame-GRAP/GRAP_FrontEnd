import React from "react";
import './Banner.css';

function Banner() {
    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("http://www.leagueoflegends.co.kr/upload/multimedia/4b0b1f0579cf22b220322317.jpg")`,
                backgroundPosition: "center center",
            }}>
            <div className="banner_contents">
                <h1 className="banner_title">Game Name</h1>
            </div>

            <div className="banner_fadeBottom" />
        </header>
    )
}

export default Banner;
