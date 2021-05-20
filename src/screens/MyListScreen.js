import React, {useCallback, useEffect, useState} from "react";
import Nav from "../Nav";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import './MyListScreen.css';
import Video from "../Video";

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
                    res.data.map((game, index) => {
                        const id = game.gameId;
                        setMyGame(myGame => [...myGame, id]);
                        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${id}`)
                            .then((res) => {
                                setMyGameData(myGameData => [...myGameData, res.data]);
                            })
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

    if(loading) return (<div>Loading...</div>);
    return (
        <div className="myListScreen">
            <Nav />
            <div className="myListScreen_body">
                <h2>내가 찜한 목록</h2>
                <div className="myListScreen_result">
                    {myGameData.map((set,index) => (
                        <Video OneOfGameData={set} myGame={myGame} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyListScreen;