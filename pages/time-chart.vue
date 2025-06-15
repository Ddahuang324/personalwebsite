<template>
  <div class="time-chart-page">
    <div class="container">
      <div class="page-header">
        <h1>Personal Time Allocation Visualization</h1>
        <p class="subtitle">
          A dynamic stacked area chart showing how I spend my time from childhood to young adulthood (0-25 years)
        </p>
      </div>
      
      <TimeAllocationChart />
      
      <div class="chart-description">
        <div class="description-section">
          <h3>About This Chart</h3>
          <p>
            This stacked area chart visualizes the evolution of my time allocation across different activities 
            from birth to age 25. Each colored area represents a different activity, and the thickness of 
            each layer shows the percentage of time spent on that activity at any given age.
          </p>
        </div>
        
        <div class="description-section">
          <h3>Key Insights</h3>
          <div class="insights-grid">
            <div class="insight-card">
              <h4>Childhood (0-10 years)</h4>
              <p>Dominated by <strong>Study</strong> and <strong>Game</strong> activities, with significant family and social time.</p>
            </div>
            <div class="insight-card">
              <h4>Adolescence (10-18 years)</h4>
              <p><strong>Gaming</strong> peaks around age 10, then gradually gets replaced by <strong>Coding</strong> as a new passion emerges.</p>
            </div>
            <div class="insight-card">
              <h4>Young Adulthood (18-25 years)</h4>
              <p><strong>Coding</strong> becomes a major activity, while maintaining balance with study and social activities. <strong>Music</strong> appears as a new interest.</p>
            </div>
          </div>
        </div>
        
        <div class="description-section">
          <h3>Technical Implementation</h3>
          <p>
            This chart is built using <strong>D3.js</strong> and <strong>Vue.js</strong>, featuring:
          </p>
          <ul>
            <li>Smooth animated drawing effect using SVG path animations</li>
            <li>Staggered animation timing for visual appeal</li>
            <li>Responsive design that adapts to different screen sizes</li>
            <li>Interactive hover effects and smooth transitions</li>
            <li>Clean, modern styling with proper accessibility considerations</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeAllocationChart from '~/components/TimeAllocationChart.vue'

export default {
  name: 'TimeChartPage',
  components: {
    TimeAllocationChart
  },
  head() {
    return {
      title: 'Time Allocation Chart - Personal Website',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Interactive visualization of personal time allocation from childhood to young adulthood, built with D3.js and Vue.js'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'data visualization, D3.js, Vue.js, time allocation, personal development, stacked area chart'
        }
      ]
    }
  }
}
</script>

<style scoped>
.time-chart-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
  color: white;
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.chart-description {
  background: white;
  border-radius: 16px;
  padding: 40px;
  margin-top: 40px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.description-section {
  margin-bottom: 40px;
}

.description-section:last-child {
  margin-bottom: 0;
}

.description-section h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 8px;
}

.description-section p {
  font-size: 1rem;
  line-height: 1.7;
  color: #4b5563;
  margin-bottom: 16px;
}

.description-section ul {
  list-style-type: none;
  padding-left: 0;
}

.description-section li {
  font-size: 1rem;
  line-height: 1.7;
  color: #4b5563;
  margin-bottom: 8px;
  padding-left: 24px;
  position: relative;
}

.description-section li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.insight-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid #6366f1;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.insight-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.insight-card h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.insight-card p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #4b5563;
  margin: 0;
}

.insight-card strong {
  color: #6366f1;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .time-chart-page {
    padding: 20px 10px;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .chart-description {
    padding: 24px;
    margin-top: 24px;
  }
  
  .description-section h3 {
    font-size: 1.3rem;
  }
  
  .insights-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .insight-card {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 1.8rem;
  }
  
  .chart-description {
    padding: 20px;
  }
}
</style>