// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 确保echarts已加载
    if (typeof echarts === 'undefined') {
        console.error('ECharts is not loaded');
        return;
    }

    // 延迟初始化以确保DOM元素已完全加载
    setTimeout(initCharts, 100);
});

// 初始化图表
function initCharts() {
    try {
        const completionChart = initCompletionChart();
        const trendChart = initTrendChart();
        const typeChart = initTypeChart();
        const departmentChart = initDepartmentChart();

        // 窗口大小改变时重绘图表
        window.addEventListener('resize', function() {
            [completionChart, trendChart, typeChart, departmentChart].forEach(chart => {
                if (chart) {
                    chart.resize();
                }
            });
        });
    } catch (error) {
        console.error('初始化图表失败:', error);
    }
}

// 初始化完成情况分析图表
function initCompletionChart() {
    const chartDom = document.getElementById('completionChart');
    if (!chartDom) {
        console.error('找不到completionChart元素');
        return null;
    }

    const chart = echarts.init(chartDom);
    const option = {
        title: {
            text: '计划完成情况分析',
            left: 'center',
            top: 20
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 'middle'
        },
        series: [
            {
                name: '完成情况',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 85, name: '已完成', itemStyle: { color: '#52c41a' } },
                    { value: 32, name: '进行中', itemStyle: { color: '#1890ff' } },
                    { value: 9, name: '未开始', itemStyle: { color: '#faad14' } }
                ]
            }
        ]
    };
    chart.setOption(option);
    return chart;
}

// 初始化趋势分析图表
function initTrendChart() {
    const chartDom = document.getElementById('trendChart');
    if (!chartDom) {
        console.error('找不到trendChart元素');
        return null;
    }

    const chart = echarts.init(chartDom);
    const option = {
        title: {
            text: '计划完成趋势分析',
            left: 'center',
            top: 20
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            data: ['计划数', '完成数', '完成率'],
            bottom: 10
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '数量',
                min: 0,
                max: 50,
                interval: 10,
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '比率',
                min: 0,
                max: 100,
                interval: 20,
                axisLabel: {
                    formatter: '{value}%'
                }
            }
        ],
        series: [
            {
                name: '计划数',
                type: 'bar',
                data: [20, 25, 30, 35, 40, 45],
                itemStyle: { color: '#1890ff' }
            },
            {
                name: '完成数',
                type: 'bar',
                data: [15, 20, 25, 30, 35, 40],
                itemStyle: { color: '#52c41a' }
            },
            {
                name: '完成率',
                type: 'line',
                yAxisIndex: 1,
                data: [75, 80, 83, 86, 88, 89],
                itemStyle: { color: '#722ed1' }
            }
        ]
    };
    chart.setOption(option);
    return chart;
}

// 初始化类型分布图表
function initTypeChart() {
    const chartDom = document.getElementById('typeChart');
    if (!chartDom) {
        console.error('找不到typeChart元素');
        return null;
    }

    const chart = echarts.init(chartDom);
    const option = {
        title: {
            text: '计划类型分布',
            left: 'center',
            top: 20
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 'middle'
        },
        series: [
            {
                name: '计划类型',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 40, name: '销售计划', itemStyle: { color: '#1890ff' } },
                    { value: 30, name: '生产计划', itemStyle: { color: '#52c41a' } },
                    { value: 20, name: '成本计划', itemStyle: { color: '#faad14' } },
                    { value: 15, name: '质量计划', itemStyle: { color: '#722ed1' } },
                    { value: 21, name: '利润计划', itemStyle: { color: '#13c2c2' } }
                ]
            }
        ]
    };
    chart.setOption(option);
    return chart;
}

// 初始化部门对比图表
function initDepartmentChart() {
    const chartDom = document.getElementById('departmentChart');
    if (!chartDom) {
        console.error('找不到departmentChart元素');
        return null;
    }

    const chart = echarts.init(chartDom);
    const option = {
        title: {
            text: '部门完成率对比',
            left: 'center',
            top: 20
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['已完成', '进行中', '未开始'],
            bottom: 10
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                formatter: '{value}%'
            }
        },
        yAxis: {
            type: 'category',
            data: ['销售部', '生产部', '财务部', '人力资源部', '研发部']
        },
        series: [
            {
                name: '已完成',
                type: 'bar',
                stack: 'total',
                data: [80, 75, 85, 70, 90],
                itemStyle: { color: '#52c41a' }
            },
            {
                name: '进行中',
                type: 'bar',
                stack: 'total',
                data: [15, 20, 10, 25, 8],
                itemStyle: { color: '#1890ff' }
            },
            {
                name: '未开始',
                type: 'bar',
                stack: 'total',
                data: [5, 5, 5, 5, 2],
                itemStyle: { color: '#faad14' }
            }
        ]
    };
    chart.setOption(option);
    return chart;
}

// 导出图表
function exportChart(type) {
    const chartMap = {
        'completion': 'completionChart',
        'trend': 'trendChart',
        'type': 'typeChart',
        'department': 'departmentChart'
    };
    
    const chartId = chartMap[type];
    if (!chartId) return;
    
    const chart = echarts.getInstanceByDom(document.getElementById(chartId));
    if (!chart) return;
    
    const url = chart.getDataURL({
        type: 'png',
        pixelRatio: 2,
        backgroundColor: '#fff'
    });
    
    const link = document.createElement('a');
    link.download = `${type}-analysis.png`;
    link.href = url;
    link.click();
}

// 导出报告
function exportReport() {
    // TODO: 实现报告导出功能
    alert('报告导出功能开发中...');
} 