/**
 * @link https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html
 */
const scope = {
  /**
   * 	wx.getUserInfo	用户信息
   */
  'userInfo': 'scope.userInfo',
  /**
   * wx.getLocation, wx.chooseLocation	地理位置
   */
  'userLocation': 'scope.userLocation',
  /**
   * wx.startLocationUpdateBackground	后台定位
   */
  'userLocationBackground': 'scope.userLocationBackground',
  /**
   * 通讯地址（已取消授权，可以直接调用对应接口）
   */
  'address': 'scope.address',
  /**
   * 	wx.chooseInvoiceTitle	发票抬头（已取消授权，可以直接调用对应接口）
   */
  'invoiceTitle': 'scope.invoiceTitle',
  /**
   * wx.chooseInvoice	获取发票（已取消授权，可以直接调用对应接口）
   */
  'invoice': 'scope.invoice',
  /**
   * wx.getWeRunData	微信运动步数
   */
  'werun': 'scope.werun',
  /**
   * 	wx.startRecord	录音功能
   */
  'record': 'scope.record',
  /**
   * wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum	保存到相册
   */
  'writePhotosAlbum': 'scope.writePhotosAlbum',
  /**
   * camera 组件	摄像头
   */
  'camera': 'scope.camera',
}

module.exports = {
  SCOPE_ENUMS: scope
}