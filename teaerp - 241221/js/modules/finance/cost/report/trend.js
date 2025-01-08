// 引入组件
import { Table } from '../../../../components/table.js';
import { Message } from '../../../../components/message.js';
import { Chart } from '../../../../components/chart.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initFormEvents();
    initTables();
    initFormSubmit();
    initTabs();
    initChart();
});

// 初始化表单事件
function initFormEvents() {
    // 监听分析对象类型变化
    const typeSelect = document.querySelector('select[name="targetType"]');
    typeSelect.onchange = function() {
        loadTargets(this.value);
    };

    // 监听时间范围变化
    const rangeSelect = document.querySelector('select[name="timeRange"]');
    const dateRange = document.querySelector('.date-range');
    rangeSelect.onchange = function() {
        dateRange.style.display = this.value === 'custom' ? 'flex' : 'none';
    };
}

// 加载分析对象
function loadTargets(type) {
    const targetSelect = document.querySelector('select[name="targetId"]');
    targetSelect.innerHTML = '<option value="">请选择</option>';

    // 模拟数据
    let targets = [];
    switch(type) {
        case 'product':
            targets = [
                { id: 'P001', name: '红茶' },
                { id: 'P002', name: '绿茶' },
                { id: 'P003', name: '乌龙茶' }
            ];
            break;
        case 'department':
            targets = [
                { id: 'D001', name: '生产部' },
                { id: 'D002', name: '销售部' },
                { id: 'D003', name: '研发部' }
            ];
            break;
        case 'project':
            targets = [
                { id: 'PR001', name: '新品研发项目' },
                { id: 'PR002', name: '产能扩建项目' }
            ];
            break;
    }

    targets.forEach(target => {
        const option = document.createElement('option');
        option.value = target.id;
        option.textContent = target.name;
        targetSelect.appendChild(option);
    });
}

// 初始化表格
function initTables() {
    const table = new Table('reportTable', {
        columns: [
            { title: '期间', key: 'period' },
            { title: '材料成本', key: 'materialCost' },
            { title: '人工成本', key: 'laborCost' },
            { title: '制造费用', key: 'manufacturingCost' },
            { title: '总成本', key: 'totalCost' },
            { title: '环比变动', key: 'monthChange' },
            { title: '同比变动', key: 'yearChange' }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            period: '2024-03',
            materialCost: 85000.00,
            laborCost: 45000.00,
            manufacturingCost: 25000.00,
            totalCost: 155000.00,
            monthChange: '+3.5%',
            yearChange: '+5.8%'
        },
        {
            period: '2024-02',
            materialCost: 82000.00,
            laborCost: 43000.00,
            manufacturingCost: 24500.00,
            totalCost: 149500.00,
            monthChange: '+2.8%',
            yearChange: '+4.9%'
        }
    ];
    table.setData(mockData);
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
    const chart = new Chart('trendChart', {
        type: 'line',
        data: {
            labels: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'],
            datasets: [
                {
                    label: '材料成本',
                    data: [80000, 82000, 85000, 83000, 86000, 88000],
                    borderColor: '#4dabf7'
                },
                {
                    label: '人工成本',
                    data: [42000, 43000, 45000, 44000, 46000, 47000],
                    borderColor: '#51cf66'
                },
                {
                    label: '制造费用',
                    data: [24000, 24500, 25000, 25500, 26000, 26500],
                    borderColor: '#ffd43b'
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
        avgCost: 152000.00,
        maxCost: 161500.00,
        minCost: 146500.00,
        trend: '上升',
        details: [
            {
                period: '2024-03',
                materialCost: 85000.00,
                laborCost: 45000.00,
                manufacturingCost: 25000.00,
                totalCost: 155000.00,
                monthChange: '+3.5%',
                yearChange: '+5.8%'
            }
        ],
        trends: {
            labels: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'],
            material: [80000, 82000, 85000, 83000, 86000, 88000],
            labor: [42000, 43000, 45000, 44000, 46000, 47000],
            manufacturing: [24000, 24500, 25000, 25500, 26000, 26500]
        },
        analysis: [
            { title: '成本趋势', content: '整体呈上升趋势，近6个月平均增长率3.2%' },
            { title: '主要影响因素', content: '原材料价格上涨、人工���本增加' },
            { title: '改进建议', content: '优化供应链、提高生产效率、加强成本控制' }
        ]
    };

    // 更新显示
    updateReport(result);
    Message.show('报表生成完成', 'success');
}

// 更新报表显示
function updateReport(result) {
    // 更新汇总数据
    document.getElementById('avgCost').textContent = result.avgCost.toFixed(2);
    document.getElementById('maxCost').textContent = result.maxCost.toFixed(2);
    document.getElementById('minCost').textContent = result.minCost.toFixed(2);
    document.getElementById('trend').textContent = result.trend;

    // 更新表格
    const table = new Table('reportTable');
    table.setData(result.details);

    // 更新图表
    const chart = new Chart('trendChart');
    chart.setData({
        labels: result.trends.labels,
        datasets: [
            {
                label: '材料成本',
                data: result.trends.material,
                borderColor: '#4dabf7'
            },
            {
                label: '人工成本',
                data: result.trends.labor,
                borderColor: '#51cf66'
            },
            {
                label: '制造费用',
                data: result.trends.manufacturing,
                borderColor: '#ffd43b'
            }
        ]
    });

    // 更新分析内容
    const analysisContent = document.getElementById('analysisContent');
    analysisContent.innerHTML = result.analysis.map(item => `
        <div class="analysis-item">
            <h4>${item.title}</h4>
            <p>${item.content}</p>
        </div>
    `).join('');
}

// 导出报表
function exportReport() {
    // TODO: 导出报表
    console.log('导出报表');
    Message.show('报表导出成功', 'success');
} 