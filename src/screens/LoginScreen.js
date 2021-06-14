import React, {useEffect, useRef} from "react";
import "./LoginScreen.css"
import grap_logo from '../img/grap_logo2-1.png';
import { useHistory } from "react-router-dom";
import axios from "axios";
import GoogleLogin from 'react-google-login';
import {useDispatch} from "react-redux";
import {login} from "../features/userSlice";
import Footer from "../Footer";
import NaverLogin from "./NaverLogin";

function LoginScreen(){
    const history = useHistory();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();


    const kakaoLogin = () => {
        window.Kakao.Auth.logout();
        window.Kakao.Auth.login({
            success: (auth) => {
                window.Kakao.API.request({
                    url: "/v2/user/me",
                    success: (res) => {
                        console.log(res.kakao_account.email);
                        console.log(res.kakao_account.profile.nickname);
                        console.log(res.kakao_account.profile.profile_image_url);
                        responseSuccess(res.kakao_account, "kakao");
                    },
                    fail: (err) => {
                        console.log(err);
                    }
                })
            },
            fail: (err) => {
                console.log(err);
            }
        })
    }

    const googleLogin = (response) => {
        let user = {};
        user = response.profileObj;
        responseSuccess(user, "google");
    }

    const responseSuccess= (data, type) => {
        let user = {};

        if(type === "kakao"){
            user.name = data.profile.nickname;
            user.email = data.email;
            user.imageUrl = data.profile.profile_image_url;
        }
        else if(type === "google"){
            user.name = data.name;
            user.email = data.email
            user.imageUrl = data.imageUrl;
        }

        axios({
            method: 'post',
            url: 'http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user',
            data: {
                name: user.name,
                email: user.email,
                picture: user.imageUrl
            }
        }).then((res) => {
            if(res){
                console.log(res.data)

                axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${res.data.id}`)
                    .then((res)=>{
                        console.log(res.data);
                        dispatch(login({
                            user_id : res.data.id,
                            name : user.name,
                            nickname: res.data.nickname,
                            membershipName : res.data.membershipName,
                            availableCoupon: res.data.availableCoupon,
                            nextPaymentDay: res.data.nextPaymentDay
                        }))
                        window.localStorage.setItem("user_id", JSON.stringify(res.data.id));
                        window.localStorage.setItem("name", user.name);
                        window.localStorage.setItem("nickname", res.data.nickname);
                        window.localStorage.setItem("membershipName", res.data.membershipName);
                        window.localStorage.setItem("availableCoupon", res.data.availableCoupon);
                        window.localStorage.setItem("nextPaymentDay", res.data.nextPaymentDay);
                    })

                if(res.data.isRegistered == 1 && res.data.nickname !== null){
                    history.push("/");
                }
                else{
                    history.push("/userInfo");
                }
            }
            else
                alert("fail");
        })
    }

    const responseFail = (err) => {
        console.log(err.error);
        alert(err.error);
    }

    return (
        <div className="loginScreen">
            <div className="loginScreen_background">
                <img
                    className="loginScreen_logo"
                    src={grap_logo}
                    alt="logo"
                />
                <div className="loginScreen_gradient" />
            </div>
            <div className="loginScreen_body">
                <div className="loginScreen_input">
                    <form>
                        <h1>로그인</h1>
                        <h2>GRAP 계정으로 로그인</h2>
                        <input ref={emailRef} placeholder="Email" type="email" />
                        <input ref={passwordRef} placeholder="Password" type="password" />
                        <button type="submit">로그인</button>
                    </form>
                </div>
                <div className="loginScreen_info">
                    <span className="info_gray" onClick={() => history.push("/register")}>아아디 찾기</span>
                    <span className="info_gray" onClick={() => history.push("/register")}>비밀번호 찾기</span>
                    <span className="info_gray" onClick={() => history.push("/register")}>회원가입</span>
                </div>
                <div className="loginScreen_sns">
                    <div className="sns_icon">
                        <NaverLogin />
                        {/*<div id="naverIdLogin" className="sns_icon naver"/>*/}
                    </div>
                    <div className="sns_icon kakao" onClick={kakaoLogin}>
                        {/*<img className="sns_icon kakao" src={kakaoLoginImg} alt=""/>*/}
                        <span className="kakao"></span>
                    </div>
                    <GoogleLogin
                        className="sns_icon google"
                        clientId="803232667536-laafp22eio1k1kl9qrj4jabrusq1vo81.apps.googleusercontent.com"
                        render={renderProps => (
                            <span onClick={renderProps.onClick} disabled={renderProps.disabled} className="sns_icon google"></span>
                        )}
                        onSuccess={googleLogin}
                        onFailure={responseFail}
                    />

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LoginScreen;
