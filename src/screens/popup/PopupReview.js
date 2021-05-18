import React, {useState, useEffect, useRef} from 'react'
import "./PopupReview.css"
import axios from 'axios'
import {selectUser} from './../../features/userSlice'
import {useSelector} from "react-redux";
import moment from 'moment'
import $ from "jquery"

import StarRating from './StarRating'
import ReviewStarRating from './ReviewStarRating'
import User_Icon from "../../img/user_icon.png"
import {AiOutlineDislike, AiOutlineLike, AiFillLike, AiFillDislike} from 'react-icons/ai'

function PopupReview({popupGameData, setDeclare_visible, setDeclare_part, setDeclare_reviewId}) {
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [rating, setRating] = useState(0);
    const [modifyRating, setModifyRating] = useState(0);

    const [reviewData, setReviewData] = useState([]);
    const [reviewNum, setReviewNum] = useState(0);
    const [modifyBtn, setModifyBtn] = useState(false);

    const user = useSelector(selectUser);
    const commentRef = useRef();
    const modifyRef = useRef();
    
    
    function RegistReview(){ // 리뷰 등록
        // 변수에 값 저장하여 백엔드로 axios.get or post
        // 보낼 값 : 평점(rating), 리뷰(comment), 유저Id, 댓글 단 날짜.
        console.log(popupGameData.id, user.user_id, rating, commentRef.current.value);

        if(commentRef.current.value==="") {
            alert("리뷰란을 입력하시오.")
        }else{
            if(window.confirm("리뷰를 등록하시겠습니까?")===true){
                axios({
                    method: 'post',
                    url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/game/${popupGameData.id}/review`,
                    data: {
                        content: commentRef.current.value,
                        rating: rating
                    }
                })
                setReviewNum(prev=>prev+1); // 즉시 리뷰 갱신하기 위해서 쓰는거
            }
        }
        // Default 값으로 변경
        setRating(0);
        commentRef.current.value = "";    
          
    }

    function OpenReviewDeclaration(e){ // 신고 창 여는 함수
        const reviewId = e.target.getAttribute('name');
        setDeclare_visible(true);
        setDeclare_part(false); // Part : 리뷰 신고
        setDeclare_reviewId(reviewId); // 신고할 Review Id
    }
    
    function ModifyReview(e){ // 리뷰 수정
        const reviewId=e.target.getAttribute('name')
        console.log(reviewId);

        reviewData.forEach((set) => {
            // console.log(set.review_id);
            if(Number(set.review_id) === Number(reviewId)){
                set.modify=1;
            }
        })

        setModifyBtn(true);
    }
    function CompleteModify(e){ // 완료버튼 누를 때 갱신하는게 아직 안됨.
        const reviewId = e.target.getAttribute('name')
        console.log(reviewId, modifyRating, modifyRef.current.value);
        if(modifyRef.current.value==="") {
            alert("수정할 리뷰란을 입력하시오.")
        }else{
            if(window.confirm("리뷰를 수정하시겠습니까?")===true){
                axios({
                    method: 'put',
                    url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/review/${reviewId}`,
                    data: {
                        content: modifyRef.current.value,
                        rating: modifyRating
                    }
                })
            }
        }
        setModifyBtn(false);

        // Default 값으로 변경
        setModifyRating(0);
        modifyRef.current.value = "";
        
    }
    function CancleModify(e){ // 리뷰 수정 취소
        reviewData[e.target.getAttribute('index')].modify=0;
        setModifyBtn(false);
    }

    function DeleteReview(e){ // 리뷰 삭제
        const reviewId = e.target.getAttribute('name');

        if(window.confirm("정말 삭제하시겠습니까?")===true) {
            axios({
                method: 'DELETE',
                url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/review/${reviewId}`
            })
            setReviewNum(prev=>prev-1)
        }else{
            return;
        }
    }

    function UpLike(e){
        const reviewId = e.target.parentNode.id; // id값 저장해야 함.
        console.log(reviewId);

        let user_ReviewValue;
        const Review_ids = reviewData.map((set) => {
            return {'review_id': set.review_id};
        })

        axios({ // user_ReviewValue 저장
            method : 'get',
            url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/review/${reviewId}/reviewValue`
        }).then((res)=> {
            if(res){
                console.log(res);
                user_ReviewValue = res.data;
            }else{
                console.log("error");
            }
        }).then(()=>{
            console.log("user_ReviewValue : " + user_ReviewValue);
            if(user_ReviewValue){ // 해당 리뷰에 대한 유저의 평가가 존재함
                if(user_ReviewValue===true){ // 기존에 있던 평가 : Like
                    // DELETE
                    console.log("(Like)Delete~!")
                    /*axios({            
                        method : 'DELETE',
                        url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/reviewValue/1` // reviewValueId가 뭐냐고 ㅅㅂ
                    }).then((res)=> {
                        if(res){
                            console.log(res);
                        }else{
                            console.log("error");
                        }
                    })*/
                }else{ // 기존에 있던 평가 : Dislike
                    // PUT. Dislike -> Like
                    console.log("(Like)Put~!")

                    /*axios({            
                        method : 'PUT',
                        url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/reviewValue/1`, // valueId 이거아직 아님
                        data : {
                            value: 'true' // dislike -> like
                        }
                    }).then((res)=> {
                        if(res){
                            console.log(res);
                        }else{
                            console.log("error");
                        }
                    })*/
                }
            }else{ // 해당 리뷰에 대한 유저의 평가가 존재 안함
                // POST
                console.log("(Like)Post~!")

                axios({            
                    method : 'POST',
                    url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/review/${reviewId}/reviewValue`,
                    data : {
                        value: 'true'
                    }
                }).then((res)=> {
                    if(res){
                        console.log(res);
                    }else{
                        console.log("error");
                    }
                })
            }
        })
    }

    function UpDislike(e){
        const reviewId = e.target.parentNode.id;
        console.log(reviewId);

        let user_ReviewValue;
        const Review_ids = reviewData.map((set) => {
            return {'review_id': set.review_id};
        })

        axios({ // user_ReviewValue 저장
            method : 'get',
            url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/review/${reviewId}/reviewValue`
        }).then((res)=> {
            if(res){
                console.log(res);
                user_ReviewValue = res.data;
            }else{
                console.log("error");
            }
        }).then(()=>{
            console.log("user_ReviewValue : " + user_ReviewValue);
        }).then(()=>{
            if(user_ReviewValue){ // 해당 리뷰에 대한 유저의 평가가 존재함
                if(user_ReviewValue===false){ // 기존에 있던 평가 : Dislike
                    // DELETE
                    console.log("(Dislike)Delete~!")
                    /*axios({            
                        method : 'DELETE',
                        url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/reviewValue/0` // ReviewValueId가 뭐냐고 ㅅㅂ
                    }).then((res)=> {
                        if(res){
                            console.log(res);
                        }else{
                            console.log("error");
                        }
                    })*/
                }else{ // 기존에 있던 평가 : Like
                    // PUT. Like -> Dislike
                    console.log("(Dislike)Put~!")
                    /*axios({            
                        method : 'PUT',
                        url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/reviewValue/0`,
                        data : {
                            value: 'false' // like -> dislike
                        }
                    }).then((res)=> {
                        if(res){
                            console.log(res);
                        }else{
                            console.log("error");
                        }
                    })*/
                }
            }else{ // 해당 리뷰에 대한 유저의 평가가 존재 안함
                // POST
                console.log("(Dislike)Post~!");
                axios({            
                    method : 'POST',
                    url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/review/${reviewId}/reviewValue`,
                    data : {
                        value: 'false'
                    }
                }).then((res)=> {
                    if(res){
                        console.log(res);
                    }else{
                        console.log("error");
                    }
                })
            }
        })

        // Print Current Dislike Num
        /*Review_ids.forEach((set) =>{
            axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/review/${set.review_id}/reviewValueFalse`
            ).then((res) => {
                if(res){
                    console.log("id: " + set.review_id, res);
                }
                else{
                    alert("fail");
                }
            })
        })*/
    }

    const [reviewValues, setReviewValues] = useState([]);
    useEffect(() => { // popupGameData 또는 review의 개수가 바뀌면 reviewData 갱신.
        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${popupGameData.id}/review/all`
        ).then((res) => {
            if(res){
                const tp = res.data.map((set) => {
                    set.modify = 0;
                    return set;
                })

                setReviewData(tp);
                setReviewNum(res.data.length);
            }
            else{
                alert("fail");
            }
        }).then(() =>{
            // console.log(reviewData);
            let ary=[];
            reviewData.forEach((set, index) => {
                // console.log(set.review_id);
                axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/review/${set.review_id}/reviewValue`)
                .then((res)=>{
                    // console.log(res.data);
                    if(res.data){ // true or false
                        console.log(res.data);
                    }else{ // null
                        
                    }
                })
            })
            // setReviewValues(ary);
        })
        console.log(reviewData);

    }, [popupGameData, reviewNum]) // modify가 바뀌면 바뀌게 못하나.

    useEffect(()=>{ // 수정 버튼 누르면 리뷰데이터 갱신
        setReviewData(reviewData);
    },[modifyBtn]) 


    return (
        <div className="popup__Review">
            <div className="title__font">Review</div>
            <br/>

            <div className="Reviews">
                <div className="Review__contents">
                    {reviewData.map((set, index) => {
                        return (
                            <div className="Review" key={index}>
                                <img src={User_Icon} className="Review__profile__image"></img>
                                <div className="Reveiw__items">
                                    <span className="Name">{set.username}&nbsp;review_id:{set.review_id}</span><br/>
                                    
                                    {((set.modify===1)&&(modifyBtn===true)) ? (  
                                        <>                                  
                                            <div className="Review__modify">
                                                <div className="modify__Rating">
                                                    별점 : &nbsp;
                                                    <ReviewStarRating rating={modifyRating} setRating={setModifyRating}/>
                                                </div>

                                                <div className="modify__Contents">
                                                    <input 
                                                        type="text" 
                                                        ref={modifyRef}
                                                        className="modify__content"
                                                        placeholder="  Modify Review"
                                                        required
                                                    />&nbsp;&nbsp;
                                                    <button 
                                                        index={index} 
                                                        onClick={CompleteModify}
                                                        name={set.review_id}
                                                        className="modify__btn"
                                                    >완료</button>
                                                    <button 
                                                        index={index} 
                                                        onClick={CancleModify}
                                                        className="modify__btn"
                                                    >취소</button>
                                                </div>

                                            </div>
                                        </>
                                        ) : (
                                            <>
                                            <span className="Rating">
                                                <StarRating starRatingNum={set.rating} />
                                            </span>

                                            <span className="date">
                                                {moment(set.modifiedDate).format('YYYY-MM-DD HH:mm:ss')}
                                            </span><br/><br/>
                                            
                                            <div className="Review__likes">
                                                {reviewValues[index]===true ? (
                                                    <AiFillLike className="Review__like" id={set.review_id} onClick={UpLike} color="blue"/> 
                                                ) : (
                                                    <AiFillLike className="Review__like" id={set.review_id} onClick={UpLike}/>
                                                )}&nbsp;&nbsp;{like} &nbsp;

                                                {reviewValues[index]===false ? (
                                                    <AiFillDislike className="Review__like" id={set.review_id} onClick={UpDislike} color="blue"/> 
                                                ) : (
                                                    <AiFillDislike className="Review__like" id={set.review_id} onClick={UpDislike} />
                                                )}&nbsp;&nbsp;{dislike} &nbsp;
                                            </div>
                                            
                                            <span className="comment">{set.content}</span><br/>
                                            </>
                                        )
                                    }

                                </div>
                                <div className="Review__btns">
                                    <span className="Review__btn" name={set.review_id} onClick={OpenReviewDeclaration} >신고</span>
                                    <span className="Review__btn" name={set.review_id} onClick={ModifyReview} >수정</span>
                                    <span className="Review__btn" name={set.review_id} onClick={DeleteReview} >삭제</span>
                                </div>
                            </div>   
                        ) 
                        
                    })}
                </div>
            </div>

            <div className="Review__write">
                <div className="Review__rating">
                    별점 : &nbsp;
                    <ReviewStarRating rating={rating} setRating={setRating}/>
                </div>

                <div className="Input__tag">
                    <input 
                        type="text" 
                        ref={commentRef}
                        className="writing__part"
                        placeholder="  Review Addition"
                        required
                    />&nbsp;&nbsp;
                    <input 
                        type="submit"
                        value="Register"
                        className="submit__part" 
                        onClick={RegistReview}
                    />
                </div>
            </div>
        </div>
    )
}

export default PopupReview