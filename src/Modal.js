import React, {useRef, useCallback, useEffect} from 'react'
import styled from 'styled-components'
import $ from "jquery"
import {MdClose} from 'react-icons/md'
import {CgCloseO} from 'react-icons/cg'
import "./Modal.css"


function Modal({ visible, setVisible, children, coordY, setCoordY }) {
  // 배경 누르면 팝업창 닫기 위한 변수
  const modalRef = useRef();
 
  // ESC 누르면 팝업창 사라짐
  const keyPress = useCallback(e=> {
      if(e.key === 'Escape'&& visible){
          setVisible(false);
          document.getElementById('homeScreen').classList.remove("not_scroll")
      }
  }, [visible, setVisible])

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress])


  // 배경 누르기, X 버튼 누르기 
  // => 클래스 사라지고 'visible=false'
  useEffect(()=> {
    $(".modal_closeBtn").mouseup(function(){
      $("#homeScreen").removeClass("not_scroll")
      setVisible(false);

    })
    $(".modal_background").mouseup(function(e){
      $("#homeScreen").removeClass("not_scroll")
      if(modalRef.current === e.target){
        setVisible(false);
      }
    })



  }, [coordY])

  return (
    <>
        {/* 팝업창 띄워져있을 때에는 바탕화면 스크롤은 안되게 */}
        <Background className="modal_background" visible={visible} ref={modalRef} >
          
            <ModalWrapper visible={visible} className="modal_wrapper">
           
                <ModalContent className="modal_contents">
                  <CloseModalButton aria-label='Close modal' className="modal_closeBtn"/>
                  {children}
                </ModalContent>
              
            </ModalWrapper>
          
        </Background>
    </>
  )
}

const Background = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  overflow: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 20px;
  left: 10%;
  right: 10%;
  height: 1000px;
  width: 2000px;
  max-width: 1500px;
  z-index: 1000;
  overflow: hidden;
  outline: 0;
  border-radius: 10px;
`


const ModalContent = styled.div`
  box-sizing: border-box;
  position: relative;
  overflow: scroll;
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

  &::-webkit-scrollbar {
    width:20px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    background-clip: padding-box;
    border: 4px solid transparent;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px; 
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
  }
`

const CloseModalButton = styled(CgCloseO)`
    cursor: pointer;
    color: #fff;
    position: absolute;
    top: 20px;
    right: 0;
    width: 40px;
    height: 40px;
    padding: 0;
    z-index: 10;
`

export default Modal