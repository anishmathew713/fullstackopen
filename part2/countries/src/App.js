import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {

  const api_key = process.env.REACT_APP_API_KEY

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([])
  const [temperature, setTemperature] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');


  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      weatherData();
    }
  }, [filteredCountries]);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredCountryList = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchValue)
    });
    setFilteredCountries(filteredCountryList);
  }

  const weatherData = () => {
    const lat = filteredCountries[0].capitalInfo.latlng[0];
    const lon = filteredCountries[0].capitalInfo.latlng[1];

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
      .then((response) => {
        setWindSpeed(response.data.wind.speed)
        setTemperature(response.data.main.temp)
        const iconUrl = `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`;
        setWeatherIcon(iconUrl);
      })
  }

  const handleShow = (event) => {
    const filteredCountryList = countries.filter((country) => {
      return country.name.common.toLowerCase() === event.target.value.toLowerCase()
    });
    setFilteredCountries(filteredCountryList);
  }
  return (
    <div>
      <label>find countries </label>
      <input type="search" onChange={handleSearch} />
      {
        filteredCountries.length > 10
          ? <p>Too many matches, specify another filter</p>
          : filteredCountries.length > 1
            ? filteredCountries.map(country =>
              <p key={country.cca3}>{country.name.common}
                <button onClick={handleShow} value={country.name.common}>show</button></p>
            )
            : filteredCountries.length === 1
              ? <div>
                <h2>{filteredCountries[0].name.common}</h2>
                <p>Capital: {filteredCountries[0].capital}</p>
                <p>Area: {filteredCountries[0].area}</p>
                <strong>Languages: </strong>

                <ul>{Object.keys(filteredCountries[0].languages).map(code => <li key={code}>{filteredCountries[0].languages[code]}</li>)}</ul>

                <img src={filteredCountries[0].flags.png} alt="Flag" />
                <h2>Weather in {filteredCountries[0].capital}</h2>
                <p>temperature {temperature} Celcius</p>
                <img src={weatherIcon} alt="Weather icon" />
                <p>wind {windSpeed} m/s</p>
              </div>
              : null
      }
    </div>
  )
}

export default App