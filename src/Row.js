import React, {useState} from "react";
import './Row.css';
import Video from "./Video";

function Row({ title }) {
    const [hover, setHover] = useState(false);
    //플랫폼 + code 한번에 받아야함
    const img_url = "https://assets.brand.microsites.netflix.io/assets/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png?v=49";
    const url = ["https://www.youtube.com/watch?v=7C2z4GqqS5E", "https://www.youtube.com/watch?v=7C2z4GqqS5E", "https://www.youtube.com/watch?v=7C2z4GqqS5E"];
    const thumbnail = [img_url, img_url, img_url];
    const results = [];

    for(let i = 0; i < url.length; i++){
        let col = [];
        col[0] = thumbnail[i];
        col[1] = url[i];
        col[2] = false;

        results[i] = col;
    }

    const toggleHover = () => {
        if(!hover){
            setHover(true);
        }
        else{
            setHover(false);
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {results.map((set) =>
                    <div>
                        {/* {!hover ? (<img className="row_poster" src={set[0]} onMouseOver={toggleHover}  alt="game"/>)
                            : (<Video embedId={set[1]} onMouseLeave={toggleHover} visibleModal={visibleModal} />)} */}

                        <img className="row_poster" src={set[0]} onMouseOver={toggleHover}  alt="game"/>    
                    </div>
                )}
            </div>
        </div>
    )
}

export default Row;
