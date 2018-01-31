//app.js
App({
  aa:1,
  onLaunch: function () {
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())  
    wx.setStorageSync('logs', logs)

    var that = this;
    // 登录初始化
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://1.kanging01.applinzi.com/logincode.php',
          // url: 'http://172.16.81.57/thinkphp5/public/index/user/getcode',
          data: {
            code: res.code
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            that.globalData.openid = res.data.openid;
            console.log( res)

            //判断用户是否已经注册
            wx.request({
              url: 'http://172.16.81.57/thinkphp5/public/index/user/login',
              data: {
                openid: that.globalData.openid
              },
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (res) {
                // console.log(res)
                if(res.data['code']==401){
                  that.globalData.isrestgiter = "1"
                  console.log("未注册" + that.globalData.openid)
                } else if (res.data['code'] == 200){
                  console.log("登录成功")
                  that.globalData.userData = res.data;
                  that.globalData.loginStatus = 1;//登录成功后改变登录状态码
                }

                console.log("数据初始化完成！！");

                wx.getUserInfo({//此请求写在此处是为了ReadyCallback，当所有的加载都完成时才进行下一步操作
                  success: res => {
                    that.globalData.userInfo = res.userInfo

                    if (that.userInfoReadyCallback) {
                      that.userInfoReadyCallback(res)
                    }
                  }

                })


              },
              fail: function (err) {
                console.log("服务器访问失败03")
              }
            })
          },
          fail: function (err) {
            console.log("服务器访问失败02")
          }
        })
      },
      fail: function (err) {
        console.log("服务器访问失败01")
      }
      
    })
    
    

    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // console.log(this.globalData.userInfo);
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           } 
    //         },
    //         fail: function () {
    //             console.log("2授权失败返回数据");
    //         } 
    //       })
    //     }else{
    //       console.log("未授权");
    //     }
    //   }
    // })
    
  },
  globalData: {//全局变量
    userInfo: null,//微信账号用户信息
    userData:null,//服务器用户信息
    openid: "",
    session_key: "",
    loginStatus: 0,//登录状态，1为成功，0为未登录
    isrestgiter:''
  }
})