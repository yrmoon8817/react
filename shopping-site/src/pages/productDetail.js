import React, { useState } from "react";
import { useParams} from "react-router-dom";
import { Button } from "../components/Button";
import { Modal } from '../components/Modal';
import { Text } from '../components/Text';
import { Icon } from '../components/icon';
import { Img } from '../components/img';

export default function ProductDetail({productList, saveProduct, popupState,messageTxt,popupFunc}) {
  const params = useParams();
  // 상품 사이즈선택
  const [selectSize, setSelectSize] = useState(null);
  const selectFunc=(type) => {
    setSelectSize(type);
  };
  const [number, setNumber]=useState(1);
  const numberFunc=(num)=>{
    setNumber(num);
  }
  return (
        <div className='inner'>
        {popupState===true &&
          <Modal 
            type={{cate:"basic", messageTxt}}
            popupFunc={popupFunc} 
            popupInfo={[
                {
                  name:"계속 쇼핑하기", 
                  style:"btn btn_close",
                  on:{state:false, description:"", path:null, }
                  }, 
                {
                  name:"장바구니로",
                  style:"btn btn_close",
                  on:{state:false, description:"", path:"/list"}
                }
              ]
            }
          /> 
        }          
        <div className="detail_area">
          <Img
            path={productList[params.id].img}
            description={productList[params.id].title}
          />
          <div className="option_wrap">
            <div className="info_box">
              <Text sort="strong" textType="title" description={productList[params.id].title}/>
              <Text sort="span" textType="price" description={`₩ ${productList[params.id].price * number}`}/>
            </div>
            <div className="option_area">
              <div className="btn_group">
              {productList[params.id].size.map((type, index)=>(
                <Button key={`${type}${index}`}
                  style={`btn btn_option ${selectSize===null ?"":(selectSize===type?"is_active":"")}`} 
                  name={type} 
                  btnType="button" 
                  item={type}
                  onClick={selectFunc}
                />))
              }
              </div>
            { 
              selectSize==null &&
              <Text description="사이즈를 선택해주세요" sort="p"/>
            }
            </div>
            <div className='count_area'>
              <div className='count_box'>
                <Text 
                  sort="span" 
                  description={number}
                />
                <div className='icon_box'>
                  <Icon 
                    iconName="plus" 
                    iconLabel="1개 추가버튼" 
                    onClick={() => {
                      numberFunc(number + 1)
                    }} 
                  />
                  <Icon 
                    iconName="minus" 
                    iconLabel="1개 삭제 버튼" 
                    onClick={()=>{
                      numberFunc(number>1?number-1:number)
                    }} 
                  />
                </div>
              </div>
            </div>
            <Text sort="p" description="수량을 선택해주세요." />
            <Button 
              name="추가"
              style={`btn btn_add btn_full`} 
              btnType="button" 
              onClick={()=>{
               if( selectSize!==null){
                saveProduct({item: productList[params.id], number, selectSize});
                popupFunc({state:true, description:"장바구니에 상품이 추가되었습니다."});
               }
              }}
              key={Math.random()*1000} 
              disabled={selectSize?false:"disabled"}
            />
            {
              selectSize===null&&           
              <Text sort="p" description="사이즈를 선택해주세요." />
            }
            <Button 
              itemInfo={{number, selectSize}}
              name="바로구매하기"
            style={`btn btn_full`} 
              btnType="button"
            />
                             
          </div>
        </div>  
      </div>
  );
}