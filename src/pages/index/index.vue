<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <a href="/pages/counter/main" class="counter">Router举例</a>
    <div class="section" style="margin-top: 10px">
      <button @click="count()">VueX的使用举例，count</button>
      <p class="count-value">countValue的值:{{countValue}}</p>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import thor from '../../common/thor/thor'
import { INCREMENT } from '../../store/mutation-types';

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    card
  },
  computed: {
    countValue: function(){
      return this.$store.state.demo.count
    }
  },
  mounted(){
  },
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    searchCity (){
      let cityUrl = 'http://result.eolinker.com/wYP6JLz90f26fac05e677d66cf8a93dd0771d41f4c8d8ca?uri=apis/hotel/search?cityName=福州keyword=万达';
      thor.get(cityUrl)
        .then(res=>{
          console.log('请求成功', res);
        })
        .catch(err=>{
          console.log('请求失败',err);
        })
    },
    count (){
      this.$store.commit(INCREMENT)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
    this.searchCity()
  }
}
</script>

<style scoped>
.section{
  width: 375px;
}
.count-value{
  width: 750rpx;
  margin-top: 10px;
  padding: 5px;
  background-color: aliceblue;
  text-align: center;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
