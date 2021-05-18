import React, {useEffect, useState} from "react";
import Nav from "../Nav";
import Video from "../Video";
import Image2 from "../img/Related_Image2.png";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import './myListScreen.css';

function MyListScreen() {
    const [myGameData, setMyGameData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [posY, setPosY] = useState(false);
    const user = useSelector(selectUser);
    const userId = user.user_id;

    /*useEffect(() => {
        async function fetchData() {
            const userId = user.user_id;
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/favor/all`)
                .then((res) => {
                    const gameTemp = [];
                    res.data.map((data, index) => {
                        const gameId = data.gameId;
                         axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}`)
                            .then((res) => {
                                gameTemp.push(res.data);
                            }).catch((err)=>{
                            console.log(err);
                        })
                    })
                    setMyGameData(gameTemp);
                });
            return myGameData;
        }
        fetchData();
        console.log(myGameData);
    }, []);*/

    const [gameIds, setGameIds] = useState([]);
    useEffect(() => {
        async function fetchData() {
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/favor/all`)
            .then((res) => {
                console.log(res.data);
                setGameIds(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        fetchData();
    }, []);


    useEffect(() => {   
        async function fetchData() {
            let GameArray=[];
            gameIds.map((set, index) => {
                console.log(set.gameId);
                /*axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${set.gameId}`)
                .then((res) => {
                    // console.log(res.data);
                    GameArray.push(res.data);
                    console.log(GameArray);
                }).catch((err)=>{
                    console.log(err);
                })*/
            })
            // setMyGameData(GameArray);
        }
        fetchData();

    }, [gameIds])

    

    const [gamedata, setGamedata] = useState([])
    return (
        <div className="myListScreen">
            <Nav />
            <div className="myListScreen_body">
                <h2>내가 찜한 목록</h2>
                <div className="myListScreen_result">
                    {/* {myGameData.map((set, index) => {
                        console.log(set)
                        return (
                            <Video
                                key={index}
                                className="row_poster"
                                OneOfGameData={set}
                            />
                        )
                    })}  */}

                    {/* console.log(set)
                    return (                        
                        <Video
                            key={index}
                            className="row_poster"
                            OneOfGameData={set}
                        />
                    ) */}
                    
                </div>
            </div>
        </div>
    )
}

export default MyListScreen;