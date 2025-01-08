// 初始化所有图表
function initCharts() {
    // 销售趋势图
    const trendChart = echarts.init(document.getElementById('trendChart'));
    trendChart.setOption({
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '销售额',
            type: 'line',
            smooth: true,
            data: [150, 230, 224, 218, 135, 147],
            itemStyle: {
                color: '#8fd4d2'
            }
        }]
    });

    // 客户销售额占比
    const customerPieChart = echarts.init(document.getElementById('customerPieChart'));
    customerPieChart.setOption({
        tooltip: {
            trigger: 'item'
        },
        series: [{
            type: 'pie',
            radius: '70%',
            data: [
                { value: 335, name: '客户A' },
                { value: 310, name: '客户B' },
                { value: 234, name: '客户C' },
                { value: 135, name: '客户D' },
                { value: 154, name: '其他' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    });

    // 商品销售额占比
    const productPieChart = echarts.init(document.getElementById('productPieChart'));
    productPieChart.setOption({
        tooltip: {
            trigger: 'item'
        },
        series: [{
            type: 'pie',
            radius: '70%',
            data: [
                { value: 435, name: '商品A' },
                { value: 310, name: '商品B' },
                { value: 234, name: '商品C' },
                { value: 155, name: '商品D' },
                { value: 154, name: '其他' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    });

    // 商品销售排名
    const productRankChart = echarts.init(document.getElementById('productRankChart'));
    productRankChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['商品A', '商品B', '商品C', '商品D', '商品E']
        },
        series: [{
            type: 'bar',
            data: [320, 302, 301, 334, 390],
            itemStyle: {
                color: '#8fd4d2'
            }
        }]
    });

    // 销售退货率分析
    const returnRateChart = echarts.init(document.getElementById('returnRateChart'));
    returnRateChart.setOption({
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}%'
            }
        },
        series: [{
            name: '退货率',
            type: 'line',
            data: [2.6, 2.2, 3.1, 2.8, 2.5, 2.1],
            itemStyle: {
                color: '#f44336'
            }
        }]
    });

    // 销售及时率分析
    const onTimeRateChart = echarts.init(document.getElementById('onTimeRateChart'));
    onTimeRateChart.setOption({
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}%'
            }
        },
        series: [{
            name: '及时率',
            type: 'line',
            data: [98.5, 97.8, 98.2, 98.9, 98.1, 98.7],
            itemStyle: {
                color: '#4caf50'
            }
        }]
    });

    // 监听窗口大小变化，调整图表大小
    window.addEventListener('resize', function() {
        trendChart.resize();
        customerPieChart.resize();
        productPieChart.resize();
        productRankChart.resize();
        returnRateChart.resize();
        onTimeRateChart.resize();
    });
}

// 更新图表数据
function updateCharts() {
    // 这里添加从后端获取数据的逻辑
    console.log('更新图表数据');
}

// 导出报表
function exportReport() {
    // 这里添加导出报表的逻辑
    console.log('导出报表');
}

// 页面加载完成后初始化图表
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
}); 