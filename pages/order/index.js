// pages/order/index.js
import {
  request
} from '../../requset/index.js';
//判断缓存是否有token 如果没有跳回登录授权
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      }, {
        id: 1,
        value: "待付款",
        isActive: false
      }, {
        id: 2,
        value: "待发货",
        isActive: false
      }, {
        id: 3,
        value: "退货",
        isActive: false
      },
    ],
    userinfo: {
      message: {
        user_id: 23,
        user_email_code: null,
        is_active: null,
        user_sex: "男",
        user_qq: "",
        user_tel: "",
        user_xueli: "本科",
        user_hobby: "",
        user_introduce: null,
        create_time: 1562221487,
        update_time: 1562221487,
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      },
      meta: {
        msg: "登录成功",
        status: 200
      }
    }
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {

    console.log(options.type)
    let { tabs } = this.data;
    tabs.forEach((v, i) => i == options.type - 1 ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  //获取订单的方法 只要传入对应的type值就好  无法获取到文档中的token 所以停止该请求
  // async getdatas(type) {
  //   // let token = wx.getStorageSync('token');
  //   let token = this.data.userinfo.message.token
  //   const header = { Authorization: token }

  //   console.log(header)
  //   const res = await request({ url: 'my/orders/all', data: { type }, header: header });
  //   console.log(res)
  // },
  //通过子传父 创建页面tabs的点击事件
  settabindex(e) {
    let { tabs } = this.data
    tabs.forEach((v, i) => { i == e.detail ? v.isActive = true : v.isActive = false })
    this.setData({
      tabs
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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