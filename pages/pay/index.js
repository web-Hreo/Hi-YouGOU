import {
  getSetting,
  chooseAddress,
  openSetting, showToast
} from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    cart: [],
    totalprice: 0,
    totalnum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取全局变量 对有安全区域的Ip
    var app = getApp();
    let { Modelmes } = app.globalData;
    this.setData({ Modelmes })

  },
  //获取用户地址
  async chooseAddress() {
    //第三次优化
    try {
      const res = await getSetting(); //获取用户状态
      console.log(res)
      const scope = res.authSetting['scope.address'];
      console.log(scope)
      if (scope == false) await openSetting(); // 判断权限状态 若权限关闭 则让用户打开权限
      else { //反之打开地址栏
        const address = await chooseAddress();
        wx.setStorageSync('address', address);
        this.setData({ address })
      }
    } catch (err) {
      console.log(err)
    }
  },
  //  生命周期函数--监听页面显示
  onShow() {
    const address = wx.getStorageSync('address') || [] //获取缓存中收货地址信息
    let cart = wx.getStorageSync('cart') || [];
    cart = cart.filter(v => v.checkboxFlage)
    let totalprice = 0;
    let totalnum = 0;
    totalnum = cart.length;
    cart.forEach(v => { totalprice += v.num * v.goods_price })
    this.setData({
      address,
      cart,
      totalprice,
      totalnum,
    })
  },
  //点击支付金额结算
  async handlepay() {
    const { address } = this.data;
    if (!address) return await showToast({ title: '您还没有填写地址' });
    await showToast({ title: '暂未开通订单支付功能' });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})