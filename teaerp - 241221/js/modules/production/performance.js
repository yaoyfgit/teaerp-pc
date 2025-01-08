// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initCharts();
    loadSuggestions();
});

// 初始化图表
function initCharts() {
    initOutputStatsChart();
    initOutputTrendChart();
    initOutputCompareChart();
    initCostStatsChart();
    initCostTrendChart();
    initCostCompareChart();
}

// 初始化产量统计图表
function initOutputStatsChart() {
    const chart = echarts.init(document.getElementById('outputStatsChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '各产品产量统计'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'right'
        },
        series: [
            {
                name: '产量占比',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 45, name: '特级大红袍' },
                    { value: 35, name: '特级铁观音' },
                    { value: 20, name: '其他产品' }
                ]
            }
        ]
    };
    chart.setOption(option);
}

// 初始化产量趋势图表
function initOutputTrendChart() {
    const chart = echarts.init(document.getElementById('outputTrendChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '产量趋势分析'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['计划产量', '实际产量']
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            name: '产量'
        },
        series: [
            {
                name: '计划产量',
                type: 'line',
                data: [1000, 1000, 1200, 1200, 1500, 1500],
                smooth: true
            },
            {
                name: '实际产量',
                type: 'line',
                data: [950, 980, 1150, 1180, 1420, 1480],
                smooth: true
            }
        ]
    };
    chart.setOption(option);
}

// 初始化产量对比图表
function initOutputCompareChart() {
    const chart = echarts.init(document.getElementById('outputCompareChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '产品产量对比'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['去年同期', '本期']
        },
        xAxis: {
            type: 'category',
            data: ['特级大红袍', '特级铁观音', '其他产品']
        },
        yAxis: {
            type: 'value',
            name: '产量'
        },
        series: [
            {
                name: '去年同期',
                type: 'bar',
                data: [4500, 3500, 2000]
            },
            {
                name: '本期',
                type: 'bar',
                data: [5000, 4000, 2500]
            }
        ]
    };
    chart.setOption(option);
}

// 初始化成本统计图表
function initCostStatsChart() {
    const chart = echarts.init(document.getElementById('costStatsChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '成本构成分析'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'right'
        },
        series: [
            {
                name: '成本占比',
                type: 'pie',
                radius: ['40%', '70%'],
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
                    { value: 50, name: '原材料成本' },
                    { value: 20, name: '人工成本' },
                    { value: 15, name: '能源成本' },
                    { value: 10, name: '设备成本' },
                    { value: 5, name: '其他成本' }
                ]
            }
        ]
    };
    chart.setOption(option);
}

// 初始化成本趋势图表
function initCostTrendChart() {
    const chart = echarts.init(document.getElementById('costTrendChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '成本趋势分析'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['单位成本', '成本率']
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: [
            {
                type: 'value',
                name: '单位成本'
            },
            {
                type: 'value',
                name: '成本率',
                min: 0,
                max: 100,
                axisLabel: {
                    formatter: '{value}%'
                }
            }
        ],
        series: [
            {
                name: '单位成本',
                type: 'line',
                data: [100, 98, 95, 93, 90, 88],
                smooth: true
            },
            {
                name: '成本率',
                type: 'line',
                yAxisIndex: 1,
                data: [85, 83, 80, 78, 75, 73],
                smooth: true
            }
        ]
    };
    chart.setOption(option);
}

// 初始化成本对比图表
function initCostCompareChart() {
    const chart = echarts.init(document.getElementById('costCompareChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '成本对比分析'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['计划成本', '实际成本', '成本差异']
        },
        xAxis: {
            type: 'category',
            data: ['特级大红袍', '特级铁观音', '其他产品']
        },
        yAxis: {
            type: 'value',
            name: '成本'
        },
        series: [
            {
                name: '计划成本',
                type: 'bar',
                data: [100, 90, 80]
            },
            {
                name: '实际成本',
                type: 'bar',
                data: [95, 85, 75]
            },
            {
                name: '成本差异',
                type: 'line',
                data: [5, 5, 5]
            }
        ]
    };
    chart.setOption(option);
}

// 加载改进建议
function loadSuggestions() {
    // 产量改进建议
    const outputSuggestions = [
        {
            type: 'info',
            content: '特级大红袍产量达成率95%，建议优化生产工艺提高产能'
        },
        {
            type: 'warning',
            content: '特级铁观音产量波动较大，需加强生产计划执行力度'
        }
    ];
    renderSuggestions('outputSuggestionList', outputSuggestions);

    // 成本改进建议
    const costSuggestions = [
        {
            type: 'warning',
            content: '原材料成本占比过高，建议优化采购策略降低成本'
        },
        {
            type: 'info',
            content: '能源成本呈上升趋势，可考虑引入节能设备'
        }
    ];
    renderSuggestions('costSuggestionList', costSuggestions);
}

// 渲染改进建议
function renderSuggestions(elementId, suggestions) {
    const suggestionList = document.getElementById(elementId);
    suggestionList.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item ${suggestion.type}">
            <i class="fas fa-${suggestion.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${suggestion.content}</span>
        </div>
    `).join('');
} 