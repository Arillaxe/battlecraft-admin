import { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import API from '../../lib/api.js';
import './shop.sass';

const Shop = () => {
  const [items, setItems] = useState([]);
  const [servers, setServers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    try {
      const items = await API.getShopItems(page);

      setItems(items.data);
      setPages(items.page_count);
    } catch (e) {
      NotificationManager.error(e.response.data.message);
    }
  };

  const fetchServers = async () => {
    try {
      const servers = await API.getServers();

      setServers(servers);
    } catch (e) {
      NotificationManager.error(e.response.data.message);
    }
  }

  useEffect(() => {
    fetchServers();
    fetchItems();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    const formData = new FormData(e.target);
    try {
      await API.createShopItem(
        localStorage.getItem('token'),
        formData
      );

      e.target.reset();
      
      fetchItems();
      setError('');
    } catch(e) {
      setError(e.response.data.message);
    }

    setLoading(false);
  };

  const onDelete = async (id) => {
    setLoading(true);

    try {
      await API.deleteShopItem(localStorage.getItem('token'), id);

      NotificationManager.success('Стрим успешно удален!');

      fetchItems();
      setError('');
    } catch(e) {
      NotificationManager.error(e.response.data.message);
    }

    setLoading(false);
  };

  return (
    <div className="shop">
      {loading && (
        <div className="spinner-wrapper">
          <Spinner animation="border" role="status" variant="light" />
        </div>
      )}
      <div className="shop-add">
        <Form onSubmit={onSubmit}>
          <h2>Добавить товар</h2>
          <Form.Group controlId="formShopTitle">
            <Form.Label>Название товара</Form.Label>
            <Form.Control type="text" placeholder="Введите название" name="title" />
          </Form.Group>
          <Form.Group controlId="formShopType">
            <Form.Label>Тип товара</Form.Label>
            <Form.Control as="select" name="type">
              <option value="item">Предмет</option>
              <option value="privilege">Привелегия</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formShopServerID">
            <Form.Label>ID сервера</Form.Label>
            <Form.Control as="select" name="server">
              {servers.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formShopPrice">
            <Form.Label>Цена</Form.Label>
            <Form.Control type="text" placeholder="Введите цену" name="price" />
          </Form.Group>
          <Form.Group controlId="formShopCommand">
            <Form.Label>Команда</Form.Label>
            <Form.Control type="text" placeholder="Введите команду" name="command" />
          </Form.Group>
          <Form.Group controlId="formShopImage">
            <Form.Label>Картинка</Form.Label>
            <Form.Control type="file" accept="image/png, image/jpeg" name="image" />
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
      <div className="shop-existing">
        <h2>Товары</h2>
        {!items.length ? (
          <p>Товаров нет</p>
        ) : (
          <div className="shop-list">
          {items.map(({ id, type, server, price, command, image, title }) => (
            <Card key={`shop-item-${id}`} className="shop-item">
              <Card.Header>{title}</Card.Header>
              {image && (
                <div className="shop-image-wrapper">
                  <Card.Img src={`${process.env.REACT_APP_SERVER_HOST}/images/${image}`} />
                </div>
              )}
              <Card.Body>
                <div className="shop-text">{type}</div>
              </Card.Body>
              <Card.Footer>
                <Button className="shop-btn">Редактировать</Button>
                <Button variant="danger" onClick={() => onDelete(id)}>Удалить</Button>
              </Card.Footer>
            </Card>
          ))}
          </div>
        )}
        {pages > 0 && (
          <Pagination>
            <Pagination.First onClick={() => setPage(1)}/>
            {Array(pages).fill().map((_, idx) => (
              <Pagination.Item key={`page-${idx + 1}`} onClick={() => setPage(idx + 1)} active={page === idx + 1}>{idx + 1}</Pagination.Item>
            ))}
            <Pagination.Last onClick={() => setPage(pages)} />
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default Shop;
