import React, {useEffect} from 'react'
import {useHistory} from "react-router-dom";
import './Mypage.css'

import grap_logo from './../../img/grap_logo2-1.png';
import axios from 'axios';

function Mypage() {
    const history = useHistory();


    return (
        <div className="mypage">
            <div className="mypage_nav">
                <div className="mypage_nav_logo">
                    <img className='logo' src={grap_logo} onClick={() => history.push("/")} alt="logo"/>
                </div>
            </div>

            <div className="mypage_contents">
                <h1 className="account_header">My Info</h1>
                {/* 멤버십, 결제정보, 쿠폰함, 회원탈퇴 */}

                <div className="account_section">
                    <div className="account_section_header">
                        <div className="header_title">회원 정보</div>
                        <button className="user_escape" ><h4>회원 탈퇴</h4></button>
                    </div>
                    <div className="account_section_info">
                        <h3 className="email">baewonchan1@naver.com</h3>
                        <div className="password">비밀번호: ********</div>
                        <br/><br/>

                        <div className="user_table_info">
                            좋아하는 게임 장르 : RPG, FPS<br/>
                            싫어하는 게임 장르 : MMORPG
                        </div>
                    </div>
                    <div className="account_section_modify">
                        <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={() => history.push("/userInfo")}>이메일 변경</div>
                       
                        <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={() => history.push("/userInfo")}>비밀번호 변경</div><br/><br/>
                      
                        <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={() => history.push("/userInfo")}>정보 변경</div>
                        
                    </div>

                </div>

                <div className="account_section">
                    <div className="account_section_header">
                        <div className="header_title">멤버십&결제 정보</div>
                        <button className="membership_escape" ><h4>멤버십 해지</h4></button>
                    </div>
                    <div className="account_section_info">
                        <h3 className="membership_info">Premium Silver</h3><br/>
                        <div className="card_info">신용카드 : **** **** **** 1111</div>
                        <div className="card_modify_date">다음 결제일은 2021/06/30 입니다.</div>
                    </div>
                    <div className="account_section_modify">
                        <div className="membership_modify">
                            <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={() => history.push("/userInfo")}>멤버십 변경</div><br/>

                            <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={() => history.push("/userInfo")}>카드 변경</div>
                        </div>
                    </div>
                </div>

                <div className="account_section">
                    <div className="account_section_header">
                        <div className="header_title">보유 쿠폰</div>
                    </div>
                    <div className="account_section_info">
                        <h3 className="coupon_num">Available : 5</h3>
                    </div>
                    <div className="account_section_modify">
                        <div className="coupon_selected">
                            <a href="#mypage" className="modify" style={{"color":"#0073e6", "text-decoration":"none"}}>게임 선택</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mypage
