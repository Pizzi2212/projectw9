import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap'
import snow from '../img/snow.avif'
import sun from '../img/sun.jpg'
import cloud from '../img/cloud.jpg'
import rain from '../img/rain.jpeg'

const Cities = () => {
  const cityList = [
    'New York',
    'Tokyo',
    'London',
    'Paris',
    'Berlin',
    'Sydney',
    'Moscow',
    'Rome',
  ]

  const [citiesWeather, setCitiesWeather] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiKey = 'b384400926007c2499e4fc29cda50eee'

    const fetchWeatherData = async () => {
      try {
        const weatherData = await Promise.all(
          cityList.map(async (city) => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`
            const response = await fetch(url)

            if (!response.ok) {
              throw new Error(`Errore nella richiesta per la città: ${city}`)
            }

            const data = await response.json()

            console.log('API Response:', data) // Log della risposta API per il debug

            if (data.cod === 200) {
              return {
                city: city,
                temperature: data.main.temp,
                weather: data.weather[0].description,
                icon: getWeatherIcon(data.weather[0].main),
              }
            }
            throw new Error(`Errore nella città: ${city}`)
          })
        )
        setCitiesWeather(weatherData)
        setLoading(false)
      } catch (error) {
        console.log('Error:', error) // Log per l'errore
        setError('Errore nel recupero dei dati meteo.')
        setLoading(false)
      }
    }
    fetchWeatherData()
  }, [])

  const getWeatherIcon = (mainWeather) => {
    switch (mainWeather) {
      case 'Clear':
        return `${sun}`
      case 'Clouds':
        return `${cloud}`
      case 'Rain':
        return `${rain}`
      case 'Snow':
        return `${snow}`
      default:
        return `${''}`
    }
  }

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    )

  if (error) return <p className="text-center mt-5">Errore: {error}</p>

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {citiesWeather.map((cityWeather, index) => (
          <Col xs={12} md={8} lg={6} key={index} className="mb-4">
            <Card className="shadow-lg rounded-4 overflow-hidden">
              <Card.Img
                variant="top"
                src={cityWeather.icon}
                alt={cityWeather.weather}
              />
              <Card.Body>
                <Card.Title className="display-4">
                  {cityWeather.city}
                </Card.Title>
                <Card.Text>
                  <strong>Meteo:</strong> {cityWeather.weather}
                </Card.Text>
                <Card.Text>
                  <strong>Temperatura:</strong> {cityWeather.temperature}°C
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Cities
