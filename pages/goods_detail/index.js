import {
  request
} from '../../requset/index.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodObj: [],
  },
  GoodInfo: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取全局变量 对有安全区域的Ip
    var app = getApp();
    let { Modelmes } = app.globalData;
    const { goods_id } = options;
    this.setData({ Modelmes })
    this.getdetailData(goods_id)
  },

  //获取商品详情数据
  async getdetailData(goods_id) {
    const res = await request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    })
    this.GoodInfo = res.data.message;
    this.setData({
      goodObj: {
        goods_name: res.data.message.goods_name,
        goods_price: res.data.message.goods_price,
        //ipone手机不识别webp图片格式  适配iphone  正常方式 让后台改
        goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: res.data.message.pics,
        goods_id: res.data.message.goods_id,
      }
    })
  },
  //点击轮播放大预览
  prevewImg(e) {
    //先构造姚玉兰的图片数组
    const urls = this.GoodInfo.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.url;
    //预览图片的API
    wx.previewImage({
      current,
      urls
    });
  },

  //点击加入购物车
  Cartadd() {
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(value => value.goods_id == this.GoodInfo.goods_id);
    if (index == -1) {
      this.GoodInfo.num = 1;
      this.GoodInfo.checkboxFlage = false,
        this.GoodInfo.deleteFlage = false
      cart.push(this.GoodInfo)
    } else {
      cart[index].num++
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true, //为true 点击间隔1.5s

    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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