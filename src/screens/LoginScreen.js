import React, { useRef } from "react";
import "./LoginScreen.css"
import grap_logo from '../img/grap_logo2-2.png';
import { useHistory } from "react-router-dom";
import axios from "axios";
import GoogleLogin from 'react-google-login';
import {useDispatch} from "react-redux";
import {login} from "../features/userSlice";

function LoginScreen(){
    const history = useHistory();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();

    const responseSuccess= (response) => {
        const user = response.profileObj;
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
                dispatch(login({
                    user_id : res.data,
                    name : user.name
                }))

                history.push("/");
            }
            else
                alert("fail");
        })
    }

    const responseFail = (err) => {
        alert(err);
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
                        <h2>GRAP 게정으로 로그인</h2>
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
                    <a href="">
                        <span className="sns_icon naver"></span>
                    </a>
                    <a href="">
                        <span className="sns_icon kakao"></span>
                    </a>
                    <GoogleLogin
                        className="sns_icon google"
                        clientId="803232667536-pn5n3kpul7vsq0uftg6np601iikka7e6.apps.googleusercontent.com"
                        buttonText={GoogleLogin}
                        onSuccess={responseSuccess}
                        onFailure={responseFail}
                    />
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;
