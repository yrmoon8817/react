import React from "react";
import '../App.css';
const Box = (props) =>{
  return (
    <div className={"game_box is_" + props.result}>
      <strong className="game_user">{props.user}</strong>
      <img src={props.item && props.item.ob} alt="이미지 설명"/>
      <strong className="game_result">{props.result}</strong>
    </div>
  )
}


export default Box;