import React from "react";
import { Icon } from './icon';

export const Img = ({imgName, description, path, item}) => {
  return(
    <div className={`img_wrap ${imgName&&imgName}`}>
      <img src={path} alt={description}/>
      {item&&item.new && <Icon iconName="badge" text="New"/>}
    </div>
  );
}
