import React from "react";

export const Button = ({ btnType, style, name, onClick, item, disabled}) => {

  return (
      <button 
        type={btnType} 
        className={`${style}`}
        disabled={disabled}
        onClick={
          () => { return item ? onClick(item, name) : onClick()}
        }
      >{name&&name}</button>
  )
}
