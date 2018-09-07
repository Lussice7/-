var util = require("../json/question.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions:[],
    selected: 0,
    chooseAnswer:'',
    correctAnswer:[],
    isShow:false,
    result:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        questions:util.questions
    })
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
   
  },
  checkboxChange: function (e) {
      var str='';
      e.detail.value.forEach(element => {
          str+=element;
      });
      this.data.chooseAnswer=str;
  },
//   ridio监听事件
  listenerRadioGroup:function(e){
    this.data.chooseAnswer=e.detail.value;
  },
//  确定按钮
  ascertain:function(e){
    var num = parseInt(e.currentTarget.dataset.num);
    var grade = parseFloat(e.currentTarget.dataset.grade);
    var answer = e.currentTarget.dataset.answer;
    if(answer==this.data.chooseAnswer){
        this.setData({
            isShow:true,
        })
        this.data.correctAnswer[num]=grade;
        console.log(this.data)
    }else{
        this.setData({
            isShow: false
        })
    }
    this.setData({
        result:true
    });
  },
  nextquestion:function(e){
    var num = parseInt(e.currentTarget.dataset.num) + 1;
    this.setData({
        selected: num,
        isShow:false,
        result:false
    })
  }
  
})