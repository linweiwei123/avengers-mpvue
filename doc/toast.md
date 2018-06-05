## toast组件使用文档

### 引入toast
1、copy components中的toast.vue 文件

2、在页面中使用(参考 src/pages/toast/index.vue文件)

加入依赖文件
```
    import { getComponentByTag } from "../../utils/helper";
    import widowToast from '@/components/toast';
```

component依赖
```
    components: {
          'widow-toast': widowToast
    },
    mounted (){
      this.toast = getComponentByTag(this,'widow-toast');
    }

```

### 调用

#### 1、简写的方式使用

```
    规则：this.toast[method]('提示信息');

    举例：this.toast.success( '简单使用');
```
```
    规则： this.toast[method](options);

    举例： this.toast.success({
              message: '操作成功！',
              masker: false
            });

```

**支持的method**


支持方法 | 说明
---|---
success | 成功提示
fail | 失败提示
loading | loading提示
nonet | 无网络提示

**支持的options**

支持配置 | 说明
---|---
icon | 图标，支持success、fail、loading、nonet
masker | true为有透明背景遮罩（防止误触）、false为无背景遮罩
message | 提示
image | 自定义图标（==*尚未支持==）

#### 2、复杂的方式使用
```
    规则：this.toast.showToast(option);

    举例：this.toast.showToast({
      message: '只有文字！'
    });
```
