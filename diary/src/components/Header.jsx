import Button from "./Button";

export default function Header(props) {
  return (
    <div className="header">
      <Button text={'<'} onFunc={props.previousButton} className={'prev'}/>
      <h1 className="title">{props.title}</h1>
      <Button text={'>'} onFunc={props.nextButton} className={'next'}/>
    </div>
  )
}

