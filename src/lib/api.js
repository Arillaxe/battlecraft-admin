import axios from 'axios';

class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getUser(token) {
    const { data } = await axios.get(`${this.baseURL}/auth/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return data.user;
  }

  async getNews(page) {
    const { data } = await axios.get(`${this.baseURL}/news?page=${page}`);

    return data;
  }

  async createNews(token, params) {
    const { data } = await axios.post(`${this.baseURL}/manage/news/add`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });

    return data;
  }

  async deleteNews(token, id) {
    const { data } = await axios.post(`${this.baseURL}/manage/news/${id}/delete`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return data;
  }

  async getStreams() {
    const { data } = await axios.get(`${this.baseURL}/streams`);

    return data;
  }

  async createStreams(token, params) {
    const { data } = await axios.post(`${this.baseURL}/manage/streams/add`, params, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return data;
  }

  async deleteStreams(token, id) {
    const { data } = await axios.post(`${this.baseURL}/manage/streams/${id}/delete`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return data;
  }

  async changeUserRole(token, params) {
    const { data } = await axios.post(`${this.baseURL}/manage/role/edit`, params, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return data;
  }

  async getShopItems() {
    const { data } = await axios.get(`${this.baseURL}/shop`);

    return data;
  }

  async createShopItem(token, params) {
    const { data } = await axios.post(`${this.baseURL}/manage/shop/add`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });

    return data;
  }

  async deleteShopItem(token, id) {
    const { data } = await axios.post(`${this.baseURL}/manage/shop/${id}/delete`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return data;
  }

  async getServers() {
    const { data } = await axios.get(`${this.baseURL}/servers`);

    return data;
  }

  async uploadImage(token, params) {
    const { data } = await axios.post(`${this.baseURL}/manage/news/upload`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });

    return data;
  }
}

const APISingleton = new API(process.env.REACT_APP_SERVER_HOST);

export default APISingleton;
