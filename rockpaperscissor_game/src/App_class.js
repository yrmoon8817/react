import React, {Component} from "react";
import './App.css';
import BoxClass from "./components/BoxClass.js"
import Rock from "./images/rock.svg"
import Scissors from "./images/scissors.svg"
import Papers from "./images/papers.svg"

export default class AppClass extends Component {

  constructor(props) {
    super(props);
    this.count=0;
    this.userResult = "";
    this.computerResult = "";
    this.choice = {
      rock: {
        name: "Rock",
        img: Rock
      },
      papers: {
        name: "Papers",
        img: Papers,
      },
      scissors: {
        name: "Scissors",
        img: Scissors
      }
    };
    this.itemArray = Object.keys(this.choice);
    this.randomItem = "";
    this.final = "";
    this.ob={};
    this.state={
      reactCount:0,
    }
  }
  play = (userChoice) => {
    this.randomChoice();
    this.setState(
      { 
        reactCount :this.state.reactCount +1,
        userSelected: this.choice[userChoice],
        gameResult: this.judgement(this.choice[userChoice], this.computerChoice), 
      });
      console.log("reactCount :" + this.state.reactCount, "count:" + this.count);
  };
  randomChoice = () => {
    this.randomItem = parseInt((Math.random()) * this.itemArray.length);
    this.final = this.itemArray[this.randomItem];
    return this.computerChoice= this.choice[this.final];
  }
  judgement = (user, computer) => {
    if (user.name === computer.name) {
      this.computerResult = "Tie"
    } else if (user.name === "Rock")
      this.computerResult = computer.name === "Scissors" ? "Lose" : "Win";
    else if (user.name === "Scissors")
      this.computerResult = computer.name === "Papers" ? "Lose" : "Win";
    else if (user.name === "Papers")
      this.computerResult = computer.name === "Rock" ? "Lose" : "Win";

    if (this.computerResult === "Tie") {
      this.userResult = "Tie"
    } else if (this.computerResult === "Win") {
      this.userResult = "Lose"
    } else if (this.computerResult === "Lose") {
      this.userResult = "Win"
    }
    this.computerSelected = computer.img
    this.userSelected = user.img
    this.ob = { userResult: this.userResult, computerResult: this.computerResult, userSelected: this.userSelected, computerSelected: this.computerSelected }
    return this.ob
  }
  render(){
    return(
      <div className="wrap">
        <h1>"가위바위보 게임"</h1>
        <div className='game_board'>
          <BoxClass user="You" item={this.userSelected} result={this.userResult} />
          <BoxClass user="Computer" item={this.ob.computerSelected} result={this.computerResult} />
        </div>
        <div className='button_group'>
          <button className="btn_play btn_scissors" onClick={() => this.play("scissors")}></button>
          <button className="btn_play btn_rock" onClick={() => this.play("rock")}></button>
          <button className="btn_play btn_papers" onClick={() => this.play("papers")}></button>
        </div>
      </div>
    )
  }
}