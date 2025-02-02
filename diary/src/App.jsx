import { useReducer, useState, useRef, createContext, useEffect} from 'react';
import './css/scss/diary.scss';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Edit from './pages/Edit';

const mockData = [
  {
    id:1,
    createdDate: new Date("2025-02-01").getTime(),
    emotionID:1,
    content:"1번 일기내용"
  },
  {
    id:2,
    createdDate: new Date("2025-01-25").getTime(),
    emotionID:2,
    content:"2번 일기내용"
  },
  {
    id:3,
    createdDate: new Date("2025-02-13").getTime(),
    emotionID:3,
    content:"3번 일기내용"
  },
]
function reducer (state, action){
  switch(action.type){
    case 'CREATE': return [action.data, ...state];
    case 'EDIT': return state.map((item)=>String(item.id)===String(action.data.id)?action.data:item);
    case 'DELETE': return state.filter((item)=>String(item.id)!==String(action.data.id));
    default: return state;
  }
}
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();
const getMonthlyDate = (pivotDate, data) =>{
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
  const [data, dispatch] = useReducer(reducer,mockData);
  const isRef = useRef(3);
  const [pivotDate, setPivotDate] = useState(new Date());
  const monthlyData = getMonthlyDate(pivotDate, data);
  const onIncreaseMonth=()=>{
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1));
  }
  const onDecreaseMonth=()=>{
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1));
  }
  // 새로운 일기 추가
  const onCreate = (createdDate, emotionID, content) =>{
    dispatch({
      type:"CREATE",
      data:{
        id:isRef.current++,
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
  useEffect(()=>{
  },[data])
  return (
    <div className='app'>
      <DiaryStateContext.Provider value={monthlyData}>
        <DiaryDispatchContext.Provider value={{onCreate, onDelete, onUpdate}}>
          <Header 
            title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`} 
            previousButton = {onDecreaseMonth}
            nextButton = {onIncreaseMonth}
          />
          <Routes>
            <Route path="/" element={<Home/>} />
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
