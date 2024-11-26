import './css/style.scss'
import {useEffect, useState} from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import Main from './pages/main';
import useAuth from './components/useAuth.js';
import Login from './pages/login';
import Navbar from './components/Navbar';
import List from './pages/list';
import PrivatePage from './pages/PrivatePage.js';
import SignUp from './pages/signup';

const PAGE_CLASSES = {
  LOGIN: 'page-login',
  LIST: 'page-list',
  PRODUCT: 'page-product',
  MYINFO: 'page-myinfo',
  SIGNUP: 'page-signup',
  DETAIL: 'page-detail'
}

function App() {
  // 현재페이지체크
  const paths=useLocation();
  // 로그인 체크
  const {authenticate, btnText, loginCheckFunc} = useAuth();
  // 페이지 클래스 업데이트 변수
  const [urlPath, setClassName] = useState(PAGE_CLASSES.PRODUCT);
  // 상품 리스트
  const [productList, setProductList] = useState([]);
  // 장바구니 목록
  const [savePdt, setSavePdt] = useState(null);
  // 팝업열림상태
  const [popupState, setPopupState]=useState(false);
  // 팝업 메시지
  const [messageTxt,setMessageTxt] = useState('');
  // 검색
  const [searchList, setSearchList]=useState([]);
  //관심 상품목록
  const [likeList, setLikeList] = useState(null);
  const [addressData, setAddressData] = useState();
  // 현재경로(/top,/pants,/)로 재이동시 검색결과리셋을 위한 state
  const [move, setMove]=useState(0);
  
  const updateMoveFunc=()=>{
    setMove(move+1);
  }
  const updateLikeData= (icon)=>{
    setProductList(prevList=>{
      const updatedList = prevList.map((item)=>{
        if(item.id === icon.item.id){
          return {
            ...item,
            like:{
              name:icon.name,
              state: icon.state
            }
          }
        }else{
          return item;
        }
    });
    if(!icon.state){
      const updateLikeList=likeList.filter(i=> i.id!==icon.id);
      setLikeList(updateLikeList.length>0?updateLikeList:null);
    }else {
      setLikeList(likeList!==null?[...likeList, icon.item]:[icon.item]);
    }
    return updatedList;
  });
}
  //회원가입 정보 등록함수
  const userDataFunc=()=>{}
  // 주소 받아오기
  // const getAddressDatas=async()=>{
  //   let url = `https://bluemoon817.github.io/fileInfo/json/db.json`;
  // }

  // 상품리스트 받아오기
  const getProducts = async () => {
    let url = `https://bluemoon817.github.io/fileInfo/json/db.json`;
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data.products);
  }

  // 장바구니 목록 업데이트 함수
  const saveProduct = (item, name) => {
    // 다차배열을 사용해서 item이 아닌 list에 고유의 key값을 넣어준다.
    //[ [{item}, key], [{item}, key], [{item}, key], [{item}, key] ]
    setSavePdt(function(){
      let save = savePdt ? [...savePdt, [item.item]] : [[item.item]];
      save[save.length-1].key = Math.random()*1000;
      if (item.number){
        save[save.length - 1].number = item.number;
        save[save.length - 1].price = item.number * item.item.price;
      }
      if (item.selectSize){
        save[save.length - 1].size = item.selectSize;
      }
      if(name==="추가"){
        popupFunc(name);
      }
    return [...save]})
  }
  
  // 장바구니 목록 삭제
  const deleteFunc=(item)=>{
    setSavePdt(savePdt.filter(i=> i.key!==item.key))
  }
  
  // 팝업 상태 업데이트함수
  const popupFunc=(popup)=>{
    setMessageTxt(popup.description);
    setPopupState(popup.state);
  } 
  
  // 상품 받아오기 : 페이지 처음 렌더링시 한번만 실행
  useEffect(() => {
    getProducts();
  }, []);
  
  // 검색 : 모든 상품은 productList로부터 관리되어야 한다. 
  // 상품데이터를 나눠서 관리하면 검색마다 나오는 상품들이 같은 상품인데 고유의 상품인 것처럼 별도로 관리되어버리기 때문에... 
  // 좋아요버튼이나, 상품 추가부분에서 이슈가 생긴다. 
  const searchFunc=(ob)=>{
    let pathStr;
    ob.pathTxt.length > 1 ? pathStr=ob.pathTxt.substr(1, ob.pathTxt.length - 1) : pathStr = "/";

    if (ob.keywordTxt === null && pathStr!=="/"){
      // 카테고리로만 필터링
      const newArr = productList.filter(item => item.type === pathStr);
      setSearchList(newArr);
    } else if (ob.keywordTxt !== null && pathStr !== "/") {
      //카테고리 검색 && 키워드 검색
      const newArr = productList.filter(item => item.type === pathStr && item.title.indexOf(ob.keywordTxt) !== -1);
      setSearchList(newArr.length === 0 ? "검색결과가 없습니다." : newArr);
    } else if (ob.keywordTxt === null && pathStr=== "/"){
      // 모든 상품 노출
      setSearchList(productList);
    } else if (ob.keywordTxt !== null && pathStr === "/"){
      // 전체 상품에서 키워드 검색
      const newArr = productList.filter(item =>item.title.indexOf(ob.keywordTxt) !== -1);
      setSearchList(newArr.length === 0 ? "검색결과가 없습니다." : newArr);
    } else if (pathStr !== "/" && pathStr !=="pants" && pathStr!=="top"){
      // 검색 가능한 페이지가 아니면 검색리스트 초기화
      setSearchList([]);
    }
  }  
  // 페이지 이동시 페이지 클래스변경, 검색내용 초기화
  useEffect(()=>{
    switch (paths.pathname){
      case '/login' :
        setClassName(PAGE_CLASSES.LOGIN);
        break;
      case '/list' : 
        setClassName(PAGE_CLASSES.LIST);
        break;
      case '/' : 
      case '/pants' : 
      case '/top' : 
        setClassName(PAGE_CLASSES.PRODUCT);
        searchFunc({keywordTxt:null, pathTxt: paths.pathname});
        break;
      case '/info' :
        setClassName(PAGE_CLASSES.MYINFO);
        break;
      case '/signup' :
        setClassName(PAGE_CLASSES.SIGNUP);
        break;
      default : 
        setClassName(PAGE_CLASSES.DETAIL);
        break;
    }
  }, [paths.pathname, move, productList]);

  return (
    <div className={`wrap ${urlPath}`}>
      <Navbar  
        stateLogin={btnText}
        loginCheckFunc={loginCheckFunc}
        searchFunc={searchFunc}
        searchUI={paths.pathname}
        updateMoveFunc={updateMoveFunc}
      ></Navbar>
      <div className='content'>
      <Routes>
        <Route 
          path="/"
          element={
            <Main 
              productList={searchList.length!==0?searchList : productList}
              updateLikeData={updateLikeData}
              authenticate={authenticate}
            />
          } 
        />
        <Route 
          path="/pants"
          element={
            <Main 
              productList={searchList.length!==0?searchList : productList}
              updateLikeData={updateLikeData}
              authenticate={authenticate}
            />
          } 
        />
        <Route 
          path="/top"
          element={
            <Main 
              productList={searchList.length!==0?searchList : productList}
              updateLikeData={updateLikeData}
              authenticate={authenticate}
            />
          } 
        />
        <Route 
          path="/list" 
          element={
            <List 
              list={savePdt} 
              saveProduct={saveProduct} 
              deleteFunc={deleteFunc} 
            />
          } 
        />
        <Route 
          path="/login" 
          element={ 
            <Login 
              stateLogin={authenticate}
              loginCheckFunc={loginCheckFunc} 
            /> 
          } 
        />
        <Route 
          path="/signup" 
          element={ 
            <SignUp userDataFunc={userDataFunc}/> 
          } 
        />
        <Route 
          path={`/product/:id`} 
          element={
            <PrivatePage 
              authenticate={authenticate} 
              popupState={popupState} 
              messageTxt={messageTxt} 
              popupFunc={popupFunc}
              productList={productList}
              saveProduct={saveProduct}
              path="product/:id"
            /> 
          }
        />
        <Route 
          path={`/info`} 
          element={
            <PrivatePage
              authenticate={authenticate} 
              popupState={popupState} 
              messageTxt={messageTxt} 
              popupFunc={popupFunc}
              updateLikeData={updateLikeData}
              productList={likeList}
              addressData={addressData}
              path="info"
            /> 
          }
        />
        <Route 
          path={`/qna`} 
          element={
            <PrivatePage
              authenticate={authenticate} 
              popupState={popupState} 
              messageTxt={messageTxt} 
              popupFunc={popupFunc}
              path="qna"
            /> 
          }
        />
      </Routes> 
      </div>
    </div>
  );
}

export default App;
