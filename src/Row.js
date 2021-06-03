import React, {useEffect, useState} from "react";
import './Row.css';
import Video from "./Video";
import Multi_Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";

function Row({index, setVideoShow, setX, setY, title, category = [], setPopupUrl, setVisible, posY, setCurGame}) {
    const [loading, setLoading] = useState(true);
    const [myGame, setMyGame] = useState([]);
    const [gameData, setGameData] = useState([]);
    const user = useSelector(selectUser);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
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

    function shuffleJson(data) {
        data.sort(()=> Math.random() - 0.5);
        return data;
    }
    // Data Fetch
    const [lastGame, setLastGame] = useState([]);
    useEffect(()=> {
        if(category.length !== 0){
            const {categoryId} = category;
            axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/categoryTab/category/${categoryId}/game`)
                .then((res) => {
                    if(res){
                        shuffleJson(res.data);
                        setGameData(res.data);
                    }else{
                        console.log("err");
                    }
                })

            axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/8802`)
                .then((res) => {
                    setLastGame(res.data);
                })

            setLoading(false);
        }
        return () => {
            setLoading(true);
        }
    }, [category]);

    useEffect(() => {
        async function fetchFavorData() {
            const userId = user.user_id
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/favor/all`)
                .then((res) => {
                    const tempMyGame = new Array()
                    res.data.map((game) => {
                        const id = game.gameId;
                        tempMyGame.push(id);
                    })
                    setMyGame(tempMyGame);
                })
            return myGame;
        }
        fetchFavorData().then(r => {
            setLoading(false);
        });
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
                    {index == 0 && (
                        <Video
                            className="row_poster"
                            setVideoShow={setVideoShow}
                            setX={setX}
                            setY={setY}
                            OneOfGameData={lastGame}
                            setVisible={setVisible}
                            setPopupUrl={setPopupUrl}
                            posY={posY}
                            myGame={myGame}
                            setCurGame={setCurGame}
                        />
                    )}
                    {
                        (gameData.map((set, index) => (
                            (index <= 9 && set.name!==`${lastGame}`) && (
                                <Video
                                    key={index}
                                    className="row_poster"
                                    setVideoShow={setVideoShow}
                                    setX={setX}
                                    setY={setY}
                                    OneOfGameData={set}
                                    setVisible={setVisible}
                                    setPopupUrl={setPopupUrl}
                                    posY={posY}
                                    myGame={myGame}
                                    setCurGame={setCurGame}
                                />
                            )
                        )))
                    }
                </Multi_Carousel>
            </div>
        </div>
    )
}

export default Row;
