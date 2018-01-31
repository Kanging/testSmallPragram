
var app = getApp();
Page({
  data: {
    userData:{},
    fristCheckName:'',
    fristCheckOpenid:'',
    secondCheckName: '',
    secondCheckOpenid: '',
    showView: false,
    types:1,
    dates: '',
    times: '',
    datee: '',
    timee: '',
    title:'',
    timelong:'',
    formid:'',
    st:'',
    et:'',
    typeitems: [
      { name: '1', value: '请假'},
      { name: '2', value: '出差'},
    ]
  },
  radioChange: function (e) {
    // console.log(e.detail.value);
    var that = this;
    this.setData({
      showView: (!that.data.showView),
      types: e.detail.value
    })
    if(this.data.types==1){
      wx.setNavigationBarTitle({ title: '请假' })
    }else{
      wx.setNavigationBarTitle({ title: '出差' })
    }
  },
  //  开始时间组件确定事件  
  bindTimeChange: function (e) {
    this.setData({
      times: e.detail.value
    })
  },
  //  开始日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  //  结束时间组件确定事件  
  bindTimeChangeEnd: function (e) {
   
    this.setData({
      timee: e.detail.value
    })
  },
  //  结束日期组件确定事件  
  bindDateChangeEnd: function (e) {
    // console.log(e.detail.value)
    this.setData({
      datee: e.detail.value
    })
  },
  formSubmit: function (e) {
    // console.log(e)
    var that = this;
    var opneid = app.globalData.openid;
    var types = this.data.types;
    var st = e.detail.value.datestart + e.detail.value.timestart.trim();
    
    var et = e.detail.value.dateend + e.detail.value.timee.trim();
    this.setData({
      st: st,
      et:et,
      formid:e.detail.formId
    })
    if (e.detail.value.datestart == "" || e.detail.value.timestart == "" || this.data.datee == "" || this.data.timee == "") {
      console.log("请完善具体时间" + e.detail.value.timestart);
      return;
    }
    var address = e.detail.value.address;
    if(types==2&&address==""){
      console.log("请输入出差地点");
        return;
    }
    if (types == 1){
        this.setData({
          address:''
        })
    }else{
      this.setData({
        address: address
      })
    }
    var timelong = e.detail.value.timelong;
    var check_fristid = this.data.fristCheckOpenid;
    var check_secondid = this.data.secondCheckOpenid;
    var reson = e.detail.value.reson;
    console.log(check_fristid + "   "+check_secondid)
    if(reson==""){
      console.log("请填写事由");
      return;
    }
    
    wx.request({
      url: 'http://172.16.81.57/thinkphp5/public/index/user/leave',
      data: {
        activity_openid: opneid,
        activity_type:types,
        activity_st:st,
        activity_et:et,
        activity_time: timelong,
        activity_reson:reson,
        activity_fristcheck_openid: check_fristid,
        activity_secondcheck_openid: check_secondid,
        activity_address: address
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        // console.log(res);
        if (res.statusCode==200){
          that.sendmassage(check_fristid, check_secondid);//发送模板消息
          wx.showModal({
            title: '提示',
            showCancel:false,
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
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })


  },

  sendmassage(fristid,secondid){
    var that = this;
    var sendnum = 1;//发送信息的数量
    if (secondid!=""){//需向两个审核人发送消息
      sendnum = 2;
    }
    if(that.data.address==""){
      var types = "请假";
    }else{
      var types = "出差";
    }
    console.log("-----------------"+secondid);
    wx.request({
      url: 'http://1.kanging01.applinzi.com/muban.php',
      data: {
        openid: app.globalData.openid,
        username:that.data.userData.data.user_name,
        address: that.data.address,
        form_id: that.data.formid,
        types: types,
        st:that.data.st,
        et:that.data.et,
        sendnum: sendnum,
        fristid:fristid,
        secondid: secondid,
        checkname: that.data.fristCheckName + "  " + that.data.secondCheckName
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
  },


  gosearch1(){
    wx.navigateTo({
      url: '../search/search?iffrist=1'
    })
  },
  gosearch2() {
    wx.navigateTo({
      url: '../search/search?iffrist=2'
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    console.log(options);
    // if (options && options.fristsearchName) {
    //   this.setData({
    //     fristCheckName: options.fristsearchName,
    //     fristCheckOpenid: options.fristsearchOpenid
    //   });
    // }else{
    //   this.setData({
    //     secondCheckName: options.secondsearchName,
    //     secondCheckOpenid: options.seondsearchOpenid
    //   });
      
    // }
    if (options.type==2){
      wx.setNavigationBarTitle({ title: '出差' })
        this.setData({
          types: options.type,
          'typeitems[0].checked':false,
          'typeitems[1].checked':true,
          showView:true
        })
    }else{
      wx.setNavigationBarTitle({ title: '请假' })
      this.setData({
        'typeitems[0].checked': true,
        'typeitems[1].checked': false
      })
    }

    this.setData({
      userData: app.globalData.userData
    })
  },



})