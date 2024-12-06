import { render, screen, waitFor } from '@testing-library/react'
import Cities from '../components/Cities'
import { MemoryRouter } from 'react-router-dom'

jest.mock('../img/snow.avif', () => 'snow.jpg')
jest.mock('../img/sun.jpg', () => 'sun.jpg')
jest.mock('../img/cloud.jpg', () => 'cloud.jpg')
jest.mock('../img/rain.jpeg', () => 'rain.jpg')
jest.mock('../img/nebbia.webp', () => 'fog.jpg')

describe('Cities Component', () => {
  test('should render all city weather cards', async () => {
    render(
      <MemoryRouter>
        <Cities />
      </MemoryRouter>
    )

    await waitFor(() => screen.getByText('Fiano Romano'))

    const cities = [
      'Cinisello Balsamo',
      'Fiano Romano',
      'Napoli',
      'Pechino',
      'Bilbao',
      'Sydney',
      'Moscow',
      'Kiev',
    ]

    cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument()
    })

    const cards = screen.getAllByRole('link')
    expect(cards.length).toBe(cities.length)
  })
})
