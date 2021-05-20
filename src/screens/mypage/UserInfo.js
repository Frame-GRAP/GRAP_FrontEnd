import React, {useState} from 'react'
import './UserInfo.css'
import {useHistory} from "react-router-dom";

import grap_logo from './../../img/grap_logo2-1.png';

function UserInfo() {
    const history = useHistory();
    const [Q1, setQ1] = useState([]);
    const [Q2, setQ2] = useState([]);

    function submit(e){

        const question1 = document.getElementsByName("question-1");
        let ary1=[];
        question1.forEach((set) => {
            if(set.checked===true){
                console.log(set.value);
                ary1.push(set.value);
            }
        })        

        const question2 = document.getElementsByName("question-2");
        let ary2=[];
        question2.forEach((set) => {
            if(set.checked===true){
                console.log(set.value);
                ary2.push(set.value);
            }
        })

        console.log(ary1, ary2);
    }

    return (
        <div className="userInfo">
            <div className="mypage_nav_logo userInfo_nav_logo">
                <img className='logo' src={grap_logo} onClick={() => history.push("/")} alt="logo"/>
            </div>
            <div className="question_items">
                <div className="question">
                    <div className="question_title">1. 좋아하는 게임의 장르를 선택해 주세요.</div>
                    <input type="checkbox" className="question_item" name="question-1" value="RPG"/>RPG
                    <input type="checkbox" className="question_item" name="question-1" value="FPS"/>FPS
                    <input type="checkbox" className="question_item" name="question-1" value="MMORPG"/>MMORPG
                </div>

                <div className="question">
                    <div className="question_title">2. 싫어하는 게임의 장르를 선택해 주세요.</div>
                    <input type="checkbox" className="question_item" name="question-2" value="RPG"/>RPG
                    <input type="checkbox" className="question_item" name="question-2" value="FPS"/>FPS
                    <input type="checkbox" className="question_item" name="question-2" value="MMORPG"/>MMORPG
                </div>


                <div className="userInfo_submit">
                    <button className="userInfo_btn" onClick={submit}>제출</button>
                    <button className="userInfo_btn" onClick={()=>history.push("/mypage")}>Mypage로 이동</button>
                </div>
            </div>


        </div>
    )
}

export default UserInfo
