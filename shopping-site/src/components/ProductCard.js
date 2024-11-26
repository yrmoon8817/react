import React from "react";
import { Link } from "react-router-dom";
import { Img } from './img';
import { Text } from './Text';

export const ProductCard = ({item}) => {

  return (
      <Link className="pdt_box" to={`/product/${item.id}`}>
        <Img
          path={item.img}
          description={item.title}
          item={item}
        />
        <div className="text_wrap">
          <Text 
            sort="span"
            textType="title"
            description={item.title}
          />
          <Text 
            sort="span"
            textType="price"
            description={`₩ ${item.price}`}
          />
        </div>
    </Link>
  )
}
