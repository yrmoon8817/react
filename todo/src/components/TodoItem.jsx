import React, {useState, memo } from 'react';

const TodoItem=({deleteFunc, stateFunc, item}) =>{
  const [checkValue, setCheckValue] = useState(item.isDone);

  return (
   <div className="item-box">
    <label className='input-label'>
      <input type="checkbox" className='input-checkbox' checked={checkValue} onChange={()=>(stateFunc(item.id),setCheckValue(!checkValue))}/>
    </label>
    <p className='item-title'>{item.title}</p>
    <span className="item-date">{item.date}</span>
    <button type="button" className='btn-delete' onClick={()=>{deleteFunc(item.id)}}>삭제</button>
  </div>
  )
}
// 고차컴포넌트 (HOC)
export default memo(TodoItem, (prevProps, nextProps) =>{
  // 반환값에 따라, Props의 변경 여부를 판단
  // T -> Props 가 그대로임 -> 리렌더링 X
  // F -> Props가 변경됨 -> 리렌더링 O

  if(prevProps.item.id !==nextProps.item.id) return false;
  if(prevProps.item.isDone !==nextProps.item.isDone) return false;
  if(prevProps.item.date !==nextProps.item.date) return false;
  if(prevProps.item.title !==nextProps.item.title) return false;
  return true;
})
