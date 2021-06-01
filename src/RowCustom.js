import React, {useEffect, useState} from "react";
import './Row.css';
import Video from "./Video";
import Multi_Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";



function RowCustom({setVideoShow, setX, setY, title, gameArr=[], setPopupUrl, setVisible, posY, setCurGame}) {
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

    const [lastGame, setLastGame] = useState([]);
    useEffect(()=> {
        async function fetchData() {
            const tempArr = new Array();
            await gameArr.map((gameId, index) => {
                const id = gameId.gameId
                axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${id}`)
                    .then((res) => {
                        const game = new Object();
                        game.id = res.data.id;
                        game.name = res.data.name;
                        game.headerImg = res.data.headerImg;
                        tempArr.push(game);
                    });
            })
            setGameData(tempArr);
            return gameData;
        }
        fetchData().then((r) =>{
            setLoading(false);
        })

    }, [gameArr]);

    useEffect(() => {
        async function fetchFavorData() {
            const userId = user.user_id
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/favor/all`)
                .then((res) => {
                    const temp = new Array()
                    res.data.map((game) => {
                        const id = game.gameId;
                        temp.push(id);

                    })
                    setMyGame(temp);
                })
            return myGame;
        }
        fetchFavorData().then((r) =>{
            setLoading(false);
        })
        return () => {
            setLoading(true);
        }
    }, []);


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


                    {gameData.map((set,index) => (
                        (index <= 10) && (
                            <Video
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
                        ))
                    )}

                </Multi_Carousel>
            </div>
        </div>
    )
}

export default RowCustom;
