// 初始化所有图表
function initCharts() {
    // 初始化周转率趋势图
    const turnoverTrendChart = echarts.init(document.getElementById('turnoverTrendChart'));
    turnoverTrendChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            name: '周转率'
        },
        series: [{
            name: '周转率',
            type: 'line',
            smooth: true,
            data: [3.2, 3.3, 3.4, 3.5, 3.6, 3.5],
            itemStyle: {
                color: '#1890ff'
            }
        }]
    });

    // 初始化库存结构分析图
    const stockStructureChart = echarts.init(document.getElementById('stockStructureChart'));
    stockStructureChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [{
            name: '库存结构',
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
                    fontSize: '14',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: '茶叶' },
                { value: 735, name: '茶具' },
                { value: 580, name: '包装' },
                { value: 484, name: '礼盒' }
            ]
        }]
    });

    // 初始化ABC分类分析图
    const abcAnalysisChart = echarts.init(document.getElementById('abcAnalysisChart'));
    abcAnalysisChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['商品数量', '库存金额']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['A类', 'B类', 'C类']
        },
        yAxis: [{
            type: 'value',
            name: '商品数量',
            position: 'left'
        }, {
            type: 'value',
            name: '库存金额',
            position: 'right'
        }],
        series: [{
            name: '商品数量',
            type: 'bar',
            data: [20, 30, 50]
        }, {
            name: '库存金额',
            type: 'bar',
            yAxisIndex: 1,
            data: [80, 15, 5]
        }]
    });

    // 初始化库存异常分析图
    const stockAbnormalChart = echarts.init(document.getElementById('stockAbnormalChart'));
    stockAbnormalChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [{
            name: '异常类型',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 35, name: '积压' },
                { value: 25, name: '缺货' },
                { value: 20, name: '呆滞' },
                { value: 15, name: '报损' },
                { value: 5, name: '其他' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    });

    // 监听窗口大小变化，重新调整图表大小
    window.addEventListener('resize', () => {
        turnoverTrendChart.resize();
        stockStructureChart.resize();
        abcAnalysisChart.resize();
        stockAbnormalChart.resize();
    });
}

// 更新图表数据
function updateCharts() {
    // TODO: 从后端获取数据并更新图表
}

// 导出报表
function exportAnalysis() {
    // TODO: 实现导出功能
}

// 初始化标签页切换
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-header .standard-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // 设置当前标签为活动状态
            button.classList.add('active');
            document.getElementById(tabId + 'Tab').classList.add('active');
        });
    });
}

// 初始化报表数据
function initTableData() {
    // 周转分析数据
    const turnoverData = [
        { category: '茶叶', count: 120, amount: '125,000', turnover: 3.8, days: 12, mom: '+0.3', yoy: '+0.5' },
        { category: '茶具', count: 85, amount: '98,000', turnover: 3.2, days: 15, mom: '+0.1', yoy: '+0.3' },
        { category: '包装', count: 65, amount: '45,000', turnover: 4.2, days: 10, mom: '+0.4', yoy: '+0.8' },
        { category: '礼盒', count: 45, amount: '68,000', turnover: 2.8, days: 18, mom: '-0.2', yoy: '+0.2' }
    ];

    // 结构分析数据
    const structureData = [
        { warehouse: '主仓库', category: '茶叶', productCount: 120, stockCount: 2500, amount: '125,000', ratio: '37.2%' },
        { warehouse: '主仓库', category: '茶具', productCount: 85, stockCount: 1800, amount: '98,000', ratio: '29.2%' },
        { warehouse: '次仓库', category: '包装', productCount: 65, stockCount: 3500, amount: '45,000', ratio: '13.4%' },
        { warehouse: '次仓库', category: '礼盒', productCount: 45, stockCount: 1200, amount: '68,000', ratio: '20.2%' }
    ];

    // ABC分析数据
    const abcData = [
        { level: 'A类', productCount: 58, productRatio: '18.5%', amount: '220,000', amountRatio: '65.4%', strategy: '重点管理，严格控制' },
        { level: 'B类', productCount: 125, productRatio: '39.8%', amount: '85,000', amountRatio: '25.3%', strategy: '常规管理，适度控制' },
        { level: 'C类', productCount: 131, productRatio: '41.7%', amount: '31,000', amountRatio: '9.3%', strategy: '简单管理，放宽控制' }
    ];

    // 异常分析数据
    const abnormalData = [
        { type: '积压', count: 35, amount: '58,000', ratio: '35.8%', suggestion: '促销清理，控制采购' },
        { type: '缺货', count: 25, amount: '42,000', ratio: '25.9%', suggestion: '及时补货，提高库存' },
        { type: '呆滞', count: 20, amount: '35,000', ratio: '21.6%', suggestion: '折价处理，避免积压' },
        { type: '报损', count: 15, amount: '22,000', ratio: '13.6%', suggestion: '优化存储，减少损耗' },
        { type: '其他', count: 5, amount: '5,000', ratio: '3.1%', suggestion: '具体分析，专项处理' }
    ];

    // 渲染表格数据
    renderTable('turnoverTable', turnoverData, [
        { key: 'category', format: v => v },
        { key: 'count', format: v => v },
        { key: 'amount', format: v => v },
        { key: 'turnover', format: v => v.toFixed(1) },
        { key: 'days', format: v => v },
        { key: 'mom', format: v => formatTrend(v) },
        { key: 'yoy', format: v => formatTrend(v) }
    ]);

    renderTable('structureTable', structureData, [
        { key: 'warehouse', format: v => v },
        { key: 'category', format: v => v },
        { key: 'productCount', format: v => v },
        { key: 'stockCount', format: v => v.toLocaleString() },
        { key: 'amount', format: v => v },
        { key: 'ratio', format: v => v }
    ]);

    renderTable('abcTable', abcData, [
        { key: 'level', format: v => v },
        { key: 'productCount', format: v => v },
        { key: 'productRatio', format: v => v },
        { key: 'amount', format: v => v },
        { key: 'amountRatio', format: v => v },
        { key: 'strategy', format: v => v }
    ]);

    renderTable('abnormalTable', abnormalData, [
        { key: 'type', format: v => v },
        { key: 'count', format: v => v },
        { key: 'amount', format: v => v },
        { key: 'ratio', format: v => v },
        { key: 'suggestion', format: v => v }
    ]);
}

// 渲染表格
function renderTable(tableId, data, columns) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = data.map(row => `
        <tr>
            ${columns.map(col => `<td>${col.format(row[col.key])}</td>`).join('')}
        </tr>
    `).join('');
}

// 格式化趋势
function formatTrend(value) {
    const cls = value.startsWith('+') ? 'success' : 'danger';
    return `<span class="trend ${cls}">${value}</span>`;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    initTabs();
    initTableData();
}); 