const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  }, 
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


    this.goLogin();//每次进入小程序都要获取openid
  },
  goLogin(){
    var that = this;
    wx.login({
      success: function (res) {
      //  console.log(res);

      //  wx.request({
      //    url: 'http://1.kanging01.applinzi.com/logincode.php',
      //    data: {
      //      code: res.code
      //    },
      //    method: "POST",
      //    header: {
      //      'content-type': 'application/x-www-form-urlencoded' // 默认值
      //    },
      //    success: function (res) {
      //      console.log(res.data['openid'])
      //      that.setData({
      //           openid:res.data['openid']
      //      })

      //      console.log("---------" + that.openid)
      //    }
      //  })
      }
    });
   
  },
  getactivitylist(){
    // var id = this.openid;
    // console.log("---------" + app.globalData.openid)
    wx.request({
      url: 'http://127.0.0.1/thinkphp5/public/index/user/getactivitylist',
      
      data: {
        openid: app.globalData.openid
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
         console.log(res);
        // that.setData({
        //   openid: res.data['openid']
        // })
      }
    })
  },
   getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
   test(){
     wx.request({
       url: 'http://127.0.0.1/thinkphp5/public/index/user/getactivitylist',
       data: {
         openid: "openid456"
       },
       method: "POST",
       header: {
         'content-type': 'application/x-www-form-urlencoded' // 默认值
       },
       success: function (res) {
         console.log(res)
       }
     })
  

   }
})