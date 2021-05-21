import React, {useState, useEffect, useRef} from 'react'
import './UserInfo.css'
import {useHistory} from "react-router-dom";
import axios from 'axios'

import grap_logo from './../../img/grap_logo2-1.png';

function UserInfo() {
    const history = useHistory();
    const nickname = useRef();

    const [gameData, setGameData] = useState([]);

    function TotalSubmit(){  
        const answer1 = nickname.current.value;

        const question2 = document.getElementsByName("question2_selectBtn");
        let answer2=[];
        question2.forEach((set) => {
            if(set.checked===true){
                console.log(set.value);
                answer2.push(set.value);
            }
        })

        console.log(answer1, answer2);
    }

    function IsOverlap(){
        console.log(nickname.current.value)
    }

    useEffect(()=> {
        axios.get("http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/all")
        .then((res)=>{
            setGameData(res.data);
        })
    }, []);

    return (
        <div className="userInfo">
            <div className="userInfo_nav_logo">
                <img className='logo' src={grap_logo} onClick={() => history.push("/")} alt="logo"/>
            </div>
            <div className="question_items">
                <div className="question_purpose question_title">
                    다음 항목들을 작성해 주십시오
                </div>
                <div className="question">
                    <div className="question_title">
                        1. 별명/애칭<br/>
                        <div className="question_answer">
                            <div className="question_answer_item">
                                <input type="text" className="question1_input" ref={nickname}/>
                                <button className="isOverlap_btn" onClick={IsOverlap}><h4>중복 확인</h4></button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="question">
                    <div className="question_title">2. 즐겨하는 게임을 모두 선택해 주세요.</div>

                    <div className="question_answer">
                        {gameData.map((set, index) =>{
                            if(index <= 9){
                                return (
                                    <>
                                    <div className="question_answer_item">
                                        <input 
                                            key={index} 
                                            type="checkbox" 
                                            className="question2_selectBtn"
                                            name="question2_selectBtn"
                                            id={set.id}
                                            value={set.id}
                                        />
                                        <label htmlFor={set.id}><span className="question2_gamename">{set.name}</span><br/>
                                        <img src={set.headerImg} className="question2_gameImg"></img></label>
                                    </div>
                                    </>
                                )
                            }
                        })}
                    </div>
                </div>


                <div className="userInfo_submit">
                    <button className="userInfo_btn" onClick={TotalSubmit}>제출</button>
                    <button className="userInfo_btn" onClick={()=>history.push("/mypage")}>취소</button>
                </div>
            </div>


        </div>
    )
}

export default UserInfo
