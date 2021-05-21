import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {CgCloseO} from 'react-icons/cg'
import "./PopupDeclaration.css"
import axios from 'axios'

import {selectUser} from './../../features/userSlice'
import {useSelector} from "react-redux";

function PopupDeclaration( { popupGameData, popupMainVideoIndex, declare_visible, setDeclare_visible, declare_part, declare_contents, setDeclare_contents, declare_reviewId } ) {
    const user = useSelector(selectUser);
    const [reportType, setReportType] = useState("")
    const [videoId, setVideoId] = useState(1);

    function CloseVideoDelaration(){ // 신고창 X 버튼
        setDeclare_visible(false);
    }
    function CancleDeclare() { // 신고창 취소 버튼
      setDeclare_visible(false);
    }
    function SubmitVideoDeclare() {
      console.log(user.user_id, declare_part, declare_contents, reportType, videoId);

      axios({
          method: 'post',
          url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/video/${videoId}/report`,
          data: {
            reportType: reportType,
            content: declare_contents
          }
      }).then((res) => {
          if(res){
              console.log(res);
              alert("영상 신고가 완료되었습니다.");
              // 받아온 response(=review id)를 해당 리뷰의 id로 추가.
          }
          else
              alert("Declare's data sending fail");
      })
      setDeclare_visible(false);
  }
  function SubmitReviewDeclare() {
      console.log(user.user_id, declare_part, declare_contents, declare_reviewId);

      axios({
          method: 'post',
          url: `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${user.user_id}/review/${declare_reviewId}/report`,
          data: {
            reportType: reportType,
            content: declare_contents
          }
      }).then((res) => {
          if(res){
              console.log(res);
              alert("댓글 신고가 완료되었습니다.");
              // 받아온 response(=review id)를 해당 리뷰의 id로 추가.
          }
          else
              alert("Declare's data sending fail");
      })
      setDeclare_visible(false);
  }
    function GetReport(e){ // reportType을 받아오기 위한 함수
        setDeclare_contents(e.target.innerText);
        setReportType(e.target.htmlFor)
    }

    useEffect(() => { // popupGameData 또는 popupMainVideoIndex가 바뀌면 그에 따른 '메인 비디오에 들어갈 Id(=videoId)'를 갱신한다.
      async function fetchData() {
        const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${popupGameData.id}/video/all`);

        setVideoId(request.data[popupMainVideoIndex].id);
      }
    
      fetchData();
    }, [popupGameData, popupMainVideoIndex]);

    return (
        <DeclareBackground className="declare_background" declare_visible={declare_visible} >
          
            <DeclarationWrapper declare_visible={declare_visible} className="declare_wrapper">
        
                <DeclarationContent className="declare_contents" >
                <CloseDeclarationButton aria-label='close declare' className="declare_closeBtn" onClick={CloseVideoDelaration}/>
                  <h3 className="declare_part">
                    {/* declare_part:1 = 동영상 / declare_part:0 = 댓글 */}
                      {declare_part ? "동영상 신고" : "댓글 신고"}  
                  </h3><br/>

                  {declare_part ? (
                    <>
                      <div className="declare_item">
                      <input type="radio" name="declare_radio" className="declare_radio" id="성"  />
                      <label htmlFor="성" className="declare_selection" onClick={GetReport}>성적인 콘텐츠</label><br/>
                      </div>
                      <div className="declare_item">
                          <input type="radio" name="declare_radio" className="declare_radio" id="폭력" />
                          <label htmlFor="폭력" className="declare_selection" onClick={GetReport}>폭력적 또는 혐오스러운 콘텐츠</label><br/>
                      </div>
                      <div className="declare_item">
                          <input type="radio" name="declare_radio" className="declare_radio" id="학대" />
                          <label htmlFor="학대" className="declare_selection" onClick={GetReport}>증오 또는 학대하는 콘텐츠</label><br/>
                      </div>
                      <div className="declare_item">
                          <input type="radio" name="declare_radio" className="declare_radio" id="유해" />
                          <label htmlFor="유해" className="declare_selection" onClick={GetReport}>유해하거나 위험한 행위</label><br/>
                      </div>
                      <div className="declare_item">
                          <input type="radio" name="declare_radio" className="declare_radio" id="스팸" />
                          <label htmlFor="스팸" className="declare_selection" onClick={GetReport}>스팸 또는 사용자를 현혹하는 콘텐츠</label><br/>
                      </div> 

                      <hr className="hr_tag"/>

                      <div className="declare_submit_part">
                          <button onClick={CancleDeclare} className="declare_cancel">취소</button>
                          {declare_part ? (
                            <button onClick={SubmitVideoDeclare} className="declare_submit">신고</button>
                          ) : (
                            <button onClick={SubmitReviewDeclare} className="declare_submit">신고</button>
                          )}
                      </div>      
                    </>             
                  ) : (
                    <>
                      <div className="declare_item">
                      <input type="radio" name="declare_radio" className="declare_radio" id="성"  />
                      <label htmlFor="성" className="declare_selection" onClick={GetReport}>성적인 댓글</label><br/>
                      </div>
                      <div className="declare_item">
                          <input type="radio" name="declare_radio" className="declare_radio" id="폭력" />
                          <label htmlFor="폭력" className="declare_selection" onClick={GetReport}>폭력적 또는 혐오스러운 댓글</label><br/>
                      </div>
                      <div className="declare_item">
                          <input type="radio" name="declare_radio" className="declare_radio" id="학대" />
                          <label htmlFor="학대" className="declare_selection" onClick={GetReport}>증오 또는 학대하는 댓글</label><br/>
                      </div>
                      <div className="declare_item">
                          <input type="radio" name="declare_radio" className="declare_radio" id="스팸" />
                          <label htmlFor="스팸" className="declare_selection" onClick={GetReport}>스팸 또는 사용자를 현혹하는 댓글</label><br/>
                      </div>

                      <hr className="hr_tag"/>

                      <div className="declare_submit_part">
                          <button onClick={CancleDeclare} className="declare_cancel">취소</button>
                          {declare_part ? (
                            <button onClick={SubmitVideoDeclare} className="declare_submit">신고</button>
                          ) : (
                            <button onClick={SubmitReviewDeclare} className="declare_submit">신고</button>
                          )}
                      </div>     
                    </>
                  )}


                </DeclarationContent>
            
            </DeclarationWrapper>
        
        </DeclareBackground>
    )
}
const DeclareBackground = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.declare_visible ? 'block' : 'none')};
  position: fixed;
  overflow: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`

const DeclarationWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.declare_visible ? 'block' : 'none')};
  position: fixed;
  top: 20%;
  left: 20%;
  right: 20%;
  bottom: 20%;
  height: 500px;
  width: 700px;
  max-width: 1500px;
  z-index: 1000;
  overflow: hidden;
  outline: 0;
  border-radius: 10px;
`


const DeclarationContent = styled.div`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #111;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  // height: 1000px;
  // width: 1500px;

  height: 100%;
  width: 100%;

  max-width: 1500px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 50px 50px;
`

const CloseDeclarationButton = styled(CgCloseO)`
    cursor: pointer;
    color: #fff;
    position: absolute;
    top: 20px;
    right: 10px;
    width: 30px;
    height: 30px;
    padding: 0;
    z-index: 10;
`

export default PopupDeclaration
