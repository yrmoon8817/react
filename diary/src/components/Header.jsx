import { useLocation, useNavigate} from "react-router-dom";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

export default function Header(props) {
  const path= useLocation();
  const [currDiary, setCurrDiary]=useState(); 
  const nav = useNavigate();
  const {onDelete}=useContext(DiaryDispatchContext);
  const data=useContext(DiaryStateContext);
  const checkDiary = ()=>{
    if(path.pathname.includes('/diary')){
      const diaryNum = new Date(data.filter((item)=>String(item.id)===String(path.pathname.split('/diary/')[1]))[0]?.createdDate);
        let year = diaryNum.getFullYear();
        let month = diaryNum.getMonth() + 1;
        let date = diaryNum.getDate();
        if(month < 10){
          month = `0${month}`;
        }
        if(date<10){
          date=`0${date}`;
        }
        return `${year}-${month}-${date}`
    }
  }
  useEffect(()=>{
    setCurrDiary(checkDiary())
  },[])
  const onCheckDelete=()=>{
    if(window.confirm('일기를 삭제하겠습니까?')){
      let deleteNumber = path.pathname.split('/edit/')[1];
      onDelete(deleteNumber);
      nav('/',{replace:true});
    }
  }
  const backFunc = ()=>{
    nav(-1);
  }
  return (
    <div className="header">
      <Button text={'<'} onFunc={path.pathname==='/'?props.previousButton:backFunc} className={'prev'}/>
      <h1 className="title">{path.pathname==='/'?props.title : path.pathname.includes('/edit')? "일기 수정하기" : path.pathname.includes('/diary')? `${currDiary&&currDiary} 기록`:'새 일기 쓰기'}</h1>
      {
        path.pathname==='/'?
        <Button text={'>'} onFunc={props.nextButton} className={'next'}/>
        :path.pathname.includes('/edit')
        ?<Button text={'삭제하기'} className={'delete'} type={"btn btn-fill-red"} onFunc={onCheckDelete}/>
        :path.pathname.includes('/diary')?<Button text={'수정하기'} className={'edit'} type={"btn btn-fill-blue"} onFunc={()=>{}}/>
        :''
      }
    </div>
  )
}

