import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import API from '../../lib/api.js';

const Auth = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');

    const fetchUser = async () => {
      try {
        await API.getUser(token);

        localStorage.setItem('token', token);
        history.push('/');
      } catch (e) {
        NotificationManager.error(e.response.data.message);
      }
    };

    fetchUser();
  }, [history, location.search]);

  return (
    <div className="auth">Авторизация...</div>
  );
};

export default Auth;
