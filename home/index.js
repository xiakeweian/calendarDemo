 Page({
  data: {
   
    spotMap: {
      y2022m5d9: 'deep-spot',
      y2022m5d10: 'spot',
      y2022m6d10: 'spot',
      y2022m7d10: 'spot',
      y2022m8d10: 'spot',
      y2022m10d1: 'spot',
      y2023m5d10: 'spot',
      y2024m5d10: 'spot',
      y2024m7d18: 'spot',
      y2024m7d19: 'spot',
      y2024m7d20: 'comment-spot',
      y2024m7d21: 'spot',
      y2024m7d22: 'repair-spot',
      y2024m7d23: 'deep-spot',
    },
    // 例子，今天之后的日期不能被选中
    // disabledDate({ day, month, year }) {
    //   const now = new Date();
    //   const date = new Date(year, month - 1, day);
    //   return date > now;
    // },
    // 需要改变日期时所使用的字段
    changeTime: '',
    selectPopModalEle: null,
    selectDate: '',
    tempSelectDate: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.selectPopModalEle = this.selectComponent('#pop_modal_id');
  },
  // 日期改变的回调
  selectDay({ detail }) {
    // console.log(detail, '选中的时间');
    this.setData({
      tempSelectDate: detail
    });
  },
  // 展开收起时的回调
  openChange({ detail }) {
    console.log(detail, '下拉展开收回');
    
  },
  changetime() {
    this.setData({
      changeTime: '2022/1/1',
    });
  },
  handleSelectDate() {
    this.data.selectPopModalEle?.onShow();
  },
  // 返回
  handleConfirm() {
    const { tempSelectDate } = this.data;
    this.setData({
      selectDate: `${tempSelectDate.year}/${tempSelectDate.month}/${tempSelectDate.day}`
    })
    this.data.selectPopModalEle?.setData({ isShow: false });

  },
  handleCloseModal() {

  },
 
})