// pages/custom-tab-bar/index.js
Component({
  data: {
    value: 'home',
    list: [
      { value: 'home', label: '菜谱列表' },
      { value: 'random', label: '随机菜谱' },
      { value: 'edit', label: '添加菜谱' }
    ],
  },

  methods: {
    onChange(e) {
      // this.setData({
      //   value: e.detail.value,
      // });
      console.log("switch tab", 'pages/' + e.detail.value + '/' + e.detail.value)
      // 这里url要从根目录开始
      wx.switchTab({
        url: '/pages/' + e.detail.value + '/' + e.detail.value 
      });
    },
  },
});
