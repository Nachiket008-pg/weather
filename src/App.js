import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
  // api.openweathermap.org/data/2.5/forecast?${location}&lon=139&appid=a01ba656d74b6ade22cbcddcfe6888ca
  // https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c
  // http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid={API key}a01ba656d74b6ade22cbcddcfe6888ca

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <h2>{data.name}</h2>
          </div>
          <div className="temp">
            {data.main ? <h1>{((data.main.temp) - 32 * 1.8).toFixed(2)} °Cel</h1> : null}
          </div>
          
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>

          <div className="feels">
          <h2>Minimum Temperature</h2> {data.main ? <p className='bold'>{((data.main.temp_min) - 32 * 1.8).toFixed(2)} °Cel</p> : null}
          </div><br />
          
          <div className="min_temp">
          <h2>Maximum Temperature</h2> {data.main ? <p className='bold'>{((data.main.temp_max) - 32 * 1.8).toFixed(2)} °Cel</p> : null} 
          </div><br />
          

            <div className="humidity">
            <h2>Humidity</h2>  {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            </div><br />

            <div className="wind">
            <h2>Wind Speed</h2> {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
            </div>

        </div>
     </div>
    </div>
  );
}

export default App;
