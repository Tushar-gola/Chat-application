import {CrudRequest} from '@crud/core';
const mainBase = process.env.REACT_APP_BASE_URL;
export class CrudFactory extends CrudRequest {
  dateFormat = 'MMMM Do YYYY hh:mm A';
  baseUrl = mainBase;

  getUrl = (...segments) =>
    segments.reduce((url, segment) => url + segment, this.baseUrl);

  async retrieve(url, data = {}, requestOptions = {}) {
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
    // try {
    //   this.call('loading', [true]);
    //   const response = await fetch(fullUrl, options);
    //   console.log(response, 'llllllllllllll');
    //   if (response.status === 200) {
    //     res = await response.json();
    //     const {type, message} = res;
    //     if (options.method !== 'GET' && notify) {
    //       this.notify({
    //         message,
    //         type,
    //       });
    //     }
    //   } else if (response.status === 401) {
    //     localStorage.clear();
    //     window.location.reload();
    //   } else {
    //     return await response.json();
    //   }
    // } catch (e) {
    //   this.call('loading', [false]);
    //   console.error(e);
    //   this.notify({
    //     message: e.message,
    //     type: 'error',
    //   });
    //   throw e;
    // } finally {
    //   this.call('loading', [false]);
    // }


    try {
      this.call('loading', [true]);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Request Timeout'));
        }, 10000);
      });

      const response = await Promise.race([timeoutPromise, fetch(fullUrl, options)]);

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
      if (e.message === 'Request Timeout') {
        console.error('Request Timeout');
        throw e.message;
        // Handle timeout error here
      } else {
        console.error(e, 'kkkkkkkkkk');
        this.notify({
          message: e.message,
          type: 'error',
        });
        throw e;
      }
    } finally {
      this.call('loading', [false]);
    }
    const {type} = res;
    if (type === 'error') throw res;

    return res;
  }
}
export const $crud = new CrudFactory();
// import {CrudRequest} from '@crud/core';

// const mainBase = process.env.REACT_APP_BASE_URL;

// export class CrudFactory extends CrudRequest {
//   dateFormat = 'MMMM Do YYYY hh:mm A';
//   baseUrl = mainBase;

//   getUrl = (...segments) =>
//     segments.reduce((url, segment) => url + segment, this.baseUrl);

//   async sendWithRetries(requestOptions, maxRetries = 3) {
//     let retries = 0;
//     const timeoutDuration = 10000; // 10 seconds, adjust as needed

//     while (retries < maxRetries) {
//       try {
//         this.call('loading', [true]);

//         const timeoutPromise = new Promise((_, reject) => {
//           setTimeout(() => {
//             reject(new Error('Request Timeout'));
//           }, timeoutDuration);
//         });

//         const {url, data, method, notify = true} = requestOptions;
//         const options = {
//           ...requestOptions.ajaxOptions,
//           method,
//         };

//         const token = await localStorage.getItem('token');
//         const CustomerToken = 'Bearer ' + token;
//         options.headers = {
//           ...options.headers,
//           Accept: 'application/json',
//           Authorization: CustomerToken,
//         };

//         if (!(data instanceof FormData)) {
//           options.headers['Content-Type'] = 'application/json';
//         }

//         let fullUrl = this.getUrl(url);

//         if (options.method === 'GET') {
//           const queryString = new URLSearchParams(data);
//           fullUrl += `?${queryString}`;
//         } else if (data instanceof FormData) {
//           options.body = data;
//         } else {
//           options.body = JSON.stringify(data);
//         }

//         const response = await Promise.race([timeoutPromise, fetch(fullUrl, options)]);

//         if (response.status === 200) {
//           const res = await response.json();
//           const {type, message} = res;
//           if (options.method !== 'GET' && notify) {
//             this.notify({
//               message,
//               type,
//             });
//           }
//           this.call('loading', [false]);
//           return res;
//         } else if (response.status === 401) {
//           localStorage.clear();
//           window.location.reload();
//         } else {
//           // Handle other responses here
//           this.call('loading', [false]);
//           return await response.json();
//         }
//       } catch (e) {
//         if (e.message === 'Request Timeout') {
//           console.error('Request Timeout on retry ' + retries);
//         } else {
//           // Handle other errors (e.g., network issues)
//           console.error(e, 'Error on retry ' + retries);
//         }
//         retries++;
//       }
//     }

//     // If all retries fail, you can return an error or take other actions.
//     this.call('loading', [false]);
//     throw new Error('Max retries reached');
//   }

//   // Other methods like retrieve, post, put, delete...
// }

// export const $crud = new CrudFactory();
