import {
  request
} from '../../requset/index.js';

//用户上拉页面 滚动条触底 加载下一页数据
// 1 滚动触底事件  2 判断下一页数据  3 判断有没有 没 弹出提示 有 加载
//总页数 返回值确实total总条数为23条 那么总页数最大为3
Page({

  //  页面的初始数据
  data: {
    //tabbar数据
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      }, {
        id: 2,
        value: "销量",
        isActive: false
      }, {
        id: 0,
        value: "价格",
        isActive: false
      },
    ],
    goods_list: [] //页面数据
  },
  queryParams: { //接收页面传来的参数
    query: '',
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalpages: 1,//总页数 默认1

  //生命周期函数--监听页面加载及页面传来的参数
  onLoad: function (options) {
    this.queryParams.cid = options.cid;
    this.getdata()
  },
  async getdata() { //获取商品参数
    try {
      const res = await request({ url: '/goods/search', data: this.queryParams })
      //计算总页数
      this.totalpages = Math.ceil(res.data.message.total / this.queryParams.pagesize)
      //放进data
      this.setData({
        //es6解构赋值 将数组与data内的旧数组进行拼接
        goods_list: [...this.data.goods_list, ...res.data.message.goods]
      })
      // wx.stopPullDownRefresh();
    } catch (err) {
      console.log(err)
    }
  },
  settabindex(e) {
    let { tabs } = this.data
    tabs.forEach((v, i) => { i == e.detail ? v.isActive = true : v.isActive = false })
    this.setData({
      tabs
    })
  },

  // 页面上拉触底事件的处理函数
  onReachBottom() {
    //如果当前页码数>=总页数 那么弹窗
    if (this.queryParams.pagenum >= this.totalpages) {
      return wx.showToast({ title: '页面加载完毕', duration: 500, });
    }
    //反之 页码数+1 重新执行请求
    this.queryParams.pagenum++;

    this.getdata()
  },
  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh() {
    //重置数组
    this.setData({
      goods_list: [],
    })
    // 重置页码
    this.queryParams.pagenum = 1;
    //重新发送请求
    this.getdata();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})