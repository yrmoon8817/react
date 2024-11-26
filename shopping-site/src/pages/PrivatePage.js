import React from "react";
import ProductDetail from './productDetail';
import { Navigate } from 'react-router-dom';
import MyListPage from './mylistPage';
import CustomerPage from './CustomerPage';

export default function PrivatePage({ authenticate, popupFunc, popupState, messageTxt, saveProduct, productList, path, updateLikeData, addressData }){
  return(
    <>
    {
      authenticate && path==="info"? 
      <MyListPage 
        popupState={popupState}
        messageTxt={messageTxt} 
        popupFunc={popupFunc}
        productList={productList}
        updateLikeData={updateLikeData}
        addressData={addressData}
      />:
      
      (authenticate && path!=="qna"?
      <ProductDetail
        productList={productList} 
        saveProduct={saveProduct} 
        popupFunc={popupFunc} 
        popupState={popupState} 
        messageTxt={messageTxt} 
      /> 
      : (
        authenticate && path==="qna"?
       <CustomerPage
        popupFunc={popupFunc} 
        popupState={popupState} 
        messageTxt={messageTxt} 
      />
      : <Navigate to="/login"/>))
    }
    </>
  );
}