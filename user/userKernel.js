import xError from "../xError";

class userKernel {

  /**
   * 推送用户数据到指定服务器
   * @param {string} url:string  服务器api接口地址
   * @param {Object} data:Object  提交的数据
   * @param {Function} success:Function 成功后要执行的操作
   */
  static pushUser(url, data = {}, success = undefined) {
    wx.login({
      success: (res) => {
        data['code'] = res.code;
        wx.$qs.postRequest(url, data).then((response) => {
          success && success(response);
        }).catch((error) => {
          xError.errorHandler(error, '请求失败');
        });
      },
      fail: function (res) {
        xError.errorHandler(res, '获取临时code失败!');
      }
    })
  }


}

export default userKernel;