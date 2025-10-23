/**
 * 按需引入 ECharts 图表和组件
 */

import * as echarts from 'echarts/core'
import {
    BarChart,
    LineChart,
    PieChart,
    GaugeChart,
    MapChart
} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    VisualMapComponent,
    DataZoomComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 注册必要的组件
echarts.use([
    BarChart,
    LineChart,
    PieChart,
    GaugeChart,
    MapChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    VisualMapComponent,
    DataZoomComponent,
    CanvasRenderer
])

// 主题配置
export const defaultTheme = {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    backgroundColor: 'transparent'
}

// 响应式配置
export const responsiveOption = (baseOption, breakpoints = {}) => {
    const { sm = 768, md = 992, lg = 1200 } = breakpoints
    return {
        baseOption,
        media: [
            {
                query: { maxWidth: sm },
                option: {
                    series: [{ center: ['50%', '50%'] }],
                    legend: { orient: 'vertical', right: 10, top: 'center' }
                }
            },
            {
                query: { minWidth: sm, maxWidth: md },
                option: {
                    grid: { top: 50, right: 50, bottom: 50, left: 50 }
                }
            },
            {
                query: { minWidth: lg },
                option: {
                    grid: { top: 80, right: 80, bottom: 80, left: 80 }
                }
            }
        ]
    }
}

export default echarts
