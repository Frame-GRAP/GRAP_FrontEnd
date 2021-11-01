import React, { useRef } from "react";
import "./SignupScreen.css";
import grap_logo from '../img/grap_logo2-2.png';

function SignupScreen(){
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const nameRef = useRef(null);
    const phoneRef = useRef(null);

    return(
        <div className="signupScreen">
            <div className="signupScreen_background">
                <img
                    className="signupScreen_logo"
                    src={grap_logo}
                    alt="logo"
                />
                <div className="signupScreen_gradient" />
            </div>
            <div className="signupScreen_body">
                <div className="signupScreen_input">
                    <form>
                        <h1>회원가입</h1>
                        <h3>아이디</h3>
                        <input ref={emailRef} placeholder="Email" type="email" />
                        <h3>비밀번호</h3>
                        <input ref={passwordRef} placeholder="Password" type="password" />
                        <h3>이름</h3>
                        <input ref={nameRef} placeholder="Name" type="email" />
                        <h3>전화번호</h3>
                        <input ref={phoneRef} placeholder="Phone" type="password" />
                        <button type="submit">GRAP 회원가입</button>
                    </form>
                </div>
                <div className="signupScreen_sns">
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

export default SignupScreen;
