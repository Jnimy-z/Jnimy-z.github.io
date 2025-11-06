<template>
    <div class="custom-word-cloud" :style="containerStyle">
      <span
        v-for="(word, index) in renderedWords"
        :key="index"
        :style="getWordStyle(word)"
        @click="handleWordClick(word)"
        class="word-item"
      >
        {{ word.text }}
      </span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomWordCloud',
    props: {
      words: {
        type: Array,
        default: new Array(15).fill().map((item, index) => {
            return {text: '词' + index, value: parseInt((Math.random() * 100), 10)}
        }) // 格式: [{text: '词', value: 权重}]
      },
      width: {
        type: String,
        default: '500px'
      },
      height: {
        type: String,
        default: '400px'
      },
      minFontSize: {
        type: Number,
        default: 14
      },
      maxFontSize: {
        type: Number,
        default: 60
      },
      colorPalette: {
        type: Array,
        default: () => ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#C44569']
      }
    },
    data() {
      return {
        renderedWords: []
      };
    },
    computed: {
      containerStyle() {
        return {
          width: this.width,
          height: this.height,
          position: 'relative',
          overflow: 'hidden',
          margin: '0 auto',
          textAlign: 'center'
        };
      },
      // 计算权重范围
      valueRange() {
        if (this.words.length === 0) return { min: 0, max: 1 };
        
        const values = this.words.map(word => word.value);
        return {
          min: Math.min(...values),
          max: Math.max(...values)
        };
      }
    },
    mounted() {
      this.generateWordCloud();
    },
    methods: {
      generateWordCloud() {
        if (this.words.length === 0) return;
        
        this.renderedWords = this.words.map(word => {
          // 计算字体大小基于权重
          const fontSize = this.calculateFontSize(word.value);
          // 随机颜色
          const color = this.getRandomColor();
          // 随机位置（简单实现，实际需要碰撞检测）
          const position = this.getRandomPosition(fontSize, word.text.length);
          
          return {
            ...word,
            fontSize,
            color,
            ...position
          };
        });
      },
      
      calculateFontSize(value) {
        const { min, max } = this.valueRange;
        if (min === max) return this.maxFontSize;
        
        const ratio = (value - min) / (max - min);
        return this.minFontSize + ratio * (this.maxFontSize - this.minFontSize);
      },
      
      getRandomColor() {
        return this.colorPalette[
          Math.floor(Math.random() * this.colorPalette.length)
        ];
      },
      
      getRandomPosition(fontSize, textLength) {
        // 简化的位置计算，实际项目需要更复杂的碰撞检测算法
        const estimatedWidth = fontSize * textLength * 0.6;
        const estimatedHeight = fontSize;
        
        return {
          top: Math.random() * (parseInt(this.height) - estimatedHeight) + 'px',
          left: Math.random() * (parseInt(this.width) - estimatedWidth) + 'px'
        };
      },
      
      getWordStyle(word) {
        return {
          fontSize: word.fontSize + 'px',
          color: word.color,
          position: 'absolute',
          top: word.top,
          left: word.left,
          cursor: 'pointer',
          fontWeight: 'bold',
          padding: '2px 4px',
          transform: `rotate(${Math.random() * 30 - 15}deg)`,
          transition: 'all 0.3s ease',
          opacity: 0.8
        };
      },
      
      handleWordClick(word) {
        this.$emit('wordClick', word);
        
        // 添加点击效果
        const wordElement = event.target;
        wordElement.style.transform = 'scale(1.1) rotate(0deg)';
        wordElement.style.opacity = '1';
        
        setTimeout(() => {
          wordElement.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
          wordElement.style.opacity = '0.8';
        }, 300);
      }
    },
    watch: {
      words: {
        handler() {
          this.generateWordCloud();
        },
        deep: true
      }
    }
  };
  </script>
  
  <style scoped>
  .custom-word-cloud {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
  
  .word-item:hover {
    z-index: 10;
    filter: brightness(1.2);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  </style>