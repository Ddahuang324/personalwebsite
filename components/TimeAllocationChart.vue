<template>
  <div class="time-allocation-chart">
    <div class="chart-header">
      <h2>This is how I spend my time</h2>
      <p>My biggest hobby is learning, as I am curious about almost everything.</p>
    </div>
    <div id="chart-container" ref="chartContainer"></div>
    <div class="chart-legend">
      <div v-for="(item, index) in legendItems" :key="item.name" class="legend-item">
        <div class="legend-color" :style="{ backgroundColor: item.color }"></div>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { useTimeAllocationData } from '~/composables/useTimeAllocationData'

export default {
  name: 'TimeAllocationChart',
  data() {
    const { timeAllocationData, seriesNames, colors, legendItems } = useTimeAllocationData()
    return {
      data: timeAllocationData,
      seriesNames,
      colors,
      legendItems
    }
  },
  mounted() {
    this.createChart()
  },
  methods: {
    createChart() {
      const width = 800
      const height = 400
      const margin = { top: 20, right: 30, bottom: 50, left: 60 }
      
      const svg = d3.select(this.$refs.chartContainer)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background', '#fafafa')
        .style('border-radius', '8px')
      
      const innerWidth = width - margin.left - margin.right
      const innerHeight = height - margin.top - margin.bottom
      
      const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
      
      // 创建比例尺
      const x = d3.scaleLinear()
        .domain(d3.extent(this.data, d => d.age))
        .range([0, innerWidth])
      
      const y = d3.scaleLinear()
        .domain([0, 100])
        .range([innerHeight, 0])
      
      // 创建颜色比例尺
      const color = d3.scaleOrdinal()
        .domain(this.seriesNames)
        .range(this.colors)
      
      // 创建堆叠数据
      const stack = d3.stack()
        .keys(this.seriesNames)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone)
      
      const series = stack(this.data)
      
      // 创建区域生成器
      const area = d3.area()
        .x(d => x(d.data.age))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))
        .curve(d3.curveMonotoneX)
      
      // 绘制路径并添加动画
      g.selectAll('.area')
        .data(series)
        .enter().append('path')
        .attr('class', 'area')
        .attr('d', area)
        .attr('fill', 'none')
        .attr('stroke', (d, i) => this.colors[i])
        .attr('stroke-width', 2)
        .each(function(d, i) {
          const path = d3.select(this)
          const totalLength = path.node().getTotalLength()
          
          path
            .attr('stroke-dasharray', totalLength + ' ' + totalLength)
            .attr('stroke-dashoffset', totalLength)
            .transition()
            .duration(2000)
            .delay(i * 300) // 错峰启动动画
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0)
            .on('end', function() {
              // 线条绘制完成后，添加填充动画
              d3.select(this)
                .transition()
                .duration(800)
                .attr('fill', color(d.key))
                .attr('fill-opacity', 0.8)
                .attr('stroke', 'none')
            })
        })
      
      // 添加坐标轴
      const xAxis = d3.axisBottom(x)
        .ticks(6)
        .tickFormat(d => d + ' years')
      
      const yAxis = d3.axisLeft(y)
        .ticks(5)
        .tickFormat(d => d + '%')
      
      g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(xAxis)
        .selectAll('text')
        .style('font-size', '12px')
        .style('fill', '#666')
      
      g.append('g')
        .attr('class', 'y-axis')
        .call(yAxis)
        .selectAll('text')
        .style('font-size', '12px')
        .style('fill', '#666')
      
      // 添加轴标签
      g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (innerHeight / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', '#333')
        .text('Time Percentage (%)')
      
      g.append('text')
        .attr('transform', `translate(${innerWidth / 2}, ${innerHeight + margin.bottom - 10})`)
        .style('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', '#333')
        .text('Age')
      
      // 添加网格线
      g.selectAll('.grid-line')
        .data(y.ticks(5))
        .enter().append('line')
        .attr('class', 'grid-line')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1', d => y(d))
        .attr('y2', d => y(d))
        .attr('stroke', '#e5e7eb')
        .attr('stroke-width', 1)
        .attr('opacity', 0.5)
    }
  }
}
</script>

<style scoped>
.time-allocation-chart {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.chart-header {
  text-align: center;
  margin-bottom: 30px;
}

.chart-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.chart-header p {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

#chart-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.chart-legend {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid #e5e7eb;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .time-allocation-chart {
    padding: 10px;
  }
  
  .chart-header h2 {
    font-size: 20px;
  }
  
  .chart-header p {
    font-size: 14px;
  }
  
  #chart-container svg {
    width: 100%;
    height: auto;
  }
  
  .chart-legend {
    gap: 15px;
  }
  
  .legend-item {
    font-size: 12px;
  }
}
</style>