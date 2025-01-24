
export default function Text ({weather}){
  const temperatureC=
  weather && weather.main? (weather.main.temp - 273.15).toFixed(2) : "";
  const temperatureF =
  weather && weather.main ? (((weather.main.temp - 273.15) * 9) /5 + 32).toFixed(2) : "";
  return(
    <>
    <h1><span className='current_city'>{weather? weather.name : "Seoul"}</span></h1>
    <div className='text_wrap'>
      <span className='text_location'>{weather && weather.name}</span>
      <span className='text_temp'>{`${temperatureC}°C / ${temperatureF}°F`}</span>
      <span className='text_desc'>{weather && weather.weather[0]?.description}</span>
    </div>
    </>
  );
}