import React, {useEffect, useState} from "react";
import './Row.css';
import Video from "./Video";
import Multi_Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";


function Row({ title, gameData, setPopupUrl, setVisible, posY }) {
    const [loading, setLoading] = useState(true);
    const [myGame, setMyGame] = useState([]);
    const user = useSelector(selectUser);

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

    useEffect(() => {
        async function fetchFavorData() {
            const userId = user.user_id
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/favor/all`)
                .then( (res) => {
                    res.data.map((game) => {
                        const id = game.gameId;
                        setMyGame(myGame => [...myGame, id]);
                    })
                })
            return myGame;
        }
        fetchFavorData();
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [gameData]);

    if(loading) return (<div>Loading...</div>);
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
                    {gameData.map((set, index) => (
                            (set.videosId.length > 0) && (
                                <Video
                                    key={index}
                                    className="row_poster"
                                    OneOfGameData={set}
                                    setVisible={setVisible}
                                    setPopupUrl={setPopupUrl}
                                    posY={posY}
                                    myGame={myGame}
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
