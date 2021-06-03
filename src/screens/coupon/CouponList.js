import React, {useState, useEffect, useStyles, useRef} from 'react'
import {useHistory} from "react-router-dom";
import {selectUser} from './../../features/userSlice'
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'
import Footer from "../../Footer";
import Modal from '@material-ui/core/Modal'

import './CouponList.css'
import grap_logo from './../../img/grap_logo2-1.png';
import {BsPlusCircle} from 'react-icons/bs'
import {BiPlusCircle, BiPlus} from 'react-icons/bi'
import {HiOutlinePlusCircle} from 'react-icons/hi'


function CouponList() { 
    const [couponData, setCouponData] = useState([]);
    const [searchData, setSearchData] = useState([]);

    const [isIssueCoupon, setIsIssueCoupon] = useState(false);
    const [isDeleteCoupon, setIsDeleteCoupon] = useState(false);

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    
    const history = useHistory();
    const searchRef = useRef();
    const userId = useSelector(selectUser).user_id;

    
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

            width: 1000,
            height: 600,

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

    function GameSearching(e) {
        const searchText = searchRef.current.value;
        console.log(searchText);

        // 검색하면 해당 게임 나오게.
        axios({
            method : 'get',
            url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game?name=${searchText}`
        }).then((res)=> {
            if(res){
                axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${res.data[0].id}/coupon/all`)
                .then((res)=>{
                    setSearchData(res.data[0]);
                })
            }
        })
    }

    function IssueCoupon(e) {
        const couponId = e.target.getAttribute('id')
        
        if(window.confirm("해당 쿠폰을 발급 하시겠습니까?")===true) {
            axios({
                method : 'post',
                url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/coupon/${couponId}/userAndCoupon`
            }).then((res)=> {
                console.log(res.data);
                setIsIssueCoupon(!isIssueCoupon);
            })
            alert("발급되었습니다.")
            setOpen(false);
        }
    }

    function DeleteCoupon(e){
        const userAndCouponId = e.target.getAttribute('id');
        console.log(userAndCouponId);

        if(window.confirm("삭제하시겠습니까?")===true){
            axios({
                method : 'delete',
                url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/UserAndCoupon/${userAndCouponId}`
            }).then((res)=> {
                console.log(res.data);
                setIsDeleteCoupon(!isDeleteCoupon);
            })
        }
    }

    // Blood of the Werewolf
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className="gameSelect_container">
                <h1>G R A P</h1>
                <div className="gameSelect_contents">
                    <input type="text" ref={searchRef} className="game_Searching" />
                    <button className="submit" onClick={GameSearching}><i class="fa fa-search"></i></button>
                </div>

                <div className="searching_data_tab">
                    <div className="number">
                        번호
                    </div>
                    <div className="img">
                        게임 이미지
                    </div>

                    <div className="gameAndCouponName">
                        <div className="gameName">게임 제목</div>
                        <div className="couponName">(쿠폰 제목)</div>

                    </div>
                    <div className="releaseDate">
                        만료일
                    </div>
                    <div className="issue">쿠폰 발급</div>
                </div>
                {searchData.length === 0 ? "" : (
                    <>
                    <div className="searching_data">
                        <div className="number">
                            <div>{searchData.couponId}</div>
                        </div>
                        <div className="img">
                            <img 
                                className="headerImg"
                                src={searchData.gameHeaderImage}
                            />
                        </div>

                        <div className="gameAndCouponName">
                            <div className="gameName">{searchData.gameName}</div>
                            <div className="couponName">({searchData.couponName})</div>
                        </div>
                        <div className="releaseDate">{searchData.expirationDate}</div>
                        <div className="issue">
                            <button 
                                className="issueCoupon"
                                id={searchData.couponId} 
                                onClick={IssueCoupon}
                            >발급</button>
                        </div>
                    </div>
                    </>
                )}
            </div>
        </div>
    );


    useEffect(()=> {
        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/coupon/userAndCoupon`)
            .then((res)=>{
                setCouponData(res.data);
            })
    }, []);

    useEffect(()=> {
        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/coupon/userAndCoupon`)
            .then((res)=>{
                setCouponData(res.data);
            })
    }, [isIssueCoupon, isDeleteCoupon]);

    return (
        <div className="couponList3">
            <div className="coupon_nav">
                <div className="coupon_nav_logo">
                    <img className='logo' src={grap_logo} onClick={() => history.push("/mypage")} alt="logo"/>
                    <div className="coupon_gradient" />
                </div>
            </div>
            <div className="couponList_container">
                <div className="coupon_items_title">
                    <h1>쿠 폰 함</h1><br/>
                </div>

                <div className="coupon_items">
                    {couponData.map((set, index)=> {
                        const expireDate = new Date(set.expirationDate);
                        const currentDate = new Date();
                        let dateDif = Math.ceil((expireDate.getTime() - currentDate.getTime())/(1000*3600*24));
                        return (
                        <>
                            <div 
                                className="coupon_item" 
                                id={set.id}
                                onClick={DeleteCoupon}
                            >
                                <div className="coupon_name" id={set.id}>{set.couponName}</div>

                                <img className="coupon_img" id={set.id} src={set.gameHeaderImage}></img>

                                <div className="copone_date" id={set.id}>
                                    {(dateDif <= 0) ? "기한이 만료되었습니다." : `만료일까지 ${dateDif}일 남았습니다`}
                                </div>
                                <div className="coupon_code" id={set.id}>{set.code}</div>
                            </div>
                        </>
                        )
                    })}
                    {[...Array(10-couponData.length)].map(()=>{
                        return(
                            <div className="blank_coupon_item">
                                <div className="blank_coupon_img">
                                    {/* <img className="blank_coupon_img_detail" src={grap_logo}></img> */}
                                </div>
                                {/* <button 
                                    className="gameSelect_btn" 
                                    onClick={handleOpen}
                                ><h3>게임 선택</h3></button> */}
                                <HiOutlinePlusCircle 
                                    size="120" 
                                    className="plusBtn" 
                                    onClick={handleOpen}
                                />
                            </div>
                        )
                    })}

                </div>
            </div>
            
            {/* popup */}
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

export default CouponList
