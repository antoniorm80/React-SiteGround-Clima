import { useState } from "react"


export const WeatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '3b70e7c1027c6f39fac1d90dcdd9c35d'
    // const API_KEY = 'c19c199d65a1f94340805e76e9adf9cc'
    const difKelvin = 273.15

  const [ciudad, setCiudad] = useState('')
  const [dataClima, setDataClima] = useState(null)

  const handleChange = (e) => {    
    setCiudad(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()    
    if (ciudad.length > 0) fetchClima()
  }


  const fetchClima = async () => {
    try {
        const response = await fetch(`${urlBase}?q=${ciudad}&APPID=${API_KEY}`)
        const data = await response.json()
        setDataClima(data)        
    } catch (error) {
        console.error("Ha ocurrido un error: ", error);
    }
  }

  return (
    <div className="container">
        <div>
<img src="/src/assets/clima.png" alt="clima"/>
        </div>
       <h1> Aplicación del Clima</h1>
       
       <form onSubmit={handleSubmit}>
            <input type="text" name="txtBuscar" id="txtBuscar" value={ciudad}
            onChange={handleChange}
            />
            <button type="submit" >Buscar</button>
        </form>
        {   
        // No me mostraban los datos porque no le puse el await en el data
            dataClima && (                
                <div>                    
                    <h2>{dataClima?.name }</h2>
                    <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                    <p>Condición meteorológica: { dataClima?.weather[0].description}</p>
                    {/* <img src={`https://openweathermap.org/img/wn/10d@2x.png`}/> */}
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
                </div>
            )
        } 
        
    </div>
  )
}
