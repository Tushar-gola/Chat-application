import {CrudRequest} from '@crud/core';
const mainBase = process.env.REACT_APP_BASE_URL;
export class CrudFactory extends CrudRequest {
  dateFormat = 'MMMM Do YYYY hh:mm A';
  baseUrl = mainBase;

  getUrl = (...segments) =>
    segments.reduce((url, segment) => url + segment, this.baseUrl);

  async retrieve(url, data = {}, requestOptions = {}) {
    console.log(url, data);
    return this.send({
      method: 'GET',
      url: `${url}`,
      data,
      ...requestOptions,
    });
  }

  async post(url, data = {}, requestOptions = {}) {
    return this.send({
      method: 'POST',
      url: `${url}`,
      data,
      ...requestOptions,
    });
  }
  async put(url, data = {}, requestOptions = {}) {
    return this.send({
      method: 'PUT',
      url: `${url}`,
      data,
      ...requestOptions,
    });
  }
  async delete(url, data = {}, requestOptions = {}) {
    return this.send({
      method: 'DELETE',
      url,
      data,
      ...requestOptions,
    });
  }
  async send(requestOptions = {}) {
    const {url, data, method, notify = true} = requestOptions;
    console.log(data, 'llllllllll');
    const options = {
      ...requestOptions.ajaxOptions,
      method,
    };
    let fullUrl;
    const token = await localStorage.getItem('token');
    const CustomerToken = 'Bearer ' + token;
    options.headers = {
      ...options.headers,
      Accept: 'application/json',
      Authorization: CustomerToken,
    };
    if (!(data instanceof FormData)) {
      options.headers['Content-Type'] = 'application/json';
    }
    fullUrl = this.getUrl(url);
    if (options.method === 'GET') {
      const queryString = new URLSearchParams(data);
      fullUrl += `?${queryString}`;
    } else if (data instanceof FormData) {
      options.body = data;
    } else {
      options.body = JSON.stringify(data);
    }
    let res = {
      data: [],
      message: '',
      type: 'error',
      errors: [],
    };
    try {
      this.call('loading', [true]);
      const response = await fetch(fullUrl, options);
      console.log(response, 'llllllllllllll');
      if (response.status === 200) {
        res = await response.json();
        const {type, message} = res;
        if (options.method !== 'GET' && notify) {
          this.notify({
            message,
            type,
          });
        }
      } else if (response.status === 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        return await response.json();
      }
    } catch (e) {
      this.call('loading', [false]);
      console.error(e);
      this.notify({
        message: e.message,
        type: 'error',
      });
      throw e;
    } finally {
      this.call('loading', [false]);
    }
    const {type} = res;
    console.log(res, 'lllllllll');
    if (type === 'error') throw res;

    return res;
  }
}
export const $crud = new CrudFactory();
