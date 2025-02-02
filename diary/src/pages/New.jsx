import React from "react"
import Editor from "../components/Editor"
import { useContext } from "react"
import { DiaryDispatchContext } from "../App"
import { useNavigate } from "react-router-dom"

export default function New() {
  const nav = useNavigate();
  const {onCreate} = useContext(DiaryDispatchContext);
  const onSubmit = (input)=>{
    onCreate(input.createdDate.getTime(), input.emotionID, input.content);
    nav('/',{replace:true});
  }
  return (
    <div className="new">
      <Editor onSubmit={onSubmit} />
    </div>
  )
}

