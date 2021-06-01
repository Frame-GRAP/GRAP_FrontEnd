import React, {useCallback, useEffect, useState} from "react";
import Nav from "../../Nav";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import './CategoryScreen.css';
import Video from "../../Video";
import Footer from "../../Footer";
import SearchScreen from "../SearchScreen";
import VideoModal from "../../VideoModal";
import Select from 'react-dropdown-select';

const tempCategory = [
    {label: "액션", value: "액션"},
    {label: "코믹", value: "코믹"}
];

function CategoryScreen() {
    const [visible, setVisible] = useState(false);
    const [posY, setPosY] = useState(false);
    const user = useSelector(selectUser);
    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState("");
    const [gameData, setGameData] = useState([]);

    const [searching, setSearching] = useState(false);
    const [searchWord, setSearchWord] = useState("");

    const [videoShow, setVideoShow] = useState(false);
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);
    const [curGame, setCurGame] = useState([]);

    const [myGameData, setMyGameData] = useState([]);
    const [myGame, setMyGame] = useState([]);



    useEffect(() => {
        setCategoryList(tempCategory);
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, []);

    const getCategoryResult = (category) => {
        console.log(category);
        setMyGameData([]);
        setMyGame([]);
        const userId = user.user_id;
        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/favor/all`)
            .then((res) => {
                res.data.map((game, index) => {
                    const id = game.gameId;
                    setMyGame(myGame => [...myGame, id]);
                    axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${id}`)
                        .then((res) => {
                            setMyGameData(myGameData => [...myGameData, res.data]);
                        })
                })
            });
    }

    if(loading) return (<div>Loading...</div>);
    return (
        <>
            <div className="categoryScreen">
                <Nav setSearchWord={setSearchWord} setSearching={setSearching} />
                { searching ? (
                    <SearchScreen searchWord={searchWord} />
                ) : (
                    <div className="categoryScreen_body">
                        <div className="categoryScreen_header">
                            <h2>카테고리</h2>
                            <div className="categoryScreen_list">
                                <Select
                                    options={ categoryList }
                                    placeholder={"카테고리"}
                                    onChange={(value) => getCategoryResult(value[0].label)}
                                />
                            </div>
                        </div>

                        <div className="categoryScreen_result">
                            {myGameData.map((set,index) => (
                                <Video
                                    setVideoShow={setVideoShow}
                                    setX={setX}
                                    setY={setY}
                                    OneOfGameData={set}
                                    myGame={myGame}
                                    setCurGame={setCurGame}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="video_modal">
                {videoShow && <VideoModal setVideoShow={setVideoShow} X={X} Y={Y}OneOfGameData={curGame}/>}
            </div>
            <Footer />
        </>
    )
}

export default CategoryScreen;
