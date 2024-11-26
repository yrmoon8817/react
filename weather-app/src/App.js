import './App.css';
import {useEffect, useState} from 'react';
import Button from './components/Button';
import Text from './components/Text';
//spinier
import ClipLoader from "react-spinners/ClipLoader";
import Background from "./components/Background";

// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
// 2. 날씨정보에는 도시, 섭씨, 화씨, 날씨상태 
// 3. 5개의 버튼 (1개 현재위치, 4개는 다른도시) 
// 4. 도시버튼을 클릭할 때마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 가져오는 동안 로딩 스피너가 돈다.

const cities = [ 'Paris', 'New York', 'Seoul', 'London' ];
const API_KEY = process.env.REACT_APP_API_KEY;
function App () {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [typeWeather, setType] = useState('');

  const getWeatherByCurrentLocation = async (lat,lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    settingType(data);
    setLoading(false);
  }
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat,lon);
    });
  }
  const getWeatherByCity = async ()=>{
   let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
   let response = await fetch(url);
   let data = await response.json();
   setWeather(data);
   settingType(data);
   setLoading(false);
  }
  const settingType = (weather) => {
    if((weather && weather.weather[0].main) == 'Drizzle'){
      setType ('Rain');
    } else if (
      ((weather && weather.weather[0].main) == 'Thunderstorm') || 
      ((weather && weather.weather[0].main) == 'Tornado')
    ){
      setType ('Squall');
    } else if (
      ((weather && weather.weather[0].main) == 'Mist') || 
      ((weather && weather.weather[0].main) == 'Smoke') || 
      ((weather && weather.weather[0].main) == 'Haze')
    ){
      setType ('Fog');
    } else if (
      ((weather && weather.weather[0].main) == 'Sand') || 
      ((weather && weather.weather[0].main) == 'Ash')
    ){
      setType ('Dust');
    } else {
      setType (weather && weather.weather[0].main);
    }
  }
  useEffect(() => {
    if( city === null ) {
      setLoading(true)
      getCurrentLocation()
    }else {
      setLoading(true)
      getWeatherByCity()
    }
  }, [city]);

  const handleCityChange = (city) => {
    if ( city === "current" ) {
      setCity(null);
    } else {
      setCity(city);
    }
  }     
  return (
    <div className="wrap">
      <Background typeWeather={typeWeather}></Background>
      <div className='content_box'>
        <Text weather={weather}></Text>
        <Button cities={cities} selectedCity={city} handleCityChange={handleCityChange}></Button>
      </div>
      <ClipLoader color="coral" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" className='ic_spinner'/>
    </div>
  );
}
export default App;
