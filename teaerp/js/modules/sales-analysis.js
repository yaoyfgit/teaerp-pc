// 初始化所有图表
function initCharts() {
    initTrendChart();
    initCustomerPieChart();
    initCustomerRankChart();
    initProductPieChart();
    initProductRankChart();
    initReturnRateChart();
    initSalesmanChart();
}

// 销售趋势图
function initTrendChart() {
    const chart = echarts.init(document.getElementById('trendChart'));
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['销售金额', '同比', '环比']
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
                name: '销售金额',
                type: 'bar',
                data: [50000, 45000, 60000, 55000, 65000, 70000]
            },
            {
                name: '同比',
                type: 'line',
                yAxisIndex: 1,
                data: [10, 15, 8, 12, 20, 18]
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

// 客户销售额占比图
function initCustomerPieChart() {
    const chart = echarts.init(document.getElementById('customerPieChart'));
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: ¥{c} ({d}%)'
        },
        series: [
            {
                type: 'pie',
                radius: '70%',
                data: [
                    { value: 100000, name: '客户A' },
                    { value: 80000, name: '客户B' },
                    { value: 60000, name: '客户C' },
                    { value: 40000, name: '客户D' },
                    { value: 20000, name: '其他' }
                ]
            }
        ]
    };
    chart.setOption(option);
}

// 客户销售排名图
function initCustomerRankChart() {
    const chart = echarts.init(document.getElementById('customerRankChart'));
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
            data: ['客户A', '客户B', '客户C', '客户D', '客户E']
        },
        series: [
            {
                type: 'bar',
                data: [100000, 80000, 60000, 40000, 20000]
            }
        ]
    };
    chart.setOption(option);
}

// 商品销售额占比图
function initProductPieChart() {
    const chart = echarts.init(document.getElementById('productPieChart'));
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: ¥{c} ({d}%)'
        },
        series: [
            {
                type: 'pie',
                radius: '70%',
                data: [
                    { value: 80000, name: '商品A' },
                    { value: 60000, name: '商品B' },
                    { value: 40000, name: '商品C' },
                    { value: 30000, name: '商品D' },
                    { value: 10000, name: '其他' }
                ]
            }
        ]
    };
    chart.setOption(option);
}

// 商品销售排名图
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
                data: [80000, 60000, 40000, 30000, 10000]
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
                data: [2.1, 1.8, 2.5, 1.9, 2.2, 2.0]
            }
        ]
    };
    chart.setOption(option);
}

// 销售员业绩分析图
function initSalesmanChart() {
    const chart = echarts.init(document.getElementById('salesmanChart'));
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['销售额', '订单数']
        },
        xAxis: {
            type: 'category',
            data: ['张三', '李四', '王五', '赵六', '钱七']
        },
        yAxis: [
            {
                type: 'value',
                name: '销售额',
                axisLabel: {
                    formatter: '¥{value}'
                }
            },
            {
                type: 'value',
                name: '订单数',
                axisLabel: {
                    formatter: '{value}单'
                }
            }
        ],
        series: [
            {
                name: '销售额',
                type: 'bar',
                data: [50000, 45000, 40000, 35000, 30000]
            },
            {
                name: '订单数',
                type: 'line',
                yAxisIndex: 1,
                data: [50, 45, 40, 35, 30]
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
