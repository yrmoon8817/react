import React from 'react';
import {getEmotionImage} from '../util/get-emotion-image';

export default function EmotionItem({emotionID, emotionName, isSelected, onClick}) {
  return (
    <div onClick={onClick} className={`emotion-wrap${isSelected? ` emotion-wrap-${emotionID}`:""}`}>
      <div className='img-box'>
        <img src={getEmotionImage(emotionID)} alt="" />
      </div>
      <span className='emotion-name'>{emotionName}</span>
    </div>
  )
}

