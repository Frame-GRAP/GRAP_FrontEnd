import React, {useRef, useCallback, useEffect} from 'react'
import styled from 'styled-components'
import {MdClose} from 'react-icons/md'


function Modal({ visible, setVisible, children, visibleModal }) {
  // 배경 누르면 팝업창 닫기 위한 함수
  const modalRef = useRef();

  function closeModal(e) { 
      //console.log(modalRef.current, e.target)
      if(modalRef.current === e.target){
          setVisible(false);
      }
  }
 
  // ESC 누르면 팝업창 사라짐
  const keyPress = useCallback(e=> {
      if(e.key === 'Escape'&& visible){
          setVisible(false);
      }
  }, [visible, setVisible])
  useEffect(() => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress])

  return (
    <>
        {/* 팝업창 띄워져있을 때에는 바탕화면 스크롤은 안되게 */}
        <Background className="modal_background" visible={visible} ref={modalRef} onClick={closeModal} >
          
            <ModalWrapper visible={visible} className="modal_wrapper">
           
                <ModalContent className="modal_contents">
                  <CloseModalButton aria-label='Close modal' onClick={visibleModal} className="modal_closeBtn"/>
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
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%;
  height: 800px;
  width: 1000px;
  margin: auto;
  z-index: 1000;
  overflow: hidden;
  outline: 0;
`


const ModalContent = styled.div`
  box-sizing: border-box;
  position: relative;
  overflow-y: scroll;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #111;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 1000px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 50px 50px;
`

const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    color: rgba(0, 0, 0, 0.9);
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    padding: 0;
    z-index: 10;
`

export default Modal