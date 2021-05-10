import React, {useEffect, useRef, useState} from "react";
import ReactPlayer from "react-player";

function BannerVideo({check, url}){
    const [selected, setSelected] = useState(false);


    const changeToImg = () => {
        setSelected(false);
    }

    return (
        <div className="banner_item">
            {!selected ? (
                <img className="banner_img" src={url[0]} alt="game"/>
            ) : (
                <ReactPlayer className="banner_video" url={url[1]} width='95%' height='95%' playing={true} onEnded={changeToImg} />
            )}
        </div>
    );
}

export default BannerVideo;
