export default function Button({onFunc,text, className, type}) {
  return (
    <div className="btn-box">
      <button type="button" className={`btn-${className}${type? ' '+type:''}`} onClick={onFunc}>{text}</button>
    </div>
  )
}

