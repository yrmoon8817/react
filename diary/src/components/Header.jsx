import Button from "./Button";

export default function Header(props) {

  return (
    <div className="header">
      <Button text={props.buttonTextLeft} onFunc={props.leftButton} className={props.classNameLeft}/>
      <h1 className="title">{props.title}</h1>
      {
        props.buttonTextRight
        ? <Button text={props.buttonTextRight} onFunc={props.rightButton} className={props.classNameRight} type={props.type?props.type:""}/>
        : ''
      }
    </div>
  )
}

