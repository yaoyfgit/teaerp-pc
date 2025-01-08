// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initReportTabs();
    initReportEvents();
    // 默认显示第一个报表
    const firstTab = document.querySelector('.report-tab');
    if (firstTab) {
        firstTab.click();
    }
});

// 初始化报表 Tab
function initReportTabs() {
    const tabs = document.querySelectorAll('.report-tab');
    const contents = document.querySelectorAll('.report-content');
    
    // 隐藏所有内容
    contents.forEach(content => {
        content.style.display = 'none';
    });
    
    // 绑定点击事件
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有 active 类
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.style.display = 'none');
            
            // 添加当前 active 类
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
            
            // 清空图表
            clearCharts();
        });
    });
}

// 初始化报表相关事件
function initReportEvents() {
    // 加载仓库选项
    loadWarehouseOptions();
    // 加载商品分类选项
    loadCategoryOptions();
    // 设置默认日期为今天
    document.querySelector('[name="reportDate"]').value = new Date().toISOString().split('T')[0];
}

// 加载仓库选项
function loadWarehouseOptions() {
    // 模拟数据
    const warehouses = [
        { id: 1, name: '主仓库' },
        { id: 2, name: '次仓库' }
    ];
    
    const select = document.querySelector('[name="warehouseId"]');
    if (select) {
        select.innerHTML = '<option value="">全部仓库</option>' + 
            warehouses.map(w => `<option value="${w.id}">${w.name}</option>`).join('');
    }
}

// 加载商品分类选项
function loadCategoryOptions() {
    // 模拟数据
    const categories = [
        { id: 1, name: '茶叶' },
        { id: 2, name: '茶具' }
    ];
    
    const select = document.querySelector('[name="categoryId"]');
    if (select) {
        select.innerHTML = '<option value="">全部分类</option>' + 
            categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }
}

// 生成报表
function generateReport() {
    const activeTab = document.querySelector('.report-tab.active');
    if (!activeTab) return;
    
    const reportType = activeTab.getAttribute('data-type');
    const params = {
        date: document.querySelector('[name="reportDate"]').value,
        warehouseId: document.querySelector('[name="warehouseId"]').value,
        categoryId: document.querySelector('[name="categoryId"]').value
    };
    
    // 清空现有图表
    clearCharts();
    
    // 根据类型生成报表
    switch(reportType) {
        case 'daily':
            generateDailyReport(params);
            break;
        case 'monthly':
            generateMonthlyReport(params);
            break;
        case 'yearly':
            generateYearlyReport(params);
            break;
        case 'warning':
            generateWarningReport(params);
            break;
        case 'analysis':
            generateAnalysisReport(params);
            break;
    }
}

// 清空所有图表
function clearCharts() {
    // 销毁所有现有图表
    if (window.stockCharts) {
        Object.values(window.stockCharts).forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
    }
    // 初始化图表存储对象
    window.stockCharts = {};
}

// 导��报表
function exportReport() {
    const activeTab = document.querySelector('.report-tab.active');
    if (!activeTab) return;
    
    const reportType = activeTab.getAttribute('data-type');
    alert(`导出${getReportTypeName(reportType)}功能开发中...`);
}

// 获取报表类型名称
function getReportTypeName(type) {
    const types = {
        daily: '库存日报',
        monthly: '库存月报',
        yearly: '库存年报',
        warning: '预警报表',
        analysis: '分析报表'
    };
    return types[type] || type;
}

// 绘制库存趋势图
function drawStockTrendChart(data) {
    const ctx = document.getElementById('stockTrendChart').getContext('2d');
    
    // 创建新图表
    window.stockCharts.trend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: '库存数量',
                data: data.values,
                borderColor: '#1976d2',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '库存趋势图'
                }
            }
        }
    });
}

// 生成日报
function generateDailyReport(params) {
    // 模拟数据
    const data = {
        labels: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
        values: [1000, 1200, 900, 800, 1100, 900]
    };

    // 绘制趋势图
    drawStockTrendChart(data);

    // 加载统计数据
    loadDailyStatistics(params);
}

