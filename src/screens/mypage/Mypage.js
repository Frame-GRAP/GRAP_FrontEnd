import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import {selectUser} from "./../../features/userSlice";
import {useSelector} from "react-redux";
import './Mypage.css'

import grap_logo from './../../img/grap_logo2-1.png';
import axios from 'axios';

function Mypage() {
    const [couponLength, setCouponLength] = useState(0);
    const history = useHistory();
    const user = useSelector(selectUser);
    const userId = user.user_id;
    const ismembership = 1; // 멤버십 가입되있는지 정보 유저디비에서 따오기.
    console.log(user);

    function escapeUser(){
        console.log(user)
        const userId = user.user_id;
        if(window.confirm("회원 탈퇴를 진행하시겠습니까?")===true){
            axios({
                method : 'delete',
                url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}`
            }).then((res)=> {
                console.log(res);
                history.push("/login")
            })
            alert("탈퇴 되었습니다!");
        }
    }

    function escapeMembership() {
        console.log(user)
        if(window.confirm("멤버십을 해지하시겠습니까?")===true){
           
            console.log("해지 완료")
            window.confirm("해지되었습니다!")
        }
    }

    function ModifyNickname(){
        const userId = user.user_id;
        const nickname = '푸른하마';

        console.log(userId, nickname)

        axios({
            method : 'post',
            url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/nickname/${nickname}`
        }).then((res)=> {
            console.log(res);
        })
    }

    useEffect(()=> {
        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/coupon/userAndCoupon`)
            .then((res)=>{
                console.log(res.data);
                setCouponLength(res.data.length);
            })
    }, []);

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
                            <button className="user_escape" onClick={escapeUser}><h4>회원 탈퇴</h4></button>
                        </div>

                        <div className="account_section_info">
                            <div className="nickname">닉네임 : {user.nickname ? user.nickname.replaceAll("\"", "") : ""}</div>
                            <br/><br/><br/>
                        </div>
                        <div className="account_section_modify">
                            <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={ModifyNickname}>닉네임 변경</div>
                            <br/>
                        </div>
                    </div>

                    <div className="account_section">
                        <div className="account_section_header">
                            <div className="header_title">멤버십(구독)</div>
                            {ismembership ? <button className="membership_escape" onClick={escapeMembership}><h4>멤버십 해지</h4></button> : ""}
                        </div>
                        {ismembership ? (
                            <>
                            <div className="account_section_info">
                                <h3 className="membership_info">Premium Silver</h3><br/>
                                <div className="credit_date">다음 결제일은 2021/06/30 입니다.</div>
                            </div>
                            <div className="account_section_modify">
                                <div className="membership_modify">
                                    <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={() => history.push("/membership")}>멤버십 변경</div><br/><br />
                                </div>
                            </div>
                            </>
                        ) : (
                            <>
                            <div className="account_section_info">
                                <h3 className="">없음</h3><br/>
                            </div>
                            <div className="account_section_modify">
                                <div className="membership_modify">
                                    <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={() => history.push("/membership")}>멤버십 가입</div><br/><br />
                                </div>
                            </div>
                            </>
                        )}
                        
                    </div>

                    <div className="account_section">
                        <div className="account_section_header">
                            <div className="header_title">쿠폰</div>
                        </div>
                        <div className="account_section_info">
                            <div>사용 가능한 쿠폰 수: {10-couponLength}</div>
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
