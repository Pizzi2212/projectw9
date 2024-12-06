import { useState, useEffect } from 'react'
import { Spinner, Button, Card, Col, Container, Row } from 'react-bootstrap'
import snow from '../img/snow.avif'
import sun from '../img/sun.jpg'
import cloud from '../img/cloud.jpg'
import rain from '../img/rain.jpeg'
import { Link } from 'react-router-dom'

const MyMeteo = ({ city, setCity }) => {
  const [temperature, setTemperature] = useState(null)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState('')

  useEffect(() => {
    if (!city) return

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
        style={{ height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      >
        <Spinner
          animation="border"
          variant="primary"
          style={{ width: '3rem', height: '3rem' }}
        />
      </div>
    )
  if (error)
    return (
      <h2 className="text-center mt-4 text-light">In attesa della Città...</h2>
    )

  return (
    <>
      <div className="text-center mt-3">
        <Button className="btn btn-info">Random City</Button>
      </div>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card
              className="shadow-lg rounded-4 overflow-hidden"
              style={{
                backgroundColor:
                  weatherIcon === `${snow}`
                    ? 'white'
                    : weatherIcon === `${sun}`
                    ? 'skyblue'
                    : weatherIcon === `${rain}`
                    ? 'blue'
                    : weatherIcon === `${cloud}`
                    ? 'gray'
                    : 'white',
              }}
            >
              <Card.Img variant="top" src={weatherIcon} alt={weather} />
              <Card.Body className="text-center">
                <Card.Title className="display-4 font-weight-bold">
                  {city}
                </Card.Title>
                <Card.Text className="fs-3 text-muted">{weather}</Card.Text>
                <Card.Text className="fs-1 text-primary">
                  {temperature}°C
                </Card.Text>
                <Card.Text className="mt-4">
                  <Link to={`/details/${city}`}>
                    <Button variant="outline-primary" className="btn-lg">
                      See Details
                    </Button>
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default MyMeteo
