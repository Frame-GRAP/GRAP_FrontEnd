import React, {useCallback, useEffect, useState} from "react";
import Nav from "../Nav";
import Video from "../Video";
import Image2 from "../img/Related_Image2.png";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import './myListScreen.css';
import {VscDash} from "react-icons/all";

function MyListScreen() {
    const [myGameData, setMyGameData] = useState([]);
    const [myGame, setMyGame] = useState([]);
    const [visible, setVisible] = useState(false);
    const [posY, setPosY] = useState(false);
    const user = useSelector(selectUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMyData() {
            const userId = user.user_id;
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/favor/all`)
                .then((res) => {
                    const temp = res.data.map((game) => {
                        const gameId = game.gameId;
                        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}`)
                            .then((res) => {
                                game.data = res.data;
                                console.log(game);
                            })
                            return game;
                    })
                    console.log(temp);
                    
                });
            return myGame;
        }
        fetchMyData();
        setLoading(false);
    }, [])


    if(loading) return (<div>Loading...</div>);
    return (
        <div className="myListScreen">
            <Nav />
            <div className="myListScreen_body">
                <h2>내가 찜한 목록</h2>
                <div className="myListScreen_result">
                    {console.log(myGameData)}
                </div>
            </div>
        </div>
    )
}

export default MyListScreen;