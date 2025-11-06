<template>
  <div class="custom-word-cloud" :style="containerStyle" ref="container">
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
        return { text: '词' + index, value: parseInt(Math.random() * 100, 10) };
      }), // 格式: [{text: '词', value: 权重}]
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '400px',
    },
    minFontSize: {
      type: Number,
      default: 14,
    },
    maxFontSize: {
      type: Number,
      default: 60,
    },
    colorPalette: {
      type: Array,
      default: () => [
        '#FF6B6B',
        '#4ECDC4',
        '#45B7D1',
        '#FFA07A',
        '#98D8C8',
        '#C44569',
      ],
    },
    layoutAlgorithm: {
      type: String,
      default: 'spiral', // 'random' 或 'spiral'
      validator: (value) => ['random', 'spiral'].includes(value),
    },
  },
  data() {
    return {
      renderedWords: [],
      containerSize: { width: 0, height: 0 },
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
        textAlign: 'center',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      };
    },
    valueRange() {
      if (this.words.length === 0) return { min: 0, max: 1 };

      const values = this.words.map((word) => word.value);
      return {
        min: Math.min(...values),
        max: Math.max(...values),
      };
    },
  },
  mounted() {
    this.updateContainerSize();
    this.generateWordCloud();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    updateContainerSize() {
      if (this.$refs.container) {
        const rect = this.$refs.container.getBoundingClientRect();
        this.containerSize = {
          width: rect.width,
          height: rect.height,
        };
      }
    },

    handleResize() {
      this.updateContainerSize();
      this.generateWordCloud();
    },

    generateWordCloud() {
      if (this.words.length === 0) return;

      // 按权重排序，先放置大词
      const sortedWords = [...this.words].sort((a, b) => b.value - a.value);
      const placedWords = [];

      this.renderedWords = sortedWords.map((word) => {
        // 计算字体大小
        const fontSize = this.calculateFontSize(word.value);
        const color = this.getRandomColor();

        // 估算文字尺寸
        const estimatedWidth = fontSize * word.text.length * 0.6;
        const estimatedHeight = fontSize;

        const wordWithSize = {
          ...word,
          fontSize,
          color,
          estimatedWidth,
          estimatedHeight,
        };

        // 获取位置（带碰撞检测）
        let position;
        if (this.layoutAlgorithm === 'spiral') {
          position = this.getSpiralPosition(wordWithSize, placedWords);
        } else {
          position = this.getRandomPositionWithCollision(
            wordWithSize,
            placedWords
          );
        }

        const positionedWord = {
          ...wordWithSize,
          x: position.x,
          y: position.y,
          placementSuccess: position.success,
        };

        placedWords.push(positionedWord);
        return positionedWord;
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

    // 矩形碰撞检测
    checkRectCollision(rect1, rect2) {
      return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );
    },

    getWordRect(word, x, y) {
      return {
        left: x,
        top: y,
        right: x + word.estimatedWidth,
        bottom: y + word.estimatedHeight,
        width: word.estimatedWidth,
        height: word.estimatedHeight,
      };
    },

    // 随机位置 + 碰撞检测
    getRandomPositionWithCollision(word, placedWords, maxAttempts = 100) {
      const containerWidth = this.containerSize.width;
      const containerHeight = this.containerSize.height;

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const x = Math.random() * (containerWidth - word.estimatedWidth);
        const y = Math.random() * (containerHeight - word.estimatedHeight);

        const currentRect = this.getWordRect(word, x, y);

        let hasCollision = false;
        for (const placedWord of placedWords) {
          const placedRect = this.getWordRect(
            placedWord,
            placedWord.x,
            placedWord.y
          );

          if (this.checkRectCollision(currentRect, placedRect)) {
            hasCollision = true;
            break;
          }
        }

        if (!hasCollision) {
          return { x, y, success: true };
        }
      }

      // 失败时返回中心位置
      return {
        x: containerWidth / 2 - word.estimatedWidth / 2,
        y: containerHeight / 2 - word.estimatedHeight / 2,
        success: false,
      };
    },

    // 螺旋布局算法
    getSpiralPosition(
      word,
      placedWords,
      maxRadius = null,
      angleStep = 0.3,
      radiusStep = 2
    ) {
      const containerWidth = this.containerSize.width;
      const containerHeight = this.containerSize.height;
      const centerX = containerWidth / 2;
      const centerY = containerHeight / 2;

      // 设置最大半径（容器对角线的一半）
      const maxR =
        maxRadius ||
        Math.sqrt(
          containerWidth * containerWidth + containerHeight * containerHeight
        ) / 2;

      let angle = 0;
      let radius = 0;
      let attempt = 0;
      const maxAttempts = 500; // 防止无限循环

      while (radius < maxR && attempt < maxAttempts) {
        attempt++;

        // 计算螺旋坐标
        const x = centerX + Math.cos(angle) * radius - word.estimatedWidth / 2;
        const y = centerY + Math.sin(angle) * radius - word.estimatedHeight / 2;

        // 检查边界
        if (
          x >= 0 &&
          x + word.estimatedWidth <= containerWidth &&
          y >= 0 &&
          y + word.estimatedHeight <= containerHeight
        ) {
          const currentRect = this.getWordRect(word, x, y);

          // 检查碰撞
          let hasCollision = false;
          for (const placedWord of placedWords) {
            const placedRect = this.getWordRect(
              placedWord,
              placedWord.x,
              placedWord.y
            );

            if (this.checkRectCollision(currentRect, placedRect)) {
              hasCollision = true;
              break;
            }
          }

          if (!hasCollision) {
            return { x, y, success: true };
          }
        }

        // 增加角度和半径（半径随着角度增加）
        angle += angleStep;
        radius = radiusStep * (angle / (2 * Math.PI));
      }

      return { x: centerX, y: centerY, success: false };
    },

    getWordStyle(word) {
      const baseStyle = {
        fontSize: word.fontSize + 'px',
        color: word.color,
        position: 'absolute',
        left: word.x + 'px',
        top: word.y + 'px',
        cursor: 'pointer',
        fontWeight: 'bold',
        padding: '2px 4px',
        transform: `rotate(${Math.random() * 30 - 15}deg)`,
        transition: 'all 0.3s ease',
        opacity: word.placementSuccess ? 0.8 : 0.4, // 失败的位置透明度更低
        whiteSpace: 'nowrap',
      };

      // 如果放置失败，添加特殊样式
      if (!word.placementSuccess) {
        baseStyle.background = 'rgba(255, 0, 0, 0.1)';
        baseStyle.border = '1px dashed red';
      }

      return baseStyle;
    },

    handleWordClick(word) {
      this.$emit('wordClick', word);

      // 点击效果
      const wordElement = event.target;
      wordElement.style.transform = 'scale(1.1) rotate(0deg)';
      wordElement.style.opacity = '1';
      wordElement.style.zIndex = '1000';

      setTimeout(() => {
        wordElement.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
        wordElement.style.opacity = word.placementSuccess ? '0.8' : '0.4';
        wordElement.style.zIndex = '';
      }, 300);
    },
  },
  watch: {
    words: {
      handler() {
        this.generateWordCloud();
      },
      deep: true,
    },
  },
};
</script>
  
  <style scoped>
.word-item:hover {
  z-index: 100;
  filter: brightness(1.2);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transform: scale(1.05) !important;
}
</style>