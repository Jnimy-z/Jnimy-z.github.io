<template>
  <div ref="mapContainer" class="base-map"></div>
  <div ref="popupCom" class="popup" :style="mapPopupStyle">
    <div><strong>地图信息</strong></div>
    <div>经度: {{ mapPopup.lon }}</div>
    <div>纬度: {{ mapPopup.lat }}</div>
    <div>缩放: {{ mapPopup.zoom }}</div>
    <div>分辨率: {{ mapPopup.resolution }}</div>
    <button class="close-btn" @click="mapPopup = null">关闭</button>
  </div>
</template>

<script setup>
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { OSM, XYZ } from 'ol/source';
import { onMounted } from 'vue';
import { defaults } from 'ol/control/defaults';
import MousePosition from 'ol/control/MousePosition.js';
//导入ol标注相关的方法和属性
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { ref, nextTick } from 'vue';
import Overlay from 'ol/Overlay'; // 引入覆盖物模块
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon as IconStyle,
  Text,
} from 'ol/style';

var map = ref(null);
const chinaData = [
  { name: '龙泉驿区', value: [104.28, 30.56] },
  {
    name: '双流区',
    value: [103.92, 30.57],
  },
];
const pointLayer = ref(
  new VectorLayer({
    name: 'pointLayer',
    source: new VectorSource({}),
    style: null,
  })
);

const popupCom = ref(null);
const mapContainer = ref(null);
const mapPopup = ref({});
const mapPopupStyle = ref({});
const features = ref(null);
const resolution = ref(0);
const zoom = ref(0);
const overlay = ref(null); // 覆盖物实例

onMounted(() => {
  nextTick(() => {
    initMap();
  });
});

function renderFeatures() {
  //清除该图层所有的feature要素
  pointLayer.value.getSource().clear();
  //创建features
  createFeature(chinaData);
  //将features加入到图层中
  pointLayer.value.getSource().addFeatures(features.value);
}
function createFeature(chinaData) {
  features.value = [];
  for (const city of chinaData) {
    let feature = new Feature({
      geometry: new Point(city.value),
      name: city.name,
    });
    feature.setStyle(
      new Style({
        image: new IconStyle({
          src: '/public/mapicon/blueIcon.png', // 替换为你的图标图片路径
          scale: 0.1, // 可选：调整图标大小缩放比例
          opacity: 1, // 可选：设置图标透明度
          // anchor: [0.5, 1] // 可选：设置图标的锚点，例如图标底部中心对准坐标点
        }),
        text: new Text({
          text: city.name,
          textAlign: 'center',
          font: '14px PingFangSC-Regular',
          offsetX: 0,
          offsetY: 40,
          padding: [6, 6, 3, 6],
          backgroundStroke: new Stroke({
            color: 'rgba(0, 0, 0, 0)',
            width: 1,
          }),
          backgroundFill: new Fill({
            color: 'rgba(0,194,233, 0.4)',
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 1)',
          }),
        }),
      })
    );
    // feature.setStyle(createCommandNumberStyle(command))
    features.value.push(feature);
  }
}

//创建点的标注实例和样式
function renderPoint() {
  let feature = new Feature({
    geometry: new Point([116.405289, 39.904987]), //设置标注点的经纬度
    name: '北京',
    //可以写一些自定义的属性
  });
  //为feature设置样式
  feature.setStyle(
    new Style({
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: '#fff',
        }),
        fill: new Fill({
          color: '#3399CC',
        }),
      }),
      text: new Text({
        text: '北京-110',
        textAlign: 'center',
        font: '14px PingFangSC-Regular',
        offsetX: 0,
        offsetY: -20,
        padding: [6, 6, 3, 6],
        backgroundStroke: new Stroke({
          color: 'rgba(0, 0, 0, 0)',
          width: 1,
        }),
        backgroundFill: new Fill({
          color: 'rgba(0,194,233, 0.4)',
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 255, 1)',
        }),
      }),
    })
  );
  pointLayer.value.getSource().addFeatures([feature]);
}

function initMap() {
  overlay.value = new Overlay({
    element: popupCom.value, // 弹窗标签，在html里
    autoPan: true, // 如果弹窗在底图边缘时，底图会移动
    autoPanAnimation: {
      // 底图移动动画
      duration: 250,
    },
  });
  map.value = new Map({
    target: mapContainer.value,
    layers: [
      // 图层
      new TileLayer({
        source: new XYZ({
          title: '高德',
          url: 'https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
        }),
      }),
    ],
    view: new View({
      // 地图视图
      center: [104.06, 30.67], // 地图中心点坐标
      projection: 'EPSG:4326', // 坐标系，有EPSG:4326和EPSG:3857
      zoom: 10, // 地图默认缩放级别
    }),
    controls: defaults().extend([new MousePosition()]),
    overlays: [overlay.value], // 绑定一个覆盖物
  });
  zoom.value = map.value.getView().getZoom();
  resolution.value = map.value.getView().getResolution().toFixed(2);

  renderPoint();
  renderFeatures();

  map.value.addLayer(pointLayer.value);

  mapClick();
}
// 点击地图事件
function mapClick() {
  map.value.on('singleclick', (evt) => {
    const feature = map.value.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature;
    });

    if (
      feature &&
      pointLayer.value.getSource().getFeatures().includes(feature)
    ) {
      const [lon, lat] = evt.coordinate;
      mapPopup.value = {
        lon: lon.toFixed(6),
        lat: lat.toFixed(6),
        zoom: zoom.value,
        resolution: resolution.value,
      };
      overlay.value.setPosition(evt.coordinate);
      return;
    }
  });
}
</script>

<style lang="less" scoped>
.base-map {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
