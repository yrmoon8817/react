import React from "react";
import { Link } from "react-router-dom";
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { Img } from '../components/img';
export default function List({ list, deleteFunc}) {
  return (
    <div className='inner'>
      <h1>내 장바구니</h1>
        {
          // 장바구니 리스트가 null이면 안내텍스트 띄우기
          list === null || list.length===0? 
          <>
            <Text textType="guide" description={`장바구니에 담긴 상품이 없습니다.`} sort="p"/>
            <Text textType="guide" description={`상품상세 페이지에서 상품을 추가해주세요.`} sort="p"/>
          </>
          :<ul className='list_pdt'>{
            list.map((item)=>(
            <li className="list_item" key={item.key}>
              <Link to={`/product/${item[0].id}`}>
              <Img
                imgName="thumb_img"
                path={item[0].img}
                description={item[0].title}
              />
              <div className="text_wrap">
                  <Text textType="title" description={item[0].title} sort="p"/>
                <div className='text_area'>
                    <Text textType="price" description={item.number > 1 ? `가격 : ${item[0].price * item.number}`:`가격 : ${item[0].price}`}  sort="strong"/>
                  {
                    item.number>1?
                    <Text textType="price" description={`( ${item.number}개 * ${item[0].price} )`} sort="strong"/>:""
                  }
                    <Text textType="price" description={`사이즈 : ${item.size}`} sort="strong"/>
                </div>
              </div>
            </Link>
            {/* 상품지우기 버튼 */}
            <Button 
              btnType="button"
              style="btn_icon btn_delete"
              onClick={deleteFunc}
              item={item}
            />
          </li>
        ))}
      </ul>
    }       
    </div>
  );
}