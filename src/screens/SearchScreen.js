import React, {useCallback, useEffect, useState} from "react";
import Nav from "../Nav";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import './SearchScreen.css';
import Video from "../Video";
import VideoModal from "../VideoModal";

function SearchScreen({searchWord}) {
    const [myGameData, setMyGameData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [myGame, setMyGame] = useState([]);
    const [visible, setVisible] = useState(false);
    const [posY, setPosY] = useState(false);
    const user = useSelector(selectUser);
    const [loading, setLoading] = useState(true);

    const [videoShow, setVideoShow] = useState(false);
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);
    const [curGame, setCurGame] = useState([]);
    const [gameName, setGameName] = useState("");
    const [gameId, setGameId] = useState(0);

    useEffect(() => {
        async function fetchSearchData() {
            setSearchResult([]);
            const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game?name=${searchWord}`);

            setSearchResult(request.data);
            return request;
        }

        async function fetchMyData() {
            setMyGame([]);
            const userId = user.user_id;
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/favor/all`)
                .then((res) => {
                    res.data.map((game, index) => {
                        const id = game.gameId;
                        setMyGame(myGame => [...myGame, id]);
                    })
                });
            return myGameData;
        }

        fetchSearchData();
        fetchMyData();
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [searchWord]);

    if(loading) return (<div>Loading...</div>);
    return (
        <div className="searchScreen">
            <div className="searchScreen_body">
                <h2>검색결과</h2>
                <div className="searchScreen_result">
                    {searchResult.map((set,index) => (
                        <Video
                            key={index}
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
            <div className="video_modal">
                {videoShow && <VideoModal setVideoShow={setVideoShow} X={X} Y={Y-25}OneOfGameData={curGame}/>}
            </div>
        </div>
    )
}

export default SearchScreen;
