<template>
  <div class="ol-tutorial-demo-container">
    <div ref="mapContainer" class="map"></div>
    <!-- 地图点击弹窗 -->
    <div v-if="mapPopup" class="popup" :style="mapPopupStyle">
      <div><strong>地图信息</strong></div>
      <div>经度: {{ mapPopup.lon }}</div>
      <div>纬度: {{ mapPopup.lat }}</div>
      <div>缩放: {{ mapPopup.zoom }}</div>
      <div>分辨率: {{ mapPopup.resolution }}</div>
      <button class="close-btn" @click="mapPopup = null">关闭</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { XYZ, Vector as VectorSource } from "ol/source";
import { defaults as defaultControls, FullScreen, ScaleLine } from "ol/control";
import { defaults as defaultInteractions } from "ol/interaction/defaults";
import { fromLonLat, toLonLat } from "ol/proj";
import "ol/ol.css";

const map = ref(null);
const mapContainer = ref(null);
const vectorSource = ref(null);
const pointLayer = ref(null);

// 状态栏
const zoom = ref(0);
const resolution = ref(0);

// 地图弹窗
const mapPopup = ref(null);
const mapPopupStyle = ref({});


onMounted(() => {
  // 初始化图层
  const baseLayer = new TileLayer({
    source: new XYZ({
      url: "https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
    }),
  });
  vectorSource.value = new VectorSource();
  pointLayer.value = new VectorLayer({ source: new VectorSource() });
  // 初始化地图
  map.value = new Map({
    target: mapContainer.value,
    layers: [baseLayer, pointLayer.value],
    view: new View({ center: fromLonLat([116.4, 39.9]), zoom: 12 }),
    controls: defaultControls().extend([new FullScreen(), new ScaleLine()]),
    interactions: defaultInteractions({
      doubleClickZoom: false, // 禁用双击缩放
    }),
  });
  // 单击弹窗
  map.value.on("singleclick", (evt) => {
    // 检查点标记
    // const feature = map.value.forEachFeatureAtPixel(evt.pixel, (f) => f);
    // if (
    //   feature &&
    //   pointLayer.value.getSource().getFeatures().includes(feature)
    // ) {
    //   // 点标记弹窗
    //   const [lon, lat] = toLonLat(feature.getGeometry().getCoordinates());
    //   pointPopup.value = {
    //     id: points.value.find((p) => p.feature === feature).id,
    //     lon: lon.toFixed(6),
    //     lat: lat.toFixed(6),
    //   };
    //   pointPopupStyle.value = {
    //     left: evt.pixel[0] + 20 + "px",
    //     top: evt.pixel[1] + 20 + "px",
    //   };
    //   return;
    // }
    // 地图弹窗
    const [lon, lat] = toLonLat(evt.coordinate);
    mapPopup.value = {
      lon: lon.toFixed(6),
      lat: lat.toFixed(6),
      zoom: zoom.value,
      resolution: resolution.value,
    };
    mapPopupStyle.value = {
      left: evt.pixel[0] + 20 + "px",
      top: evt.pixel[1] + 20 + "px",
    };
  });
});

onUnmounted(() => {
  if (map.value) map.value.dispose();
});
</script>

<style scoped>
.ol-tutorial-demo-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.map {
  width: 100%;
  height: 100%;
}
.statusbar {
  position: absolute;
  left: 20px;
  bottom: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 1rem;
  color: #1a237e;
  display: flex;
  gap: 18px;
  z-index: 10;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
.popup {
  position: absolute;
  min-width: 180px;
  background: #fffbe7;
  border: 1px solid #ffe082;
  border-radius: 8px;
  padding: 15px 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  z-index: 20;
  color: #795548;
}
.close-btn {
  margin-top: 10px;
  background: #ffc107;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
.close-btn:hover {
  background: #ff9800;
}
.context-menu {
  position: absolute;
  z-index: 30;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  list-style: none;
  padding: 0;
  margin: 0;
  min-width: 140px;
  font-size: 1rem;
}
.context-menu li {
  padding: 12px 18px;
  cursor: pointer;
  color: #1976d2;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.2s;
}
.context-menu li:last-child {
  border-bottom: none;
}
.context-menu li:hover {
  background: #e3f2fd;
}
</style>
