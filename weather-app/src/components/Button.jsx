export default function Button ({cities, selectedCity, handleCityChange}){
  return(
    <div className='btn_group'>
      <button className={`${selectedCity === null? "is_active": ""}`} type="button" onClick={()=>handleCityChange("current")}>Current Location</button>
      {cities.map((city, index)=>(
        <button className={`${selectedCity === city? "is_active": ""}`} key={index} type="button" onClick={()=>handleCityChange(city)}>{city}</button>
      ))}
    </div>
  );
}