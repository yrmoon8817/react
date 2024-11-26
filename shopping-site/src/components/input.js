import React, {useState, useRef} from "react";
import { Icon } from './icon';

export const Input = ({ item, onFunc, val, onChange })=>{
  const [checkFocus, setCheckFocus] = useState(false);
  const inputRef = useRef();
    return (
      <div 
        // 값이 들어오면 input_value 클래스 : clear 아이콘 opacity1로 변경
        // focus 되면 input_focus 클래스 : style 변경 
        className={`input_box${val!==null && val !=="" ? " input_value" : ""}${checkFocus?" input_focus":""}`}
        // tabIndex => div를 포커스 요소로 변환
        tabIndex={item.key}
        // focus되면 state true && 해당 inputRef에 포커스 => input_focus 클래스 추가됨
        onFocus={()=>{
          setCheckFocus(true);
          inputRef.current.focus();
        }}
        // blur 되면 state false => input_focus 클래스 제거
        onBlur={()=>{
          setCheckFocus(false);
        }}
      >
        <input 
          // input의 정보는 Login components에서 받아온다.
          type={item.type}
          className={`input_field ${item.style}`} 
          placeholder={item.guide}
          value = {val}
          onChange={onChange}
          ref={inputRef}
        />
        {/* 아이콘 클릭 이벤트로 input 상태 변경 => 변경된 값을 props로 받아온 함수에 넣어서 실행.*/}
      {
        item && item.sort === "password" && item.type==="text"?
        <Icon 
          // onFunc에 input 정보 전달. 
          iconName='view' 
          iconLabel="비밀번호 숨기기"
          onClick={() => {
            onFunc({ input: item, state: "view", val});
          }}
        />
      : (item && item.sort === "password" && item.type==="password"?
        <Icon 
          // onFunc에 input 정보 전달. 
          iconName='hidden' 
          iconLabel="비밀번호 보기"
          onClick={()=>{
           onFunc({ input: item, state: "hidden", val});
          }}
        />
        : (item && item.sort !== "password" && item.type==="text"?
        <Icon 
          // onFunc에 input 정보 전달. => value 값은 삭제하여 전달.
          iconName='clear' 
          iconLabel="삭제하기"
          onClick={()=>{
            onFunc({
              input: item,
              val:"",
            });
          }}
        />
      :""))
    }
    </div>
  )
}
