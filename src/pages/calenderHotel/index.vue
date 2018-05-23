<template>
  <div class="toast-container">
  <div class="button" @click="show">显示日期控局</div>
    <calender-hotel v-bind:options="date"/>
  </div>
</template>

<script>
  import { getComponentByTag } from "../../utils/helper";
  import calenderHotel from '@/components/calenderHotel';
  export default {
    name: "index",
    data(){
      return {
        count: 0,
        date: {startDate:'2018-05-25',endDate:'2018-05-28'}
      }
    },
    components: {
      'calender-hotel': calenderHotel
    },
    mounted (){
      this.calenderHotel = getComponentByTag(this,'calender-hotel');
    },
    methods: {

    }
  }
</script>

<style scoped>
  .button{
    width:100%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #dddddd;
    background-color: #fff;
    border-radius: 5px;
    padding: 0;
    text-align: center;
    margin-bottom: 10px;
  }

</style>
