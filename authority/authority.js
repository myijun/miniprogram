import SCOPE_ENUMS from './scope';

let scopeStore = [];

let _authority = {

}
let _applyAuthority = {

}
/**
 * 获取用户基础信息
 * @param {*} success 
 */
_authority[SCOPE_ENUMS.userInfo] = function (success) {
  return function () {
    let that = this;
    wx.getUserInfo({
      success: res => {
        that.globalData.userInfo = res.userInfo
        if (that.userInfoReadyCallback) {
          that.userInfoReadyCallback(res)
        }
        success && success();
      }
    });
  }
};

/**
 * 获取用户地理位置
 * @param {*} success 
 */
_authority[SCOPE_ENUMS.userLocation] = function (success) {
  return function () {
    let that = this;
    wx.getLocation({
      altitude: 'altitude',
      success: (location) => {
        that.globalData.location = location;
        if (that.userLocationReadyCallback) {
          that.userLocationReadyCallback(res);
        }
        success && success();
      }
    })
  };
};
/**
 * 
 * @param {*} success 授权成功回调
 */
_applyAuthority[SCOPE_ENUMS.userLocation] = function (success) {
  wx.authorize({
    scope: SCOPE_ENUMS.userLocation,
    success: () => {
      _authority[SCOPE_ENUMS.userLocation](success);
    }
  });
};
//class kernel
/**
 * 
 */
let authority = {
  /**
   * 
   */
  bind: (scope, config = {
    "success": () => {

    }
  }) => {
    config.success = (_authority[scope] ? (_authority[scope](config && config.success)) : (config && config.success));
    scopeStore.push({
      scope: scope,
      config: config
    });
  },

  canIUse: () => {
    return wx.canIUse('button.open-type.getUserInfo');
  },

  /**
   * 项目初始化执行获取操作
   */
  onLaunch: (app) => {
    wx.getSetting({
      success: res => {
        for (let i of scopeStore) {
          if (res.authSetting[i.scope] && i['config'] && i['config']['success']) {
            i['config']['success'].call(app);
          } else if (!res.authSetting[i.scope] && i.scope != SCOPE_ENUMS.userInfo) {
            _applyAuthority[i.scope](i['config']['success'])
          }
        }
      }
    });
  }
}

export default authority;