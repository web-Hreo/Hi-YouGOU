
//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  globalData: {  //定义全局变量Modelmes为null
    Modelmes: null
  },
  onLaunch(options) {
    wx.getSystemInfo({//当小程序初始化完成时 获取用户的手机机型 并写出适配ipnone手机安全区域的的适配方案
      success: (res) => {
        wx.setStorageSync('Modelmes', res.model)//将机型存入到本地缓存 以面后期其他业务逻辑需要使用
        if (res.model == 'iPhone X' || 'iPhone XR' || 'iPhone XS Max' || 'iPhone 11' || 'iPhone 11 Pro' || 'iPhone 11 Pro Max')
          this.globalData.Modelmes = true
        else
          this.globalData.Modelmes = false
      }
    })
  },
  onShow: function (options) {

  },
  onHide: function () {

  },
  onError: function (msg) {

  },
  //options(path,query,isEntryPage)
  onPageNotFound: function (options) {

  }

});