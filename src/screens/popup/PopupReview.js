import React, {useState, useEffect, useRef} from 'react'
import "./PopupReview.css"
import axios from 'axios'
import {selectUser} from './../../features/userSlice'
import {useSelector} from "react-redux";

import StarRating from './StarRating'
import ReviewStarRating from './ReviewStarRating'
import User_Icon from "../../img/user_icon.png"
import {AiFillLike, AiFillDislike} from 'react-icons/ai'

function PopupReview({popupGameData, setDeclare_visible, setDeclare_part, setDeclare_reviewId}) {
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [rating, setRating] = useState(0);
    const [reviewData, setReviewData] = useState([]);
    const [reviewNum, setReviewNum] = useState(0);

    const commentRef = useRef();
    const user = useSelector(selectUser);
    
    function RegistReview(){
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
        setDeclare_visible(true);
        setDeclare_part(false); // Part : 리뷰 신고
        setDeclare_reviewId(e.target.id); // 신고할 Review Id
    }
    function DeleteReview(e){ // 리뷰 삭제
        if(window.confirm("정말 삭제하시겠습니까?")===true) {
            axios({
                method: 'DELETE',
                url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/review/${e.target.id}`
            })
            setReviewNum(prev=>prev-1)
        }else{
            return;
        }
    }

    useEffect(() => { // popupGameData 또는 review의 개수가 바뀌면 reviewData 갱신.
        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${popupGameData.id}/review/all`
        ).then((res) => {
            if(res){
                setReviewData(res.data);
                setReviewNum(res.data.length);
            }
            else{
                alert("fail");
            }
        })
    }, [popupGameData, reviewNum])

    /*let sum = 0;
    reviewData.forEach((set, index) => {
        sum+=set.rating;
    })
    let total_rating = Math.ceil((sum/reviewData.length)*100)/100;*/

    return (
        <div className="popup__Review">
            <div className="title__font">Review</div>
            <br/>
            {/* <div className="total_rating">
                Game Rating : {total_rating}
                <StarRating starRatingNum={total_rating} />
            </div> */}

            <div className="Reviews">
                <div className="Review__contents">
                    {reviewData.map((set, index) => {
                        return (
                            <div className="Review" key={index}>
                                <img src={User_Icon} className="Review__profile__image"></img>
                                <div className="Reveiw__items">
                                    <span className="Name">{set.id}</span><br/>
                                    <span className="Rating">
                                        <StarRating starRatingNum={set.rating} />
                                    </span>
                                    <span className="date">{set.modifiedDate}</span><br/><br/>
                                    
                                    <div className="Review__likes">
                                        <AiFillLike className="Review__like" onClick={()=>setLike(prev=>prev+1)}/>&nbsp;&nbsp;{like} &nbsp;
                                        <AiFillDislike className="Review__like" onClick={()=>setDislike(prev=>prev+1)}/>&nbsp;&nbsp;{dislike} 
                                    </div>
                                    <span className="comment">{set.content}</span><br/>
                                </div>
                                <div className="Review__declaration">
                                    <span className="Review__declaration__btn" id={set.id} onClick={OpenReviewDeclaration} >신고</span>
                                    <span className="Review__declaration__btn" id={set.id} onClick={DeleteReview} >삭제</span>
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