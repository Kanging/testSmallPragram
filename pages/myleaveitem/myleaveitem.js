// pages/myleaveitem/myleaveitem.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:1,
    name:'',
    timelong:'',
    st:'',
    et:'',
    fristcheckname:'',
    secondname:'',
    fristresult:'',
    secondresult:'',
    reson:'',
    address:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this;
  console.log(options);
    wx.request({
      url: 'http://172.16.81.57/thinkphp5/public/index/user/getsinglemyactivity',
      data: {
        activity_id: options.activity_id,
        activity_secondcheck_openid: options.id
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res);
        that.setData({
          name: app.globalData.userData.data.user_name,
          timelong: res.data.data.activity_time,
          st: res.data.data.activity_st,
          et: res.data.data.activity_et,
          reson: res.data.data.activity_reson,
          fristcheckname: res.data.data.user_name,
          fristresult: res.data.data.activity_fristcheck_result,
          // if(res=null){
            secondname: res.data.data.secondname,
          // },
         
          secondresult: res.data.data.activity_secondcheck_result,
          types: res.data.data.activity_type,
          address: res.data.data.activity_address
        })
        if (that.data.secondname!=null){
            that.setData({
              secondname: res.data.data.secondname.user_name
            })
        }

        if (res.data.data.activity_allresult==3){
          fristresult: res.data.data.activity_fristcheck_result,
            that.setData({
            fristresult: 2,
            secondresult: 2,
            })
           
        }
      },
      fail: function (err) {
        console.log("服务器访问失败03")
      }
    })
  },

  formSubmit: function () {
    wx.navigateBack({
      
    })
  }
})