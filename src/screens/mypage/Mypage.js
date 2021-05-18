import React from 'react'
import {useHistory} from "react-router-dom";
import './Mypage.css'

import grap_logo from './../../img/grap_logo2-1.png';

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
                <h1 className="account_header">My Info</h1><hr width="100%"/>
                {/* 멤버십, 결제정보, 쿠폰함, 회원탈퇴 */}

                <div className="account_section">
                    <div className="account_section_header">
                        <div className="header_title">멤버십&결제 정보</div>
                        <button className="membership_escape" >멤버십 해지</button>
                    </div>
                    <div className="account_section_info">
                        <div className="email">baewonchan1@naver.com</div>
                        <div className="password">비밀번호: ********</div>
                        <div className="phonenumber">전화번호: 010_9588_9250</div>
                    </div>
                    <div className="account_section_modify">
                        <div className="">
                            <a href="" className="modify">이메일 변경</a>
                        </div>
                        <div className="">
                            <a href="" className="modify">비밀번호 변경</a>
                        </div>
                        <div>
                            <a href="" className="modify">휴대폰 인증</a>
                        </div>   
                    </div>
                   
                </div>

                <div className="account_section">
                    <div className="account_section_header">
                        <div className="header_title">멤버십 상세 정보</div>
                    </div>
                    <div className="account_section_body">
                        <div className="account_info">
                            <div className="membership_rank">프리미엄 브론즈</div>
                        </div>
                        <div className="account_modify">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mypage
