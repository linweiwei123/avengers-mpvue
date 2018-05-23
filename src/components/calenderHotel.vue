<template>
    <div class="calender-wrapper">
      <div class="weeks box">
        <div class="week fs28" v-for="(item,index) in data.weeks_ch"  :key="index"  v-bind:data-idx="index">{{item}}
        </div>
      </div>
      <div class="month" v-for="(object,index) in data.allDays" :key="index">
        <!--年月-->
        <div class="date-area" style="">
          <div>{{object.year || "--"}} 年 {{object.month || "--"}} 月</div>
        </div>
        <!--日-->
        <div class="days">
          <!--循环空-->
          <div v-if="object.hasEmptyGrid" class="grid white-color" v-for="(emp,index2) in object.empytGrids" :key="index2" v-bind:data-idx="index2"></div>
          <!--循环天-->
          <div class="grid white-color" v-for="(cell,index3) in object.days" :key="index3" v-bind:data-idx="index3"  v-bind:data-object="cell" v-on:click="select" style="">
            <!--天-->
            <div :class="['day',cell.status==0 ? 'disable':'enable',cell.status==3 ? 'border-radius pink-bg' : '']">{{cell.day}}</div>
            <!--今天-->
            <div v-if="cell.status==1" style="color:gray;font-size:12px;text-align:center;">今天</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      props:['options'],
      data(){
        return {
          data:{
          },
          options:this.options
        }
      },
      created(){
        console.log('this.options',this.options);
        //初始化数据
        this.initData = function(cur_year,cur_month) {
          // 计算最近三个月的对象
          var mObject0 = this.calculateDays(cur_year, cur_month);
          if(cur_month+1>12) {
            cur_year = cur_year+1;
            cur_month = 1;
          }else {
            cur_month = cur_month+1;
          }
          var mObject1 = this.calculateDays(cur_year, cur_month);
          if(cur_month+1>12) {//月不能大于12
            cur_year = cur_year+1;
            cur_month = 1;
          }else {
            cur_month = cur_month+1;
          }
          var mObject2 = this.calculateDays(cur_year, cur_month);
          this.data.allDays = [mObject0,mObject1,mObject2];
        };
        // =============获取当月有多少天（下个月月初是多少）==========
        this.getThisMonthDays = function(year, month) {
          return new Date(year, month, 0).getDate();
        };
        // =============获取当月第一周第一天是周几===========
        this.getFirstDayOfWeek = function(year, month) {
          return new Date(Date.UTC(year, month - 1, 1)).getDay();
        };
        //====================计算当前年月空的几天 =============
        this.calculateEmptyGrids = function(year, month) {
          const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
          let empytGrids = [];
          if (firstDayOfWeek > 0) {
            for (let i = 0; i < firstDayOfWeek; i++) {
              empytGrids.push(i);
            }
          }
          return empytGrids;
        };
        // =====================计算当前年月有哪些天===========
        /**
         * 根据年月计算当前月的天对象状态返回对象
         * mObject 年月对象
         * year  年
         * month 月
         * hasEmptyGrid  是都有空调
         * empytGrids  空天数字
         * days 所有日对象【】
         */
        this.calculateDays = function(year, month) {
          var mObject = {};//月对象
          mObject["year"] = year;
          mObject["month"] = month;
          //计算当前年月空的几天
          var empytGrids = this.calculateEmptyGrids(year, month);
          if(empytGrids.length>0) {
            mObject["hasEmptyGrid"] = true;
            mObject["empytGrids"] = empytGrids;
          }else {
            mObject["hasEmptyGrid"] = false;
            mObject["empytGrids"] = [];
          }
          var days = [];
          var thisMonthDays = this.getThisMonthDays(year, month);//这个月有多少天
          //现在的时间
          var cusDate = new Date(this.data.org_year, this.data.org_month,this.data.org_day);
          var startDate;
          var endDate;
          if(this.data.startDate&&this.data.endDate) {
            startDate = stringToDate(this.data.startDate);
            endDate = stringToDate(this.data.endDate);
          }
          if(this.data.startDate){
            startDate = stringToDate(this.data.startDate);
          }
          for (let i = 1; i <= thisMonthDays; i++) {
            var day = {};
            //加入的时间
            var date = new Date(year, month-1,i);
            // console.log(date)
            //status 0-不可选择 1-当前时间 2-可选择 3-被选中
            day["day"] = i;
            //比现在的时间比较是大于还是小于，小于则不可点击
            var time = parseInt(calculateTime(date,cusDate));
            if(time<0) {
              day["status"] = 0;
            }else if(time==0) {
              day["status"] = 1;
            }else {
              day["status"] = 2;
            }
            if(this.data.startDate&&this.data.endDate) {
              console.log(startDate,endDate);
              var stime = parseInt(calculateTime(date,startDate));
              var etime = parseInt(calculateTime(date,endDate));
              console.log(stime,etime);

              if(stime>=0&&etime<=0) {
                day["status"] = 3;
              }
            }else if(this.data.startDate){
              var stime = parseInt(calculateTime(date,startDate));
              if(stime==0) {
                day["status"] = 3;
              }
            }
            days.push(day);
          }
          mObject["days"] = days;
          return mObject;
        };

        console.log('calenderHotel',this.options);

        if(this.options && this.options.startDate&&this.options.endDate) {
          this.data.startDate = this.options.startDate;
          this.data.endDate = this.options.endDate;
        }
        var date = new Date();
        //获取当前的年月
        var cur_year = date.getFullYear();
        var cur_month = date.getMonth() + 1;
        var cur_day = date.getDate();
        const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
        //设置数据
        this.data.org_year = date.getFullYear();
        this.data.org_month = date.getMonth();
        this.data.org_day = cur_day;
        this.data.weeks_ch = weeks_ch;
        this.initData(cur_year,cur_month);

        console.log(this);
      },
      methods:{
        select(e){
          console.log(e.currentTarget.dataset.object);
          var year = e.currentTarget.dataset.object.year;
          var month = e.currentTarget.dataset.object.month;
          var day = e.currentTarget.dataset.idx+1;
          var selectDate = new Date(year,month-1,day);
          //现在的时间
          var cusDate = new Date(this.data.org_year, this.data.org_month,this.data.org_day);
          var time = parseInt(calculateTime(selectDate,cusDate));
          if(time<0) {
            console.log("请选择合理的时间");
            wx.showToast({
              title: '请选择合理的时间',
              icon: 'error',
              duration: 2000
            });
            return;
          }
          if(this.data.startDate&&this.data.endDate) {
            this.data.startDate = formatDate(selectDate,"yyyy-MM-dd");
            this.data.endDate = null;
          }else if(this.data.startDate) {
            this.data.endDate = formatDate(selectDate,"yyyy-MM-dd");
          }else {
            this.data.startDate = formatDate(selectDate,"yyyy-MM-dd");
          }
          this.initData(this.data.org_year, this.data.org_month+1);
          //返回选择的时间（有起止时间的时候返回）
          if(this.data.startDate&&this.data.endDate) {
            console.log('选择了日期：');
            console.log(this.data.startDate);
            console.log(this.data.endDate);
            var sDate = this.data.startDate;
            var eDate = this.data.endDate;

          }
        }
      },
  }

    /**
     * 字符串转时间（yyyy-MM-dd HH:mm:ss）
     * result （分钟）
     */
    function stringToDate(fDate){
      var fullDate = fDate.split("-");
      return new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0);
    }
    /**
     * 计算两个日期相差几天
     * cusDate 当前时间
     * oriDate  比较时间
     * 返回 正数为cusDate>oriDate
     */
    function calculateTime(cusDate,oriDate) {
      var cusTime = cusDate.getTime();
      var oriTime = oriDate.getTime();
      return (cusTime-oriTime)/(1000*60*60*24)
    }

    /**
     * 格式化日期
     * @param date 日期
     * @param format 格式化样式,例如yyyy-MM-dd HH:mm:ss E
     * @return 格式化后的金额
     */
    function formatDate(date, format) {
      var v = "";
      if (typeof date == "string" || typeof date != "object") {
        return;
      }
      var year  = date.getFullYear();
      var month  = date.getMonth()+1;
      var day   = date.getDate();
      var hour  = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      var weekDay = date.getDay();
      var ms   = date.getMilliseconds();
      var weekDayString = "";

      if (weekDay == 1) {
        weekDayString = "星期一";
      } else if (weekDay == 2) {
        weekDayString = "星期二";
      } else if (weekDay == 3) {
        weekDayString = "星期三";
      } else if (weekDay == 4) {
        weekDayString = "星期四";
      } else if (weekDay == 5) {
        weekDayString = "星期五";
      } else if (weekDay == 6) {
        weekDayString = "星期六";
      } else if (weekDay == 7) {
        weekDayString = "星期日";
      }

      v = format;
      //Year
      v = v.replace(/yyyy/g, year);
      v = v.replace(/YYYY/g, year);
      v = v.replace(/yy/g, (year+"").substring(2,4));
      v = v.replace(/YY/g, (year+"").substring(2,4));

      //Month
      var monthStr = ("0"+month);
      v = v.replace(/MM/g, monthStr.substring(monthStr.length-2));

      //Day
      var dayStr = ("0"+day);
      v = v.replace(/dd/g, dayStr.substring(dayStr.length-2));

      //hour
      var hourStr = ("0"+hour);
      v = v.replace(/HH/g, hourStr.substring(hourStr.length-2));
      v = v.replace(/hh/g, hourStr.substring(hourStr.length-2));

      //minute
      var minuteStr = ("0"+minute);
      v = v.replace(/mm/g, minuteStr.substring(minuteStr.length-2));

      //Millisecond
      v = v.replace(/sss/g, ms);
      v = v.replace(/SSS/g, ms);

      //second
      var secondStr = ("0"+second);
      v = v.replace(/ss/g, secondStr.substring(secondStr.length-2));
      v = v.replace(/SS/g, secondStr.substring(secondStr.length-2));

      //weekDay
      v = v.replace(/E/g, weekDayString);
      return v;
    }

