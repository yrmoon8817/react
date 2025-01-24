import React from "react";

export const Icon = ({iconName, iconLabel, onClick, text}) => {
  return (
    <span 
      className={`ic ic_${iconName}`} 
      aria-label={iconLabel && iconLabel} 
      onClick={onClick && onClick}
    >{text && text}</span>
  )
}
