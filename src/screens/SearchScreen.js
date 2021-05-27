import React, {useCallback, useEffect, useState} from "react";
import Nav from "../Nav";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import './SearchScreen.css';
import Video from "../Video";

function SearchScreen({searchWord}) {
    const [searchResult, setSearchResult] = useState([]);
    const [myGame, setMyGame] = useState([]);
    const [visible, setVisible] = useState(false);
    const [posY, setPosY] = useState(false);
    const user = useSelector(selectUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getSearchResult() {
            await axios.get(``)
                .then((res) => {

                })
            return searchResult;
        }

        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [searchWord]);

    console.log(searchWord);

    if(loading) return (<div>Loading...</div>);
    return (
        <div className="searchScreen">
            <div className="searchScreen_body">
                <h2>검색결과</h2>
                <div className="searchScreen_result">
                    {searchResult.map((set,index) => (
                        <Video OneOfGameData={set} myGame={myGame} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchScreen;
