import React, {useState, useEffect, useRef} from 'react'
import "./PopupReview.css"
import axios from 'axios'
import {selectUser} from './../../features/userSlice'
import {useSelector} from "react-redux";
import moment from 'moment'
import $ from "jquery"

import StarRating from './StarRating'
import ReviewStarRating from './ReviewStarRating'
import User_Icon from "../../img/review_user.png"
import {AiOutlineDislike, AiOutlineLike, AiFillLike, AiFillDislike} from 'react-icons/ai'

import AccountBoxIcon from '@material-ui/icons/AccountBox';

import img from './../../img/white_icon.png'

function PopupReview({popupGameData, setDeclare_visible, setDeclare_part, setDeclare_reviewId}) {
    const [rating, setRating] = useState(0);
    const [modifyRating, setModifyRating] = useState(0);
    const [reviewData, setReviewData] = useState([]);
    

    // 갱신을 위한 값
    const [reviewNum, setReviewNum] = useState(0); // 리뷰 등록, 삭제시 갱신

    const [changeLike, setChangeLike] = useState([]); // like수를 갱신
    const [changedislike, setChangeDislike] = useState([]); // dislike수를 갱신
    const [changeLikeBtn, setChangeLikeBtn] = useState(false); // like, dislike 버튼을 누를시 갱신
    const [changeReviewValue, setChangeReviewValue] = useState(false);

    const [modifyBtn, setModifyBtn] = useState(false); // 수정 탭을 누를 시 수정 html 코드 보여줌.
    const [modifyReviewComplete, setModifyReviewComplete] = useState(false); // 수정 완료시 갱신.

    // user, ref
    const userId = useSelector(selectUser).user_id;
    const commentRef = useRef();
    const modifyRef = useRef();
    
    
    function RegistReview(){ // 리뷰 등록
        // 변수에 값 저장하여 백엔드로 axios.get or post
        // 보낼 값 : 평점(rating), 리뷰(comment), 유저Id, 댓글 단 날짜.
        console.log(popupGameData.id, userId, rating, commentRef.current.value);

        if(commentRef.current.value==="") {
            alert("리뷰란을 입력하시오.")
        }else{
            if(window.confirm("리뷰를 등록하시겠습니까?")===true){
                axios({
                    method: 'post',
                    url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/game/${popupGameData.id}/review`,
                    data: {
                        content: commentRef.current.value,
                        rating: rating
                    }
                }).then((res)=>{
                    console.log(res);
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
        const idx = e.target.getAttribute('index');

        $(".review__modify__ul")[idx].style.display = "none" // 신고 버튼 누르면 Tab Close

        setDeclare_visible(true);
        setDeclare_part(false); // Part : 리뷰 신고
        setDeclare_reviewId(reviewId); // 신고할 Review Id
    }
    
    function ModifyReview(e){ // 리뷰 수정
        const reviewId=e.target.getAttribute('name')
        const idx = e.target.getAttribute('index');

        $(".review__modify__ul")[idx].style.display = "none" // 수정 버튼 누르면 Tab Close

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
            return;
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
                setModifyReviewComplete(!modifyReviewComplete)
            }
        }

        // Default 값으로 변경
        setModifyRating(0);
        modifyRef.current.value = "";
        setModifyBtn(false);
        
    }
    function CancleModify(e){ // 리뷰 수정 취소
        reviewData[e.target.getAttribute('index')].modify=0;
        setModifyBtn(false);
    }

    function DeleteReview(e){ // 리뷰 삭제    
        const reviewId = e.target.getAttribute('name');
        const idx = e.target.getAttribute('index');

        $(".review__modify__ul")[idx].style.display = "none" // 삭제 버튼 누르면 Tab Close

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
        axios({ // user_ReviewValue 저장
            method : 'get',
            url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/review/${reviewId}/reviewValue`
        }).then((res)=> {
            if(res){
                user_ReviewValue = res.data;
            }else{
                console.log("error");
            }
        }).then(()=>{
            console.log("user_ReviewValue : " + user_ReviewValue);
            if(user_ReviewValue===true){ // 기존에 있던 평가 : Like
                // DELETE
                console.log("(Like)Delete~!")
                axios({            
                    method : 'delete',
                    url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/review/${reviewId}/reviewValue` 
                }).then((res)=> {
                    if(res){
                        console.log(res);
                    }else{
                        console.log("error");
                    }
                })
            }else if(user_ReviewValue===false){ // 기존에 있던 평가 : Dislike
                // PUT. Dislike -> Like
                console.log("(Like)Put~!")

                axios({            
                    method : 'put',
                    url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/review/${reviewId}/reviewValue`,
                    data : {
                        value: 1 // dislike -> like
                    }
                }).then((res)=> {
                    if(res){
                        console.log(res);
                    }else{
                        console.log("error");
                    }
                })
            }
            else if(user_ReviewValue===null){ // 해당 리뷰에 대한 유저의 평가가 존재 안함
                // POST
                console.log("(Like)Post~!")

                axios({            
                    method : 'POST',
                    url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/review/${reviewId}/reviewValue`,
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
            setChangeLikeBtn(!changeLikeBtn);

        })
        
    }

    function UpDislike(e){
        const reviewId = e.target.parentNode.id;
        console.log(reviewId);

        let user_ReviewValue;
        axios({ // user_ReviewValue 저장
            method : 'get',
            url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/review/${reviewId}/reviewValue`
        }).then((res)=> {
            if(res){
                console.log(res.data);
                user_ReviewValue = res.data;
            }else{
                console.log("error");
            }
        }).then(()=>{
            if(user_ReviewValue===false){ // 기존에 있던 평가 : Dislike
                // DELETE
                console.log("(Dislike)Delete~!")
                axios({            
                    method : 'DELETE',
                    url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/review/${reviewId}/reviewValue`
                }).then((res)=> {
                    if(res){
                        console.log(res);
                    }else{
                        console.log("error");
                    }
                })
            }else if(user_ReviewValue===true){ // 기존에 있던 평가 : Like
                // PUT. Like -> Dislike
                console.log("(Dislike)Put~!")
                axios({            
                    method : 'PUT',
                    url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/review/${reviewId}/reviewValue`,
                    data : {
                        value: 0 // like -> dislike
                    }
                }).then((res)=> {
                    if(res){
                        console.log(res);
                    }else{
                        console.log("error");
                    }
                })
                
            }else if(user_ReviewValue===null){ // 해당 리뷰에 대한 유저의 평가가 존재 안함
                // POST
                console.log("(Dislike)Post~!");
                axios({            
                    method : 'POST',
                    url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/review/${reviewId}/reviewValue`,
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
            setChangeLikeBtn(!changeLikeBtn);

        })
    }

    useEffect(() => { // popupGameData 또는 review의 개수가 바뀌면 reviewData 갱신.
        axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${popupGameData.id}/review/all`
        ).then((res) => {
            if(res){
                console.log(res.data);
                const tp = res.data.map((set) => {
                    axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}/review/${set.review_id}/reviewValue`).then((res)=>{
                        // console.log(res);
                        if(res.data===null){ // null
                            set.reviewValue=2;
                        }else if(res.data===true){ // true & false
                            set.reviewValue=res.data;
                        }else if(res.data===false){ // false
                            set.reviewValue=res.data;
                        }
                        setChangeReviewValue(!changeReviewValue);
                        set.modify = 0;
                    })

                    axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/review/${set.review_id}/reviewValueTrue`)
                    .then((res)=>{
                        set.like=res.data;
                        setChangeLike(changeLike => [...changeLike, res.data]);
                    })
                
                    axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/review/${set.review_id}/reviewValueFalse`)
                    .then((res)=>{
                        set.dislike=res.data;
                        setChangeDislike(changedislike => [...changedislike, res.data]);
                    })
 

                    return set;
                })

                setReviewData(tp);
                setReviewNum(res.data.length);
            }
            else{
                alert("fail");
            }
        })

        console.log(reviewData)

    }, [popupGameData, reviewNum, changeLikeBtn, modifyReviewComplete]) // modify가 바뀌면 바뀌게 못하나.

    function OpenModifyReview(e){
        const index = e.target.getAttribute('index');
        console.log($(".review__modify__ul")[index]);

        // ul tag display toggle
        if($(".review__modify__ul")[index].style.display === "none"){
            $(".review__modify__ul")[index].style.display = "block"

        }else{
            $(".review__modify__ul")[index].style.display = "none"
        }        
    }
    return (
        <div className="popup__Review">
            <div className="title__font">Review</div>
            <br/>

            <div className="Reviews">
                <div className="Review__contents">
                    {reviewData.map((set, index) => {
                        // {console.log(set.reviewValue)}
                        return (
                            <div className="Review" key={index}>
                                {/* <AccountBoxIcon className="Review__profile__image" fontSize="large" /> */}
                                <img src={User_Icon} className="Review__profile__image"></img>

                                <div className="Reveiw__items">
                                    <span className="Name">{set.username}&nbsp;</span><br/>
                                    
                                    {(set.modify===1) ? (  
                                        <>                                  
                                            <div className="Review__modify">
                                                <div className="modify__Rating">                                
                                                    &nbsp;<ReviewStarRating rating={modifyRating} setRating={setModifyRating}/>
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
                                                {set.reviewValue === true? 
                                                    <AiFillLike className="Review__like" id={set.review_id} onClick={UpLike} color="blue"/> 
                                                 : 
                                                    <AiFillLike className="Review__like" id={set.review_id} onClick={UpLike}/>
                                                }&nbsp;&nbsp;{set.like} &nbsp;

                                                {set.reviewValue===false ? (
                                                    <AiFillDislike className="Review__like" id={set.review_id} onClick={UpDislike} color="blue"/> 
                                                ) : (
                                                    <AiFillDislike className="Review__like" id={set.review_id} onClick={UpDislike} />
                                                )}&nbsp;&nbsp;{set.dislike} &nbsp;
                                            </div>
                                            
                                            <span className="Review__comment">{set.content}</span><br/>
                                            </>
                                        )
                                    }

                                </div>
                                <div className="Review__modifyTab">
                                    <button className="modify_ReviewBtn" onClick={OpenModifyReview} index={index}>▼</button>
                                    <div className="review_tab1 review_tab2">
                                        <ul className="review__modify__ul">
                                            <li index={index}name={set.review_id} onClick={ModifyReview}>수정</li>
                                            <li index={index}name={set.review_id} onClick={DeleteReview}>삭제</li>
                                            <li index={index}name={set.review_id} onClick={OpenReviewDeclaration}>신고</li>
                                        </ul>
                                    </div>
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