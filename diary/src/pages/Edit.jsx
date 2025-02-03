import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';
import Header from '../components/Header';
import useDiary from '../hooks/useDiary';
import usePageTitle from '../hooks/usePageTitle';


export default function Edit() {
  const {onDelete} = useContext(DiaryDispatchContext);
  const params = useParams();
  const curDiaryItem = useDiary(params.id)
  const nav = useNavigate();
  const onCheckDelete=()=>{
    if(window.confirm('일기를 삭제하겠습니까?')){
      onDelete(params.id);
      nav('/',{replace:true});
    }
  }
  usePageTitle(`${params.id}번 일기 수정`);
  const {onUpdate}=useContext(DiaryDispatchContext);
  const onSubmit=(input)=>{
    if(window.confirm('정말 수정하시겠어요?')){
      onUpdate(params.id, input.createdDate.getTime(), input.emotionID, input.content);
      nav('/', {replace:true});
    }
  };

  return (
    <div className='wrap'>
      <Header
        title={"일기 수정하기"}
        classNameLeft={"prev"}
        classNameRight={"delete"}
        type={"btn btn-fill-red"}
        leftButton = {()=>nav(-1)}
        rightButton = {onCheckDelete}
        buttonTextLeft={"<"}
        buttonTextRight={"삭제하기"}
      /> 
      <Editor id={params.id} initData={curDiaryItem} onSubmit={onSubmit}/>
    </div>
  )
}

