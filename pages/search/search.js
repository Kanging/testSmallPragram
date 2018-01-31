//index.js
var WxSearch = require('../../wxSearchView/wxSearchView.js');

Page({
  data: {
    ifFrist:true
  },

  // 搜索栏
  onLoad: function (options) {
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      [], // 热点搜索推荐，[]表示不使用
      [],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
    if (options.iffrist==2){
      this.setData({
        ifFrist:false
      })
    }
  },

  onHide: function () {
    console.log("页面隐藏了-------------------");
  },

  // 转发函数,固定部分
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 搜索回调函数  
  mySearchFunction: function (value) {
    // do your job here
    // 跳转
    var name = value.target.dataset.key.user_name;
    var openid = value.target.dataset.key.user_openid;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
   

    if (this.data.ifFrist){
      
      prevPage.setData({
        fristCheckName: name,
        fristCheckOpenid: openid
      })
      wx.navigateBack({
        // delta: 1,
        // url: '../leave/leave?fristsearchName=' + name + '&fristsearchOpenid=' + openid
      })
    }else{
      prevPage.setData({
        secondCheckName: name,
        secondCheckOpenid: openid
      })
      
      wx.navigateBack({
        // delta: 1,
        // url: '../leave/leave?secondsearchName=' + name + '&seondsearchOpenid=' + openid
      })
    }
  
    // console.log(value.target.dataset.key.user_name);
  },

  // 返回回调函数
  myGobackFunction: function () {
    // do your job here
    // 跳转
    wx.navigateBack({
      // delta: 1,
      // url: '../leave/leave?fristsearchName=' + name + '&fristsearchOpenid=' + openid
    })
  }

})
