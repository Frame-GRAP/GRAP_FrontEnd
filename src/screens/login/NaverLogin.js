import React, {useEffect} from "react";
import axios from "axios";
import {login} from "../features/userSlice";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

function NaverLogin(){
    const history = useHistory();
    const dispatch = useDispatch();

    /*const Naver = () => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: "Fz2SCpCmnixzkftVz6Eb",
            callbackUrl: "http://127.0.0.1:3000",
            isPopup: false, // popup 형식으로 띄울것인지 설정
            loginButton: { color: 'green', type: 1, height: '50' }, //버튼의 스타일, 타입, 크기를 지정
        });
        naverLogin.init();
    }

    const UserProfile = () => {
        window.location.href.includes('access_token') && GetUser();
        function GetUser() {
            const location = window.location.href.split('=')[1];
            const token = location.split('&')[0];

            const header = "Bearer " + token; // Bearer 다음에 공백 추가
            console.log(header);
            axios({
                method: "GET",
                url: 'https://openapi.naver.com/v1/nid/me',
                headers : {
                    "Content-type" : "application/json",
                    "Authorization": header
                },
            })
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log("err : ", err));
        }
    };*/




    useEffect(() => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: "Fz2SCpCmnixzkftVz6Eb",
            callbackUrl: "https://grap.p-e.kr",
            isPopup: false, // popup 형식으로 띄울것인지 설정
            loginButton: { color: 'green', type: 1, height: '50' }, //버튼의 스타일, 타입, 크기를 지정
        });
        naverLogin.init();
        naverLogin.logout();
        naverLogin.getLoginStatus((status) => {
            if(status) {
                let user = {};
                console.log(naverLogin);
                console.log(naverLogin.user.name);
                console.log(naverLogin.user.email);
                console.log(naverLogin.user.profile_image);

                user.name = naverLogin.user.name;
                user.email = naverLogin.user.email;
                user.imageUrl = naverLogin.user.profile_image;

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
            else{
                console.log("not loggedin");
            }
        });
    }, []);

    return (
        <div id="naverIdLogin" />
    )
}

export default NaverLogin;
