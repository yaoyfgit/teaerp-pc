// 引入组件
import { Table } from '../../../../components/table.js';
import { Message } from '../../../../components/message.js';
import { Chart } from '../../../../components/chart.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initTable();
    initFormSubmit();
    initTabs();
    initChart();
});

// 初始化表格
function initTable() {
    const table = new Table('reportTable', {
        columns: [
            { title: '项目', key: 'name' },
            { title: '材料成本', key: 'materialCost' },
            { title: '人工成本', key: 'laborCost' },
            { title: '制造费用', key: 'manufacturingCost' },
            { title: '总成本', key: 'totalCost' },
            { title: '成本占比', key: 'costRatio' }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            name: '红茶',
            materialCost: 85000.00,
            laborCost: 45000.00,
            manufacturingCost: 25000.00,
            totalCost: 155000.00,
            costRatio: '38.75%'
        },
        {
            name: '绿茶',
            materialCost: 75000.00,
            laborCost: 38000.00,
            manufacturingCost: 22000.00,
            totalCost: 135000.00,
            costRatio: '33.75%'
        },
        {
            name: '乌龙茶',
            materialCost: 65000.00,
            laborCost: 32000.00,
            manufacturingCost: 13000.00,
            totalCost: 110000.00,
            costRatio: '27.50%'
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
    const chart = new Chart('costChart', {
        type: 'bar',
        data: {
            labels: ['红茶', '绿茶', '乌龙茶'],
            datasets: [
                {
                    label: '材料成本',
                    data: [85000, 75000, 65000],
                    backgroundColor: '#4dabf7'
                },
                {
                    label: '人工成本',
                    data: [45000, 38000, 32000],
                    backgroundColor: '#51cf66'
                },
                {
                    label: '制造费用',
                    data: [25000, 22000, 13000],
                    backgroundColor: '#ffd43b'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: { stacked: true },
                y: { stacked: true }
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
        totalCost: 400000.00,
        materialCost: 225000.00,
        laborCost: 115000.00,
        manufacturingCost: 60000.00,
        details: [
            {
                name: '红茶',
                materialCost: 85000.00,
                laborCost: 45000.00,
                manufacturingCost: 25000.00,
                totalCost: 155000.00,
                costRatio: '38.75%'
            },
            {
                name: '绿茶',
                materialCost: 75000.00,
                laborCost: 38000.00,
                manufacturingCost: 22000.00,
                totalCost: 135000.00,
                costRatio: '33.75%'
            },
            {
                name: '乌龙茶',
                materialCost: 65000.00,
                laborCost: 32000.00,
                manufacturingCost: 13000.00,
                totalCost: 110000.00,
                costRatio: '27.50%'
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
    document.getElementById('totalCost').textContent = result.totalCost.toFixed(2);
    document.getElementById('materialCost').textContent = result.materialCost.toFixed(2);
    document.getElementById('laborCost').textContent = result.laborCost.toFixed(2);
    document.getElementById('manufacturingCost').textContent = result.manufacturingCost.toFixed(2);

    // 更新表格
    const table = new Table('reportTable');
    table.setData(result.details);

    // 更新图表
    const chart = new Chart('costChart');
    chart.setData({
        labels: result.details.map(item => item.name),
        datasets: [
            {
                label: '材料成本',
                data: result.details.map(item => item.materialCost),
                backgroundColor: '#4dabf7'
            },
            {
                label: '人工成本',
                data: result.details.map(item => item.laborCost),
                backgroundColor: '#51cf66'
            },
            {
                label: '制造费用',
                data: result.details.map(item => item.manufacturingCost),
                backgroundColor: '#ffd43b'
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