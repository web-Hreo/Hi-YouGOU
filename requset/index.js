//同时发送异步请求的次数
let ajaxtime = 0;


export const request = (params) => {
  //判断url中是否带有/my请求的私人路径 带上header的token值传参
  let header = { ...params.header };
  if (params.url.includes('/my/')) {
    //拼接header 带上token
    header['Authorization'] = wx.getStorageSync('token');
  }
  ajaxtime++;

  //请求之前弹出加载提示loading
  wx.showLoading({ title: '数据加载中', mask: true, });
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';//定义公共的路径
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      header: header,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: function () { //请求完毕回调函数 不管成功还是失败
        ajaxtime--;
        if (ajaxtime === 0) {
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
          wx.hideLoading(); //关闭loading框
        }
      }
    });
  })
}