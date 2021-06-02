import React, {useCallback, useEffect, useRef, useState} from "react";
import Nav from "../../Nav";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import './SearchScreen.css';
import Video from "../../Video";
import VideoModal from "../../VideoModal";
import useFetchCategory from "../category/useFetchCategory";
import useFetchSearch from "./useFetchSearch";

function SearchScreen({searchWord}) {
    const [myGameData, setMyGameData] = useState([]);
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

    const [page, setPage] = useState(1);
    const { pageLoading, error, searchResult, setSearchResult } = useFetchSearch(searchWord, page);
    const loader = useRef(null);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    }, []);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);
    }, [handleObserver, searchWord]);

    useEffect(() => {
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

        fetchMyData();
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, []);

    useEffect(() => {
        setSearchResult([]);
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
                    {pageLoading && <p>Loading...</p>}
                    {error && <p>Error!</p>}
                    <div ref={loader} />
                </div>
            </div>
            <div className="video_modal">
                {videoShow && <VideoModal setVideoShow={setVideoShow} X={X} Y={Y-25}OneOfGameData={curGame}/>}
            </div>
        </div>
    )
}

export default SearchScreen;
