// pages/register/register.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  formSubmit: function (e) {
    console.log(e);
    var name = e.detail.value.name;
    var num = e.detail.value.number;

    wx.request({
      url: 'http://172.16.81.57/thinkphp5/public/index/user/regiter',
      data: {
        openid: app.globalData.openid,
        name:name,
        num:num,
        
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          app.globalData.userData = res.data;
          wx.reLaunch({
            url: '../index/index'
          })
        //   // wx.reLaunch
        //   wx.showToast({
        //     title: '注册成功',
        //     duration: 2000
        //   });
        //   that.sendmassage(check_fristid, check_secondid);
        }

      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
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