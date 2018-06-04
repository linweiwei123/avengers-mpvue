<template>
   <city-locator v-bind:config="config"></city-locator>
</template>

<script>
  import { getComponentByTag } from "../../utils/helper";
  import thor from '../../common/thor/thor';
  import cityLocator from '@/components/city-locator/cityLocator';
    export default {
        name: "index",
        components:{
          'city-locator': cityLocator
        },
        data(){
          return {
            config:{
              baiduMapAk: 'CtBkwEFod02rjaDlGjxYyRtP1BYLR7Fb',
              hotCitys:[]
            }
          }
        },
        created(){
          // this.config.hostCitys = cityRet.data.list_hotcity;

          thor.get('https://plan.fjhululu.com/apis/base/citylist')
            .then((cityRet)=>{
                console.log('cityRet',cityRet);
                if(cityRet && cityRet.data){
                  this.config.hotCitys = [].concat(cityRet.data.list_hotcity).concat(cityRet.data.list_hotcity).concat(cityRet.data.list_hotcity);
                }
            })
            .catch(err=>{

            })
        },
        mounted(){
          this.cityLocator = getComponentByTag(this,'city-locator')

          // 键路径
          this.$watch('config.hotCitys', function (newVal, oldVal) {
            // 做点什么
            console.log(newVal,oldVal);
          })
        }
    }
</script>

<style scoped>

</style>
