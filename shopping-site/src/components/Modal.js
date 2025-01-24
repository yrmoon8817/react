import React from "react";
import {ModalContentBasic} from './ModalContentBasic'
import {ModalContentField} from './ModalContentField'
export const Modal = ({ type, popupFunc, popupInfo, addressData }) => {
  return (
    <div className={`popup_wrap`}>
      <div className='popup_dim'></div>
      {
        type.cate==="basic"?
        <ModalContentBasic type={type} popupFunc={popupFunc} popupInfo={popupInfo}/>
          :(type.cate==="field" ?
            <ModalContentField type={type} popupFunc={popupFunc} popupInfo={popupInfo} addressData={addressData}/> :""
          )
        }
      </div>
    )
  }
