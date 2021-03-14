import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Footer, Header, Auth } from './components';
import {
  Dashboard,
  News,
  Users,
  Shop,
  Streams,
} from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import './App.sass';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="content">
          <Container>
            <Row>
              <Col lg={8}>
                <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/auth" component={Auth} />
                  <Route path="/news" component={News} />
                  <Route path="/users" component={Users} />
                  <Route path="/shop" component={Shop} />
                  <Route path="/streams" component={Streams} />
                </Switch>
              </Col>
            </Row>
          </Container>
        </div>

        <Footer />
        <NotificationContainer />
      </div>
    </Router>
  );
}

export default App;
