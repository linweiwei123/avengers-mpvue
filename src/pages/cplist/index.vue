<template>
    <div class="wrapper">
      <ul class="list">
        <li>
          <span>1、<a href="/pages/toast/main">toast轻提示</a></span>
        </li>
        <li>
          <span>2、<a href="/pages/calenderHotel/main">时间组件-酒店</a></span>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
  .wrapper{
    padding: 15px;
  }
  .list{
    padding: 0 20px;
  }
  .list li{
    list-style: none;
    display: block;
    line-height: 30px;
  }
  .list li a{
    color: blue;
    display: inline-block;
  }
</style>
