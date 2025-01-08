// 引入组件
import { Table } from '../../../../../components/table.js';
import { Pagination } from '../../../../../components/pagination.js';
import { Message } from '../../../../../components/message.js';
import { Chart } from '../../../../../components/chart.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadCategories();
    initTables();
    initFormSubmit();
    initTabs();
    initCharts();
});

// 加载产品类别
function loadCategories() {
    // 模拟数据
    const categories = [
        { id: 'C001', name: '红茶' },
        { id: 'C002', name: '绿茶' },
        { id: 'C003', name: '乌龙茶' }
    ];

    const selects = document.querySelectorAll('select[name="categoryId"], #searchCategory');
    selects.forEach(select => {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        });
    });
}

// 初始化表格
function initTables() {
    // ��总表格
    const summaryTable = new Table('summaryTable', {
        columns: [
            { title: '项目', key: 'name' },
            { title: '材料成本', key: 'materialCost' },
            { title: '人工成本', key: 'laborCost' },
            { title: '制造费用', key: 'manufacturingCost' },
            { title: '总成本', key: 'totalCost' },
            { title: '成本占比', key: 'costRatio' }
        ]
    });

    // 历史记录表格
    const historyTable = new Table('historyTable', {
        columns: [
            { title: '汇总日期', key: 'summaryDate' },
            { title: '汇总期间', key: 'period' },
            { title: '汇总维度', key: 'dimension' },
            { title: '总成本', key: 'totalCost' },
            { title: '汇总人员', key: 'summarizer' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="viewDetail('${row.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            ` }
        ]
    });

    // 模拟数据
    const mockHistoryData = [
        {
            id: 'S001',
            summaryDate: '2024-03-15',
            period: '2024-02',
            dimension: '按产品',
            totalCost: 158900.00,
            summarizer: '张三'
        },
        {
            id: 'S002',
            summaryDate: '2024-03-15',
            period: '2024-02',
            dimension: '按类别',
            totalCost: 245800.00,
            summarizer: '李四'
        }
    ];
    historyTable.setData(mockHistoryData);

    // 初始化分页
    const pagination = new Pagination('pagination', {
        pageSize: 10,
        total: 100,
        onChange: (page) => {
            // TODO: 加载对应页的数据
            console.log('切换到第', page, '页');
        }
    });
}

// 初始化表单提交
function initFormSubmit() {
    const form = document.getElementById('summaryForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        summarizeCost();
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
function initCharts() {
    // 成本结构图表
    const structureChart = new Chart('costStructureChart', {
        type: 'pie',
        data: {
            labels: ['材料成本', '人工成本', '制造费用'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: ['#4dabf7', '#51cf66', '#ffd43b']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: '成本结构分析'
            }
        }
    });

    // 成本趋势图表
    const trendChart = new Chart('costTrendChart', {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: '材料成本',
                    data: [],
                    borderColor: '#4dabf7'
                },
                {
                    label: '人工成本',
                    data: [],
                    borderColor: '#51cf66'
                },
                {
                    label: '制造费用',
                    data: [],
                    borderColor: '#ffd43b'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: '成本趋势分析'
            }
        }
    });
}

// 汇总成本
function summarizeCost() {
    const form = document.getElementById('summaryForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API汇总成本
    console.log('汇总条件:', data);
    
    // 模拟汇总结果
    const result = {
        totalCost: 158900.00,
        materialCost: 89500.00,
        laborCost: 42400.00,
        manufacturingCost: 27000.00,
        details: [
            {
                name: '红茶',
                materialCost: 45800.00,
                laborCost: 22400.00,
                manufacturingCost: 15000.00,
                totalCost: 83200.00,
                costRatio: '52.36%'
            },
            {
                name: '绿茶',
                materialCost: 43700.00,
                laborCost: 20000.00,
                manufacturingCost: 12000.00,
                totalCost: 75700.00,
                costRatio: '47.64%'
            }
        ],
        trend: {
            labels: ['1��', '2月', '3月'],
            material: [85000, 89500, 92000],
            labor: [40000, 42400, 43500],
            manufacturing: [25000, 27000, 28000]
        }
    };

    // 更新显示
    updateResult(result);
    Message.show('汇总完成', 'success');
}

// 更新汇总结果
function updateResult(result) {
    // 更新汇总数据
    document.getElementById('totalCost').textContent = result.totalCost.toFixed(2);
    document.getElementById('materialCost').textContent = result.materialCost.toFixed(2);
    document.getElementById('laborCost').textContent = result.laborCost.toFixed(2);
    document.getElementById('manufacturingCost').textContent = result.manufacturingCost.toFixed(2);

    // 更新汇总表格
    const summaryTable = new Table('summaryTable');
    summaryTable.setData(result.details);

    // 更新成本结构图表
    const structureChart = new Chart('costStructureChart');
    structureChart.setData({
        labels: ['材料成本', '人工成本', '制造费用'],
        datasets: [{
            data: [
                result.materialCost,
                result.laborCost,
                result.manufacturingCost
            ],
            backgroundColor: ['#4dabf7', '#51cf66', '#ffd43b']
        }]
    });

    // 更新成本趋势图表
    const trendChart = new Chart('costTrendChart');
    trendChart.setData({
        labels: result.trend.labels,
        datasets: [
            {
                label: '材料成本',
                data: result.trend.material,
                borderColor: '#4dabf7'
            },
            {
                label: '人工成本',
                data: result.trend.labor,
                borderColor: '#51cf66'
            },
            {
                label: '制造费用',
                data: result.trend.manufacturing,
                borderColor: '#ffd43b'
            }
        ]
    });
}

// 导出结果
function exportResult() {
    // TODO: 导出汇总结果
    console.log('导出结果');
    Message.show('导出成功', 'success');
}

// 搜索记录
function searchRecords() {
    const category = document.getElementById('searchCategory').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // TODO: 根据条件重新加载数据
    console.log('搜索条件:', { category, startDate, endDate });
}

// 查看详情
function viewDetail(id) {
    // TODO: 显示汇总记录详情
    console.log('查看详情:', id);
} 