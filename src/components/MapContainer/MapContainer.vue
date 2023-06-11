  <!-- 高德地图组件 -->
<template>
  <div id="container"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
window._AMaoSecurityConfig = {
  securityJsCode: '46202ba8b6bac6cad0c7575418d7d425'
}
export default {
  data() {
    return {
      map: null
    }
  },
  mounted() {
    // DOM初始化完成进行地图初始化
    this.initMap()
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: '19a48c5969896613a4f068ce23315023', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          'AMap.Scale' // 指定居中显示地理数量的缩放和比例尺控制台。您可以使用您
        ] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map('container', {
            // 设置地图容器id
            viewMode: '3D', // 是否为3D地图模式
            zoom: 13, // 初始化地图级别
            center: [116.404, 39.915] // 初始化地图中心点位置
          })
          this.map.addControl(new AMap.Scale())
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 690px;
}
</style>
