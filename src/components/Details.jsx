import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Card, Spinner, Row, Col } from 'react-bootstrap'
import snow from '../img/snow.avif'
import sun from '../img/sun.jpg'
import cloud from '../img/cloud.jpg'
import rain from '../img/rain.jpeg'

const Details = () => {
  const { city } = useParams()
  const [temperature, setTemperature] = useState(null)
  const [weather, setWeather] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiKey = 'b384400926007c2499e4fc29cda50eee'
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`

    setLoading(true)
    setError(null)

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod !== 200) {
          setError(`Errore: ${data.message}`)
          setLoading(false)
          return
        }
        if (data.main && data.weather) {
          setTemperature(data.main.temp)
          setWeather(data.weather[0].description)
          setWeatherIcon(getWeatherIcon(data.weather[0].main))
        } else {
          setError('Dati meteo non disponibili per questa città.')
        }
        setLoading(false)
      })
      .catch((error) => {
        setError('Errore di rete: ' + error.message)
        setLoading(false)
      })
  }, [city])

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
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg rounded-4 overflow-hidden">
            <Card.Img variant="top" src={weatherIcon} alt={weather} />
            <Card.Body>
              <Card.Title className="display-4">{city}</Card.Title>
              <Card.Text>
                <strong>Meteo:</strong> {weather}
              </Card.Text>
              <Card.Text>
                <strong>Temperatura:</strong> {temperature}°C
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Details
