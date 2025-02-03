import React from 'react';
import { getEmotionImage } from '../util/get-emotion-image';
import { emotionList } from '../util/constants';


export default function Viewer({emotionID, content, createdDate}) {
  const emotionItem = emotionList.find((item)=>String(item.emotionID)===String(emotionID))
  return (
    <div className='viewer'>
      <div className='detail-box'>
        <h2 className='title'>오늘의 감정</h2>
        <div className={`img-box img-box-${emotionID}`}>
          <img src={getEmotionImage(emotionID)} alt="" />
          <span className='emotion-name'>{emotionItem.emotionName}</span>
        </div>
      </div>
      <div className='detail-box'>
        <h2 className='title'>오늘의 일기</h2>
        <div className='diary-text'>
          <p className='desc'>{content}</p>
        </div>
      </div>
    </div>
  )
}

