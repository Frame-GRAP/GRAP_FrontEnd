import React from 'react'
import {useHistory} from "react-router-dom";
import {selectUser} from "./../../features/userSlice";
import {useSelector} from "react-redux";
import './Mypage.css'

import grap_logo from './../../img/grap_logo2-1.png';

function Mypage() {
    const history = useHistory();
    const user = useSelector(selectUser);

    function escapeUser(){
        console.log(user)
        if(window.confirm("회원 탈퇴를 진행하시겠습니까?")===true){
            if(window.confirm("탈퇴를 원하시면 예를 눌러 주십시오.")===true){
                window.confirm("탈퇴 되었습니다!");
            }   
        }
    }

    function escapeMembership() {
        console.log(user)
        if(window.confirm("멤버십을 해지하시겠습니까?")===true){
           
            console.log("해지 완료")
            window.confirm("해지되었습니다!")
        }
    }

    return (
        <div className="mypage">
            <div className="mypage_nav">
                <div className="mypage_nav_logo">
                    <img className='logo' src={grap_logo} onClick={() => history.push("/")} alt="logo"/>
                </div>
            </div>

            <div className="mypage_container">
                <div className="mypage_header">
                    <h1 className="account_header">계정</h1>
                </div>
                

                <div className="account_sections">
                    <div className="account_section">
                        <div className="account_section_header">
                            <div className="header_title">회원 정보</div>
                        </div>

                        <div className="account_section_info">
                            <div className="email">닉네임 : {user.nickname.replaceAll("\"", "")}</div><br/>
                            <div className="password"></div>
                            <br/><br/>
                        </div>
                        <div className="account_section_modify">
                            <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={escapeUser}>회원 탈퇴</div><br/>
                            {/* <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={() => history.push("/userInfo")}>정보 변경</div><br/> */}

                        </div>
                    </div>

                    <div className="account_section">
                        <div className="account_section_header">
                            <div className="header_title">멤버십&결제 정보</div>
                            <button className="membership_escape" onClick={escapeMembership}><h4>멤버십 해지</h4></button>
                        </div>
                        <div className="account_section_info">
                            <h3 className="membership_info">Premium Silver</h3><br/>
                            <div className="card_info">신용카드 **** **** **** 1111</div>
                            <div className="card_modify_date">다음 결제일은 2021/06/30 입니다.</div>
                        </div>
                        <div className="account_section_modify">
                            <div className="membership_modify">
                                <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={() => history.push("/membership")}>멤버십 변경</div><br/><br />

                                <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={() => history.push("/mypage")}>카드 변경</div>
                            </div>
                        </div>
                    </div>

                    <div className="account_section">
                        <div className="account_section_header">
                            <div className="header_title">쿠폰함</div>
                        </div>
                        <div className="account_section_info">
                            <div>사용 가능한 쿠폰 수: 1</div>
                        </div>
                        <div className="account_section_modify">
                            <div className="coupon_selected">
                                <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={() => history.push("/coupon")}>쿠폰함 확인</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Mypage
