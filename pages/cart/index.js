import { showModal, showToast } from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageFlag: false,
    cart: [],
    checkAllFlage: false, //全选框默认未被选中
    totalprice: 0,
    totalnum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //全选按钮
  chanegFlage() {
    let { cart, checkAllFlage } = this.data;
    checkAllFlage = !checkAllFlage
    cart.forEach(v => v.checkboxFlage = checkAllFlage)
    this.getTotal(cart);


  },
  //  生命周期函数--监听页面显示
  onShow: function () {
    const address = wx.getStorageSync('address') //获取缓存中收货地址信息
    const cart = wx.getStorageSync('cart');
    let pageFlag;
    if (cart.length > 0) { pageFlag = true }
    else { pageFlag = false }
    this.setData({
      information: address,
      cart,
      pageFlag
    })
    this.getTotal(cart);
  },
  //每条商品点击选中后的事件
  Itemchange(e) {
    const cart = wx.getStorageSync('cart');
    let index = cart.findIndex(v => e.currentTarget.dataset.id == v.goods_id)
    cart[index].checkboxFlage = !cart[index].checkboxFlage;
    this.getTotal(cart);
  },
  //点击删除当前商品
  async handlerDeleteThisGoods(e) {

    const { id, del } = e.currentTarget.dataset;
    const cart = wx.getStorageSync('cart');
    if (del == 'this') {
      let index = cart.findIndex(v => v.goods_id == id) //找下标
      const res = await showModal({ content: "您是否要删除此商品？" })//弹窗
      if (res.confirm) {
        cart.splice(index, 1);
      }
    } else if (del == 'all') {

      const res = await showModal({ content: "您是否要删除全部商品？" })//弹窗
      if (res.confirm) {
        cart.length = 0;
      }
    }
    this.getTotal(cart);
  },
  //封装一个被选中价格和数量的函数以及全选
  getTotal(cart) {
    let totalprice = 0;
    let totalnum = 0;
    if (cart.length == 0) {
      this.setData({
        cart: [],
        totalprice,
        totalnum,
        pageFlag: false
      })
    } else {
      const checkAllFlage = cart.length ? cart.every(v => v.checkboxFlage) : false;
      const checkLength = cart.filter(v => v.checkboxFlage)
      totalnum = checkLength.length;
      checkLength.forEach(v => { totalprice += v.num * v.goods_price })
      this.setData({
        cart,
        checkAllFlage,
        totalprice,
        totalnum,
        pageFlag: true
      })
    }
    wx.setStorageSync('cart', cart);
  },
  // 商品点击 及删除操作操作
  async changenum(e) {
    const cart = wx.getStorageSync('cart');
    let { id, config } = e.currentTarget.dataset
    let index = cart.findIndex(v => id == v.goods_id)
    if (cart[index].num == 1 && config == -1) {
      //弹窗提示
      const res = await showModal({ content: '您是否要删除此商品？' })
      if (res.confirm) {
        cart.splice(index, 1);
        this.getTotal(cart);
      }
    } else {
      cart[index].num += config;
      this.getTotal(cart);
    }

  },


  //点击结算
  async handlepay() {
    const { totalnum } = this.data;
    if (totalnum === 0) return await showToast({ title: '您还没有选择商品' });
    wx.navigateTo({ url: '/pages/pay/index', });
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