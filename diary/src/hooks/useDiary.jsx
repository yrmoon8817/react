import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import { useNavigate } from 'react-router-dom';

export default function useDiary(id) {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem]=useState();
  const nav = useNavigate();
  useEffect(()=>{
    const currentDiaryItem = data.find((item)=>String(item.id) === String(id));

    if(!currentDiaryItem){
      window.alert("존재하지 않는 일기 입니다.");
      nav("/", {replace:true});
    }
    setCurDiaryItem(currentDiaryItem);
  },[id]);  
  return curDiaryItem;
}

