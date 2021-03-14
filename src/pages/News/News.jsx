import { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import API from '../../lib/api.js';
import './news.sass';

const News = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    const news = await API.getNews(page);

    setNews(news.data);
    setPages(news.page_count);
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    const formData = new FormData(e.target);
    try {
      await API.createNews(
        localStorage.getItem('token'),
        formData
      );

      e.target.reset();
      
      fetchNews();
      setError('');
    } catch(e) {
      setError(e.response.data.message);
    }

    setLoading(false);
  };

  const onDelete = async (id) => {
    setLoading(true);

    try {
      await API.deleteNews(localStorage.getItem('token'), id);

      NotificationManager.success('Новость успешно удаленна!');

      fetchNews();
      setError('');
    } catch(e) {
      NotificationManager.error(e.response.data.message);
    }

    setLoading(false);
  };

  return (
    <div className="news">
      {loading && (
        <div className="spinner-wrapper">
          <Spinner animation="border" role="status" variant="light" />
        </div>
      )}
      <div className="news-add">
        <Form onSubmit={onSubmit}>
          <h2>Добавить новость</h2>
          <Form.Group controlId="formNewsTitle">
            <Form.Label>Заголовок</Form.Label>
            <Form.Control type="text" placeholder="Введите заголовок" name="title" />
          </Form.Group>
          <Form.Group controlId="formNewsContent">
            <Form.Label>Содержимое</Form.Label>
            <Form.Control as="textarea" placeholder="Введите содежимое" rows="5" name="text" />
          </Form.Group>
          <Form.Group controlId="formNewsImage">
            <Form.Label>Картинка</Form.Label>
            <Form.Control type="file" placeholder="Введите содежимое" accept="image/png, image/jpeg" name="image" />
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
      <div className="news-existing">
        <h2>Новости</h2>
        {!news.length ? (
          <p>Новостей нет</p>
        ) : (
          <div className="news-list">
          {news.map(({ id, title, text, img_url }) => (
            <Card key={`news-item-${id}`} className="news-item">
              <Card.Header>{title}</Card.Header>
              {img_url && (
                <div className="news-image-wrapper">
                  <Card.Img src={`https://api-battlecraft.loca.lt/images/${img_url}`} />
                </div>
              )}
              <Card.Body>
                <div className="news-text">{text}</div>
              </Card.Body>
              <Card.Footer>
                <Button className="news-btn">Редактировать</Button>
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

export default News;
