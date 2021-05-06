import React, {useState} from "react";
import ReactPlayer from "react-player";
import './Video.css';

function Video({url}) {
    const [content, toggleContent] = useState(true);
    const [delayHandler, setDelayHandler] = useState(null)

    const show = () => {
        setDelayHandler(setTimeout(() => {
            toggleContent(false);
        }, 700))
        clearTimeout(delayHandler);
    }

    const hide = () => {
        setDelayHandler(setTimeout(() => {
            toggleContent(true);
        }, 700))
        clearTimeout(delayHandler);
    }

    return (
        <div className="row_container" onMouseEnter={show} onMouseLeave={hide}>
            { content ? (
                <div className="row_item">
                    <img className="row_img" src={url[0]} alt="game"/>
                </div>
            ) : (
                <div className="row_item">
                    <ReactPlayer className="row_video" url={url[1]} width='95%' height='95%' playing={true}/>
                    <button className="game_info">상세정보</button>
                </div>
            )}
        </div>
    );
}

export default Video;
