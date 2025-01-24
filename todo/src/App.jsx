import { useEffect, useReducer, useRef, useState } from 'react';
import './App.css';
import Editor from './components/Editor';
import Header from './components/Header';
import List from './components/List';

const mockData=[
  {
    id:0,
    isDone:false,
    title:"React 공부",
    date:"2025.01.20",
  },
  {
    id:1,
    isDone:true,
    title:"업무진행",
    date:"2025.01.11",
  },
  {
    id:2,
    isDone:false,
    title:"밥먹기",
    date:"2025.01.01",
  },
]
function reducer (state, action) {
  switch (action.type){
    case "add" : 
      return [...state,action.item]; 
    case "delete" : 
      return state.filter((todo)=> todo.id !== action.id);
    case "changeCheck" : 
      return state.map((todo)=>todo.id===action.id?{...todo, isDone:!action.isDone}:todo)
  }
}
function App() {
  const [todoList, dispatch]=useReducer(reducer, mockData);
  const ref = useRef(mockData.length);
  const [empty, setEmpty] = useState(!todoList);



  // 아이템 추가
  const addFunc = (data)=>{
    dispatch({
      type:'add',
      item:{
        ...data,
        isDone:false,
        id:ref.current++
      }
    })
  }
  // 아이템 삭제
  const deleteFunc=(id)=>{
    console.log(id)
    dispatch({
      type:'delete',
      id:id
    });
  }
  // 아이템 상태변경 
  const stateFunc = (id) =>{
    console.log(id)
    dispatch({
      type:'changeCheck',
      id:id
    })
  }
  useEffect(()=>{
    todoList.length===0?setEmpty(true):setEmpty(false)
  }, [todoList])
  return (
    <div className='app'>
      <Header></Header>
      <Editor addFunc={addFunc}></Editor>
      <List list={todoList}  deleteFunc={deleteFunc} stateFunc={stateFunc} itemState={empty}></List>
    </div>
  )
}

export default App
