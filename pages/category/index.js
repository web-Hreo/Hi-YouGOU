import {
  request
} from '../../requset/index.js';

Page({

  data: {
    leftMenuList: [], //左侧
    rightMenuList: [], //右侧
    num: 0, //左侧点击高亮下标 及右侧展示数据 数组下标
    scrolltop: 0//每次点击后右侧距离顶部的距离

  },
  cates: [], //存放全部数据的中间仓库
  //生命周期函数--监听页面加载
  onLoad(options) {

    //因为本页面请求的数据过于庞大 所以会利用本地存储技术 将用户浏览过的数据保存在本地 供用户二次使用时候获取 
    const storageCates = wx.getStorageSync('cates');//获取本地数据cates
    if (!storageCates) return this.getCates()  //不存在 返回该方法
    //而存在 判断是否过期若时间戳间隔超过100s 则过期 重新请求数据
    if (Date.now() - storageCates.time > 1000 * 10) {
      return this.getCates()
    } else {//否则使用本地数据
      this.cates = storageCates.data
      let leftMenuList = this.cates.map(v => v.cat_name)
      let rightMenuList = this.cates[this.data.num].children;
      this.setData({
        leftMenuList,
        rightMenuList
      })
    }
  },
  //请求数据方法
  async getCates() {
    try {
      let res = await request({ url: "/categories" })
      this.cates = res.data.message;
      //把接口的数据存到本地存储
      wx.setStorageSync("cates", { time: Date.now(), data: this.cates });

      let leftMenuList = this.cates.map(v => v.cat_name)
      let rightMenuList = this.cates[this.data.num].children;
      this.setData({
        leftMenuList,
        rightMenuList,
        scrolltop: 0
      })
    } catch (err) {
      console.log(err)
    }
  },
  //左侧菜单的点击事件  根据索引下标不同来调取数据
  itemchangeTap(e) {
    let { index } = e.currentTarget.dataset
    let rightMenuList = this.cates[index].children;
    this.setData({
      num: index,
      rightMenuList,
      scrolltop: 0
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