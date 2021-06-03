import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import Footer from "../../Footer";
import Nav from "../../Nav";
import './MembershipScreen.css';
import {useHistory} from "react-router-dom";
import bronze from '../../img/bronze-medal.png';
import silver from '../../img/silver-medal.png';
import gold from '../../img/gold-medal.png';
import SearchScreen from "../search/SearchScreen";

const tiers = [
    {
        title: 'Basic',
        price: '4500',
        description: ['게임 할인 쿠폰 3장 제공',],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Premium',
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
    const [searching, setSearching] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const [membershipData, setMembershipData] = useState([]);
    const [membership, setMembership] = useState([]);


    useEffect(() => {
        async function fetchMembershipData() {
            await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/membership/all`)
                .then( (res) => {
                    setMembershipData(res.data);
                }).catch((err)=> {
                     console.log(err);
                });
            return membershipData;
        }
        fetchMembershipData();
    }, [])

    const { IMP } = window;
    IMP.init('imp40158151');

    const payment = () => {
        const info = RegisterMembership();

        const customerUid = user.name + '_' + user.user_id;

        IMP.request_pay({
            merchant_uid : 'merchant_' + new Date().getTime(),
            name : '최초결제',
            amount : `${info.price}`, // 빌링키 발급만 진행하며 결제승인을 하지 않습니다.
            customer_uid : `${customerUid}`, //customer_uid 파라메터가 있어야 빌링키 발급이 정상적으로 이뤄집니다.
            buyer_email : 'iamport@siot.do',
            buyer_name : `${user.name}`,
            buyer_tel : '02-1234-1234'
        }, rsp => {
            if (rsp.success) {
                // 빌링키 발급 성공
                // axios로 HTTP 요청
                console.log(rsp);
                axios({
                    url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/membership/${info.membershipId}`, // 서비스 웹서버
                    method: "put",
                    headers: { "Content-Type": "application/json" }
                });
                alert("결제에 성공하였습니다.");
                history.push("/");

            } else {
                // 빌링키 발급 실패
                alert("결제에 실패하였습니다.");
            }
        });
    };

    useEffect(() => {


        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [searching]);

    const getTierImg = (index) => {
        if(index == 0)
            return (<img src={bronze} alt="bronze"/>)
        if(index == 1)
            return (<img src={gold} alt="gold"/>)
    }

    function RegisterMembership() {
        const info = new Object();
        const checked = document.getElementsByName("membership_selectBtn");

        checked.forEach((set) => {
            if (set.checked === true) {
                info.price = set.value[0];
                info.price += set.value[1];
                info.price += set.value[2];
                info.price += set.value[3];
                info.membershipId = set.value[5];

            }
        })
        return info;
    }

    if(loading) return (<div>Loading...</div>);
    return (
        <>
            <div className="membershipScreen">
                <Nav setSearchWord={setSearchWord} setSearching={setSearching} />
                { searching ? (
                    <SearchScreen searchWord={searchWord} />
                ) : (
                    <>
                        <div className="membershipScreen_body">
                            <h2>멤버쉽</h2>
                            <h3>지금 바로 가입해서 당신이 원하는 게임을 마음껏 플레이 하세요!</h3>
                            <div className="membershipScreen_result">
                                <div className="membership_container">
                                    {membershipData.map((tier, index) => (
                                        <label className="membership_item" htmlFor={tier.name}>
                                            <input
                                                key={index}
                                                type="radio"
                                                className="membership_check"
                                                name="membership_selectBtn"
                                                id={tier.name}
                                                value={[tier.price, tier.id]}
                                                defaultChecked={index == 0}
                                            />
                                            <div className="item_inner">
                                                <div className="membership_img">
                                                    {getTierImg(index)}
                                                </div>
                                                <h3 className="membership_name">{tier.name}<br/></h3>
                                                <h4 className="membership_description">사용 가능한 쿠폰 {tier.availableCoupon}장<br/></h4>
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
                    </>
                )}
            </div>
            <Footer />
        </>
    )
}

export default MembershipScreen;
