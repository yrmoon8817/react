import React from 'react';
import Button from './Button';
import {getEmotionImage} from "../util/get-emotion-image"
import { useNavigate } from 'react-router-dom';

export default function DiaryItem({item}) {
  const nav = useNavigate();
  const moveFunc = ()=>{
    nav(`/edit/${item.id}`)
  }
  return (
    <div className='diary-item-box'>
      <div 
        className={`thumbnail thumbnail-${item.emotionID}`}
        onClick={()=>nav(`/diary/${item.id}`)}
      >
        <img src={getEmotionImage(item.emotionID)} alt="" />
      </div>
      <div className='info-box'>
        <strong className='info-title' onClick={()=>nav(`/diary/${item.id}`)}>{item.content}</strong>
        <span className='date'>{new Date(item.createdDate).toLocaleDateString()}</span>
        <Button type={"btn btn-fill-yellow"} className={"edit"} text={"수정하기"} onFunc={moveFunc}/>
      </div>
    </div>
  )
}

