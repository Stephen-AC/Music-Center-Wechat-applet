var app = getApp();

// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
    },
    authc: null,
    userPhone: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 换头像
  changeAvatar(event) {
    let that = this;
    wx.chooseImage({
      count: 1,
      success (res) {
        const tempFilePaths = res.tempFilePaths
        // 上传头像
        wx.uploadFile({
          url: 'http://47.110.241.150:8080/music-center/uploadImage',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'token': wx.getStorageSync('token')
          },
          success (res){
            const data = res.data
            const obj = JSON.parse(data)
            app.globalData.userInfo.userAvatar = obj.data;
            wx.setStorageSync('userInfo', app.globalData.userInfo)
            that.setData({
              userInfo: app.globalData.userInfo
            });
            wx.showToast({
              title: '修改头像成功',
              duration: 1500
            })
          }
        })
      }
    })
  },

  // 前往我的收藏列表
  toFavList() {
    wx.navigateTo({
      url: '/pages/songList/songList?pre=fav',
    });
  },

  // 前往最近播放列表
  toRecList() {
    wx.navigateTo({
      url: '/pages/songList/songList?pre=rec',
    });
  },

  // 退出登录
  logout() {
    var that = this;
    wx.request({
      url: 'http://47.110.241.150:8080/music-center/logout',
      method: 'POST',
      data: wx.getStorageSync('token'),
      success: (res) => {
        wx.clearStorage({
          success: (res) => {
            app.globalData.userPhone = "";
            app.globalData.authc = false;
            app.globalData.userInfo = {};
            this.setData({
              authc: false
            })
            that.onLoad();
          },
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userPhone: app.globalData.userPhone,
      authc : app.globalData.authc,
      userInfo: app.globalData.userInfo
    });
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