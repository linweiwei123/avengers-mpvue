## calenderHotel组件使用文档

效果图

![image](http://adstatic.oss-cn-beijing.aliyuncs.com/ad-activity.meiyou.com/dkd2/v4/calender2.png
)

### 引入calenderHotel
1、copy components中的calenderHotel.vue 文件

2、在页面中使用(参考 src/pages/calenderHotel/index.vue文件)

加入依赖文件
```
    import { getComponentByTag } from "../../utils/helper";
    import calenderHotel from '@/components/toast';
```

component依赖
```
    components: {
        'calender-hotel': calenderHotel
    },
    mounted (){
      this.calenderHotel = getComponentByTag(this,'calender-hotel');
    }

```

**配置日期控件**
```
    calenderConfig:{
      startDate:'2018-05-25', //初始开始日期,可不填
      endDate:'2018-05-28', // 初始结束日期，可不填
      themeColor: '#3EDFBA', //主题颜色，可不填，默认绿色
      months:3 //需要的月份，可不填，默认6个月
    }
```


### 调用

#### 1、简写的方式使用
html

```
    <calender-hotel v-bind:config="calenderConfig" v-on:choosed-date="(date)=>{chooseDate=date}"/>

```
methods
```
    this.calenderHotel.show()

```

**支持的method**


支持方法 | 说明
---|---
show | 显示
hide | 隐藏

**支持的options**

支持配置 | 说明
---|---
startDate | 初始开始日期,可不填
endDate | 初始结束日期，可不填
themeColor | 主题颜色，可不填，默认绿色
months | 需要的月份，可不填，默认6个月

