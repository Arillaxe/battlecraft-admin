import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './header.sass';

const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <Link to="/">Battlecraft</Link>
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Item>
                <Link to="/news">Новости</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/streams">Стримы</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/users">Пользователи</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/shop">Магазин</Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
    </header>
  );
};

export default Header;