// 加载日报统计数据
function loadDailyStatistics(params) {
    // 模拟库存数据
    const stockData = [
        {
            code: 'P001',
            name: '大红袍',
            specification: '特级',
            unit: '盒',
            openingStock: 1000,
            inboundQty: 200,
            outboundQty: 300,
            closingStock: 900,
            amount: 90000
        }
    ];

    // 渲染库存表格
    const tbody = document.querySelector('#dailyReport .stock-table tbody');
    if (tbody) {
        tbody.innerHTML = stockData.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.specification}</td>
                <td>${item.unit}</td>
                <td>${item.openingStock}</td>
                <td>${item.inboundQty}</td>
                <td>${item.outboundQty}</td>
                <td>${item.closingStock}</td>
                <td>${formatAmount(item.amount)}</td>
            </tr>
        `).join('');
    }
}

// 生成月报
function generateMonthlyReport(params) {
    // 绘制趋势图
    const trendData = {
        labels: ['1日', '5日', '10日', '15日', '20日', '25日', '30日'],
        values: [5000, 5500, 5200, 5800, 5400, 5600, 5300]
    };
    
    const ctx = document.getElementById('monthlyStockChart').getContext('2d');
    window.stockCharts.monthly = new Chart(ctx, {
        type: 'line',
        data: {
            labels: trendData.labels,
            datasets: [{
                label: '库存数量',
                data: trendData.values,
                borderColor: '#1976d2',
                tension: 0.1,
                fill: true,
                backgroundColor: 'rgba(25, 118, 210, 0.1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '月度库存趋势'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// 生成年报
function generateYearlyReport(params) {
    // 绘制趋势图
    const trendData = {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        values: [12000, 13000, 12500, 13500, 14000, 13800, 14200, 14500, 14300, 14800, 15000, 15200]
    };
    
    const ctx = document.getElementById('yearlyStockChart').getContext('2d');
    window.stockCharts.yearly = new Chart(ctx, {
        type: 'line',
        data: {
            labels: trendData.labels,
            datasets: [{
                label: '库存数量',
                data: trendData.values,
                borderColor: '#1976d2',
                tension: 0.1,
                fill: true,
                backgroundColor: 'rgba(25, 118, 210, 0.1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '年度库存趋势'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// 生成预警报表
function generateWarningReport(params) {
    // 模拟预警数据
    const warningData = [
        {
            code: 'P001',
            name: '大红袍',
            type: '库存不足',
            currentStock: 100,
            minStock: 200,
            maxStock: 1000,
            suggestion: '建议补货'
        }
    ];

    // 渲染预警表格
    const tbody = document.querySelector('#warningReport .warning-table tbody');
    if (tbody) {
        tbody.innerHTML = warningData.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td><span class="warning-level high">${item.type}</span></td>
                <td>${item.currentStock}</td>
                <td>${item.minStock}</td>
                <td>${item.maxStock}</td>
                <td>${item.suggestion}</td>
            </tr>
        `).join('');
    }
}

// 生成分析报表
function generateAnalysisReport(params) {
    // ABC分析
    const abcData = {
        labels: ['A类商品', 'B类商品', 'C类商品'],
        datasets: [{
            data: [70, 20, 10],
            backgroundColor: ['#1976d2', '#fb8c00', '#e53935']
        }]
    };
    drawABCAnalysisChart(abcData);

    // 周转率分析
    const turnoverData = {
        labels: ['商品A', '商品B', '商品C', '商品D', '商品E'],
        values: [12, 8, 6, 4, 2]
    };
    drawTurnoverAnalysisChart(turnoverData);
}

// 绘制ABC分析图
function drawABCAnalysisChart(data) {
    const ctx = document.getElementById('abcAnalysisChart')?.getContext('2d');
    if (!ctx) return;

    window.stockCharts.abc = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'ABC分析'
                }
            }
        }
    });
}

// 绘制周转率分析图
function drawTurnoverAnalysisChart(data) {
    const ctx = document.getElementById('turnoverAnalysisChart')?.getContext('2d');
    if (!ctx) return;

    window.stockCharts.turnover = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: '周转率',
                data: data.values,
                backgroundColor: '#1976d2',
                borderColor: '#1976d2',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '周转率分析'
                }
            }
        }
    });
}

// 格式化金额
function formatAmount(amount) {
    return '¥' + amount.toLocaleString();
}