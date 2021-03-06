var app = getApp()

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songsList: [],
    searchKey: ""
  },

  getSearchKey(event) {
    this.setData({
      searchKey: event.detail.value
    })
  },
  // 搜索
  toSearch(event) {
    wx.request({
      url: 'http://39.108.132.79:3000/search?keywords=' + this.data.searchKey,
      success: (res) => {
        this.setData({
          songsList: res.data.result.songs
        })
      }
    })
  },
// 播放音乐
  playSong(event) {
    app.globalData.playingSongId = event.currentTarget.dataset.songId;
    app.globalData.swichSong = true;
    wx.switchTab({
      url: '/pages/player/player',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // keyword回显
    let keyWord = options.keyWord;
    this.setData({
      searchKey: keyWord
    })
    wx.request({
      url: 'http://39.108.132.79:3000/search?keywords='+keyWord,
      success: (res) => {
        this.setData({
          songsList: res.data.result.songs
        })
      }
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