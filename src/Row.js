import React, {useEffect, useState} from "react";
import './Row.css';
import Video from "./Video";
import Multi_Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";


function Row({ category, setPopupUrl, setVisible, posY }) {
    const [loading, setLoading] = useState(true);
    const [myGame, setMyGame] = useState([]);
    const [gameData, setGameData] = useState([]);
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

    function shuffleJson(data) {
        data.sort(()=> Math.random() - 0.5);
        return data;
    }
    // Data Fetch
    const [lastGame, setLastGame] = useState([]);
    useEffect(()=> {
        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/categoryTab/category/${category.id}/game`)
        .then((res) => {
            if(res){
                setLastGame(res.data.pop());
                shuffleJson(res.data);
                setGameData(res.data);
            }else{
                console.log("err");
            }
        })

        // console.log(lastGame);
        // console.log(gameData);

        setLoading(false);
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
        fetchFavorData();
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [gameData]);

    

    if(loading) return (<div>Loading...</div>);
    return (
        <div className="row">
            <h2>{category.name}</h2>
            
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
                            isvideo="1"
                        />
                    }

                    {
                        (gameData.map((set, index) => (
                            (index <= 10 && set.name!==`${lastGame}`) && (
                                <Video
                                    key={index}
                                    className="row_poster"
                                    OneOfGameData={set}
                                    setVisible={setVisible}
                                    setPopupUrl={setPopupUrl}
                                    posY={posY}
                                    myGame={myGame}
                                    isvideo="0"
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
