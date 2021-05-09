import React, {useState, useEffect, useRef} from 'react'
import "./PopupReview.css"

import StarRating from './StarRating'
import ReviewStarRating from './ReviewStarRating'
import User_Icon from "../../img/user_icon.png"
import {AiFillLike, AiFillDislike} from 'react-icons/ai'


function PopupReview({setDeclare_visible, setDeclare_part, popupGameData}) {
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [rating, setRating] = useState(0);

    const commentRef = useRef();

    // 리뷰에서 추가적으로 해야될 것
    // 1. 좋아요, 싫어요 버튼 누를 시 업데이트 된 좋아요, 싫어요 값 보내야 함!!!!!
    // 2. 댓글 수정 기능
    // 3. 댓글 삭제 기능

    function RegistReview(){
        // 변수에 값 저장하여 백엔드로 axios.get or post
        // 보낼 값 : 평점(rating), 리뷰(comment), 유저Id, 댓글 단 날짜.
        console.log(rating, commentRef.current.value);

        // Default 값으로 변경
        setRating(0);
        commentRef.current.value = "";
    }

    function OpenReviewDeclaration(){
        setDeclare_visible(true);
        setDeclare_part(false);
    }

    return (
        <div className="popup__Review">
            {/* Review 번호 매겨서 일정 개수 이상되면 
            다음 페이지로 넘어가게 */}
            <div className="title__font">Review</div>
            <br/>
            <div className="total_rating">
                Game Rating : 4.5
                <StarRating starRatingNum={4.5} />

            </div>

            <div className="Reviews">
                <div className="Review__contents">
                    {/* User Profile(Image, ID), Register Date, Rating, Review */}

                    {/* Review ForEach문 */}
                    {[...Array(5)].map(() => {
                        return (
                            <div className="Review">
                                <img src={User_Icon} className="Review__profile__image"></img>
                                <div className="Reveiw__items">
                                    <span className="Name">고윤혁</span><br/>
                                    <span className="Rating">
                                        <StarRating starRatingNum={4} />
                                    </span>
                                    <span className="date">2020.04.28</span><br/><br/>
                                    
                                    <div className="Review__likes">
                                        {/* 여기 좋아요, 싫어요 수 나중에 DB에서 받아오는 코드 써야함. */}
                                        <AiFillLike className="Review__like" onClick={()=>setLike(prev=>prev+1)}/>&nbsp;&nbsp;{like} &nbsp;
                                        <AiFillDislike className="Review__like" onClick={()=>setDislike(prev=>prev+1)}/>&nbsp;&nbsp;{dislike} 
                                    </div>
                                    <span className="comment">마계에서 마을 밖 특정지형에 모험가가 껴서 아무 행동도 못하는 현상이 발생하던데 빠른 조치 부탁드립니다. 그 외엔 재밌게 플레이하고 있습니다.</span><br/>
                                </div>
                                <div className="Review__declaration">
                                    <span className="Review__declaration__btn" onClick={OpenReviewDeclaration} >신고</span>
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