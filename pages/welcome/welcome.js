// pages/welcome/welcome.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.globalData.openid);
    if (app.globalData.openid!=""){
      console.log("隐藏后进入");
      wx.redirectTo({
        url: '../index/index'
      })
    }else{

    app.userInfoReadyCallback = res => {
      if (app.globalData.loginStatus == 1) {//已注册，登录成功
        wx.redirectTo({
          url: '../index/index'
        })
      } else {//未注册register
        wx.redirectTo({
          url: '../register/register'
        })
      }

    }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },


})