import React, {useRef, useState, useEffect} from "react";
import './Row.css';
import Video from "./Video";
import $ from "jquery"
import Image2 from "./img/Related_Image2.png"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Row({ title, visible, setVisible  }) {
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

    useEffect(()=> {
        $(".game_info").mouseup(function() {
            setVisible(true);
            $("#homeScreen").addClass('layer-open');
        })
    }, [visible])

    return (
        <div className="row">
            <h2>{title}</h2>
            <div>
                <Carousel className="row_carousel"
                          swipeable={false}
                          draggable={false}
                          showDots={true}
                          infinite={true}
                          responsive={responsive}
                          itemClass="list_item"
                          sliderClass="row_posters"
                          dotListClass="dot_list">
                    {results.map((set, index) =>
                        <Video className="row_poster" url={set}/>
                    )}
                </Carousel>
            </div>
        </div>
    )
}

export default Row;
