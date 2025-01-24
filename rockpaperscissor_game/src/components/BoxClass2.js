
import React, { Component } from 'react';

export default class BoxClass extends Component {
  constructor(){
    super();
    this.result="";
    this.state={
      reactCount:0
    }
  }
  getResult=()=>{
    if(
      this.props.user === "Computer" &&
      this.props.result !== "Tie" &&
      this.props.result !== ""
    ){
      //카드가 computer 카드인가? && 결과가 비긴건아닌가? && this.props.result에 값이 있는가?
      this.result = this.props.result === "Win"? "Lose" :"Win";
    }else{
      //위의 경우가 아니라면 this.props 로 전달된 결과를 그대로 쓴다.
      this.result = this.props.result;
    }
    return this.result;
  };

  render() {
    this.getResult();
    return (
      <div key={this.props.result + this.state.reactCount++} className={`game_box is_${this.result}`}>
        <strong className="game_user">{this.props.user}</strong>
        <img src={this.props.item && this.props.item.img} alt="이미지"/>
        <strong className="game_result" animation={this.result}>{this.result}</strong>
      </div>
    )
  }
}