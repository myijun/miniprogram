import xError from '../xError';

const QQMapWX = require('./../../plugins/qqmap-wx-jssdk');
/**
 * 用户地理位置
 */
class userPosition {

  constructor(config = {
    key: ''
  }) {

    this.qqmapsdk = new QQMapWX({
      key: config.key
    });


    this.config = config;

  }

  /**
   * 通过经纬度获取用户的地理位置信息
   * @param {Number} latitude 
   * @param {Number} longitude 
   * 
   */
  convertLocal(latitude, longitude) {
    return new Promise((resolve, reject) => {
      this.qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: function (res) {
          
          resolve(res);
        },
        fail: res => {
          
          typeof this.config.fail == 'function' && this.config.fail(res);
          reject(res);
          xError.errorHandler(res);
        },
        complete: res=>{          
          typeof this.config.complete == 'function' && this.config.complete(res);
        }
      })
    });
  }

}

export default userPosition;