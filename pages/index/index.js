//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    "topList": [],
    "banner": [],
    "searchKey": ""
  },

  getSearchKey(event) {
    this.setData({
      searchKey: event.detail.value
    })
  },

  toSearch(event) {
    wx.navigateTo({
      url: '/pages/search/search?keyWord='+this.data.searchKey,
    });
  },


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bannerSongPlay(event) {
    app.globalData.playingSongId = event.currentTarget.dataset.songId;
    app.globalData.swichSong = true;
    wx.switchTab({
      url: '/pages/player/player',
    })
  },
  toTopListDetail(event) {
    let id = event.currentTarget.dataset.topid
    wx.navigateTo({
      url: '/pages/songList/songList?pre=index&id='+id,
    });
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorageSync('key')
    wx.request({
      url: 'http://39.108.132.79:3000/toplist/detail',
      success(res) {
        that.setData({
          topList: res.data.list.slice(0, 4)
        })
      }
    });
    wx.request({
      url: 'http://39.108.132.79:3000/personalized/newsong',
      success(res) {
        that.setData({
          banner: res.data.result
        })
      }
    })
  }
})
