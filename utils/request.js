import xLog from "./xLog";

/**
 * http轻量wxwx.request 封装
 */
function suffixURI(url) {
  url += (url.indexOf('?') > -1 ? "&" : "?");
  url += ('_t=' + new Date().getTime());
  return url;
}

/**
 * 判断是否需要自动添加baseurl;
 * @param {string} url
 */
function isProtocol(url) {
  let protocol = (url.split(':')[0]).toLowerCase();
  if (protocol == 'http' || protocol == 'https') {
    return true;
  }
  return url.indexOf("//") > -1;
}

class request {

  constructor(config = {}) {
    this._header = {}
    this.config = Object.assign({
      baseURL: ""
    },config);
  }
  /**
   * 设置统一的异常处理
   */
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }

  /**
   * GET类型的网络请求
   */
  getRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  putRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  postRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'POST')
  }

  /**
   * 网络请求
   */
  requestAll(url, data = {}, header, method) {
    url = suffixURI(url);
    let _data = {};
    this.config.xBefore && this.config.xBefore.call(this, _data, header);
    data = Object.assign(_data, data);
    url = isProtocol(url) ? url : `${this.config.baseURL}${url}`;
    xLog.log(url, data);
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: header,
        method: method,
        success: (res => {
          if (res.statusCode === 200) {
            //200: 服务端业务处理正常结束
            resolve(res)
          } else {
            //其它错误，提示用户错误信息
            if (this._errorHandler != null) {
              //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
              this._errorHandler(res)
            }
            reject(res)
          }
        }),
        fail: (res => {
          if (this._errorHandler != null) {
            this._errorHandler(res)
          }
          reject(res)
        })
      })
    })
  }
}
export default request;