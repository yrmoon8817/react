export default function Background ({typeWeather}){
  return(
    <div className={`img_background is_${typeWeather}`}></div>
  );
}