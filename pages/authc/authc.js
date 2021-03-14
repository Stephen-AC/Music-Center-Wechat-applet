
var app = getApp();
// pages/authc/authc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    phoneNumber: "",
    password: "",
    registerPhoneNumber: "",
    registerPassword: "",
    comfirmPassword: "",
    registerCheck: null,
    feedback: "",
    feedback_class: ""
  },
  
  getPhoneNumber(event) {
    this.setData({
      phoneNumber: event.detail.value
    })
  },

  getPassword(event) {
    this.setData({
      password: event.detail.value
    })
  },

  getRegisterPhoneNumber(event) {
    this.setData({
      registerPhoneNumber: event.detail.value
    });
    this.phoneNumberCheck();
  },

  getRegisterPassword(event) {
    this.setData({
      registerPassword: event.detail.value
    })
  },

  getComfirmPassword(event) {
    this.setData({
      comfirmPassword: event.detail.value
    })
  },

  // 手机号校验
  phoneNumberCheck() {
    let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!myreg.test(this.data.registerPhoneNumber)) {
      this.setData({
        feedback_class: "feedback-wrong",
        feedback: "请输入正确的手机号码"
      })
      return false;
    } else {
      this.setData({
        feedback_class: "feedback-success",
        feedback: ""
      });
      return true;
    }
  },

  // 密码校验
  passwordCheck() {
    if (this.data.comfirmPassword!=this.data.registerPassword) {
      this.setData({
        feedback_class: "feedback-wrong",
        feedback: "两次密码不一致"
      });
      return false;
    } else {
      this.setData({
        feedback_class: "feedback-success",
        feedback: ""
      })
      return true;
    }
  },

  login() {
    let that = this;
    wx.request({
      url: 'http://39.108.132.79:8080/music-center/login',
      data: {
        "userPhone": this.data.phoneNumber,
        "userPassword": this.data.password
      },
      method: "POST",
      success(res) {
        let resData = res.data;
        if (resData.code == 200) {
          app.globalData.authc = true;
          app.globalData.userPhone = that.data.phoneNumber;
          wx.setStorageSync("token", resData.data);
          wx.request({
            url: 'http://39.108.132.79:8080/music-center/userInfo',
            data: resData.data,
            method: "POST",
            success(res2) {
              let resData2 = res2.data;
              app.globalData.userInfo = resData2.data;
              wx.setStorageSync("userInfo", resData2.data);
              wx.setStorageSync('userPhone', that.data.phoneNumber);
              wx.switchTab({
                url: '/pages/userinfo/userinfo'
              });
            },
            fail(res) {
              
            }
          });
          wx.request({
            url: 'http://39.108.132.79:8080/music-center/getRecentPlaySongs',
            method: "POST",
            data: resData.data,
            success: (res3) => {
              if (res3.data.code==200) {
                wx.setStorageSync('recentPlay', JSON.parse(res3.data.data))
              }
            }
          })
        } else if (resData.code == 500) {
          that.setData({
            feedback_class: "feedback-wrong",
            feedback: resData.data
          })
        }
      }
    })
  },

  submitRegister() {
    let that = this;
    this.passwordCheck()
    if (this.data.feedback=="") {
      if (this.passwordCheck() && this.phoneNumberCheck()) {
        wx.request({
          url: 'http://39.108.132.79:8080/music-center/register',
          data: {
            "userPhone": this.data.registerPhoneNumber,
            "userPassword": this.data.registerPassword
          },
          method: "POST",
          success(res) {
            let resData = res.data;
            if (resData.code == 200) {
              that.setData({
                feedback_class: "feedback-success",
                feedback: resData.data
              })
            } else if (resData.code == 500) {
              that.setData({
                feedback_class: "feedback-wrong",
                feedback: resData.data
              })
            }
            
          }
        })
      }
    }
    
  },

  showPopup() {
    this.setData({
      show: true,
      registerPhoneNumber: "",
      registerPassword: "",
      comfirmPassword: "",
      registerCheck: null,
      feedback: "",
      feedback_class: ""
    });
  },

  onClose() {
    this.setData({
      show: false,
      registerPhoneNumber: "",
      registerPassword: "",
      comfirmPassword: "",
      registerCheck: null,
      feedback: "",
      feedback_class: ""
    });
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