
import './App.css';
import {useState } from 'react';
import Box from './components/Box'
import Rock from "./images/rock.svg"
import Scissors from "./images/scissors.svg"
import Papers from "./images/papers.svg"

const choice={
  rock: {
    name : "Rock",
    ob: Rock,
  },
  papers: {
    name: "Papers",
    ob: Papers,
  },
  scissors:{
    name: "Scissors",
    ob: Scissors,
  }
}

/* 
  1. 박스 2개 () 타이틀 + 사진 + 승패)
  2. 버튼 3개(가위, 바위, 보)
  3. user : 버튼 클릭시 클릭한 버튼의 값이 보임
  4. computer : 랜덤하게 아이템 선택이 된다.
  5. 3,4의 결과를 가지고 누가 이겼는지 승패를 따진다.
  6. 승패결과에 따라 테두리 색이 바뀐다. (win - 초록, lose - 빨강, tie - 검정)
*/

function App() {
  let count = 0;
  const [userSelect, setUserSelect] = useState(choice.rock);
  const [computerSelect, setComputerSelect] = useState(choice.rock);
  const [result, setResult] = useState("");
  const [reactCount, setReactCount] = useState(0);
  let userResult = "", computerResult = "";
  const play = (userChoice) => {
    count += 1;
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice], computerChoice))
    setReactCount(reactCount + 1);
    console.log("reactCount :" + reactCount, "count:" + count)
  };
  const judgement = (user, computer) =>{

    if (user.name === computer.name) {
      computerResult = "Tie"
    }else if (user.name === "Rock")
      computerResult = computer.name === "Scissors" ? "Lose" : "Win";
     else if (user.name === "Scissors")
      computerResult = computer.name === "Papers" ? "Lose" : "Win";
     else if (user.name === "Papers")
      computerResult = computer.name === "Rock" ? "Lose" : "Win";
     
     if(computerResult==="Tie"){
      userResult = "Tie"
     }else if (computerResult === "Win") {
      userResult = "Lose"
     } else if (computerResult === "Lose") {
      userResult = "Win"
    }
    return {userResult, computerResult}
     
  }
  const randomChoice = () =>{
    let itemArray = Object.keys(choice); // 객체에 키값만 뽑아서 배열로 만들어주는 함수
    let randomItem=parseInt((Math.random()) * itemArray.length);
    let final = itemArray[randomItem]
    return choice[final]
  }

  return (

    <div className="wrap">
      <h1>"가위바위보 게임"</h1>
      <div className='test_box'>
        <span className='test_desc'>{count}</span>
        <span className='test_desc'>{reactCount}</span>
      </div>
      <div className='game_board'>
        <Box user="You" item={userSelect} result={result.userResult}/>
        <Box user="Computer" item={computerSelect} result={result.computerResult} />
      </div>
      <div className='button_group'>
        <button className="btn_play btn_scissors" onClick={() => {play("scissors")}}></button>
        <button className="btn_play btn_rock" onClick={() => play("rock")}></button>
        <button className="btn_play btn_papers" onClick={() => play("papers")}></button>
      </div>
    </div>
  );
}

export default App;
