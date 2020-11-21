var app = getApp();
// pages/editInfo/editInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
    },
    userPhone: "",
    show: false,
    phoneFeedback: "",
    feedback: "",
    feedbackClass: ""
  },

  submitInfo() {
    var that = this;
    if(this.data.phoneFeedback == "") {
      let userInfo = this.data.userInfo
      wx.request({
        url: 'http://47.110.241.150:8080/music-center/updateUserInfo',
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          "userAlias": userInfo.userAlias,
          "userPhone": this.data.userPhone,
          "userSex": userInfo.userSex,
          "userSignature": userInfo.userSignature,
          "token": wx.getStorageSync('token')
        },
        success(res) {
          if (res.data.code == 200) {
            app.globalData.userInfo = that.data.userInfo
            app.globalData.userPhone = that.data.userPhone
            wx.setStorageSync('userInfo', that.data.userInfo)
            wx.setStorageSync('userPhone', that.data.userPhone)
            that.setData({
              feedback: res.data.data,
              feedbackClass: 'feedback-success'
            })
          } else {
            that.setData({
              feedback: res.data.data,
              feedbackClass: 'feedback-error'
            })
          }
        }
      })
    }
  },

  reset() {
    this.setData({
      userPhone: app.globalData.userPhone,
      userInfo: wx.getStorageSync('userInfo'),
      phoneFeedback: ""
    })
  },

  changePhoneNumber(event) {
    let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!myreg.test(event.detail.value)) {
      this.setData({
        phoneFeedback: '请输入正确的手机号码'
      })
    } else {
      this.setData({
        userPhone: event.detail.value,
        phoneFeedback: ""
      })
    }
    
  },

  changeUserInfo(event) {
    let tempUserInfo = this.data.userInfo
    tempUserInfo[event.currentTarget.dataset.item] = event.detail.value;
    this.setData({
      userInfo: tempUserInfo,
      show: false
    })
    
  },
  onOpen() {
    this.setData({
      show: true
    })
  },

  onClose() {
    this.setData({
      show: false
    })
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userPhone: wx.getStorageSync('userPhone'),
      userInfo: wx.getStorageSync('userInfo')
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