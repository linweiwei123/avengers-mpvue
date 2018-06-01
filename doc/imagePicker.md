## imagePicker组件使用文档

效果图

![image](http://adstatic.oss-cn-beijing.aliyuncs.com/ad-activity.meiyou.com/dkd2/v4/upload.png)

### 说明
此imagePicker与七牛云强耦合，只适用于使用七牛云上传，如果不适用，需做改造，后面我会弄个跟七牛云无关的

### 引入imagePicker
1、copy components中的引入imagePicker.vue 文件

2、在页面中使用(参考 src/pages/image-picker/index.vue文件)

加入依赖文件
```
    import { getComponentByTag } from "../../utils/helper";
    import imagePicker from '@/components/imagePicker';
```

component依赖
```
    components: {
          'image-picker': imagePicker,
    },
    mounted (){
      this.imagePicker = getComponentByTag(this,'image-picker');
    }

```

**配置图片上传组件**
```
   config:{
      // 获取token地址
      tokenUrl: 'https://plan.fjhululu.com/apis/base/getQiniuToken',
      // 上传的服务器地址
      serverUrl: 'https://upload.qiniup.com/',
      // 图片预览的域名地址
      previewHost: 'https://p8rgabhis.bkt.clouddn.com',
      // 查看https://developers.weixin.qq.com/miniprogram/dev/api/media-picture.html#wxchooseimageobject
      sizeType:['original','compressed'],
      // 最多支持上传的文件
      max: 4
    }
```


### 调用

html

```
    <image-picker v-bind:config="config" v-on:errorHandler="error" v-on:onImageClick="onImageClick" ></image-picker>

```
methods

1、获取上传后的文件url列表
```
   let files = this.imagePicker.getFilesInfo();

```
2、图片点击事件，一般用来预览
```
  onImageClick(item){
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [item.path] // 需要预览的图片http链接列表
    })
  }

```

2、错误事件钩子（当获取token失败，或者上传失败时触发，这个时候需要判断错误（具体有哪些错误我也不知道，建议你干脆统统提示‘操作失败’），提示用户）
```
  error(err){
    // 此处用 toast提示
    this.toast.fail('上传失败');
  },

```

**支持的method**


支持方法 | 说明
---|---|---
getFilesInfo | 获取最终文件数据

**支持的options**

支持配置 | 是否必填 |说明
---|---|---
tokenUrl |必填| 获取token的地址
serverUrl | 必填|七牛云上传地址
previewHost |  必填|七牛云的预览地址

sizeType |  非必填| sizeType 指定是否是压缩的，默认压缩与不压缩都行
max |  非必填|图片上传熟练限制，默认4
