import React from "react";
import './Row.css';
import Video from "./Video";
import Multi_Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


function Row({ title, gameData, setPopupUrl, setVisible, posY }) {
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

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                <Multi_Carousel className="row_carousel"
                          swipeable={false}
                          draggable={false}
                          showDots={true}
                          infinite={true}
                          responsive={responsive}
                          itemClass="list_item"
                          sliderClass="row_posters"
                          dotListClass="dot_list">
                    {
                        gameData.map((set, index) => (
                            (set.videosId.length > 0) && (
                            <Video
                                key={index}
                                className="row_poster"                                
                                OneOfGameData={set}
                                setVisible={setVisible}
                                setPopupUrl={setPopupUrl}
                                posY={posY}
                            />
                            )
                        ))
                    }
                </Multi_Carousel>
            </div>
        </div>
    )
}

export default Row;
