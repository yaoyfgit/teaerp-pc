document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initDatePicker();
    loadEfficiencyData();
});

// 初始化日期选择器
function initDatePicker() {
    const today = new Date();
    const monthInput = document.getElementById('startMonth');
    monthInput.value = formatYearMonth(today);
    monthInput.max = formatYearMonth(today);
}

// 加载效率数据
function loadEfficiencyData() {
    // 模拟数据
    const mockData = {
        trend: {
            dates: ['2024-01', '2024-02', '2024-03'],
            efficiency: [82, 83.5, 85],
            completion: [89, 90.5, 92],
            cycle: [5.2, 4.8, 4.5]
        },
        process: [
            { name: '发酵', standard: 480, actual: 510, efficiency: 94, completion: 96 },
            { name: '杀青', standard: 240, actual: 265, efficiency: 90, completion: 95 },
            { name: '揉捻', standard: 360, actual: 420, efficiency: 86, completion: 92 },
            { name: '烘干', standard: 300, actual: 340, efficiency: 88, completion: 94 }
        ],
        loss: [
            { name: '设备调试', value: 30 },
            { name: '工艺调整', value: 25 },
            { name: '人员休息', value: 20 },
            { name: '物料等待', value: 15 },
            { name: '其他', value: 10 }
        ]
    };

    renderTrendChart(mockData.trend);
    renderProcessChart(mockData.process);
    renderLossChart(mockData.loss);
    renderEfficiencyTable(mockData.process);
}

// 渲染效率趋势图
function renderTrendChart(data) {
    const chart = echarts.init(document.getElementById('efficiencyTrendChart'));
    
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['生产效率', '计划完成率', '生产周期']
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
                name: '百分比',
                axisLabel: {
                    formatter: '{value}%'
                }
            },
            {
                type: 'value',
                name: '天数',
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name: '生产效率',
                type: 'line',
                data: data.efficiency
            },
            {
                name: '计划完成率',
                type: 'line',
                data: data.completion
            },
            {
                name: '生产周期',
                type: 'line',
                yAxisIndex: 1,
                data: data.cycle
            }
        ]
    };
    
    chart.setOption(option);
}

// 渲染工序效率分布图
function renderProcessChart(data) {
    const chart = echarts.init(document.getElementById('processEfficiencyChart'));
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['效率', '完成率']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}%'
            }
        },
        yAxis: {
            type: 'category',
            data: data.map(item => item.name)
        },
        series: [
            {
                name: '效率',
                type: 'bar',
                data: data.map(item => item.efficiency)
            },
            {
                name: '完成率',
                type: 'bar',
                data: data.map(item => item.completion)
            }
        ]
    };
    
    chart.setOption(option);
}

// 渲染效率损失分析图
function renderLossChart(data) {
    const chart = echarts.init(document.getElementById('efficiencyLossChart'));
    
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

// 渲染效率详细数据表格
function renderEfficiencyTable(data) {
    const tbody = document.getElementById('efficiencyTable');
    tbody.innerHTML = data.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.standard}分钟</td>
            <td>${item.actual}分钟</td>
            <td>${item.efficiency}%</td>
            <td>${item.completion}%</td>
            <td>${getMainFactor(item.name)}</td>
        </tr>
    `).join('');
}

// 工具函数
function formatYearMonth(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function getMainFactor(process) {
    const factors = {
        '发酵': '温湿度控制',
        '杀青': '设备调试时间',
        '揉捻': '人员熟练度',
        '烘干': '能源供应稳定性'
    };
    return factors[process] || '未知';
}

// 搜索和导出功能
function searchEfficiency() {
    const timeRange = document.getElementById('timeRange').value;
    const startMonth = document.getElementById('startMonth').value;
    const productType = document.getElementById('productType').value;
    console.log('搜索效率数据:', { timeRange, startMonth, productType });
    loadEfficiencyData(); // 重新加载数据
}

function exportEfficiency() {
    console.log('导出效率数据');
    Message.show('导出成功', 'success');
} 