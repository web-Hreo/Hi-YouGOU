// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabsList: {
      type: Array,//类型
      value: ''//默认值
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    simitchange(e) {
      // console.log(e.currentTarget.dataset.index)
      this.triggerEvent('tabindex', e.currentTarget.dataset.index)
    }
  }
})
