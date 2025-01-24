import React from "react";
import { Text } from './Text';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

export const ModalContentBasic = ({type, popupFunc, popupInfo}) => {
  const navigate=useNavigate();
  return(
      <div className={`popup_content popup_${type.cate}`}>
        <Text sort="p" description={type.messageTxt}/>
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
                    popupFunc({ state: item.on.state,  description: item.on.description})
                    if(item.on.path!==null){
                      navigate(item.on.path);
                    }
                  }
                }
            />
            ))
          }
        </div>
      </div>
    );
}
