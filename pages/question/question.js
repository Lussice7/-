var question=require("../json/question.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper:{
      indicatorDots: false,
      autoplay: false,
      duration: 300,
      current: 0
    },
    chooseAnswer: '',
    correctAnswer: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      questions:question.questions
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
  bindchange:function(e){
    var swiper=this.data.swiper;
    swiper.current=e.detail.current;
    this.setData({
      swiper:swiper
    })
  },  
  listenerRadioGroup:function(e){
    var da=e.detail.value; //选中的答案
    var grade=e.currentTarget.dataset.grade;
    var correct = e.currentTarget.dataset.answer;        //正确答案
    var index = e.currentTarget.dataset.fix;   //题号
    if(da==correct){
      this.data.correctAnswer[index]=grade;
    }else{
      this.data.correctAnswer[index] = 0;
    }
    this.nextQuestion();
  },
  checkboxChange:function(e){
      var grade = e.currentTarget.dataset.grade;
      var correct = e.currentTarget.dataset.answer; //正确答案
      var index = e.currentTarget.dataset.fid; //题号
      var str = '';
      e.detail.value.forEach(element => {
        str += element;
      });
      if(str==correct){
        this.data.correctAnswer[index] = grade;
      }else{
        this.data.correctAnswer[index] = 0;
      }
  },
  prevQuestion: function () {
    var swiper=this.data.swiper;
    var current=swiper.current;
    swiper.current=current > 0 ? current-1 : 0;
    this.setData({
      swiper:swiper
    })
  },
  nextQuestion: function () {
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current <(this.data.questions.length-1) ? current + 1 : current;
    this.setData({
      swiper: swiper
    })
  },
  submit:function(){
    var correctAnswer = this.data.correctAnswer;
    var grade=0;
    if(correctAnswer.length==0){
      grade=0;
    }else{
      correctAnswer.forEach(item=>{
        if(item==undefined){
          grade += Number(item);
        }
      })
    }
    if(correctAnswer.length<30){
      wx.showModal({
        title: '提示',
        content: '您还有题没有作答，确定要交卷？',
        success: function (res) {
          if (res.confirm) {
            wx.showToast({
              title: '总分:'+grade,
              icon: 'none'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
        wx.showModal({
          title: '提示',
          content: '您确定要交卷？',
          success: function (res) {
            if (res.confirm) {
              wx.showToast({
                title: '总分:' + grade,
                icon: 'none'
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
    }
    this.data.correctAnswer.forEach(item=>{
      console.log(item)
    })
  }
})