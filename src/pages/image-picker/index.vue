<template>
    <div class="widow-image-picker">
      <!--内部边距控制-->
      <div class="widow-image-picker-list">
          <!-- 每行4个图 -->
          <div class="widow-flex">
            <!-- 块级边距控制 -->
            <div class="widow-flex-item">
              <!-- 图片块 -->
              <div class="widow-image-picker-item">
                <div class="widow-image-picker-item-remove"></div>
                <div class="widow-image-picker-item-content"></div>
              </div>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",

    }
</script>

<style scoped>

</style>
