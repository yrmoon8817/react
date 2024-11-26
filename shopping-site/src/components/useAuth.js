import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useAuth() {
  const [authenticate, setAuthenticate] = useState(false);
  const [btnText, setBtnText] = useState('로그인');
  const navigate = useNavigate();
  const paths = useLocation();
  // 로그인 안되어있으면 로그인페이지로 무조건 이동
  useEffect(()=>{
    if(!authenticate && paths.pathname !== '/login' && paths.pathname !== '/signup'){
      navigate('/login');
    }
  }, [paths, authenticate, navigate]);
  // 로그인 체크 
  const loginCheckFunc = (login) => {
    if(login.state==='login'){
      setAuthenticate(true);
      setBtnText('로그아웃');
      if(login.path){
        navigate(login.path);
      }
    }else if(login.state === 'logout'){
      setAuthenticate(false);
      setBtnText('로그인');
    } 
  }
  return {authenticate, btnText, loginCheckFunc};
}