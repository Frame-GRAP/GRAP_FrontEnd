import React, {useState, useEffect, useRef} from 'react'
import './UserInfo.css'
import {useHistory} from "react-router-dom";
import axios from 'axios'

import grap_logo from './../../img/grap_logo2-1.png';
import {login, selectUser} from "../../features/userSlice";
import Footer from "../../Footer";
import {TextField} from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import {useDispatch, useSelector} from "react-redux";

function UserInfo() {
    const history = useHistory();
    const preNickname = useRef();
    const [validateNickname, setValidateNickname] = useState(false);
    const [gameData, setGameData] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    function TotalSubmit(){
        const nickname = preNickname.current.value;
        const checked = document.getElementsByName("question2_selectBtn");
        let userFavor=[];
        checked.forEach((set) => {
            if(set.checked===true){
                userFavor.push(set.value);
            }
        })

        const gameData = new Object();
        const gameArray = new Array();

        userFavor.map((id, index) => {
            const gameData = new Object();
            gameData.gameId = id;
            gameArray.push(gameData);
        })

        if(!validateNickname){
            alert("닉네임 중복확인을 해주세요");
        }
        else{
            if(userFavor.length < 3) {
                alert("게임을 3개 이상 선택해주세요");
            }
            else{

                userFavor.map((id, index) => {
                    const gameData = new Object();
                    gameData.gameId = id;
                    gameArray.push(gameData);
                })

                gameData.data = gameArray;

                const selectedGames = JSON.stringify(gameData);

                console.log(selectedGames);

                axios({
                    method: 'post',
                    url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/nickname/${nickname}`,
                    headers:{
                        "Content-Type": "application/json"
                    },
                    data : nickname
                }).then((res) => {
                    if(res){
                        console.log(res.data);
                    }
                })

                dispatch(login({
                    user_id : user.user_id,
                    name : user.name,
                    nickname: nickname
                }))
                window.localStorage.setItem("user_id", JSON.stringify(user.user_id));
                window.localStorage.setItem("name", user.name);
                window.localStorage.setItem("nickname", nickname);

                axios({
                    method: 'post',
                    url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/userGamePreference`,
                    headers:{
                        "Content-Type": "application/json"
                    },
                    data: selectedGames
                }).then((res) => {
                    if(res){
                        console.log(res.data);
                        history.push("/");
                    }
                }).catch((err) => {
                    alert(err);
                })
            }
        }
    }

    function IsOverlap(){
        const check = preNickname.current.value;
        console.log(check);
        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/nickname/${check}`)
            .then((res) =>{
                console.log(res.data);
                if(res.data.isDup == true){ //중복이니까 다시 입력받아야 함
                    alert("닉네임이 중복 되었습니다. 다른 닉네임을 입력해주세요.");
                    setValidateNickname(false);
                }
                else{ // 가능
                    alert("사용가능한 닉네임입니다.");
                    setValidateNickname(true);
                }
        })
    }

    useEffect(()=> {
        axios.get("http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/starter/all")
        .then((res)=>{
            setGameData(res.data);
        })
    }, []);

    return (
        <div className="userInfo">
            <div className="userInfo_nav_logo">
                <img className='userInfo_logo' src={grap_logo} alt="logo"/>
                <div className="userInfo_gradient" />
            </div>
            <div className="question_items">
                <div className="question">
                    <div className="question_title">
                        <h1>별명/애칭</h1>
                        {/*<input type="text" placeholder="Nickname" className="question1_input" ref={preNickname}/>*/}

                        <input type="text" placeholder="Nickname" className="question1_input" ref={preNickname}/>
                        <button className="isOverlap_btn" onClick={IsOverlap}><h3>중복 확인</h3></button>
                    </div>
                </div>
                <div className="question">
                    <div className="question_title2">
                        <h1>즐겨하는 게임을 3개 선택하세요.</h1>
                        <h2>회원님이 좋아하실 만한 게임을 더 많이 추천해드릴 수 있습니다. 마음에 드는 콘텐츠를 선택하세요.</h2>
                    </div>
                    <div className="userInfo_submit">
                        <button className="userInfo_btn" onClick={TotalSubmit}>저장</button>
                    </div>
                    <div className="question_answer">
                        {gameData.map((set, index) =>{
                            return (
                                <>
                                <div className="question_answer_item">
                                    <label className="question2_gameImg" htmlFor={set.id}>
                                        <input
                                            key={index}
                                            type="checkbox"
                                            className="question2_check"
                                            name="question2_selectBtn"
                                            id={set.id}
                                            value={set.game_id}
                                        />
                                        <div className="img_container">
                                            <img src={set.headerImg} className="question2_gameImg"></img>
                                        </div>
                                    </label>
                                </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserInfo
