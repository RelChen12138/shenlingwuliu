  <!-- 高德地图组件 -->
<template>
  <div id="container"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
window._AMaoSecurityConfig = {
  securityJsCode: '46202ba8b6bac6cad0c7575418d7d425'
}
import bus from '@/bus/bus'
export default {
  data() {
    return {
      map: null,
      autoOptions: {
        input: ''
      },
      searchPlaceInput: '',
      auto: null
    }
  },
  watch: {
    searchPlaceInput(newValue) {
      console.log(newValue)
      if (newValue != null) {
        this.placeSearch.search(newValue)
      }
    }
  },
  created() {
    bus.$on('shareUserInput', (val) => {
      this.autoOptions.input = val.inputId
      this.searchPlaceInput = val.keyword
    })
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
          'AMap.ToolBar',
          'AMap.Scale',
          'AMap.HawkEye',
          'AMap.MapType',
          'AMap.Geolocation',
          'AMap.AutoComplete',
          'AMap.PolygonEditor'
        ]
      })
        .then((AMap) => {
          this.map = new AMap.Map('container', {
            // 设置地图容器id
            viewMode: '3D', // 是否为3D地图模式
            zoom: 13, // 初始化地图级别
            center: [116.404, 39.915] // 初始化地图中心点位置
          })
          this.map.addControl(new AMap.Scale())
          this.map.addControl(new AMap.ToolBar())
          this.map.addControl(new AMap.HawkEye())
          this.map.addControl(new AMap.MapType())
          this.map.addControl(new AMap.Geolocation())
          this.map.addControl(new AMap.PolygonEditor())
          this.auto = new AMap.AutoComplete(this.autoOptions)
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
