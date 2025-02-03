import { useReducer, useState, useRef, createContext, useEffect} from 'react';
import './css/scss/diary.scss';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import NotFound from './pages/NotFound';
import {Route, Routes } from 'react-router-dom';
import Edit from './pages/Edit';


function reducer (state, action){
  let nextState;

  switch(action.type){
    case 'INIT':{
      return action.data;
    }
    case 'CREATE': {
      nextState=[action.data, ...state];
      break;
    } 
    case 'EDIT': 
    {
      nextState=state.map((item)=>String(item.id)===String(action.data.id)?action.data:item);
      break;
    }
    case 'DELETE': {
      nextState = state.filter((item)=>String(item.id)!==String(action.data.id));
      break;
    }
    default: {
      nextState=state;
    } 
  }
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();
export const getMonthlyDate = (pivotDate, data) =>{
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth()+1,
    0,
    23,
    59,
    59
  ).getTime();
  return data.filter((item)=> beginTime <=item.createdDate && item.createdDate <=endTime);
}
// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세하게 조회하는 Diary 페이지
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer,[]);
  const idRef = useRef(0);
  const [pivotDate, setPivotDate] = useState(new Date());
  const monthlyData = getMonthlyDate(pivotDate, data);

  useEffect(()=>{
    const storedData = localStorage.getItem("diary");
    if(!storedData) {
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(storedData);
    if(!Array.isArray(parsedData)){
      setIsLoading(false);
      return
    }
    let maxId = 0;
    parsedData.forEach((item)=>{
      if(Number(item.id)>maxId){
        maxId = Number(item.id);
      }
    })
    idRef.current = maxId+1
    dispatch({
      type:"INIT",
      data:parsedData
    });
    setIsLoading(false);
  },[])
  // 새로운 일기 추가
  const onCreate = (createdDate, emotionID, content) =>{
    dispatch({
      type:"CREATE",
      data:{
        id:idRef.current++,
        createdDate,
        emotionID,
        content,
      }
    });
  }
  // 기존의 일기 수정
  const onUpdate=(id,createdDate, emotionID, content)=>{
    dispatch({
      type:"EDIT",
      data:{
        id,
        createdDate,
        emotionID,
        content,
      }
    });
  }
  // 기존 일기 삭제
  const onDelete=(id)=>{
    dispatch({
      type:"DELETE",
      data:{id}
    });
  }
  const onIncreaseMonth=()=>{
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1));
  }
  const onDecreaseMonth=()=>{
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1));
  }
  if(isLoading){
    return <div>데이터 로딩 중입니다~~</div>
  }
  return (
    <div className='app'>
      <DiaryStateContext.Provider value={monthlyData}>
        <DiaryDispatchContext.Provider value={{onCreate, onDelete, onUpdate}}>
          <Routes>
            <Route path="/" 
                element={<Home onIncreaseMonth={onIncreaseMonth} onDecreaseMonth={onDecreaseMonth}pivotDate={pivotDate} />} />
            <Route path="/new" element={<New/>} />
            <Route path="/diary/:id" element={<Diary/>} />
            <Route path="/edit/:id" element={<Edit/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </div>
  )
}

export default App
