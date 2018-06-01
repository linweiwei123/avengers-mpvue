<template>
  <div>
    <image-picker v-bind:config="config" v-on:errorHandler="error" v-on:onImageClick="onImageClick" ></image-picker>
    <button @click="getFilesInfo">获取文件列表信息</button>
    <div>
      <p class="text" v-for="(item,index) in files" :key="index">{{index}}: {{item}}</p>
    </div>
  </div>
</template>

<script>
    import imagePicker from '@/components/imagePicker';
    import widowToast from '@/components/toast';
    import { getComponentByTag } from "../../utils/helper";
    export default {
        name: "index",
        data(){
          return {
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
            },
            files:[]
          }
        },
        components:{
          'image-picker': imagePicker,
          'widow-toast': widowToast
        },
        mounted (){
          this.imagePicker = getComponentByTag(this,'image-picker');
          this.toast = getComponentByTag(this,'widow-toast');
        },
        methods:{
          error(err){
            // 此处用 toast提示
            console.log('error',err);
            this.toast.fail('上传失败');
          },
          getFilesInfo(){
            let files = this.imagePicker.getFilesInfo();
            this.files = files;
            console.log('获取的到文件信息：',files);
          },
          onImageClick(item){
            wx.previewImage({
              current: '', // 当前显示图片的http链接
              urls: [item.path] // 需要预览的图片http链接列表
            })
          }
        }
    }
</script>

<style scoped>
.text{
  font-size: 12px;
}
</style>
