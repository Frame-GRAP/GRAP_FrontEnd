import React, {useEffect, useState, useRef} from 'react'
import {useHistory} from "react-router-dom";
import {selectUser, login} from "./../../features/userSlice";
import {useDispatch, useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import moment from 'moment'

import './Mypage.css'

import basic from '../../img/bronze-medal.png';
import premium from '../../img/gold-medal.png';
import grap_logo from './../../img/grap_logo2-1.png';
import axios from 'axios';
import Footer from '../../Footer';

function Mypage() {
    const [userData, setUserData] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();

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

        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/nickname/${nickname}`)
            .then((res) =>{
                console.log(res.data);
                if(res.data.isDup == true){ //중복이니까 다시 입력받아야 함
                    alert("닉네임이 중복 되었습니다. 다른 닉네임을 입력해주세요.");
                }
                else{ // 가능
                    axios({
                        method : 'post',
                        url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/nickname/${nickname}`
                    }).then((res)=> {        
                        setOpen(false);
                        window.localStorage.setItem("nickname", nickname);
                        window.location.reload();
                    })
                }
        })


    }

    function escapeUser(){
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
        const userId = user.user_id;
        if(window.confirm("멤버십을 해지하시겠습니까?")===true){
            axios({
                method : 'put',
                url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/membership`
            }).then((res)=> {
                console.log(res);
                console.log("해지 완료")
                window.confirm("해지되었습니다!")
                // window.location.reload();
            })

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
                    <span><h3>{user.nickname && user.nickname.replaceAll("\"", "")}</h3></span>
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
        console.log(user);
        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}`)
            .then((res) => {
                console.log(res.data);
                setUserData(res.data);
                dispatch(login({
                    user_id: res.data.id,
                    name: res.data.name,
                    nickname : res.data.nickname,
                    membershipName : res.data.membershipName,
                    availableCoupon : res.data.availableCoupon,
                    nextPaymentDay: res.data.nextPaymentDay
                }))
                window.localStorage.setItem("user_id", res.data.id);
                window.localStorage.setItem("name", res.data.name);
                window.localStorage.setItem("nickname", res.data.nickname);
                window.localStorage.setItem("membershipName", res.data.membershipName);
                window.localStorage.setItem("availableCoupon", res.data.availableCoupon);
                window.localStorage.setItem("nextPaymentDay", res.data.nextPaymentDay);
            }).then(()=>{
                console.log(userData);
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
                        </div>

                        <div className="account_section_info">
                            <div className="nickname">
                                {userData.nickname ? userData.nickname.replaceAll("\"", "") : ""}
                            </div>
                        </div>
                        <div className="account_section_modify">
                            <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={handleOpen}>닉네임 변경</div>
                        </div>
                    </div>

                    <div className="account_section">
                        <div className="account_section_header">
                            <div className="header_title" style={{"padding-top":"10px"}}>멤버십(구독)</div>
                            {userData.membershipName !== null ? <button className="membership_escape" onClick={escapeMembership}><h4>멤버십 해지</h4></button> : ""}
                        </div>

                        {userData.membershipName == null ? (
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
                        ) : (
                            <>
                            <div className="account_section_info">
                                <h3 className="membership_info">
                                    {userData.membershipName == "Basic" ? (
                                        <>
                                        Basic
                                        <img src={basic} className="membership_medal"></img>
                                        </>
                                    ) : (
                                        <>
                                        Premium
                                        <img src={premium} className="membership_medal"></img>
                                        </>
                                    )}

                                </h3>
                                <div className="credit_date">
                                    {userData.nextPaymentDay ? "다음 결제일은"+moment(userData.nextPaymentDay).format('YYYY/MM/DD')+"입니다." : "다음 달 결제가 해지됩니다."}
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
                        )}
                        
                    </div>

                    <div className="account_section">
                        <div className="account_section_header">
                            <div className="header_title">쿠폰</div>
                        </div>
                        <div className="account_section_info">
                        {userData.membershipName==null ? (
                            <div className="available_coupon_null">
                                가입된 멤버십이 없습니다.
                            </div>
                            ) : (
                            <div className="available_coupon">
                                사용 가능 쿠폰 수 : {userData.availableCoupon}
                            </div>
                        )}
                            
                        </div>
                        <div className="account_section_modify">
                            <div className="coupon_selected">
                                {userData.membershipName && <div className="modify" style={{"color":"#0073e6", "cursor": "pointer"}} onClick={() => history.push("/coupon")}>쿠폰함 확인</div>}
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
