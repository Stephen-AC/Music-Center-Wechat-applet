// pages/player/player.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    like_icon: "like-o",
    songInfo: {
      id: 0,
      name: "未选择歌曲",
      singer: "请先选择歌曲",
      imgUrl: "/assets/images/no-song.png",
      "duration": 0
    },
    currentTime: "0",
    playPauseImg: "/assets/images/player/player-play.png",

  },

  like(event) {
    if (wx.getStorageSync('token') && event.currentTarget.dataset.id != 0) {
      let userInfo = wx.getStorageSync('userInfo');
      let fav = JSON.parse(userInfo.userFavourite);
      if (fav.indexOf(app.globalData.playingSongId) != -1) {
        fav.splice(fav.indexOf(app.globalData.playingSongId),1);
        this.setData({
          like_icon: "like-o"
        });
      } else {
        fav.unshift(event.currentTarget.dataset.id);
        this.setData({
          like_icon: "like"
        });
      }
      wx.request({
        url: 'http://47.110.241.150:8080/music-center/addFavouriteSong',
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          "token": wx.getStorageSync('token'),
          "songs": JSON.stringify(fav)
        },
        success: (res) => {
          console.log(res.data);
          userInfo.userFavourite = JSON.stringify(fav)
          wx.setStorageSync('userInfo', userInfo)
        }
      });
    } else if(event.currentTarget.dataset.id == 0) {

    } else {
      wx.showToast({
        title: '请先登录',
        icon: "none",
        duration: 1500,
      })
      setTimeout((fun) => {
        wx.switchTab({
          url: '/pages/userinfo/userinfo',
        })
      },1500)
    }
  },

  drag(event) {
    this.bgam.pause();
  },

  seek(event) {
    this.bgam.seek(event.detail);
    this.setData({
      currentTime: event.detail
    });
    this.bgam.play();
  },

  playAndPause(event) {
    var that = this;
    wx.getBackgroundAudioPlayerState({
      success: (result) => {
        if (result.status==0) {
          that.bgam.play()
        } else if (result.status==1) {
          that.bgam.pause()
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.bgam = wx.getBackgroundAudioManager();
    
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
    if (app.globalData.swichSong) {
      this.bgam.stop();
      let playingSongId = app.globalData.playingSongId;
      let customSongInfo = {};
      let singers = "";
      let that = this;
      wx.request({
        url: 'http://47.110.241.150:3000/song/detail?ids='+playingSongId,
        success: (res) => {
          let songInfo = res.data.songs[0];
          songInfo.ar.forEach(element => {
            singers = singers + element.name + '/';
          });
          singers = singers.substr(0, singers.length-1);
          customSongInfo.id = playingSongId
          customSongInfo.name = songInfo.name;
          customSongInfo.singer = singers;
          customSongInfo.imgUrl = songInfo.al.picUrl;
          customSongInfo.src = 'https://music.163.com/song/media/outer/url?id='+songInfo.id+'.mp3';
          this.bgam.title = songInfo.name;
          this.bgam.singer = singers;
          this.bgam.coverImgUrl = songInfo.al.picUrl
          this.bgam.src = 'https://music.163.com/song/media/outer/url?id='+songInfo.id+'.mp3'
          this.setData({
            songInfo: customSongInfo
          });
        }
      });
      this.bgam.onCanplay(fun => {
        wx.getBackgroundAudioPlayerState({
          success(res) {
            customSongInfo.duration = res.duration;
            that.setData({
              songInfo: customSongInfo
            });
            app.globalData.swichSong = false
          }
        });
      });
      this.bgam.onTimeUpdate((fun) => {
        wx.getBackgroundAudioPlayerState({
          success: (result) => {
            that.setData({
              currentTime: result.currentPosition
            })
          },
        })
      });
      this.bgam.onPause((fun) => {
        that.setData({
          playPauseImg: '/assets/images/player/player-play.png'
        })
      });
      this.bgam.onPlay((fun) => {
        that.setData({
          playPauseImg: '/assets/images/player/player-stop.png'
        })
      });
      let userInfo = wx.getStorageSync('userInfo');
      if(userInfo) {
        if (userInfo.userFavourite.indexOf(playingSongId) != -1) {
          this.setData({
            like_icon: "like"
          })
        } else {
          this.setData({
            like_icon: "like-o"
          })
        }
      };
      let recentPlay = wx.getStorageSync('recentPlay');
      if (recentPlay) {
        if (recentPlay.indexOf(playingSongId)==-1) {
          if (recentPlay.length=10) {
            recentPlay.pop()
            recentPlay.unshift(playingSongId);
            wx.setStorageSync('recentPlay', recentPlay);
          } else {
            recentPlay.unshift(playingSongId);
            wx.setStorageSync('recentPlay', recentPlay);
          }
        } else {
          recentPlay.splice(recentPlay.indexOf(playingSongId), 1);
          recentPlay.unshift(playingSongId);
          wx.setStorageSync('recentPlay', recentPlay);
        }
      } else {
        let recentPlay = []
        recentPlay.unshift(playingSongId);
        wx.setStorageSync('recentPlay', recentPlay);
      }
    }
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