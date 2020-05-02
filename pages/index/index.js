//Page Object
import {
  request
} from '../../requset/index.js';

Page({
  data: {
    swiperList: [], //轮播图数据
    catesList: [], //分类导航数据
    floorList: [] //楼层数据
  },

  //options(Object)
  onLoad(options) {
    this.getswiperList();
    this.getcatesList();
    this.getfloorList();
  },
  //获取轮播图数据
  async getswiperList() {
    try {
      let res = await request({ url: "/home/swiperdata" })
      this.setData({
        swiperList: res.data.message
      })
    } catch (err) {
      console.log(err)
    }
  },
  //获取分类导航数据
  async getcatesList() {
    try {
      let res = await request({ url: '"/home/catitems"' })
      this.setData({
        catesList: res.data.message
      })
    } catch (err) {
      console.log(err)
    }
  },
  //获取分类导航数据
  async getfloorList() {
    try {
      let res = await request({ url: "/home/floordata" })
      this.setData({
        floorList: res.data.message
      })
    } catch (err) {
      console.log(err)
    }
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});