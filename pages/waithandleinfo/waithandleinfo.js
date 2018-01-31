// pages/myleaveitem/myleaveitem.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: 1,
    name: '',
    timelong: '',
    st: '',
    et: '',
    fristcheckname: '',
    secondname: '',
    fristresult: '',
    secondresult: '',
    reson: '',
    address: '',
    activity_id:'',
    handle_id:'',
    handle_one_or_two:'',
    sid:'',
    fromid:''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("页面跳转参数");
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
        console.log("访问成功参数");
        console.log(res);
        that.setData({
          name: res.data.data.name.user_name,
          timelong: res.data.data.activity_time,
          st: res.data.data.activity_st,
          et: res.data.data.activity_et,
          reson: res.data.data.activity_reson,
          fristresult: res.data.data.activity_fristcheck_result,
     
          types: res.data.data.activity_type,
          address: res.data.data.activity_address,
          activity_id: res.data.data.activity_id,
          handle_id: options.handle_id,
          handle_one_or_two: options.handle_one_or_two,
          sid: options.sid
        })

        if (res.data.data.secondname != null) {
          if (res.data.data.activity_fristcheck_result == 0 && (res.data.data.activity_secondcheck_result == 0 || res.data.data.activity_secondcheck_result==null) ){
            that.setData({
              fristcheckname: res.data.data.user_name + "(未审核)    " + res.data.data.secondname.user_name+"(未审核)"
            })
          } else if (res.data.data.activity_fristcheck_result == 1 && (res.data.data.activity_secondcheck_result == 0 || res.data.data.activity_secondcheck_result == null)){
            that.setData({
              fristcheckname: res.data.data.user_name + "(已同意)    " + res.data.data.secondname.user_name + "(未审核)"
            })
          } else if (res.data.data.activity_fristcheck_result == 0 && res.data.data.activity_secondcheck_result == 1){
            that.setData({
              fristcheckname: res.data.data.user_name + "(未审核)    " + res.data.data.secondname.user_name + "(已同意)"
            })
          }

          // that.setData({
          //   fristcheckname: res.data.data.user_name + "  " + res.data.data.secondname.user_name
          // })
          
        }else{
          if (res.data.data.activity_fristcheck_result == 1){
            that.setData({
              fristcheckname: res.data.data.user_name+"(已同意)"
            })
          }else{
            that.setData({
              fristcheckname: res.data.data.user_name + "(未审核)"
            })
          }
          // that.setData({
          //   fristcheckname: res.data.data.user_name 
          // })
        }
      },
      fail: function (err) {
        console.log("服务器访问失败03")
      }
    })
  },

  formSubmit: function () {
    // wx.navigateBack({

    // })
  },
  formSubmit: function (e) {
    console.log(e);
    this.setData({
      fromid:e.detail.formId
    })
  },
  agree(){
    console.log("--------------------agree");
    var that = this;
    console.log(app.globalData.openid + "  " + that.data.activity_id);
    wx.request({
      url: 'http://172.16.81.57/thinkphp5/public/index/user/handleactivity',
      data: {
        openid: app.globalData.openid,
        activity_id:that.data.activity_id,
        check_result:1,
        handle_id: that.data.handle_id,
        check_one_or_two: that.data.handle_one_or_two

      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if(res.data.data==0){//当data=0说明所有审核都同意该申请，便可向申请人发送服务通知
            that.sendMsg("同意", that.data.sid, that.data.fromid);
          }
         
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '提交成功',
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({//返回
                })
              }
            }
          })
        }
      },
      fail: function (err) {
        console.log("服务器访问失败03")
      }
    })
  },
  rejact(){
    console.log("--------------------reject");
    var that = this;
    wx.request({
      url: 'http://172.16.81.57/thinkphp5/public/index/user/handleactivity',
      data: {
        openid: app.globalData.openid,
        activity_id: that.data.activity_id,
        check_result: 2,
        handle_id: that.data.handle_id,
        check_one_or_two: that.data.handle_one_or_two
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        // console.log("----------------" + res.statusCode);
        if (res.statusCode==200){

          that.sendMsg("拒绝", that.data.sid, that.data.fromid);
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '提交成功',
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({//返回
                })
              }
            }
          })
        }

      },
      fail: function (err) {
        console.log("服务器访问失败03")
      }
    })
  },

  sendMsg(result,id,fromid){
    var that = this;
    // console.log(that.data.sid + "    " + that.data.name + "  " + result + "  " + id + "  " + that.data.fromid + " " + that.data.types + "  " + that.data.st + " " + that.data.et);
    wx.request({
      url: 'http://1.kanging01.applinzi.com/resultmuban.php',
      data: {
        openid: that.data.sid,
        username: that.data.name,
        form_id: that.data.fromid,
        types: that.data.types,
        st: that.data.st,
        et: that.data.et,
        result:result
      },

      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        console.log(res)


      },
      fail: function (err) {
        console.log("服务器访问失败02")
      }
    })
  }
})