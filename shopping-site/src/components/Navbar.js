import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Input } from './input';
import { Button } from './Button';

export default function Navbar({ stateLogin, loginCheckFunc, searchFunc, searchUI, updateMoveFunc }) {
  const [inputOb, setInputOb] = useState({
    key:0,
    sort:"search",
    type:"text",
    val:null,
    focus:false,
    guide:"검색어를 입력하세요",
    style:"input_search",
    icon:"clear",
    stateIcon: "hide"
  });
  
  const onChangeInput = (item) => {
    if (item.val !== '' && item.val !== null) {
      setInputOb({...inputOb, "stateIcon":"show", "val":item.val});
    } else {
      setInputOb({ ...inputOb, "stateIcon": "hide", "val": item.val });
    }
  }

  const params=useLocation();
  if (params.pathname !== "/login" && params.pathname !== "/signup"){
    return (
      <header className="header">
        {/* stateLogin은 네비게이션에서는 text로 받아온다. 다른 페이지에서는 불리언 값으로 받아오기. */}
        <div className="util_area">
          <Link 
            to={stateLogin==="로그인"?"/login":"/"} onClick={()=>{
              if(stateLogin==="로그인"){
                loginCheckFunc({state:"login"});
                setInputOb({...inputOb, "val":"", "stateIcon":"hide"})
              }else if (stateLogin==="로그아웃"){
                loginCheckFunc({state:"logout"});
              }
            }}
            className='text_login'>
              <FontAwesomeIcon icon={faUser} className='ic_user'/>{stateLogin}
            </Link>
          </div>
          <div className="logo_area"><h1><Link to="/" className="logo"></Link></h1></div>
          <nav className="nav_bar">
            <ul className="list_menu">
            <li className="list_items"><Link to="/" className="list_link" onClick={updateMoveFunc}>Home</Link></li>
            <li className="list_items"><Link to="/top" className="list_link" onClick={updateMoveFunc}>Top</Link></li>
            <li className="list_items"><Link to="/pants" className="list_link" onClick={updateMoveFunc}>Pants</Link></li>
            <li className="list_items"><Link to="/list" className="list_link" onClick={()=>{
              setInputOb({ ...inputOb, "stateIcon": "hide", "val": "" })
            }}>장바구니</Link></li>
            <li className="list_items"><Link to="/info" className="list_link" onClick={()=>{
              setInputOb({ ...inputOb, "stateIcon": "hide", "val": "" })
            }}>My Info</Link></li>
            <li className="list_items"><Link to="/qna" className="list_link" onClick={()=>{
              setInputOb({ ...inputOb, "stateIcon": "hide", "val": "" })
            }}>고객센터</Link></li>
            </ul>
        {
          searchUI==="/top" || searchUI ==="/pants" || searchUI==="/" ?
          <div className="search_box">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="ic_search"/>
            <Input 
              item={inputOb}
              val={inputOb.val}
              onChange={(e)=>{
                onChangeInput({input:e, val:e.target.value})
              }}
              onFunc={onChangeInput}
            />
            <Button 
              name="검색"
              btnType="button" 
              style="btn btn_search" 
              onClick={()=>{
                searchFunc({ keywordTxt: inputOb.val, pathTxt:params.pathname})
              }} 
            />
          </div>:""
        }
        </nav>
      </header>)  
  } else if (params.pathname === "/login"){
    return (
      <header className="header">
       <div className="logo_area"><h1><Link to="/login" className="logo"></Link></h1></div>
      </header>
    )
  } else if (params.pathname === "/signup"){
    return(
    <header className="header">
      <div className="util_area">
        <Link
          to="/login"
          className='text_login'>
          <FontAwesomeIcon icon={faUser} className='ic_user' />로그인
        </Link>
      </div>
      <div className="logo_area"><h1><Link to="/login" className="logo"></Link></h1></div>
    </header>
    )
  }
}