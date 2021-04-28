import React, { useRef } from "react";
import "./LoginScreen.css"
import grap_logo from '../img/grap_logo2-2.png';
import { useHistory } from "react-router-dom";

function LoginScreen(){
    const history = useHistory();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    /*
    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
            .then((authUser) => {
                console.log(authUser);
            })
            .catch((error) => {
                alert(error.message)
            });
    }*/

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
                    <a href="">
                        <span className="sns_icon google"></span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;
