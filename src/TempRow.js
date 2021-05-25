import React, {useEffect, useLayoutEffect, useState} from "react";
import './Row.css';
import Video from "./Video";
import Multi_Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";

function TempRow({ title, setPopupUrl, setVisible, posY }) {
    const [loading, setLoading] = useState(true);
    const [myGame, setMyGame] = useState([]);
    const [gameData, setGameData] = useState([]);
    const user = useSelector(selectUser);
    const [temp, setTemp] = useState([]);

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
        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/all`)
            .then((res) => {
                if(res){
                    const len = res.data.length;
                    for(let i = 0; i < 10; i++){
                        setTemp(temp => [...temp, res.data[len - i]]);
                    }
                }else{
                    console.log("err");
                }
                return temp;
            })

        setLoading(false);
        console.log(temp);
        return () => {
            setLoading(true);
        }
    }, []);


    useEffect(() => {
        async function fetchFavorData() {
            const userId = user.user_id
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/favor/all`)
                .then((res) => {
                    res.data.map((game) => {
                        const id = game.gameId;
                        setMyGame(myGame => [...myGame, id]);
                    })
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
                    {
                        <Video
                            key="59"
                            className="row_poster"
                            OneOfGameData={lastGame}
                            setVisible={setVisible}
                            setPopupUrl={setPopupUrl}
                            posY={posY}
                            myGame={myGame}
                        />
                    }

                    {
                        (temp.map((set, index) => (
                                <Video
                                    key={index}
                                    className="row_poster"
                                    OneOfGameData={set}
                                    setVisible={setVisible}
                                    setPopupUrl={setPopupUrl}
                                    posY={posY}
                                    myGame={myGame}
                                />
                        )))
                    }
                </Multi_Carousel>
            </div>
        </div>
    )
}

export default TempRow;
