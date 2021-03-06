## cityLocator组件使用文档

效果图

![image](http://adstatic.oss-cn-beijing.aliyuncs.com/ad-activity.meiyou.com/dkd2/v4/cityLocator.png)

### 说明
1、此组件无关闭与打开功能，页面放了组件就直接显示，请用一个专门的页面来存放，选择的数据结果通过vuex传递或者通过其他办法传值，并且关闭此页面;

2、页面与百度地图api强耦合，后面会剥离

### 引入cityLocator
1、copy components中city-locator文件夹到你的工程目录中

2、在页面中使用(参考 src/pages/city-locator/index.vue文件)

加入依赖文件
```
    import { getComponentByTag } from "../../utils/helper";
    import cityLocator from '@/components/city-locator/cityLocator';
```

component依赖
```
    components:{
      'city-locator': cityLocator
    }

```

**配置城市选择组件**
```
     config:{
       baiduMapAk: 'CtBkwEFod02rjaDlGjxYyRtP1BYLR7Fb', // 百度ak
       hotCitys:[], // 热门城市 数组，内容就是那个接口返回的数据格式
       choosedCity:{} // 默认选择的城市 是个对象，包含{ city:'城市名',cityCode:'城市编码'}
     }
```


### 调用

html

```
    <city-locator v-bind:config="config" v-on:onCity="onCity"></city-locator>

```
methods

1、选择城市后回传的信息
```
    onCity(item){
       this.toast.showToast(`选择了${item.city}`)
       // 这里拿到了数据，你把值通过redux传递到需要的页面，然后关闭此页面
     }

```

```

**支持的事件**


支持事件 | 说明
---|---
onCity | 选择后回传选中的城市信息

**支持的options**

支持配置 | 是否必填 |说明
---|---|---
baiduMapAk | 必填 | 百度ak
hotCitys | 必填| 热门城市 数组，内容就是那个接口返回的数据格式
choosedCity |  非必填 | 默认选择的城市 是个对象，包含{ city:'城市名',cityCode:'城市编码'}


