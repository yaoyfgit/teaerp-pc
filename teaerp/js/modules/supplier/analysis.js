// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initSupplierAnalysis();
});

// 初始化供应商分析
function initSupplierAnalysis() {
    // 加载供应商列表
    loadSupplierOptions();
    // 初始化图表
    initCharts();
    // 加载供应商排名
    loadSupplierRanking();
}

// 加载供应商选项
function loadSupplierOptions() {
    // 模拟API调用
    const suppliers = [
        { id: 1, name: '供应商A' },
        { id: 2, name: '供应商B' },
        { id: 3, name: '供应商C' }
    ];
    const select = document.querySelector('[name="supplierId"]');
    select.innerHTML = '<option value="">全部供应商</option>' + 
        suppliers.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
}

// 初始化图表
function initCharts() {
    initPurchaseAmountChart();
    initSupplierRatioChart();
    initCategoryDistributionChart();
    initSupplierScoreChart();
}

// 采购金额趋势图
function initPurchaseAmountChart() {
    const chart = echarts.init(document.getElementById('purchaseAmountChart'));
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
            name: '采购金额(万元)'
        },
        series: [{
            data: [120, 150, 180, 170, 220, 250],
            type: 'line',
            smooth: true,
            areaStyle: {
                opacity: 0.1
            }
        }]
    };
    chart.setOption(option);
}

// 供应商占比图
function initSupplierRatioChart() {
    const chart = echarts.init(document.getElementById('supplierRatioChart'));
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center'
        },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: '供应商A' },
                { value: 735, name: '供应商B' },
                { value: 580, name: '供应商C' },
                { value: 484, name: '供应商D' },
                { value: 300, name: '其他' }
            ]
        }]
    };
    chart.setOption(option);
}

// 品类分布图
function initCategoryDistributionChart() {
    const chart = echarts.init(document.getElementById('categoryDistributionChart'));
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: '红茶' },
                { value: 735, name: '绿茶' },
                { value: 580, name: '乌龙茶' },
                { value: 484, name: '普洱茶' },
                { value: 300, name: '其他' }
            ]
        }]
    };
    chart.setOption(option);
}

// 供应商评分图
function initSupplierScoreChart() {
    const chart = echarts.init(document.getElementById('supplierScoreChart'));
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        radar: {
            indicator: [
                { name: '价格', max: 100 },
                { name: '质量', max: 100 },
                { name: '交付', max: 100 },
                { name: '服务', max: 100 },
                { name: '创新', max: 100 }
            ]
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: [85, 90, 88, 95, 80],
                    name: '供应商A',
                    areaStyle: {
                        opacity: 0.1
                    }
                },
                {
                    value: [95, 80, 95, 85, 85],
                    name: '供应商B',
                    areaStyle: {
                        opacity: 0.1
                    }
                }
            ]
        }]
    };
    chart.setOption(option);
}

// 加载供应商排名
function loadSupplierRanking() {
    // 模拟API调用
    const mockData = [
        {
            rank: 1,
            name: '供应商A',
            amount: 1234567.89,
            orderCount: 156,
            deliveryDays: 5.2,
            qualifiedRate: 99.5,
            score: 95
        },
        {
            rank: 2,
            name: '供应商B',
            amount: 987654.32,
            orderCount: 123,
            deliveryDays: 6.1,
            qualifiedRate: 98.8,
            score: 92
        }
    ];
    renderSupplierRanking(mockData);
}

// 渲染供应商排名
function renderSupplierRanking(data) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = data.map(supplier => `
        <tr>
            <td>${supplier.rank}</td>
            <td>${supplier.name}</td>
            <td>${formatAmount(supplier.amount)}</td>
            <td>${supplier.orderCount}</td>
            <td>${supplier.deliveryDays}天</td>
            <td>${supplier.qualifiedRate}%</td>
            <td>${supplier.score}</td>
        </tr>
    `).join('');
}

// 应用筛选条件
function applyFilter() {
    const supplierId = document.querySelector('[name="supplierId"]').value;
    const startDate = document.querySelector('[name="startDate"]').value;
    const endDate = document.querySelector('[name="endDate"]').value;

    // 重新加载数据
    loadAnalysisData(supplierId, startDate, endDate);
}

// 加载分析数据
function loadAnalysisData(supplierId, startDate, endDate) {
    console.log('加载分析数据:', { supplierId, startDate, endDate });
    // TODO: 调用后端API获取数据
    // 重新初始化图表
    initCharts();
    // 重新加载供应商排名
    loadSupplierRanking();
}

// 格式化金额
function formatAmount(amount) {
    return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
    }).format(amount);
} 