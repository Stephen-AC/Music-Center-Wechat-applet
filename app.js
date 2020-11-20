//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var token = wx.getStorageSync('token')
    var userInfo = wx.getStorageSync('userInfo')
    var userPhone = wx.getStorageSync('userPhone')
    if (token && userInfo && userPhone) {
      if(token) {
        wx.request({
          url: 'http://localhost:8080/checkAuthc',
          data: token,
          method: "POST",
          success: (res) => {
            console.log(res);
            if (res.data.code==401) {
              this.globalData.authc = false;
              wx.clearStorage({
                success: (res) => {},
              });
            } else {
              this.globalData.authc = true;
              this.globalData.userPhone = userPhone;
              this.globalData.userInfo = userInfo;
              let recentPlay = wx.getStorageSync('recentPlay');
              if (!recentPlay) {
                wx.request({
                  url: 'http://localhost:8080/getRecentPlaySongs',
                  method: "POST",
                  data: token,
                  success: (res) => {
                    wx.setStorageSync('recentPlay', JSON.parse(res.data.data))
                  }
                })
              }
            }
          }
        })
      }
      
    }
    
  },

  onShow: function() {
    var token = wx.getStorageSync('token')
    if (token) {
      wx.request({
        url: 'http://localhost:8080/userBack',
        method: "POST",
        data: token,
        success: (res) => {
          
        }
      })
    }
  },

  onHide: function() {
    var token = wx.getStorageSync('token')
    if (token) {
      let recentPlay = wx.getStorageSync('recentPlay');
      wx.request({
        url: 'http://localhost:8080/addRecentPlaySongs',
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          "token": token,
          "recentPlaySongs": JSON.stringify(recentPlay)
        },
        success: (res) => {
          console.log(res.data);
        }
      });
      wx.request({
        url: 'http://localhost:8080/userQuit',
        method: "POST",
        data: token
      })
    }
    
  },
  globalData: {
    userPhone: "",
    authc: false,
    userInfo: {},
    songInfo: {
    },
    playingSongId: 0,
    swichSong: false,
  }
})