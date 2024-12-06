import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import meteoLogo from '../img/logo.webp'

const MyNav = ({ searcher, setSearcher, subtitle }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <img src={meteoLogo} width="100px" alt="logo" />
        </Navbar.Brand>
        <Navbar.Brand href="#home">Max D. {subtitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form.Control
            type="text"
            placeholder="Cerca la tua città..."
            value={searcher}
            onChange={(e) => setSearcher(e.target.value)}
            className="me-2"
          />
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/Cities" className="nav-link">
              Cities
            </NavLink>
            <NavLink to="/description" className="nav-link">
              Description
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