</script>

<style scoped>
  .calender-wrapper{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-color: #fff;
  }
  .month{
    display: block;
  }
  .box {
    display: flex;
    align-content: center;
    align-items: center;
  }

  .pink-color {
    color: rgb(64, 70, 128);
  }
  .white-color {
    color: #fff;
  }

  .fs28 {
    font-size: 28rpx;
  }

  /* pages/calendar/calendar.wxss ====================================*/

  .date-area {
    width:100%;
    padding:5px 20px;
    text-align:left;
    font-size:12px;
    background-color:rgb(241,243,246);
  }
  .weeks {
    padding: 10px 0;
    height: 50rpx;
    line-height: 50rpx;
  }
  .week {
    flex: 1;
    text-align: center;
  }
  .days {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    padding:5px 0;
  }
  .grid {
    display: flex;
    width: 107.1428571429rpx;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin: 5px 0;
    text-align: center;
    /*border: 1px solid lightgray;*/
  }
  .day {
    width:35px;
    padding:5px 0;
    color:black;
    font-size:14px;
    font-weight:700;
    text-align:center;
    height:35px;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .border-radius {
    border-radius: 50%;
    position: relative;
    left: 0;
    top: 0;
    color: #fff;
  }
  .disable {
    color: lightgray;
  }
  .pink-bg {
    background-color: #3EDFBA;
  }
  .purple-bg {
    background-color: #b8b8f1;
  }
</style>
