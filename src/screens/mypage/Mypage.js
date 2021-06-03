import React, {useEffect, useState, useRef} from 'react'
import {useHistory} from "react-router-dom";
import {selectUser} from "./../../features/userSlice";
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

import './Mypage.css'

import basic from '../../img/bronze-medal.png';
import premium from '../../img/gold-medal.png';
import grap_logo from './../../img/grap_logo2-1.png';
import axios from 'axios';
import Footer from '../../Footer';

function Mypage() {
    const [couponLength, setCouponLength] = useState(0);
    const history = useHistory();
    const ismembership = 1; // 멤버십 가입여부
    const membershipLevel = 1; // 멤버십 등급

    const nickRef = useRef();
    const user = useSelector(selectUser);

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    function getModalStyle() {
        const top = 50;
        const left = 50;
        
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            backgroundColor: theme.palette.background.paper,

            width: 500,
            height: 400,

            outline: 0,
            border: '2px solid #000',
            borderRadius: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,

            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));
    const classes = useStyles();
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    
    function ModifyNickname(){
        const userId = user.user_id;
        const nickname = nickRef.current.value;

        console.log(userId, nickname)
        
        axios({
            method : 'post',
            url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/nickname/${nickname}`
        }).then((res)=> {        
            setOpen(false);
            window.localStorage.setItem("nickname", nickname);
            window.location.reload();
        })
    }

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
            /*axios({
                method : 'delete',
                url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/membership`
            }).then((res)=> {
                console.log(res);
                window.location.reload();
            })*/
            console.log("해지 완료")
            window.confirm("해지되었습니다!")
        }
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className="modify_nickname_logo">
                <h1>G R A P</h1>
            </div>

            <div className="modify_nickname_container">
                <div className="current_nickname">
                    <h5>현재 닉네임</h5>
                    <span><h3>{user.nickname.replaceAll("\"", "")}</h3></span>
                </div>
                <div className="modify_nickname">
                    <div className="modify_nickname_title">
                        <h5>변경할 닉네임</h5>
                    </div>
                    <input type="text" ref={nickRef} placeholder="nickname" ></input>
                </div>
                <div>
                    <button className="modify_nickname_btn" onClick={ModifyNickname}>변경</button>
                    <button className="modify_nickname_cancle_btn" onClick={()=>setOpen(false)}>취소</button>
                </div>
            </div>
        </div>
    );

    useEffect(()=> {
        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/coupon/userAndCoupon`)
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
                    <div className="user_escape" onClick={escapeUser}><h4>회원 탈퇴</h4></div>
                </div>
                

                <div className="account_sections">
                    <div className="account_section">
                        <div className="account_section_header">
                            <div className="header_title">회원 정보</div>
                            {/* <button className="user_escape" onClick={escapeUser}><h4>회원 탈퇴</h4></button> */}
                        </div>

                        <div className="account_section_info">
                            <div className="nickname">
                                {user.nickname ? user.nickname.replaceAll("\"", "") : ""}
                            </div>
                        </div>
                        <div className="account_section_modify">
                            <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={handleOpen}>닉네임 변경</div>
                        </div>
                    </div>

                    <div className="account_section">
                        <div className="account_section_header">
                            <div className="header_title" style={{"padding-top":"10px"}}>멤버십(구독)</div>
                            {ismembership ? <button className="membership_escape" onClick={escapeMembership}><h4>멤버십 해지</h4></button> : ""}
                        </div>
                        {ismembership ? (
                            <>
                            <div className="account_section_info">
                                <h3 className="membership_info">
                                    {membershipLevel === 1 ? (
                                        <>
                                        Premium
                                        <img src={premium} className="membership_medal"></img>
                                        </>
                                    ) : (
                                        <>
                                        Basic
                                        <img src={basic} className="membership_medal"></img>
                                        </>
                                    )}

                                </h3>
                                <div className="credit_date">
                                    다음 결제일은 2021/06/30 입니다.
                                </div>
                            </div>
                            <div className="account_section_modify">
                                <div className="membership_modify">
                                    <div className="modify" style={{"color":"#0073e6", "cursor": "pointer", "padding-top": "10px"}} onClick={() => history.push("/membership")}>
                                        멤버십 변경
                                    </div>
                                </div>
                            </div>
                            </>
                        ) : (
                            <>
                            <div className="account_section_info">
                                <div className="no_membership">가입된 멤버십이 없습니다.</div>
                            </div>
                            <div className="account_section_modify">
                                <div className="membership_modify">
                                    <div 
                                        className="modify" 
                                        style={{"color":"#0073e6", "cursor": "pointer", "padding-top":"3px"}}
                                    >
                                        <span onClick={() => history.push("/membership")}>멤버십 가입</span>
                                    </div>
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
                            <div className="available_coupon">사용 가능 쿠폰 수 &nbsp;: {10-couponLength}</div>
                        </div>
                        <div className="account_section_modify">
                            <div className="coupon_selected">
                                <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={() => history.push("/coupon")}>쿠폰함 확인</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Modal 
                open={open}
                onClose={handleClose}

                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>

            <Footer />
        </div>
    )
}

export default Mypage
