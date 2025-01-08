document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initDatePicker();
    loadQualityData();
});

// 初始化日期选择器
function initDatePicker() {
    const today = new Date();
    const monthInput = document.getElementById('startMonth');
    monthInput.value = formatYearMonth(today);
    monthInput.max = formatYearMonth(today);
}

// 加载质量数据
function loadQualityData() {
    // 模拟数据
    const mockData = {
        trend: {
            dates: ['2024-01', '2024-02', '2024-03'],
            firstPass: [94.5, 95.2, 95.8],
            rework: [4.0, 3.5, 3.2],
            scrap: [1.5, 1.3, 1.0]
        },
        process: [
            { name: '发酵', batches: 120, total: 12000, pass: 11520, defect: 480, rate: 96 },
            { name: '杀青', batches: 150, total: 15000, pass: 14400, defect: 600, rate: 96 },
            { name: '揉捻', batches: 180, total: 18000, pass: 17100, defect: 900, rate: 95 },
            { name: '烘干', batches: 200, total: 20000, pass: 19200, defect: 800, rate: 96 }
        ],
        defects: [
            { name: '温度控制', value: 35 },
            { name: '湿度超标', value: 25 },
            { name: '发酵不足', value: 20 },
            { name: '外观不良', value: 15 },
            { name: '其他', value: 5 }
        ]
    };

    renderTrendChart(mockData.trend);
    renderProcessChart(mockData.process);
    renderDefectChart(mockData.defects);
    renderQualityTable(mockData.process);
}

// 渲染质量趋势图
function renderTrendChart(data) {
    const chart = echarts.init(document.getElementById('qualityTrendChart'));
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['一次合格率', '返工率', '报废率']
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
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}%'
            }
        },
        series: [
            {
                name: '一次合格率',
                type: 'line',
                data: data.firstPass
            },
            {
                name: '返工率',
                type: 'line',
                data: data.rework
            },
            {
                name: '报废率',
                type: 'line',
                data: data.scrap
            }
        ]
    };
    
    chart.setOption(option);
}

// 渲染工序质量分布图
function renderProcessChart(data) {
    const chart = echarts.init(document.getElementById('processQualityChart'));
    
    const option = {
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
                type: 'bar',
                data: data.map(item => item.rate),
                label: {
                    show: true,
                    formatter: '{c}%'
                }
            }
        ]
    };
    
    chart.setOption(option);
}

// 渲染不良原因分析图
function renderDefectChart(data) {
    const chart = echarts.init(document.getElementById('defectReasonChart'));
    
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

// 渲染质量详细数据表格
function renderQualityTable(data) {
    const tbody = document.getElementById('qualityTable');
    tbody.innerHTML = data.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.batches}</td>
            <td>${item.total}</td>
            <td>${item.pass}</td>
            <td>${item.defect}</td>
            <td>${item.rate}%</td>
            <td>${getMainDefectReason(item.name)}</td>
        </tr>
    `).join('');
}

// 工具函数
function formatYearMonth(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function getMainDefectReason(process) {
    const reasons = {
        '发酵': '温度控制不当',
        '杀青': '叶片破损',
        '揉捻': '揉捻不均匀',
        '烘干': '水分含量超标'
    };
    return reasons[process] || '未知';
}

// 搜索和导出功能
function searchQuality() {
    const timeRange = document.getElementById('timeRange').value;
    const startMonth = document.getElementById('startMonth').value;
    const productType = document.getElementById('productType').value;
    console.log('搜索质量数据:', { timeRange, startMonth, productType });
    loadQualityData(); // 重新加载数据
}

function exportQuality() {
    console.log('导出质量数据');
    Message.show('导出成功', 'success');
} 