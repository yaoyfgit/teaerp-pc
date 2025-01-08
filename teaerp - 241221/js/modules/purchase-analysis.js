// 初始化所有图表
function initCharts() {
    initTrendChart();
    initSupplierPieChart();
    initSupplierRankChart();
    initProductPieChart();
    initProductRankChart();
    initReturnRateChart();
    initOnTimeRateChart();
}

// 采购趋势图
function initTrendChart() {
    const chart = echarts.init(document.getElementById('trendChart'));
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['采购金额', '同比', '环比']
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: [
            {
                type: 'value',
                name: '金额',
                axisLabel: {
                    formatter: '¥{value}'
                }
            },
            {
                type: 'value',
                name: '比率',
                axisLabel: {
                    formatter: '{value}%'
                }
            }
        ],
        series: [
            {
                name: '采购金额',
                type: 'bar',
                data: [50000, 45000, 60000, 55000, 65000, 70000]
            },
            {
                name: '同比',
                type: 'line',
                yAxisIndex: 1,
                data: [10, 15, 8, 12, 18, 20]
            },
            {
                name: '环比',
                type: 'line',
                yAxisIndex: 1,
                data: [5, -10, 33, -8, 18, 8]
            }
        ]
    };
    chart.setOption(option);
}

// 供应商采购额占比图
function initSupplierPieChart() {
    const chart = echarts.init(document.getElementById('supplierPieChart'));
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center'
        },
        series: [
            {
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false
                },
                data: [
                    { value: 35000, name: '供应商A' },
                    { value: 25000, name: '供应商B' },
                    { value: 20000, name: '供应商C' },
                    { value: 15000, name: '供应商D' },
                    { value: 5000, name: '其他' }
                ]
            }
        ]
    };
    chart.setOption(option);
}

// 供应商采购排名图
function initSupplierRankChart() {
    const chart = echarts.init(document.getElementById('supplierRankChart'));
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                formatter: '¥{value}'
            }
        },
        yAxis: {
            type: 'category',
            data: ['供应商A', '供应商B', '供应商C', '供应商D', '供应商E']
        },
        series: [
            {
                type: 'bar',
                data: [35000, 25000, 20000, 15000, 5000]
            }
        ]
    };
    chart.setOption(option);
}

// 商品采购额占比图
function initProductPieChart() {
    const chart = echarts.init(document.getElementById('productPieChart'));
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center'
        },
        series: [
            {
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false
                },
                data: [
                    { value: 30000, name: '商品A' },
                    { value: 25000, name: '商品B' },
                    { value: 20000, name: '商品C' },
                    { value: 15000, name: '商品D' },
                    { value: 10000, name: '其他' }
                ]
            }
        ]
    };
    chart.setOption(option);
}

// 商品采购排名图
function initProductRankChart() {
    const chart = echarts.init(document.getElementById('productRankChart'));
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                formatter: '¥{value}'
            }
        },
        yAxis: {
            type: 'category',
            data: ['商品A', '商品B', '商品C', '商品D', '商品E']
        },
        series: [
            {
                type: 'bar',
                data: [30000, 25000, 20000, 15000, 10000]
            }
        ]
    };
    chart.setOption(option);
}

// 退货率分析图
function initReturnRateChart() {
    const chart = echarts.init(document.getElementById('returnRateChart'));
    const option = {
        tooltip: {
            trigger: 'axis'
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
        series: [
            {
                type: 'line',
                data: [2.1, 1.8, 2.5, 1.5, 1.2, 1.8]
            }
        ]
    };
    chart.setOption(option);
}

// 采购及时率分析图
function initOnTimeRateChart() {
    const chart = echarts.init(document.getElementById('onTimeRateChart'));
    const option = {
        tooltip: {
            trigger: 'axis'
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
        series: [
            {
                type: 'line',
                data: [95, 92, 98, 96, 97, 99]
            }
        ]
    };
    chart.setOption(option);
}

// 更新图表数据
function updateCharts() {
    // TODO: 根据选择的时间范围和分析维度更新图表数据
    // 这里需要调用后端接口获取数据
    console.log('更新图表数据');
}

// 导出报表
function exportReport() {
    // TODO: 实现报表导出功能
    alert('报表导出成功');
}

// 页面加载完成后初始化图表
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    
    // 监听窗口大小变化，重绘图表
    window.addEventListener('resize', function() {
        const charts = document.querySelectorAll('.chart');
        charts.forEach(chartDom => {
            const chart = echarts.getInstanceByDom(chartDom);
            if (chart) {
                chart.resize();
            }
        });
    });
});