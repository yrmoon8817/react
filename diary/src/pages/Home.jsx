import {useContext} from "react";
import DiaryList from "../components/DiaryList";
import { DiaryStateContext } from "../App";
import Header from "../components/Header";
import usePageTitle from "../hooks/usePageTitle";


export default function Home({onDecreaseMonth, onIncreaseMonth, pivotDate}) {
  const data = useContext(DiaryStateContext);
  usePageTitle(`감정 일기장`);
  return (
    <div className="wrap">
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`}
        classNameLeft={"prev"}
        classNameRight={"next"}
        leftButton = {onDecreaseMonth}
        rightButton = {onIncreaseMonth}
        buttonTextLeft={"<"}
        buttonTextRight={">"}
      />      
      <div className="home">
        <DiaryList data={data} />
      </div>
    </div>
  )
}

