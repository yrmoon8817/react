import React from "react";
import { Icon } from './icon';
import { Text } from './Text';

export const ListField = ({onClick, src}) => {
  return(
    <div className='list_item'
      area-label={`${src.title} 수정하기`}
      onClick={onClick}
      >
      <div className='text_wrap'>
        <Text sort="strong" description={src.title} />
        { src.description&&<Text sort="span" description={src.description}/> }
      </div>
      <Icon iconName="arrow"/>
    </div>
  );
}
