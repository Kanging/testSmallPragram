//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    avatarUrl:'',
    motto: 'Hello World',
    userInfo: {},
    userData:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
      this.setData({
        userInfo: app.globalData.userInfo,
        userData: app.globalData.userData,
        hasUserInfo: true
      })
  },
  goActicity1(e){
    wx.navigateTo({
      url: '../leave/leave?type=1'
    })
  },
   goActicity2(e) {
     wx.navigateTo({
       url: '../leave/leave?type=2'
     })
  },
  goMyleaveList(e) {
     wx.navigateTo({
       url: '../myleavelist/myleavelist'
     })
   },
   waithandle(){
     wx.navigateTo({
       url: '../waithandle/waithandle'
     })
   }

})
