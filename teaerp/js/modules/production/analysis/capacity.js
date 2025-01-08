document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initDatePicker();
    loadCapacityData();
});

// 初始化日期选择器
function initDatePicker() {
    const today = new Date();
    const monthInput = document.getElementById('startMonth');
    monthInput.value = formatYearMonth(today);
    monthInput.max = formatYearMonth(today);
}

// 加载产能数据
function loadCapacityData() {
    // 模拟数据
    const mockData = {
        trend: {
            dates: ['2024-01', '2024-02', '2024-03'],
            design: [10000, 10000, 10000],
            actual: [8200, 8350, 8500],
            utilization: [82, 83.5, 85]
        },
        process: [
            { name: '发酵', design: 10000, actual: 9800, utilization: 98 },
            { name: '杀青', design: 12000, actual: 10200, utilization: 85 },
            { name: '揉捻', design: 15000, actual: 12000, utilization: 80 },
            { name: '烘干', design: 11000, actual: 9350, utilization: 85 }
        ],
        loss: [
            { name: '设备故障', value: 35 },
            { name: '人员短缺', value: 25 },
            { name: '原料等待', value: 20 },
            { name: '质量问题', value: 15 },
            { name: '其他', value: 5 }
        ]
    };

    renderTrendChart(mockData.trend);
    renderProcessChart(mockData.process);
    renderLossChart(mockData.loss);
    renderCapacityTable(mockData.process);
}

// 渲染产能趋势图
function renderTrendChart(data) {
    const chart = echarts.init(document.getElementById('capacityTrendChart'));
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['设计产能', '实际产能', '利用率']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: data.dates
        },
        yAxis: [
            {
                type: 'value',
                name: '产能',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '利用率',
                axisLabel: {
                    formatter: '{value}%'
                }
            }
        ],
        series: [
            {
                name: '设计产能',
                type: 'bar',
                data: data.design
            },
            {
                name: '实际产能',
                type: 'bar',
                data: data.actual
            },
            {
                name: '利用率',
                type: 'line',
                yAxisIndex: 1,
                data: data.utilization
            }
        ]
    };
    
    chart.setOption(option);
}

// 渲染工序产能分布图
function renderProcessChart(data) {
    const chart = echarts.init(document.getElementById('processCapacityChart'));
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['设计产能', '实际产能']
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
            data: data.map(item => item.name)
        },
        series: [
            {
                name: '设计产能',
                type: 'bar',
                data: data.map(item => item.design)
            },
            {
                name: '实际产能',
                type: 'bar',
                data: data.map(item => item.actual)
            }
        ]
    };
    
    chart.setOption(option);
}

// 渲染产能损失分析图
function renderLossChart(data) {
    const chart = echarts.init(document.getElementById('capacityLossChart'));
    
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}%'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                data: data.map(item => ({
                    name: item.name,
                    value: item.value
                })),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    
    chart.setOption(option);
}

// 渲染产能详细数据表格
function renderCapacityTable(data) {
    const tbody = document.getElementById('capacityTable');
    tbody.innerHTML = data.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.design}</td>
            <td>${item.actual}</td>
            <td>${item.utilization}%</td>
            <td>${calculateBottleneckIndex(item.utilization)}%</td>
            <td>${getMainLossReason(item.name)}</td>
        </tr>
    `).join('');
}

// 工具函数
function formatYearMonth(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function calculateBottleneckIndex(utilization) {
    return Math.round(utilization * 1.1); // 示例计算方法
}

function getMainLossReason(process) {
    const reasons = {
        '发酵': '温度控制',
        '杀青': '设备故障',
        '揉捻': '人员短缺',
        '烘干': '能源供应'
    };
    return reasons[process] || '未知';
}

// 搜索和导出功能
function searchCapacity() {
    const timeRange = document.getElementById('timeRange').value;
    const startMonth = document.getElementById('startMonth').value;
    console.log('搜索产能数据:', { timeRange, startMonth });
    loadCapacityData(); // 重新加载数据
}

function exportCapacity() {
    console.log('导出产能数据');
    Message.show('导出成功', 'success');
} 