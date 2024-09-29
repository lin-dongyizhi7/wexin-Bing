Page({
  onShow() {
    wx.reportAnalytics('enter_home_programmatically', {})

    // http://tapd.oa.com/miniprogram_experiment/prong/stories/view/1020425689866413543
    if (wx.canIUse('getExptInfoSync')) {
      console.log('getExptInfoSync expt_args_1', wx.getExptInfoSync(['expt_args_1']))
      console.log('getExptInfoSync expt_args_2', wx.getExptInfoSync(['expt_args_2']))
      console.log('getExptInfoSync expt_args_3', wx.getExptInfoSync(['expt_args_3']))
    }
    if (wx.canIUse('reportEvent')) {
      wx.reportEvent('expt_event_1', {
        expt_data: 1
      })
      wx.reportEvent('expt_event_2', {
        expt_data: 5
      })
      wx.reportEvent('expt_event_3', {
        expt_data: 9
      })
      wx.reportEvent('expt_event_4', {
        expt_data: 200
      })

      wx.reportEvent('weexpt_event_key_1', {
        option_1: 1,
        option_2: 10,
        option_str_1: 'abc'
      })
      wx.reportEvent('weexpt_event_key_1', {
        option_1: 'abc',
        option_2: '1000',
        option_str_1: '1'
      })
    }

    this.sayHello()
  },
  onShareAppMessage() {
    return {
      title: '聊天',
      path: 'page/chat/index'
    }
  },
  onShareTimeline() {
    '聊天'
  },

  data: {
    chatList: [{
        id: new Date().getTime(),
        message: '突然出现XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        time: new Date().getTime(),
        type: 1
      },
      {
        id: new Date().getTime() + 1,
        message: '突然出现',
        time: new Date().getTime(),
        type: 0
      },
    ],
    sendList: [],
    theme: 'light',
    inputMsg: ''
  },

  bindFormSubmit(e) {
    this.setData({
      inputMsg: e.detail.value.textarea
    })
    let newList = this.data.sendList.slice()
    const time = new Date()
    let msgObj = {
      id: time.getTime(),
      message: e.detail.value.textarea,
      time: time,
      type: 0
    }
    newList.push(msgObj)
    this.setData({
      sendList: newList
    })
  },

  onInputMsgChange(e) {
    this.setData({
      inputMsg: e.detail.value.textarea
    })
  },

  sayHello() {
    const time = new Date()
    const timeH = time.getHours()
    const timeM = time.getMinutes()
    console.log(time, timeH, timeM)
    let msg
    if (timeH > 5 && timeH < 8) {
      msg = '小宝儿早上好！';
    } else if (timeH > 8 && timeH < 11) {
      msg = '小宝儿上午好！';
    } else if (timeH > 11 && timeH < 13) {
      msg = '小宝儿中午好！';
    } else if (timeH > 13 && timeH < 18) {
      msg = '小宝儿下午好！';
    } else if (timeH > 18 && timeH < 23 && timeM < 50) {
      msg = '小宝儿晚上好！';
    } else if (timeH < 23 && timeM >= 50) {
      msg = '亲爱的小宝儿晚安安！';
    } else {
      msg = '小宝儿怎么啦，抱抱小宝儿~';
    }
    let newList = this.data.chatList.slice()
    let msgObj = {
      id: time.getTime(),
      message: msg,
      time: time,
      type: 1
    }
    newList.push(msgObj)
    this.setData({
      chatList: newList
    })
    console.log(this.data.chatList)
  },

  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    })
    if (wx.onThemeChange) {
      wx.onThemeChange(({
        theme
      }) => {
        this.setData({
          theme
        })
      })
    }
  },

  kindToggle(e) {
    const id = e.currentTarget.id
  }
})