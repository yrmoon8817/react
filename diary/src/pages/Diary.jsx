import  {useNavigate, useParams} from 'react-router-dom';
import Viewer from '../components/Viewer';
import Header from '../components/Header';
import useDiary from '../hooks/useDiary';
import { getStringedDate } from '../util/getStringedDate';
import usePageTitle from '../hooks/usePageTitle';

export default function Diary() {
  const params = useParams();
  const nav = useNavigate();
  const curDiaryItem = useDiary(params.id);
  usePageTitle(`${params.id}번 일기`);
  if(!curDiaryItem){
    return <div>데이터 로딩중 ...</div>
  }
  const {createdDate, emotionID, content} = curDiaryItem;
  const title = getStringedDate(new Date(createdDate));



  return (
    <div className='wrap'>
      <Header
        title={`${title} 기록`}
        classNameLeft={"prev"}
        leftButton = {()=>nav(-1)}
        rightButton = {()=>nav(`/edit/${params.id}`)}
        buttonTextLeft={"<"}
        buttonTextRight={"수정하기"}
        type={"btn btn-fill-blue"}
      /> 
      <div className='content-detail'>
        <Viewer createdDate={createdDate} emotionID={emotionID} content={content}/>
      </div>
    </div>
  )
}

