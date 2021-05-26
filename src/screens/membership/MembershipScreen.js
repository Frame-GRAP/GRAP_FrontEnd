import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import Footer from "../../Footer";
import Nav from "../../Nav";
import './Membership2.css';
import {useHistory} from "react-router-dom";
import bronze from '../../img/bronze-medal.png';
import silver from '../../img/silver-medal.png';
import gold from '../../img/gold-medal.png';

const tiers = [
    {
        title: 'Bronze',
        price: '4500',
        description: ['게임 할인 쿠폰 3장 제공',],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Silver',
        price: '6500',
        description: ['게임 할인 쿠폰 3장 제공',],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Gold',
        price: '9900',
        description: ['게임 할인 쿠폰 3장 제공',],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];


function MembershipScreen() {
    const user = useSelector(selectUser);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const { IMP } = window;
    IMP.init('imp40158151');

    const payment = () => {
        const price = RegisterMembership();

        /*IMP.request_pay({
            pay_method : 'card', // 결제창 호출단계에서의 pay_method 는 아무런 역할을 하지 못하며, 구매자가 카카오페이 앱 내에서 신용카드 vs 카카오머니 중 실제 선택한 값으로 추후 정정됩니다.
            merchant_uid : 'merchant_' + new Date().getTime(),
            name : '최초인증결제',
            amount : 1004, // 빌링키 발급과 동시에 1,004원 결제승인을 시도합니다.
            customer_uid : 'your-customer-unique-id', //customer_uid 파라메터가 있어야 빌링키 발급이 정상적으로 이뤄집니다.
            buyer_email : 'iamport@siot.do',
            buyer_name : '아임포트',
            buyer_tel : '02-1234-1234'
        }, rsp => {
            if (rsp.success) {
                // 빌링키 발급 성공
                // axios로 HTTP 요청
                axios({
                    url: "https://www.myservice.com/billings/", // 서비스 웹서버
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    data: {
                        customer_uid: "gildong_0001_1234" // 카드(빌링키)와 1:1로 대응하는 값
                    }
                }).then((r) => {
                    console.log(r.data);
                    alert("결제에 성공하였습니다.");
                    history.push("/")
                })
            } else {
                // 빌링키 발급 실패
                alert("결제에 실패하였습니다.");
            }
        });*/
    };

    useEffect(() => {
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, []);

    const getTierImg = (index) => {
        if(index == 0)
            return (<img src={bronze} alt="bronze"/>)
        if(index == 1)
            return (<img src={silver} alt="bronze"/>)
        if(index == 2)
            return (<img src={gold} alt="bronze"/>)
    }

    function RegisterMembership() {
        let price = "";
        const checked = document.getElementsByName("membership_selectBtn");

        checked.forEach((set) => {
            if (set.checked === true) {
                price = set.value;
            }
        })

        return price;
    }


    if(loading) return (<div>Loading...</div>);
    return (
        <>
            <div className="membershipScreen">
                <Nav />
                <div className="membershipScreen_body">
                    <h2>멤버쉽</h2>
                    <h3>지금 바로 가입해서 당신이 원하는 게임을 마음껏 플레이 하세요!</h3>
                    <div className="membershipScreen_result">
                        <div className="membership_container">
                            {tiers.map((tier, index) => (
                                <label className="membership_item" htmlFor={tier.title}>
                                    <input
                                        key={index}
                                        type="radio"
                                        className="membership_check"
                                        name="membership_selectBtn"
                                        id={tier.title}
                                        value={tier.price}
                                        defaultChecked={index == 0}
                                    />
                                    <div className="item_inner">
                                        <div className="membership_img">
                                            {getTierImg(index)}
                                        </div>
                                        <h3 className="membership_name">{tier.title}<br/></h3>
                                        <h4 className="membership_description">{tier.description}<br/></h4>
                                        <h6 className="membership_price">월 {tier.price}원</h6>

                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="membership_submit">
                        <button className="membership_btn" onClick={payment}>가입하기</button>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default MembershipScreen;
