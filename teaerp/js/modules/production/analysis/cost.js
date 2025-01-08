document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initDatePicker();
    loadCostData();
});

// 初始化日期选择器
function initDatePicker() {
    const today = new Date();
    const monthInput = document.getElementById('startMonth');
    monthInput.value = formatYearMonth(today);
    monthInput.max = formatYearMonth(today);
}

// 加载成本数据
function loadCostData() {
    // 模拟数据
    const mockData = {
        trend: {
            dates: ['2024-01', '2024-02', '2024-03'],
            unitCost: [87.5, 86.2, 85.5],
            material: [66, 65.5, 65],
            labor: [19, 19.5, 20],
            overhead: [15, 15, 15]
        },
        structure: [
            { name: '材料成本', value: 65 },
            { name: '人工成本', value: 20 },
            { name: '制造费用', value: 15 }
        ],
        process: [
            { name: '发酵', material: 25, labor: 8, overhead: 5, unit: 38, ratio: 30, change: -2.1 },
            { name: '杀青', material: 15, labor: 5, overhead: 4, unit: 24, ratio: 25, change: -1.5 },
            { name: '揉捻', material: 15, labor: 4, overhead: 3, unit: 22, ratio: 25, change: -0.8 },
            { name: '烘干', material: 10, labor: 3, overhead: 3, unit: 16, ratio: 20, change: -1.2 }
        ]
    };

    renderTrendChart(mockData.trend);
    renderStructureChart(mockData.structure);
    renderProcessChart(mockData.process);
    renderCostTable(mockData.process);
}

// 渲染成本趋势图
function renderTrendChart(data) {
    const chart = echarts.init(document.getElementById('costTrendChart'));
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['单位成本', '材料成本占比', '人工成本占比', '制造费用占比']
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
                name: '金额',
                axisLabel: {
                    formatter: '¥{value}'
                }
            },
            {
                type: 'value',
                name: '占比',
                axisLabel: {
                    formatter: '{value}%'
                }
            }
        ],
        series: [
            {
                name: '单位成本',
                type: 'line',
                data: data.unitCost
            },
            {
                name: '材料成本占比',
                type: 'line',
                yAxisIndex: 1,
                data: data.material
            },
            {
                name: '人工成本占比',
                type: 'line',
                yAxisIndex: 1,
                data: data.labor
            },
            {
                name: '制造费用占比',
                type: 'line',
                yAxisIndex: 1,
                data: data.overhead
            }
        ]
    };
    
    chart.setOption(option);
}

// 渲染成本构成分析图
function renderStructureChart(data) {
    const chart = echarts.init(document.getElementById('costStructureChart'));
    
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

// 渲染工序成本分布图
function renderProcessChart(data) {
    const chart = echarts.init(document.getElementById('processCostChart'));
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['材料成本', '人工成本', '制造费用']
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
                formatter: '¥{value}'
            }
        },
        yAxis: {
            type: 'category',
            data: data.map(item => item.name)
        },
        series: [
            {
                name: '材料成本',
                type: 'bar',
                stack: 'total',
                data: data.map(item => item.material)
            },
            {
                name: '人工成本',
                type: 'bar',
                stack: 'total',
                data: data.map(item => item.labor)
            },
            {
                name: '制造费用',
                type: 'bar',
                stack: 'total',
                data: data.map(item => item.overhead)
            }
        ]
    };
    
    chart.setOption(option);
}

// 渲染成本详细数据表格
function renderCostTable(data) {
    const tbody = document.getElementById('costTable');
    tbody.innerHTML = data.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>¥${item.material}</td>
            <td>¥${item.labor}</td>
            <td>¥${item.overhead}</td>
            <td>¥${item.unit}</td>
            <td>${item.ratio}%</td>
            <td class="${item.change >= 0 ? 'up' : 'down'}">${item.change}%</td>
        </tr>
    `).join('');
}

// 工具函数
function formatYearMonth(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

// 搜索和导出功能
function searchCost() {
    const timeRange = document.getElementById('timeRange').value;
    const startMonth = document.getElementById('startMonth').value;
    const productType = document.getElementById('productType').value;
    console.log('搜索成本数据:', { timeRange, startMonth, productType });
    loadCostData(); // 重新加载数据
}

function exportCost() {
    console.log('导出成本数据');
    Message.show('导出成功', 'success');
} 