import { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import API from '../../lib/api.js';
import './streams.sass';

const Streams = () => {
  const [streams, setStreams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStreams = async () => {
    try {
      const streams = await API.getStreams(localStorage.getItem('token'));

      setStreams(streams);
    } catch (e) {
      NotificationManager.error(e.response.data.message);
    }
  };

  useEffect(() => {
    fetchStreams();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    const formData = new FormData(e.target);
    try {
      await API.createStreams(
        localStorage.getItem('token'),
        Array.from(formData.keys()).reduce((acc, key) => ({ ...acc, [key]: formData.get(key) }), {})
      );

      e.target.reset();
      
      fetchStreams();
      setError('');
    } catch(e) {
      setError(e.response.data.message);
    }

    setLoading(false);
  };

  const onDelete = async (id) => {
    setLoading(true);

    try {
      await API.deleteStreams(localStorage.getItem('token'), id);

      NotificationManager.success('Стрим успешно удален!');

      fetchStreams();
      setError('');
    } catch(e) {
      NotificationManager.error(e.response.data.message);
    }

    setLoading(false);
  };

  return (
    <div className="streams">
      {loading && (
        <div className="spinner-wrapper">
          <Spinner animation="border" role="status" variant="light" />
        </div>
      )}
      <div className="streams-add">
        <Form onSubmit={onSubmit}>
          <h2>Добавить стрим</h2>
          <Form.Group controlId="formStreamsName">
            <Form.Label>Название канала</Form.Label>
            <Form.Control type="text" placeholder="Введите название" name="channel" />
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Добавить
          </Button>
        </Form>
      </div>
      <div className="streams-existing">
        <h2>Стримы</h2>
        {!streams.length ? (
          <p>Стримов нет</p>
        ) : (
          <div className="streams-list">
          {streams.map(({ id, channel }) => (
            <Card key={`streams-item-${id}`} className="streams-item">
              <Card.Body>
                {channel}
              </Card.Body>
              <Card.Footer>
                <Button variant="danger" onClick={() => onDelete(id)}>Удалить</Button>
              </Card.Footer>
            </Card>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Streams;
