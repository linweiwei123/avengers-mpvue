<template>
  <div>
    <div class="section-citylocate list">
      <div class="search item">
        <span class="icon-search"></span>
        <span class="text" @click="change">
          <span v-if="searchStatus==='text'">城市/区域/位置</span>
          <input type="text"  v-if="searchStatus==='input'">
        </span>
      </div>
      <div class="current item">
        <div class="mini-title">当前</div>
        <div class="location">
          <span class="icon"></span>
          <span class="address">{{cityInfo.address}}</span>
        </div>
        <div class="cur-select"></div>
      </div>
      <div class="hot list">
        <div class="mini-title">热门</div>
        <div class="city-list item" v-for="(line, index) in hotCitys" v-bind:key="index">
          <div class="city-item" v-bind:class="{hide: !item.city}" v-for="(item, index2) in line" v-bind:key="index2" >{{item.city}}</div>
        </div>
      </div>
    </div>
    <div class="section-citylist">

    </div>
    <div class="select-city-list">
      <div></div>
    </div>
  </div>
</template>

<script>
    import thor from '../../common/thor/thor';
    export default {
        name: "cityLocator",
        props:['config'],
        data(){
          return {
            address:'',
            baiduMapAk: this.config.baiduMapAk,
            cityInfo:{
              cityCode: '',
              address: ''
            },
            hotCitys: this.config.hotCitys,
            searchStatus:'text'
          }
        },
        computed:{
          formatHotCitys(){
            let tempList = [];
            let hotCitys = this.config.hotCitys;
            let l = Math.floor(hotCitys.length / 4);
            for(let i=0;i<l;i++){
              tempList.push(hotCitys.slice(i*4,(i+1)*4));
            }
            let tempLastArr = [];
            let lastCount = hotCitys.length % 4;
            if(lastCount !== 0){
              for(let j=0;j<4;j++){
                if(j<lastCount){
                  tempLastArr.push(hotCitys[4*l+j])
                }
                else{
                  tempLastArr.push({})
                }
              }
              tempList.push(tempLastArr);
            }
            this.hotCitys = tempList;
          }
        },
        created(){
          const that = this;
          wx.getLocation({
            type: 'wgs84',
            success: function(res) {
              var latitude = res.latitude;
              var longitude = res.longitude;
              thor.get(`https://api.map.baidu.com/geocoder/v2/?ak=${that.baiduMapAk}&location=${latitude},${longitude}&output=json`)
                .then(baiduRet=>{
                  that.cityInfo.cityCode = baiduRet.result.cityCode;
                  that.cityInfo.address = baiduRet.result.formatted_address;
                })
                .catch(err=>{
                  console.log('请求百度地图失败', err);
                })
            }
          })
        },
        mounted(){

        },
        watch: {
          'config.hotCitys': function (newVal, oldVal) {
            console.log('config.hotCitys',newVal,oldVal);
          }
        },
        methods:{
          change(){
            this.searchStatus = 'input';
          }
        }

    }
</script>

