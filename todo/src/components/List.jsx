import React, { useEffect, useState, useMemo } from 'react';
import TodoItem from './TodoItem';

export default function List({list, deleteFunc, itemState, stateFunc}) {
  const [search, setSearch]=useState('');
  const [currentList, setCurrentList]=useState([]);
  const [tooltip, setTooltip]=useState(false);

  const keywordFunc = (keyword)=>{
    if(keyword.trim()!==''){
      const filterList = list.filter((item)=>{if(item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())){ return item;}});
      if(!filterList || !filterList.length){
        setTooltip(true);
        return setCurrentList([]);
      }
      setTooltip(false);
      return setCurrentList([...filterList]);
    }else if(keyword===''){
      setTooltip(false);
      return setCurrentList([]);
    }
  }
  useEffect(()=>{
    search && keywordFunc(search);
  },[search]);

  const {totalCount,doneCount,notDoneCount}=useMemo(()=>{
    const totalCount = list.length;
    const doneCount = list.filter((todo)=>todo.isDone).length;
    const notDoneCount = totalCount - doneCount;
    
    return {totalCount,doneCount,notDoneCount}
  },[list])
  // 의존성배열: deps
  return (
    <div className='list'>
      <h2 className='list-title'>* Todo List</h2>
      <span className='list-count'>{`📌 진행현황 : ${notDoneCount} / ${totalCount}
      📌 완료 : ${doneCount}`}</span>
      <div className="search-box">
        {
          tooltip
          ? <div className='tooltip'>※ 키워드와 일치하는 결과가 없습니다.</div>
          : ''
        }
        <label className='input-label'>
          <input 
            type="text" 
            placeholder='검색어를 입력하세요.' 
            className='input-text' 
            value={search} 
            onChange={(e)=>{
              const val = e.target.value.trim();
              setSearch(val);
              keywordFunc(val);
            }}/>
        </label>
      </div>
      <ul className="todo-list">
        {
        !itemState
        ? (currentList&&currentList.length
          ? currentList.map((item, idx)=>{
          return <li key={idx} className="list-item">
            <TodoItem item={item} deleteFunc={deleteFunc} stateFunc={stateFunc}/>
          </li>
         })
         : list.map((item, idx)=>{
          return <li key={idx} className="list-item">
            <TodoItem item={item} deleteFunc={deleteFunc} stateFunc={stateFunc}/>
          </li>
         })
        )
        : <li className='empty'>내역이 없습니다.</li>
      }
      </ul>
    </div>
  )
}

