import React, {useCallback, useEffect, useRef, useState} from "react";
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
import useFetchCategory from "./useFetchCategory";


function CategoryScreen() {
    const [visible, setVisible] = useState(false);
    const [posY, setPosY] = useState(false);
    const user = useSelector(selectUser);
    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");


    const [searching, setSearching] = useState(false);
    const [searchWord, setSearchWord] = useState("");

    const [videoShow, setVideoShow] = useState(false);
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);
    const [curGame, setCurGame] = useState([]);

    const [myGameData, setMyGameData] = useState([]);
    const [myGame, setMyGame] = useState([]);

    const [page, setPage] = useState(1);
    const { pageLoading, error, categoryGameData, setCategoryGameData } = useFetchCategory(categoryId, page);
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
    }, [handleObserver, categoryId]);


    useEffect(() => {
        async function fetchCategoryData() {
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/category/all`)
                .then((res) => {
                    setCategoryList(res.data);
                });
            return myGameData;
        }

        fetchCategoryData();
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, []);

    useEffect(() => {
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
    }, [categoryId]);


    const getCategoryResult = (getCategory) => {
        setCategoryId(getCategory.id);
        setCategoryName(getCategory.ui_name);
        setCategoryGameData([]);
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
                                    options={categoryList}
                                    labelField={"ui_name"}
                                    placeholder={"카테고리"}
                                    searchable={false}
                                    onChange={(value) => getCategoryResult(value[0])}
                                />
                            </div>
                        </div>

                        <div className="categoryScreen_title">
                            <h2>{categoryName}</h2>
                        </div>
                        <div className="categoryScreen_result">
                            {categoryGameData.map((set,index) => (
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
