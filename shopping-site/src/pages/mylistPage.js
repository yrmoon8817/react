import React, { useState } from "react";
import { Text } from '../components/Text';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Img } from '../components/img';
import {ListField} from '../components/listField'
import { Modal } from '../components/Modal';
export default function MyListPage({ productList, popupFunc, popupState, messageTxt, updateLikeData, addressData }) {
  const [title, setTitle]=useState("");
  return (

      <div className='inner'>
        {popupState===true &&
          <Modal 
            addressData={addressData}
            type={{cate:"field", messageTxt, title:title}}
            popupInfo={[
                {
                  name:"취소", 
                  style:"btn btn_cancel",
                  on:{state:false, description:"", path:null, }
                  },
                {
                  name:"수정완료",
                  style:"btn btn_complete",
                  on:{state:false, description:"", path:"/info"}
                }
              ]
            }
            popupFunc={popupFunc} 
          /> 
        }          
        <Text sort="h1" description="My Info"/>
          <section className='edit_area'>
            <Text sort="h2" description="내 정보 수정"/>
            <div className='field_area'>
              <ListField
                src={{
                  title:"아이디",
                  description:"라라라"
                }}
                onClick={()=>{
                  popupFunc({state:true, description:"아이디 변경"})
                  setTitle("아이디")
                }}
                />
                <ListField
                src={{
                  title:"비밀번호",
                }}
                onClick={()=>{
                  popupFunc({state:true, description:"비밀번호 변경"})
                  setTitle("비밀번호")
                }}
                />
                <ListField
                src={{
                  title:"주소",
                  description:"서울시..."
                }}
                onClick={()=>{
                  popupFunc({state:true, description:"주소"})
                  setTitle("주소")
                }}
                />
                <ListField
                src={{
                  title:"이름",
                  description:"ㅎㅎㅎ"
                }}
                onClick={()=>{
                  popupFunc({state:true, description:"이름"})
                  setTitle("이름")
                }}
                />
            </div>
          </section>
          <section className='like_area'>
            <Text sort="h2" description={`찜목록 ${productList? productList.length+ "개" : 0}`}/>
            {
              productList===null? 
              <>
                <Text textType="guide" description={`관심상품이 없습니다.`} sort="p"/>
                <Text textType="guide" description={`상품목록에서 찜하기를 눌러주세요`} sort="p"/>
              </>
              : <ul className='list_pdt'>
              {
                productList.map((item)=>(
                <li className="list_item" key={item.id}>
                  <Link to={`/product/${item.id}`}>
                    <Img
                      imgName="thumb_img"
                      path={item.img}
                      description={item.title}
                    />
                    <div className="text_wrap">
                      <Text 
                        textType="title" 
                        description={item.title} 
                        sort="p"
                      />
                      <Text 
                        textType="price" 
                        description={item.price} 
                        sort="strong"
                      />
                    </div>
                  </Link>
                  <Button 
                    btnType="button"
                    style="btn_icon btn_delete"
                    onClick={()=>{
                      updateLikeData({item:item, id:item.id, state:false, name:"heart"})
                    }}
                  />
                </li>
              ))}
            </ul>
            }       
          </section>
    </div>
  );
}