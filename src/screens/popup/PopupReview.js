import React from 'react'
import "./PopupReview.css"
import $ from "jquery"
import Profile_Image from "../../img/profile_Image.png"
import Profile_Image2 from "../../img/profile_Image2.png"




function PopupReview() {
    function prevent(e){
        e.preventDefault();
    }
    
    // Rating
    // var rating = $('.rating');

    // rating.each(function(){
    //     var targetScore = $(this).attr('data-rate');
    //     console.log(targetScore);
    //     $(this).find('svg:nth-child(-n'+ targetScore + ')').css({color: '#F05522'});

    // })


    return (
        <div className="popup__Review">
            {/* Review 번호 매겨서 일정 개수 이상되면 
            다음 페이지로 넘어가게 */}
            <div className="review_title title__font">Review</div>
            <br/><br/>
            <div className="total_rating">
                Game Rating : 4.5
                <div className="rating" data-rate="4.5">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>

                    {/* 
                    <i className="fa fa-star-o"></i> 비어있는 별
                    <i className="fa fa-star-half-o"></i> 반만 찬 별
                    <i className="fa fa-star"></i> 꽉찬 별
                    */}
                </div>
            </div>
            <br/>
            <div className="Reviews">
                <div className="Review__contents">
                    {/* User Profile(Image, ID), Register Date, Rating, Review */}

                    {/* Review ForEach문 */}
                    <div className="Review">
                        <img src={Profile_Image} className="profile_Image"></img>

                        <div className="etc">
                            고윤혁<br/>
                            Rating : 4<br/>
                            게임 난이도가 너무 어려워요<br/>
                            2020.04.28
                        </div>
                    </div>
                    <div className="Review">
                        <img src={Profile_Image2} className="profile_Image"></img>

                        <div className="etc">
                            배원찬<br/>
                            Rating : 5<br/>
                            너무 쉬워서 딴 겜 하러감 ㅋ<br/>
                            2020.04.28
                        </div>
                    </div>
                    <div className="Review">
                        <img src={Profile_Image} className="profile_Image"></img>

                        <div className="etc">
                            고윤혁<br/>
                            Rating : 4<br/>
                            게임 난이도가 너무 어려워요<br/>
                            2020.04.28
                        </div>
                    </div>
                    <div className="Review">
                        <img src={Profile_Image2} className="profile_Image"></img>

                        <div className="etc">
                            배원찬<br/>
                            Rating : 5<br/>
                            너무 쉬워서 딴 겜 하러감 ㅋ<br/>
                            2020.04.28
                        </div>
                    </div>
                    <div className="Review">
                        <img src={Profile_Image} className="profile_Image"></img>

                        <div className="etc">
                            고윤혁<br/>
                            Rating : 4<br/>
                            게임 난이도가 너무 어려워요<br/>
                            2020.04.28
                        </div>
                    </div>
                    <div className="Review">
                        <img src={Profile_Image2} className="profile_Image"></img>

                        <div className="etc">
                            배원찬<br/>
                            Rating : 5<br/>
                            너무 쉬워서 딴 겜 하러감 ㅋ<br/>
                            2020.04.28
                        </div>
                    </div>

                </div>

            </div>
            <form className="Review__write">
                <input 
                    type="text" 
                    className="writing__part"
                    placeholder="  Review Addition"
                    required
                />&nbsp;&nbsp;
                <input 
                    type="submit"
                    value="Register" 
                    className="submit__part" 
                    onClick={prevent} 
                />
            </form>
        </div>
    )
}

export default PopupReview
