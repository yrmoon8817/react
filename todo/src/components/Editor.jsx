import React, {useState } from 'react';

export default function Editor({addFunc}) {
  const [input, setInput]=useState('');
  return (
    <div className='editor'>
      <div className="edit-box">
        <label className='input-label'>
          <input type="text" placeholder='Add Todo' className='input-text' value={input} onChange={(e)=>{setInput(e.target.value)}}/>
        </label>
        <button className='btn-add' onClick={()=>{
          if(input.trim()==''){setInput(''); return false;}
          const currentTime = new Date();
          addFunc({title:input&&input.trim(), date:`${currentTime.getFullYear()}.${currentTime.getMonth()+1}.${currentTime.getDate()}`})
          setInput('')
        }}>추가</button>
      </div>
    </div>
  )
}

