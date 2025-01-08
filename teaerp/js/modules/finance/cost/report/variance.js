// 引入组件
import { Table } from '../../../../components/table.js';
import { Message } from '../../../../components/message.js';
import { Chart } from '../../../../components/chart.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initTables();
    initFormSubmit();
    initTabs();
    initChart();
});

// 初始化表格
function initTables() {
    // 差异报表表格
    const reportTable = new Table('reportTable', {
        columns: [
            { title: '项目', key: 'name' },
            { title: '标准/预算', key: 'standard' },
            { title: '实际', key: 'actual' },
            { title: '差异', key: 'variance' },
            { title: '差异率', key: 'varianceRate' }
        ]
    });

    // 差异明细表格
    const detailTable = new Table('detailTable', {
        columns: [
            { title: '成本项目', key: 'item' },
            { title: '差异类型', key: 'type' },
            { title: '差异金额', key: 'amount' },
            { title: '影响因素', key: 'factor' },
            { title: '改进建议', key: 'suggestion' }
        ]
    });

    // 模拟数据
    const mockReportData = [
        {
            name: '红茶',
            standard: 150000.00,
            actual: 155000.00,
            variance: -5000.00,
            varianceRate: '-3.33%'
        },
        {
            name: '绿茶',
            standard: 130000.00,
            actual: 135000.00,
            variance: -5000.00,
            varianceRate: '-3.85%'
        },
        {
            name: '乌龙茶',
            standard: 95000.00,
            actual: 110000.00,
            variance: -15000.00,
            varianceRate: '-15.79%'
        }
    ];
    reportTable.setData(mockReportData);

    const mockDetailData = [
        {
            item: '原料采购',
            type: '价格差异',
            amount: -8000.00,
            factor: '市场价格上涨',
            suggestion: '优化供应商结构，签订长期协议'
        },
        {
            item: '人工成本',
            type: '效率差异',
            amount: -5000.00,
            factor: '生产效率下降',
            suggestion: '加强员工培训，优化生产流程'
        },
        {
            item: '制造费用',
            type: '产能利用差异',
            amount: -3000.00,
            factor: '设备利用率低',
            suggestion: '提高设备利用率，优化生产计划'
        }
    ];
    detailTable.setData(mockDetailData);
}

// 初始化表单提交
function initFormSubmit() {
    const form = document.getElementById('reportForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        generateReport();
    };
}

// 初始化标签页
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.onclick = function() {
            const tabId = this.dataset.tab;
            
            // 切换按钮状态
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 切换内容区域
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId + 'Tab') {
                    pane.classList.add('active');
                }
            });
        };
    });
}

// 初始化图表
function initChart() {
    const chart = new Chart('varianceChart', {
        type: 'bar',
        data: {
            labels: ['红茶', '绿茶', '乌龙茶'],
            datasets: [
                {
                    label: '标准/预算',
                    data: [150000, 130000, 95000],
                    backgroundColor: '#4dabf7'
                },
                {
                    label: '实际',
                    data: [155000, 135000, 110000],
                    backgroundColor: '#51cf66'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// 生成报表
function generateReport() {
    const form = document.getElementById('reportForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API获取报表数据
    console.log('查询条件:', data);
    
    // 模拟报表结果
    const result = {
        totalVariance: -25000.00,
        materialVariance: -12000.00,
        laborVariance: -8000.00,
        manufacturingVariance: -5000.00,
        details: [
            {
                name: '红茶',
                standard: 150000.00,
                actual: 155000.00,
                variance: -5000.00,
                varianceRate: '-3.33%'
            },
            {
                name: '绿茶',
                standard: 130000.00,
                actual: 135000.00,
                variance: -5000.00,
                varianceRate: '-3.85%'
            },
            {
                name: '乌龙茶',
                standard: 95000.00,
                actual: 110000.00,
                variance: -15000.00,
                varianceRate: '-15.79%'
            }
        ],
        factors: [
            {
                item: '原料采购',
                type: '价格差异',
                amount: -8000.00,
                factor: '市场价格上涨',
                suggestion: '优化供应商结构，签订长期协议'
            },
            {
                item: '人工成本',
                type: '效率差异',
                amount: -5000.00,
                factor: '生产效率下降',
                suggestion: '加强员工培训，优化生产流程'
            },
            {
                item: '制造费用',
                type: '产能利用差异',
                amount: -3000.00,
                factor: '设备利用率低',
                suggestion: '提高设备利用率，优化生产计划'
            }
        ]
    };

    // 更新显示
    updateReport(result);
    Message.show('报表生成完成', 'success');
}

// 更新报表显示
function updateReport(result) {
    // 更新汇总数据
    document.getElementById('totalVariance').textContent = result.totalVariance.toFixed(2);
    document.getElementById('materialVariance').textContent = result.materialVariance.toFixed(2);
    document.getElementById('laborVariance').textContent = result.laborVariance.toFixed(2);
    document.getElementById('manufacturingVariance').textContent = result.manufacturingVariance.toFixed(2);

    // 更新表格
    const reportTable = new Table('reportTable');
    reportTable.setData(result.details);

    const detailTable = new Table('detailTable');
    detailTable.setData(result.factors);

    // 更新图表
    const chart = new Chart('varianceChart');
    chart.setData({
        labels: result.details.map(item => item.name),
        datasets: [
            {
                label: '标准/预算',
                data: result.details.map(item => item.standard),
                backgroundColor: '#4dabf7'
            },
            {
                label: '实际',
                data: result.details.map(item => item.actual),
                backgroundColor: '#51cf66'
            }
        ]
    });
}

// 导出报表
function exportReport() {
    // TODO: 导出报表
    console.log('导出报表');
    Message.show('报表导出成功', 'success');
} 