import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import styled from 'styled-components'
import $ from "jquery"


import './CouponList.css'
import axios from 'axios'
import Footer from "../../Footer";

import grap_logo from './../../img/grap_logo2-1.png';
import gameImg1 from './../../img/game1.jpg'
import gameImg2 from './../../img/game2.jpg'


function CouponList() {
    const [gameData, setGameData] = useState([]);
    const [openGameMenu, setOpenGameMenu] = useState(false);
    const [openCode, setOpenCode] = useState([0, 0]);

    const history = useHistory();

    function openCouponCode(e){
        const index = e.target.getAttribute('id')

        if($(".coupon_number")[index].style.display === "none")
            $(".coupon_number")[index].style.display = "block";
        else
            $(".coupon_number")[index].style.display = "none";
    }

    useEffect(()=> {
        axios.get("http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/starter/all")
        .then((res)=>{
            setGameData(res.data);
        })
        // console.log(gameData);
    }, []);

    function CouponIssue(){
        // console.log(e.target);
        const checked = document.getElementsByName("coupon_gameSelect_Btn");
        let couponGameId;
        checked.forEach((set) => {
            if(set.checked===true){
                couponGameId = set.value;
            }
        })

        if(couponGameId){
            if(window.confirm(`${gameData[couponGameId].gameName}의 쿠폰을 발급 받으시겠습니까?`)===true){
                console.log("쿠폰 발급 완료!!")   
                setOpenGameMenu(false);
            }
        }else{
            alert("쿠폰을 발급 받으실 게임을 선택해 주세요.")
        }
    }

    return (
        <div className="couponList">
            <div className="coupon_nav">
                <div className="coupon_nav_logo">
                    <img className='logo' src={grap_logo} onClick={() => history.push("/mypage")} alt="logo"/>
                    <div className="coupon_gradient" />
                </div>
            </div>
            <div className="couponList_container">
                <div className="coupon_title">
                    {/* <h1>쿠폰함</h1> */}
                </div>
                <div className="coupon_available">
                    <h1>
                        사용 가능한 쿠폰 수&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;1 &nbsp;&nbsp;&nbsp;
                    </h1>

                    {openGameMenu === false ? (
                        <button onClick={()=> setOpenGameMenu(!openGameMenu)}>게임 선택</button>
                    ): (
                        <>
                            <button 
                                id="confirm" className="issuance" 
                                onClick={CouponIssue}
                            >발급</button>
                            <button 
                                id="alert" className="cancle" 
                                onClick={()=>setOpenGameMenu(false)}
                            >취소</button>
                        </>
                    )}
                </div>
                <div className="coupon_issue">
                    

                    { (openGameMenu === true) && (
                        <>
                        <div className="coupon_gameSelect">
                            {gameData.map((set, index) =>{
                                return (
                                    <>
                                    {(index <= 14) && <div className="coupon_gameList">
                                        <input
                                            key={index}
                                            type="radio"
                                            className="coupon_gameSelect_Btn"
                                            name="coupon_gameSelect_Btn"
                                            id={set.id}
                                            value={index}
                                        />
                                        <label className="coupon_gameImg" htmlFor={set.id}>
                                            <div className="img_container">
                                                <img src={set.headerImg} className="coupon_gameImg"></img>
                                            </div>
                                        </label>
                                    </div>}
                                    </>
                                )
                            })}
                        </div>
                        </>
                    )}
                </div>

                {(!openGameMenu&&gameData) && <div className="coupon_items">
                    <div className="coupon_items_title">
                        <h2>보유 쿠폰</h2>
                    </div>
                
                    {gameData.map((set, index)=>{
                        return(
                            <>
                            {(index >= 4 && index <= 7) && (
                            <div className="coupon_item">
                                <div className="coupon_item_img">
                                    <img className="coupon_item_img" src={set.headerImg}></img>
                                </div>
                                <div className="coupon_item_description">
                                    <div className="coupon_item_gameName">
                                        <h2>{set.gameName}</h2>
                                    </div>
                                    <div className="couponCode_codeNum">
                                        <div className="coupon_number">5DFK998Z7S81</div>
                                    </div>

                                    <div className="coupon_item_couponCode">
                                        <button onClick={openCouponCode} className="couponCode_btn" id={index-4}>쿠폰 확인</button>
                                    </div>

                                </div>
                            </div>
                            )}
                            </>
                        )    
                    })}
                </div>}
            </div>
            <Footer />

        </div>
    )
}

export default CouponList
