

// promise 形式的getSetting 获取用户设置
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => { }
    });
  })
}
// promise 形式的chooseAddress 打开收货地址
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => { }
    });
  })
}

// promise 形式的openSetting 打开用户设置
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => { }
    });
  })
}
// promise 形式的showModel 删除确定
export const showModal = ({ content }) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => { }
    });
  })
}

// promise 形式的showToast 提醒弹窗
export const showToast = ({ title }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1000,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => { }
    });
  })
}