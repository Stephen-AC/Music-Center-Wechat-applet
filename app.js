//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 验证缓存中是否有记住用户
    var token = wx.getStorageSync('token')
    var userInfo = wx.getStorageSync('userInfo')
    var userPhone = wx.getStorageSync('userPhone')
    if (token && userInfo && userPhone) {
      if(token) {
        
        wx.request({
          url: 'http://47.110.241.150:8080/music-center/checkAuthc',
          data: token,
          method: "POST",
          success: (res) => {
            console.log(res);
            // 验证用户是否已过期
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
                  url: 'http://47.110.241.150:8080/music-center/getRecentPlaySongs',
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

  // 用户在过期时间内回到应用则删除token过期时间
  onShow: function() {
    var token = wx.getStorageSync('token')
    if (token) {
      wx.request({
        url: 'http://47.110.241.150:8080/music-center/userBack',
        method: "POST",
        data: token,
        success: (res) => {
          
        }
      })
    }
  },

  // 用户隐藏应用则设置token过期时间，存储最近播放记录到数据库
  onHide: function() {
    var token = wx.getStorageSync('token')
    if (token) {
      // 存储最近播放记录到数据库
      let recentPlay = wx.getStorageSync('recentPlay');
      wx.request({
        url: 'http://47.110.241.150:8080/music-center/addRecentPlaySongs',
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
        url: 'http://47.110.241.150:8080/music-center/userQuit',
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