<template>
  <div>
    <ul id="treeDemo" class="ztree"></ul>
  </div>
</template>

  <script>
import $ from 'jquery';
import 'ztree';
import 'ztree/css/zTreeStyle/zTreeStyle.css';

export default {
  data() {
    return {
      zTreeObj: null, // 用于保存ztree实例
      // zTree的配置
      setting: {
        data: {
          simpleData: {
            enable: true,
            idKey: 'id',
            pIdKey: 'pId',
            rootPId: 0,
          },
        },
        callback: {
          onClick: this.onNodeClick,
        },
      },
      // 节点数据
      zNodes: [
        { id: 1, pId: 0, name: '父节点1' },
        { id: 11, pId: 1, name: '子节点1' },
        { id: 12, pId: 1, name: '子节点2' },
      ],
    };
  },
  mounted() {
    // 在mounted钩子中初始化ztree，确保DOM已渲染
    this.initZTree();
  },
  methods: {
    initZTree() {
      this.zTreeObj = $.fn.zTree.init(
        $('#treeDemo'),
        this.setting,
        this.zNodes
      );
    },
    onNodeClick(event, treeId, treeNode) {
      console.log('节点被点击:', treeNode);
    },
    // 示例：动态添加节点
    addNode() {
      const newNode = { id: 13, pId: 1, name: '新增节点' };
      this.zTreeObj.addNodes(this.zTreeObj.getNodeByParam('id', 1), newNode);
    },
  },
};
</script>