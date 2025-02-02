import {useContext} from "react";
import DiaryList from "../components/DiaryList";
import { DiaryStateContext } from "../App";


export default function Home() {
  const data = useContext(DiaryStateContext);

  return (
    <div className="home">
      <DiaryList data={data} />
    </div>
  )
}