<style scoped>
  .list .item{
    padding: 5px 0;
  }
  .section-citylocate{
    background-color: #F7F7F7;
    padding: 0 10px;
  }
  .search {
    background-color: #3EDFBA;
    height: 40px;
    width: 100%;
    border-radius: 3px;
    color: #fff;
    font-size: 16px;
    line-height: 40px;
  }
  .icon-search{
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEMxMjkyQjM2N0YwMTFFODg2OTRBQUFEM0M5RkZEMDQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEMxMjkyQjQ2N0YwMTFFODg2OTRBQUFEM0M5RkZEMDQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4QzEyOTJCMTY3RjAxMUU4ODY5NEFBQUQzQzlGRkQwNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QzEyOTJCMjY3RjAxMUU4ODY5NEFBQUQzQzlGRkQwNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps+rFokAAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAAMxJREFUeNrs2FEOhTAIRFG6/037a5QmUAaeL7l8asIxai2jrYEyEBAQEBAQEBAQEJAPIHarHsSe1YCYU2LE/JIir655xaKGc0yN+LIK2XSTIttmKSWCJM8IkYxip8YMspTI2RWAgHwGGVknP13xMmTwK2zNyFZp2H6tdfv1FRMPEk7H/IB3PkHqXmGNcj7VJ5TwbX1fflzJjM3PpmGlFOeiSi0zBpViMI0p1fQbUsoRO6LUc/wIskaQ1f9M+IEDAgICAgICAgLyp8glwAAaKSUPk7A2owAAAABJRU5ErkJggg==');
    background-repeat:no-repeat;
    height:40px;
    width:40px;
    display:inline-block;
    background-size:cover;
    position:absolute;
  }
  .search .text{
    margin-left:40px;
    display:inline-block;
  }
  .search input[type='text']{
    background-color: #fff;
    height: 30px;
    margin-top: 5px;
    color: #000;
    padding-left: 3px;
    width: 305px;
  }
  .mini-title{
    font-size: 12px;
    color: #999999;
    margin:10px 0;
  }
  .icon{
    background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAApCAYAAABQgPsBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCQjlCRUVDMjQzOTIxMUU4ODBFQjg5QTdDMTJBMTIwQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCQjlCRUVDMzQzOTIxMUU4ODBFQjg5QTdDMTJBMTIwQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJCOUJFRUMwNDM5MjExRTg4MEVCODlBN0MxMkExMjBDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJCOUJFRUMxNDM5MjExRTg4MEVCODlBN0MxMkExMjBDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+lKSJhQAABBtJREFUeNq8mHlIVUEUxp+3rFxa/mjFsiKLSlpoBS0M24gooshsoaJFWizI0myD/CfaMFqhMlrIMiozMq2gQtoojIr2srCNSItotV6LfQe+C4N478zzPTvw4+F7d8ZvZs45c84NSkpK8gTAwsFXfyao6+PzFogDw0EM6AyaKb+XgQfgKigEV0BlIIWEgTlgIYjkd6/ATfAG/ALBoA2IBoPAcvAMbAZZoMJfIWPBFhABHoFUkAueu4zpyHGzOTYFJIPTblvtZPXATnCcf0/hajdqRIg9Bet4dNNBCDgFMp0W7yQklOrFk3NAF5AN/vroU7/Bfo4/CRZxYSEmQmQn8sAQsBpMBF/8jKqPPKoNYDQXV0cnZD0YCtaCDE/gTKInTRGT4SZkGCPjBL2+NmwpOAvSwYDqhMiRbAPvwUzD+A+mQ/askk90OzONx73V1qAKmcywW8YzdTPJJXvBB/AQ3GIyK6ZPBWnGv+PRyALGyRdBSoq/A5qAKCYoJxsBjjDJyRYXgW9cxATQgr/Lqn+6zCORU8qkF2PHdHeSoRHRFxwD5SCeO6BaOp1xPvjBHOJkkmkPgCWyeEtZpdhRl4FBTNU/GdrFDpNLBt3DHYnXHNExfg63hQxQLiwni+GuSXiXaP6BXAOfwQLNc8V02lhbiHj+PU2kDOZnjmECO8Odc7M/dPZoW0gEHcfN2vBYSg3D9DHrlEaa517I/7d49uLB3zUDpPCpz3xjWix56LS6ecMsHkcFw9HN7vMz1lDIQPAEeDXPNRR/so/mJeikGXCaky42ECGFUR8lKtxM8tYrW0gRc0S4y4C3YAcYqRHTjuErDrtJI6IpI/G6LSSfZ59gcGFdZnEk0dO1ik9IRXaDzp/Ie8vNJvGaybWFSKH7GszT3BNe3tCy4vH0m3J6vtw7u8Anhu05g0J8Lqu5C5ZSScnN2xuM0kwgjj2LF5Ykt2uc7DBXGM1d01ki85cU15XqpRfKjCkr6mHg7f5YKLP4X4rxqmWA5JEV/CHVU7u2ErRlxeatrkLbxwhaBbrVkoh+XGiBGt5WNdXTLKrM5hYG0iTdH+RFN0dXPJewbu3GUi6QlsUCai47RW1fI0e0G8xgkRMIS2PIb2cFZ9zpJTMMMw0KHJ1J+7CGzXmKry2nl01RGXvd3jUU0Z85RpLeGKe0YGkmKedq7Owb5aOIrux5f1FEeU2acNtucWcaU0xrQxHtWeWHsSa+q8v3JnaB6VsmPw9aGfQ9MqY5HfSayRsgUzvO9qADxbTUiIig+ALTV1G+mCSjqSyiLrP2UE2uh0usbxOUdysBFyJ2iG1lJN+RRfP7XrweWrCNzPP15VxN7KjiwEVMehdBA1Zw+b5OaPmRpPKVXmcbb+84+o/nfwoRu84usZDV/e2aTvRPgAEAdkvwWMPAfKIAAAAASUVORK5CYII=');
    height:12px;
    width:12px;
    background-size:contain;
    background-repeat:no-repeat;
  }
  .location{
    margin-top: 12px;
    font-size: 12px;
  }
  .location .address{
    margin-left: 6px;
  }
  .city-list{
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .hot .city-list:first-child{
    margin-top: 10px;
  }
  .hot {
    padding-bottom: 5px;
  }
  .city-item{
    height: 30px;
    width: 77px;
    border: 1px solid rgba(0,0,0,0.1);
    text-align: center;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 3px;
  }
  .city-item.hide{
    opacity: 0;
  }
</style>
