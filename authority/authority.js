let scope = require('./scope');
let scopeStore = [];

let _authority = {

}
_authority[scope.scope.userInfo] = function (success) {
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

_authority[scope.scope.userLocation] = function(){

};

let authority = {
  /**
   * 
   */
  want: (scope, config = {
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

  onLaunch: (app) => {
    wx.getSetting({
      success: res => {
        console.log(res);
        console.log(scopeStore);
        for (let i of scopeStore) {
          console.log(res.authSetting[i.scope]);
          if (res.authSetting[i.scope] && i['config'] && i['config']['success']) {
            i['config']['success'].call(app);
          }
        }
      }
    });
  }
}



module.exports = {
  authority: authority
}


// authority.want(scope.scope.userInfo);