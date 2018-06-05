
## 按照与启动

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 依赖模块说明

1. http模块使用雷神thor 在common/thor目录下（请参考index页面）
2. 支持使用vuex（请参考index页面）
3. 支持less（请查看assets/css/app.less与index.vue页面）

## thor使用说明
引用
```
import thor from '../../common/thor/thor'
```
以下方法config参照[wx.request](https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html#wxrequestobject)

get, delete等 请求
```
  thor.get(url,config)
    .then(res=>{
      console.log('请求成功', res);
    })
    .catch(err=>{
      console.log('请求失败',err);
    })

```
post,put,patch等请求
```
thor.post(url,data,config)
    .then(res=>{
      console.log('请求成功', res);
    })
    .catch(err=>{
      console.log('请求失败',err);
    })
```

通用请求
```
thor.request({
        url:'',//地址
        method:'',//方法
        data:''//参数
        header:'' //有需要就填
    })
    .then(res=>{
      console.log('请求成功', res);
    })
    .catch(err=>{
      console.log('请求失败',err);
    })

```
## 适配

小程序天然进行适配，有两种方式
```
/** 375px = 750rpx = 屏幕宽 **/
/** 1、[css单位演示]-px (px以375px标准宽进行适配) **/
.section{
  width: 375px;
}

/** 2、[css单位演示]-rpx (rpx以750rpx标准宽进行适配) **/
.section{
  width: 750rpx;
}
```

## vuex使用

与web中的vuex使用一致

## less使用

### 设置主题色举例
```
@theme-color: #FFA735;

.text-label {
  color: @theme-color
}
```

### 变量计算举例
```
@bg-grey: #dddddd;
@light-bg-grey: @bg-grey + #111;

.bgColor {
  background-color: @light-bg-grey;
}
```

## 👩🏿‍🎤 avengers-mpvue(复仇者UI) 使用说明文档
#### 前置条件 （主要在你的工程中copy atong-weapp的代码）
1、需要公共样式文件 src/assets/css/widow.css （后面所有的通用组件的样式都会放这里）
2、需要 src/utils/helper.js 文件（封装的组件中会用到）
#### 反馈提示
1. [toast](./doc/toast.md) 吐司轻提示
2. [calenderHotel](./doc/calenderHotel.md) 日期控件
3. [imagePicker](./doc/imagePicker.md) 上传图片组件
4. [cityLocator](./doc/cityLocator.md) 城市定位与选择
