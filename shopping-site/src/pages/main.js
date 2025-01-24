import React from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { Text } from '../components/Text';
import { Icon } from '../components/icon';
export default function Main({ productList, saveProduct, updateLikeData,authenticate }){
  const navigate=useNavigate();
  return(
        <div className='inner'>
          <div className="product_area">
            <ul className="product_list">
              {
              typeof productList === "string"?
              <Text sort="p" description={productList}/>
              :
              productList.map((menu) => (
                <li className="list_item" key={menu.id}>
                  <ProductCard 
                    item={menu} 
                    saveProduct={saveProduct}
                  />
                  <Icon 
                    iconName={menu.like.name}
                    iconLabel={menu.like.state?"관심상품 취소하기":"관심상품으로 등록하기"}
                    onClick={()=>{
                      if (authenticate){
                        if(menu.like.state){
                        updateLikeData({
                            item:menu,
                            id:menu.id,
                            state:false,
                            name:"heart"
                          })
                        }else if(!menu.like.state){
                         updateLikeData({
                            item:menu,
                            id:menu.id,
                            state:true,
                            name:"heart_filled"
                          });
                        }
                      }else {
                        navigate('/login');
                      }
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
  );
}