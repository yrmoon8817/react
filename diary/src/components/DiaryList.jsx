import React, { useState } from 'react';
import Button from './Button'
import DiaryItem from './DiaryItem';
import { useNavigate } from 'react-router-dom';

export default function DiaryList({data}) {
  const [sort,setSort]=useState("latest");
  const nav = useNavigate();
  const moveFunc=()=>{
    nav(`/new`);
  }
  const onChangeSortType=(e)=>{
    setSort(e.target.value);
  }
  const getSortedData = () =>{
    return data.toSorted((a,b)=>{
      if(sort === 'oldest'){
        return a.createdDate - b.createdDate;
      }else {
        return b.createdDate - a.createdDate;
      }
    });
  }
  const sortedData = getSortedData();

  return (
    <div className='content'>
      <div className='util-box'>
        <div className='option-box'>
          <select onChange={onChangeSortType}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된 순</option>
          </select>
        </div>
        <Button text="새 일기쓰기" type={"btn btn-fill-green"} className={"new"} onFunc={moveFunc}/>
      </div>
      <ul className='list'>
        {
          sortedData.map((item)=>
            <li className='list-item' key={item.id}>
              <DiaryItem item={item} />
            </li>
          )
        }
      </ul>
    </div>
  )
}

