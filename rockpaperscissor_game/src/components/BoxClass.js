import React, { Component } from 'react'

export default class BoxClass extends Component {
  render() {
    return (
      <div className={"game_box is_" + this.props.result}>
        <strong className="game_user">{this.props.user}</strong>
        <img src={this.props.item}  alt="이미지"/>
        <strong className="game_result">{this.props.result}</strong>
      </div>
    )
  }
}