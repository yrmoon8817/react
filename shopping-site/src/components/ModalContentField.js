import React, { useState } from "react";
import { Text } from './Text';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { Input } from './input';

export const ModalContentField = ({ type, popupFunc, popupInfo, addressData }) => {
  const navigate=useNavigate();
  const [checkData, setCheckData]=useState("");
  const saveData=(data)=>{
    setCheckData(data.val)
  }
  const [addressList, setAddressList]=useState("");
  const [inputOb, setInputOb]=useState([
    {
      sort:"text", 
      type:"text", 
      val: {checkData}, 
      focus:false, 
      style:"input_edit",
      guide:"수정할 정보를 입력하세요.",
      icon: "clear",
      stateIcon: "hide"
    }, 
    {
      sort:"text", 
      type:"text", 
      val: {checkData}, 
      focus:false, 
      style:"input_edit",
      guide:"주소를 입력해주세요.",
      icon: "clear",
      stateIcon: "hide"
    }, 
  ]);

  return(
    <div className={`popup_content popup_${type.cate}`}>
        <div className='title_box'>
          <Text sort="h3" description={type.messageTxt}/>
          <Text sort="p" description={`변경할 ${type.title}를 입력해주세요`}/>
        </div>
        <div className='edit_info_area'>

          <Input
            onFunc={saveData}
            item={type.title==="주소"?inputOb[1]:inputOb[0]}
            />
            {
              type.title==="아이디"?          
              <Button 
                btnType="button"
                name="확인"
                style="btn_small"
                onClick={()=>{
                }}
            />:""
            }
            {
              type.title==="주소"?
              <Button 
                btnType="button"
                name="찾기"
                style="btn_small"
                onClick={()=>{
                  if (inputOb[1].val !== '' && inputOb[1].val !== null){
                    let list = [];
                    addressData.map((item, index) => {
                      if (item === inputOb[1].val) {
                        list.push(item);
                      }
                      if (index === addressData.length - 1) {
                        if(list.length!==0){
                          setAddressList([...list]);
                        } else if (list.length === 0){
                          setAddressList([]);
                        }
                      }
                    })
                  }
                }}
              />
              :""
              }
          </div>
          {
          type.title === "주소" && addressList===''?
          <div className="address_guide">
            <Text sort="p" description="ex) 서울시..." />
          </div>:(
            type.title === "주소" && addressList.length !== '' && addressList.length>0 ?
              <ul className="address_list">
                {
                  addressList.map((item, index) => {
                    <Text sort="p" description={item} />
                  })
                }
              </ul>
              : (type.title === "주소" && addressList.length === 0? 
              <Text sort="p" description={"해당 주소는 존재하지 않습니다. 다시 검색해 주세요."} /> 
              : "")
          )
        }
        <div className='btn_group btn_half'>
          {
            popupInfo.map((item,index)=>(
              <Button 
                key={index}
                btnType="button" 
                style={item.style}
                name={item.name}
                onClick={
                  ()=>{
                    popupFunc({state:item.on.state,  description:item.on.description})
                    if(item.on.path!==null){
                      navigate(item.on.path);
                    }
                  }
                }
                disabled={checkData!==null?checkData:null}
            />
            ))
          }
        </div>
      </div>
  );
}
