const dayjs = require('../utils/dayjs.js');
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
    disabledDate({ day, month, year }) {
      const now = new Date();
      const date = new Date(year, month - 1, day);
      return date > now;
    },
    // 需要改变日期时所使用的字段
    changeTime: '',
    selectPopModalEle: null,
    selectDate: dayjs(new Date()).format('YYYY/MM/DD'),
    tempSelectDate: {},
    threeMonthList: []
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
  handleSelectDate() {
    this.data.selectPopModalEle?.onShow();
    this.setData({
      changeTime: this.data.selectDate
    });
  },
  // 返回
  handleConfirm() {
    const { tempSelectDate } = this.data;
    this.setData({
      selectDate: dayjs(`${tempSelectDate.year}/${tempSelectDate.month}/${tempSelectDate.day}`).format('YYYY/MM/DD')
    })
    this.data.selectPopModalEle?.setData({ isShow: false });

  },
  handleCloseModal() {

  },
  handleChangeDate(e) {
    console.log(e, 'gssss');
    const { type } = e.currentTarget.dataset;
    const { selectDate } = this.data;
    console.log(selectDate, selectDate.split('/')[0], 'selectDate')

    const date = this.getComputeDay(+selectDate.split('/')[0], +selectDate.split('/')[1], +selectDate.split('/')[2],type);
    console.log(date, dayjs(date).isAfter(dayjs().startOf('day')), 'gssss');
    if(dayjs(date).isAfter(dayjs().startOf('day'))){
      wx.showToast({ title: '不可选择今天之后的日期', icon: 'none' }).then();
      return;
    }
    this.setData({
      selectDate: dayjs(date).format('YYYY/MM/DD')
    });

  },
    /**
   * 计算前一天 / 后一天
   * @param year 年
   * @param month 月
   * @param day 日
   * @param type 类型 pre 前一天 next 后一天
   */
    getComputeDay(year, month, day, type) {
      const date = new Date(year, month-1, day); // 月份是从0开始的，所以减1
      if(type === 'pre'){
        date.setDate(date.getDate() - 1); // 减去一天
      }else{
        date.setDate(date.getDate() + 1); // 加一天
      }
      return date.getFullYear() + '/' + (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0');
    },
    getDateList(e) {
      const { setYear, setMonth } = e.detail;
      const curYearMonth = dayjs(`${setYear}-${setMonth}`).format('YYYY-MM');
      const { threeMonthList } = this.data;
      const newThreeMonthList = [...threeMonthList, curYearMonth].reduce((prev, cur) => {
        prev.indexOf(cur) === -1 && prev.push(cur);
        return prev
      },[]);
      this.setData({
        threeMonthList: newThreeMonthList.slice(-3)
      },() => {
        console.log(this.data.threeMonthList, 'llllsssggg');
      })

    }
 
})