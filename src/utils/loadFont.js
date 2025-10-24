const loadFont = () => {
    return new Promise((resolve) => {
        if(document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                resolve()
            })
        } else {
            resolve()
        }
    })
}

async function diagnoseFontIssue() {
    const fontFamily = '35--Regular';
    
    console.group('🔍 字体问题诊断报告');
    
    // 1. 检查字体是否在系统中存在
    console.log('1. 字体系统检查:', document.fonts.check(`12px "${fontFamily}"`));
    
    // 2. 检查所有已加载字体
    console.log('2. 已加载字体列表:');
    await document.fonts.ready;
    document.fonts.forEach(font => {
      console.log(`   - ${font.family} (${font.status})`);
    });
    
    // 3. 检查 ECharts 容器
    const chartContainer = document.querySelector('.big-title');
    console.log('3. 图表容器状态:', {
      exists: !!chartContainer,
      visible: chartContainer ? 
        chartContainer.offsetParent !== null : false,
      display: chartContainer ? 
        window.getComputedStyle(chartContainer).display : 'N/A'
    });
    
    // 4. 测试普通元素字体应用
    const testElem = document.createElement('div');
    testElem.style.fontFamily = fontFamily;
    testElem.style.opacity = '0';
    testElem.textContent = 'test';
    document.body.appendChild(testElem);
    
    setTimeout(() => {
      const computedStyle = window.getComputedStyle(testElem);
      console.log('4. 普通元素字体应用:', {
        specified: fontFamily,
        computed: computedStyle.fontFamily,
        match: computedStyle.fontFamily.includes(fontFamily)
      });
      document.body.removeChild(testElem);
    }, 100);
    
    console.groupEnd();
  }

export {loadFont, diagnoseFontIssue} 