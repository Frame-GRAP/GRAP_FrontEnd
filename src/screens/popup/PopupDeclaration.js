import React, {useRef, useCallback, useEffect} from 'react'
import styled from 'styled-components'
import $ from "jquery"
import {CgCloseO} from 'react-icons/cg'
import "./PopupDeclaration.css"

function PopupDeclaration( { children, declare_visible, setDeclare_visible } ) {
    function CloseVideoDelaration(){
        setDeclare_visible(false);
    }

    return (
        <DeclareBackground className="declare_background" declare_visible={declare_visible} >
          
            <DeclarationWrapper declare_visible={declare_visible} className="declare_wrapper">
        
                <DeclarationContent className="declare_contents" >
                <CloseDeclarationButton aria-label='close declare' className="declare_closeBtn" onClick={CloseVideoDelaration}/>
                {children}
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
