class Chart {
  constructor(elementId, options = {}) {
    this.element = document.getElementById(elementId);
    this.chart = echarts.init(this.element);
    this.options = {
      title: null,
      type: 'line', // line, bar, pie
      ...options
    };
  }

  setData(data) {
    const option = {
      title: this.options.title ? {
        text: this.options.title,
        left: 'center'
      } : null,
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.xAxis
      },
      yAxis: {
        type: 'value'
      },
      series: data.series.map(series => ({
        name: series.name,
        type: this.options.type,
        data: series.data,
        ...series.options
      }))
    };

    this.chart.setOption(option);
  }

  resize() {
    this.chart.resize();
  }

  dispose() {
    this.chart.dispose();
  }
} 