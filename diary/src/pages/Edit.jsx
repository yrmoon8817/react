import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';
import { useContext } from 'react';
import { DiaryDispatchContext, DiaryStateContext } from '../App';

export default function Edit() {
  const data = useContext(DiaryStateContext);
  const params = useParams();
  const [curDiaryItem, setCurDiaryItem]=useState()
  const nav = useNavigate();

  useEffect(()=>{
    const currentDiaryItem = data.find((item)=>String(item.id) === String(params.id));

    if(!currentDiaryItem){
      window.alert("존재하지 않는 일기 입니다.");
      nav("/", {replace:true});
    }
    setCurDiaryItem(currentDiaryItem);
  },[params.id]);
  const {onUpdate}=useContext(DiaryDispatchContext);
  const onSubmit=(input)=>{
    if(window.confirm('정말 수정하시겠어요?')){
      onUpdate(params.id, input.createdDate.getTime(), input.emotionID, input.content);
      nav('/', {replace:true});
    }
  };

  return (
    <div>
      {params.id}번 일기 수정페이지
      <Editor id={params.id} initData={curDiaryItem} onSubmit={onSubmit}/>
    </div>
  )
}

