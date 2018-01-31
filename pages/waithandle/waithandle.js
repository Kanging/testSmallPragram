var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    searchSongList: [], //放置返回数据的数组  
    isFromSearch: true,   // 用于判断searchSongList数组是不是空数组，默认true，空的数组  
    searchPageNum: 1,   // 设置加载的第几次，默认是第一次  
    callbackcount: 15,      //返回数据的个数  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏  
  },
  placeChoose: function (options) {
    console.log(options);
    if (options.currentTarget.dataset.data.activity_secondcheck_openid==""){//没有第二审核人
      wx.navigateTo({
        url: '../waithandleinfo/waithandleinfo?id=--' + '&activity_id=' + options.currentTarget.dataset.data.activity_id + '&handle_id=' + options.currentTarget.dataset.data.handle_id + '&handle_one_or_two=' + options.currentTarget.dataset.data.handle_one_or_two + '&sid=' + options.currentTarget.dataset.data.user_openid
        // url: '../waithandleinfo/waithandleinfo?res=' + options
      })
    }else{

    
      wx.navigateTo({
        url: '../waithandleinfo/waithandleinfo?id=' + options.currentTarget.dataset.data.activity_secondcheck_openid + '&activity_id=' + options.currentTarget.dataset.data.activity_id + '&handle_id=' + options.currentTarget.dataset.data.handle_id + '&handle_one_or_two=' + options.currentTarget.dataset.data.handle_one_or_two + '&sid=' + options.currentTarget.dataset.data.user_openid
        // url: '../waithandleinfo/waithandleinfo?res=' + options
      })
    }
  },

  onShow: function () {
    console.log("显示了-------------");
    //访问网络  
    var that = this;




    wx.request({
      url: 'http://172.16.81.57/thinkphp5/public/index/user/getactivitylist',
      data: {
        openid: app.globalData.openid,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.data != 0) {
          let searchList = [];

          that.setData({
            searchSongList: res.data.data, //获取数据数组  
            // zhida: data.data.zhida, //存放歌手属性的对象  
            searchLoading: false   //把"上拉加载"的变量设为false，显示  
          });
          //没有数据了，把“没有数据”显示，把“上拉加载”隐藏  
        } else {
          that.setData({
            searchLoadingComplete: true, //把“没有数据”设为true，显示  
            searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
          });
        }

      },
      fail: function (err) {
        console.log("服务器访问失败03")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
  },

  
})