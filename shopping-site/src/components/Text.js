import React from "react";

export const Text = ({sort, textType, description}) => {
  if(sort === "p"){
    return (<p className={`text_desc${textType?` text_${textType}`:""}`}>{description}</p>);
  }else if(sort === "strong"){
    return (<strong className={`text_desc ${textType?` text_${textType}`:""}`}>{description}</strong>)
  }else if(sort === "span"){
    return (<span className={`text_desc ${textType?` text_${textType}`:""}`}>{description}</span>)
  }else if(sort === "h1"){
    return (<h1 className={`title_xlarge ${textType?` text_${textType}`:""}`}>{description}</h1>)
  }else if(sort === "h2"){
    return (<h2 className={`title_large ${textType?` text_${textType}`:""}`}>{description}</h2>)
  }else if(sort === "h3"){
    return (<h3 className={`title_medium ${textType?` text_${textType}`:""}`}>{description}</h3>)
  }
}
