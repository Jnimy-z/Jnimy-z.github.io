<template>
  <div ref="pdfBox" class="pdf-box">
    <canvas ref="pdfCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as pdfjsLib from 'pdfjs-dist';
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs';

// 配置PDF.js worker[citation:1]
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.min.mjs';

const pdfUrl = ref('/张娟_前端_简历.pdf'); // PDF文件路径或URL
const pdfCanvas = ref(null);
const pdfBox = ref(null);

const loadPdf = async () => {
  try {
    // 加载PDF文档
    const pdf = await pdfjsLib.getDocument(pdfUrl.value).promise;

    const numPages = pdf.numPages;
    const currentPage = ref(1);

    renderPage()

    async function renderPage() {
        if(currentPage >= numPages) {
          pdfBox.value.removeEventListener('scroll')
        }
        // 获取第一页
        const page = await pdf.getPage(currentPage.value);

        // 设置视图端口
        const viewport = page.getViewport({ scale: 2 });
        const canvas = pdfCanvas.value;
        const context = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // 渲染PDF页面
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
    }

    pdfBox.value.addEventListener('scroll', async (event) => {
      if (
        event.target.offsetHeight + event.target.scrollTop + 1 >
        event.target.scrollHeight && currentPage.value < numPages
      ) {
        currentPage.value++;
        renderPage()
      }
    });
  } catch (error) {
    console.error('加载PDF失败:', error);
  }
};

onMounted(() => {
  loadPdf();
});
</script>
<style lang="less" scoped>
.pdf-box {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>