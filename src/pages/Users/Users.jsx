import { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import API from '../../lib/api.js';
import './users.sass';

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    const formData = new FormData(e.target);
    try {
      const response = await API.changeUserRole(
        localStorage.getItem('token'),
        Array.from(formData.keys()).reduce((acc, key) => ({ ...acc, [key]: formData.get(key) }), {})
      );

      e.target.reset();

      NotificationManager.success(response.message);

      setError('');
    } catch(e) {
      setError(e.response.data.message);
    }

    setLoading(false);
  };

  return (
    <div className="users">
      {loading && (
        <div className="spinner-wrapper">
          <Spinner animation="border" role="status" variant="light" />
        </div>
      )}
      <div className="users-editRole">
        <Form onSubmit={onSubmit}>
          <h2>Обновить роль пользователя</h2>
          <Form.Group controlId="formUsersEmail">
            <Form.Label>Почта пользователя</Form.Label>
            <Form.Control type="email" placeholder="Введите почту" name="email" />
          </Form.Group>
          <Form.Group controlId="formUsersEmail">
            <Form.Label>Роль пользователя</Form.Label>
            <Form.Control as="select" name="role">
              <option value="user">Пользователь</option>
              <option value="moder">Модератор</option>
              <option value="admin">Админ</option>
            </Form.Control>
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Обновить
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Users;
