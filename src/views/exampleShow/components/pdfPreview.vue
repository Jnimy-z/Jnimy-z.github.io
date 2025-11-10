<!-- <template>
  <div class="pdf-content" ref="pdfContent">
    <div ref="leftPreview" class="left-preview">
      <my-left-render></my-left-render>
    </div>
    <div ref="pdfBox" class="pdf-box">
      <canvas ref="pdfCanvas"></canvas>
    </div>
  </div>
</template> -->
<script>
import { ref, onMounted, h, defineComponent, nextTick } from 'vue';
import * as pdfjsLib from 'pdfjs-dist';
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs';
export default defineComponent({
  setup() {
    // 配置PDF.js worker[citation:1]
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'pdfjs-dist/build/pdf.worker.min.mjs';

    const pdfUrl = ref('/张娟_前端_简历.pdf'); // PDF文件路径或URL
    const pdfCanvas = ref(null);
    const pdfBox = ref(null);
    const leftPreview = ref(null);
    const pdfContent = ref(null);
    const numPages = ref(0);
    let fragment = document.createDocumentFragment();
    // const canvasArr = ref(new Map());
    const canvasArr2 = ref(new Map());
    const pdfWH = ref([]);
    const timeOut = ref(null);

    const loadPdf = async () => {
      try {
        // 加载PDF文档
        const pdf = await pdfjsLib.getDocument(pdfUrl.value).promise;

        numPages.value = pdf.numPages;
        const currentPage = ref(1);

        nextTick(() => {
          renderPage();
          // for (let i = 1; i <= 3; i++) {
          //   // let canvas = canvasArr.value.get(i);
          //   let canvas2 = canvasArr2.value.get(i);
          //   // renderPage(i, canvas, 0.5);
          //   renderPage(i, canvas2, 2);
          // }
          // // setTimeout(() => {
          // //   for (let i = 4; i <= numPages.value; i++) {
          // //     // let canvas = canvasArr.value.get(i);
          // //     let canvas2 = canvasArr2.value.get(i);
          // //     // renderPage(i, canvas, 0.5);
          // //     renderPage(i, canvas2, 2);
          // //   }
          // // }, 200);
        });

        async function renderPage() {
          console.log(currentPage.value);
          timeOut.value && clearTimeout(timeOut.value);
          if (currentPage.value >= numPages.value) {
            return;
          }
          // 获取第一页
          const page = await pdf.getPage(currentPage.value);
          const canvas = canvasArr2.value.get(currentPage.value);

          // 设置视图端口
          const viewport = page.getViewport({ scale: 2 });
          // const canvas = pdfCanvas.value;
          const context = canvas.getContext('2d');
          if (currentPage.value === 1) {
            pdfWH.value = [viewport.width, viewport.height];
          }
          // canvas.height = viewport.height;
          // canvas.width = viewport.width;

          // 渲染PDF页面
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          await page.render(renderContext).promise;
          currentPage.value++;
          timeOut.value = setTimeout(renderPage, 0);
          // requestAnimationFrame(renderPage)
        }
      } catch (error) {
        console.error('加载PDF失败:', error);
      }
    };

    onMounted(() => {
      let date = +new Date();
      loadPdf();
      setTimeout(() => {
        console.log(+new Date() - date);
      }, 0);
    });
    return () => {
      return h(
        'div',
        {
          ref: pdfContent,
          class: 'pdf-content',
        },
        [
          // h(
          //   'div',
          //   {
          //     ref: leftPreview,
          //     class: 'left-preview',
          //   },
          //   Array.from({ length: numPages.value }, (_, index) => {
          //     const pageNum = index + 1;
          //     return [
          //       h('canvas', {
          //         class: 'left-canvas',
          //         ref: (el) => {
          //           if (el) {
          //             canvasArr.value.set(pageNum, el);
          //           } else {
          //             canvasArr.value.delete(pageNum);
          //           }
          //         },
          //       }),
          //       h(
          //         'span',
          //         {
          //           class: 'left-span',
          //         },
          //         index + 1
          //       ),
          //     ];
          //   })
          // ),
          h(
            'div',
            {
              ref: pdfBox,
              class: 'pdf-box',
            },
            Array.from({ length: numPages.value }, (_, index) => {
              const pageNum = index + 1;
              return h('canvas', {
                class: 'right-canvas',
                width: pdfWH.value[0],
                height: pdfWH.value[1],
                ref: (el) => {
                  if (el) {
                    canvasArr2.value.set(pageNum, el);
                  } else {
                    canvasArr2.value.delete(pageNum);
                  }
                },
              });
            })
          ),
        ]
      );
    };
  },
});
</script>
<style lang="less">
.pdf-content {
  .left-preview {
    border-right: 2px solid #fff;
    .left-canvas {
      width: 10.8rem;
      height: 15.2rem;
      margin-bottom: 2rem;
    }
    .left-span {
      width: 100%;
      text-align: center;
      font-size: 1.6rem;
      color: #fff;
      margin-bottom: 2rem;
    }
    .canvas-active {
      border: 5px solid #8ab4f8;
    }
  }
  .pdf-box {
    display: flex;
    flex-flow: column;
    align-items: center;
    background: #282828;
    overflow: auto;
    flex-shrink: 0;
    .right-canvas {
      // width: 64rem;
      // height: 76rem;
      margin: 5px;
      flex-shrink: 0;
    }
  }
}
</style>
<style lang="less" scoped>
.pdf-content {
  display: flex;
  width: 100%;
  height: 100%;
  .left-preview {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 20%;
    height: 100%;
    overflow: auto;
    background: #282828;
    padding: 4rem;
  }
  .pdf-box {
    flex: 1;
    height: 100%;
    overflow: auto;
  }
}
</style>