var app = getApp()

// pages/songList/songList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topList: [],
    bgImg: "",
  },

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
    let id = options.id;
    if (options.pre=="index") {
      wx.request({
        url: 'http://47.110.241.150:3000/playlist/detail?id='+id,
        success: (res) => {
          this.setData({
            topList: res.data.playlist.tracks,
            bgImg: res.data.playlist.coverImgUrl
          });
        }
      });
    } else if(options.pre=="fav") {
      let fav = wx.getStorageSync('userInfo').userFavourite;
      let ids = fav.substring(1, fav.length-1);
      if (fav=="[]") {
        wx.showToast({
          title: '暂无我的喜欢，快去添加你喜欢的吧',
          icon: "none",
          duration: 1500
        })
      }
      wx.request({
        url: 'http://47.110.241.150:3000/song/detail?ids='+ids,
        success: (res) => {
          this.setData({
            topList: res.data.songs,
            bgImg: "/assets/images/fav.jpg"
          })
        }
      })
    } else if(options.pre == "rec") {
      let recPlayStr = JSON.stringify(wx.getStorageSync('recentPlay'));
      let ids = recPlayStr.substring(1, recPlayStr.length-1);
      if (recPlayStr=="[]") {
        wx.showToast({
          title: '暂无最近播放歌曲',
          icon: "none",
          duration: 1500
        })
      }
      wx.request({
        url: 'http://47.110.241.150:3000/song/detail?ids='+ids,
        success: (res) => {
          this.setData({
            topList: res.data.songs,
            bgImg: "/assets/images/rec.jpg"
          })
        }
      })
    }
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