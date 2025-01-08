// 初始化页面数据
function initPageData() {
    // 初始化统计数据
    initOverview();
    // 初始化图表
    initCharts();
    // 初始化表格数据
    initTableData();
}

// 初始化统计数据
function initOverview() {
    const overviewData = {
        totalStock: 12580,
        totalAmount: 568920,
        categoryCount: 86,
        warehouseCount: 5
    };

    document.querySelector('.overview-item:nth-child(1) .number').textContent = overviewData.totalStock;
    document.querySelector('.overview-item:nth-child(2) .number').textContent = overviewData.totalAmount.toLocaleString();
    document.querySelector('.overview-item:nth-child(3) .number').textContent = overviewData.categoryCount;
    document.querySelector('.overview-item:nth-child(4) .number').textContent = overviewData.warehouseCount;
}

// 初始化图表
function initCharts() {
    // 库存分布图表
    const distributionChart = echarts.init(document.getElementById('distributionChart'));
    distributionChart.setOption({
        title: {
            text: '库存分布',
            left: 'center',
            top: 20,
            textStyle: {
                fontSize: 16,
                color: '#333'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}件 ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 'middle'
        },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            itemStyle: {
                borderRadius: 4
            },
            label: {
                show: true,
                formatter: '{b}: {c}件'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            },
            data: [
                {value: 5200, name: '主仓库'},
                {value: 3600, name: '次仓库'},
                {value: 2100, name: '临时仓库'},
                {value: 1680, name: '门店仓库'}
            ]
        }]
    });

    // 库存趋势图表
    const trendChart = echarts.init(document.getElementById('trendChart'));
    trendChart.setOption({
        title: {
            text: '库存趋势',
            left: 'center',
            top: 20,
            textStyle: {
                fontSize: 16,
                color: '#333'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['库存数量', '入库量', '出库量'],
            bottom: 10
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月'],
            axisLine: {
                lineStyle: {
                    color: '#999'
                }
            },
            axisLabel: {
                color: '#666'
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#999'
                }
            },
            axisLabel: {
                color: '#666'
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#eee'
                }
            }
        },
        series: [
            {
                name: '库存数量',
                type: 'line',
                smooth: true,
                data: [10200, 11500, 12800, 11900, 12300, 12580],
                itemStyle: {
                    color: '#8fd4d2'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(143, 212, 210, 0.3)'
                        }, {
                            offset: 1,
                            color: 'rgba(143, 212, 210, 0.1)'
                        }]
                    }
                }
            },
            {
                name: '入库量',
                type: 'bar',
                data: [2100, 2350, 2600, 2200, 2500, 2680],
                itemStyle: {
                    color: '#4caf50'
                }
            },
            {
                name: '出库量',
                type: 'bar',
                data: [1800, 2050, 2300, 1900, 2100, 2400],
                itemStyle: {
                    color: '#ff9800'
                }
            }
        ]
    });

    // 监听窗口大小变化，调整图表大小
    window.addEventListener('resize', () => {
        distributionChart.resize();
        trendChart.resize();
    });
}

// 初始化表格数据
function initTableData() {
    const stockData = [
        {
            code: 'P001',
            name: '大红袍',
            category: '乌龙茶',
            spec: '250g/盒',
            unit: '盒',
            warehouse: '主仓库',
            location: 'A-01-01',
            stock: 1200,
            available: 1150,
            locked: 50,
            warning: 500,
            status: 'normal'
        },
        {
            code: 'P002',
            name: '铁观音',
            category: '乌龙茶',
            spec: '100g/盒',
            unit: '盒',
            warehouse: '主仓库',
            location: 'A-01-02',
            stock: 300,
            available: 280,
            locked: 20,
            warning: 400,
            status: 'warning'
        },
        {
            code: 'P003',
            name: '龙井',
            category: '绿茶',
            spec: '50g/盒',
            unit: '盒',
            warehouse: '次仓库',
            location: 'B-01-01',
            stock: 0,
            available: 0,
            locked: 0,
            warning: 200,
            status: 'stockout'
        },
        {
            code: 'P004',
            name: '普洱茶',
            category: '黑茶',
            spec: '357g/饼',
            unit: '饼',
            warehouse: '主仓库',
            location: 'A-02-01',
            stock: 850,
            available: 800,
            locked: 50,
            warning: 300,
            status: 'overstock'
        },
        {
            code: 'P005',
            name: '金骏眉',
            category: '红茶',
            spec: '100g/盒',
            unit: '盒',
            warehouse: '次仓库',
            location: 'B-02-01',
            stock: 520,
            available: 500,
            locked: 20,
            warning: 400,
            status: 'normal'
        }
    ];

    renderStockTable(stockData);
}

// 渲染库存表格
function renderStockTable(data) {
    const tbody = document.getElementById('stockTable');
    tbody.innerHTML = data.map(item => `
        <tr>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.spec}</td>
            <td>${item.unit}</td>
            <td>${item.warehouse}</td>
            <td>${item.location}</td>
            <td>${item.stock}</td>
            <td>${item.available}</td>
            <td>${item.locked}</td>
            <td>${item.warning}</td>
            <td><span class="stock-status ${item.status}">${formatStatus(item.status)}</span></td>
            <td>
                <div class="button-group">
                    <button class="standard-button" onclick="viewDetail('${item.code}')">
                        <i class="fas fa-eye"></i> 查看
                    </button>
                    <button class="standard-button" onclick="viewFlow('${item.code}')">
                        <i class="fas fa-random"></i> 流水
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 格式化库存状态
function formatStatus(status) {
    const statusMap = {
        normal: '正常',
        warning: '预警',
        stockout: '缺货',
        overstock: '积压'
    };
    return statusMap[status] || status;
}

// 查询库存
function searchStock() {
    // TODO: 实现查询功能
}

// 导出库存
function exportStock() {
    // TODO: 实现导出功能
}

// 查看详情
function viewDetail(code) {
    // TODO: 实现查看详情功能
}

// 查看流水
function viewFlow(code) {
    // TODO: 实现查看流水功能
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initPageData();
}); 