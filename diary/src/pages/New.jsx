import React from "react"
import Editor from "../components/Editor"
import { useContext } from "react"
import { DiaryDispatchContext } from "../App"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import usePageTitle from "../hooks/usePageTitle"

export default function New() {
  const nav = useNavigate();
  const {onCreate} = useContext(DiaryDispatchContext);
  const onSubmit = (input)=>{
    onCreate(input.createdDate.getTime(), input.emotionID, input.content);
    nav('/',{replace:true});
  }
  usePageTitle("새 일기 쓰기");

  return (
    <div className="wrap">
      <Header 
        title={"새 일기 쓰기"}
        classNameLeft={"prev"}
        buttonTextLeft={"<"}
        leftButton = {()=>nav(-1)}
      />
      <div className="new">
        <Editor onSubmit={onSubmit} />
      </div>
    </div>
  )
}

