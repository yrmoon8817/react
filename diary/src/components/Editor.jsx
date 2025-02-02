import React, { useEffect, useState } from 'react';
import EmotionItem from './EmotionItem';
import { useNavigate } from 'react-router-dom';
import { emotionList } from '../util/constants';

const getStringedDate =(targetDate)=>{
  // 날짜 -> YYYY-MM-DD
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();
  if(month < 10){
    month = `0${month}`;
  }
  if(date<10){
    date=`0${date}`;
  }
  return `${year}-${month}-${date}`
}
export default function Editor({onSubmit, initData}) {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionID:'',
    content:""
  });
  useEffect(()=>{
    if(initData){
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate))
      })
    }
  },[initData])
  const onChangeInput=(e)=> {
    let name = e.target.name;
    let value = e.target.value;
    if(name === "createdDate"){
      value = new Date(value);
    }
    setInput({
      ...input,
      [name]:value
    })
  }
  const onClickSubmitButton = ()=>{
    onSubmit(input);
  }
  const nav = useNavigate();
  return (
    <div className='editor-area'>
      <div className='edit-box'>
        <h2 className='title'>오늘의 날짜</h2>
        <div className='content-box'>
          <input name="createdDate" onChange={onChangeInput} type="date" className='input-date' value={getStringedDate(input.createdDate)} />
        </div>
      </div>
      <div className='edit-box'>
        <h2 className='title'>오늘의 감정</h2>
        <div className='content-box emotion-box'>{
          emotionList.map((item)=><EmotionItem onClick={()=>{
            onChangeInput({
              target: {
                name:"emotionID",
                value: item.emotionID
              }
            })
          }} key={item.emotionID} emotionID={item.emotionID} emotionName={item.emotionName} isSelected={item.emotionID===input.emotionID}/>)
        }</div>
      </div>
      <div className='edit-box'>
        <h2 className='title'>오늘의 일기</h2>
        <div className='content-box'>
          <textarea className='input-textarea' name="content" value={input.content} onChange={onChangeInput} placeholder='오늘은 어땠나요?'></textarea>
        </div>
      </div>
      <div className='btn-box'>
        <button type="button" className='btn btn-fill-red btn-cancel' onClick={()=>{nav(-1)}}>취소하기</button>
        <button type="button" className='btn btn-fill-green btn-complete' onClick={onClickSubmitButton}>작성완료</button>
      </div>
    </div>
  )
}

