// 引入组件
import { Table } from '../../../../../components/table.js';
import { Pagination } from '../../../../../components/pagination.js';
import { Message } from '../../../../../components/message.js';
import { Chart } from '../../../../../components/chart.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initTables();
    initFormSubmit();
    initTabs();
    initCharts();
});

// 初始化表格
function initTables() {
    // 分析表格
    const analysisTable = new Table('analysisTable', {
        columns: [
            { title: '项目名称', key: 'name' },
            { title: '项目类型', key: 'type' },
            { title: '预算金额', key: 'budget' },
            { title: '实际成本', key: 'actualCost' },
            { title: '执行率', key: 'executionRate' },
            { title: '项目进度', key: 'progress' },
            { title: '状态', key: 'status' }
        ]
    });

    // 历史记录表格
    const historyTable = new Table('historyTable', {
        columns: [
            { title: '分析日期', key: 'analysisDate' },
            { title: '项目类型', key: 'projectType' },
            { title: '分析期间', key: 'period' },
            { title: '分析维度', key: 'dimension' },
            { title: '总成本', key: 'totalCost' },
            { title: '分析人员', key: 'analyzer' },
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
            id: 'P001',
            analysisDate: '2024-03-15',
            projectType: '研发项目',
            period: '2024-02',
            dimension: '按成本类型',
            totalCost: 258900.00,
            analyzer: '张三'
        },
        {
            id: 'P002',
            analysisDate: '2024-03-15',
            projectType: '生产项目',
            period: '2024-02',
            dimension: '按部门',
            totalCost: 185800.00,
            analyzer: '李四'
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
    const form = document.getElementById('analysisForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        analyzeCost();
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
            labels: ['人工成本', '材料成本', '其他成本'],
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
                    label: '预算成本',
                    data: [],
                    borderColor: '#4dabf7'
                },
                {
                    label: '实际成本',
                    data: [],
                    borderColor: '#51cf66'
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

    // 项目进度图表
    const progressChart = new Chart('progressChart', {
        type: 'horizontalBar',
        data: {
            labels: [],
            datasets: [
                {
                    label: '计划进度',
                    data: [],
                    backgroundColor: '#4dabf7'
                },
                {
                    label: '实际进度',
                    data: [],
                    backgroundColor: '#51cf66'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: '项目进度分析'
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }]
            }
        }
    });
}

// 分析成本
function analyzeCost() {
    const form = document.getElementById('analysisForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API分析成本
    console.log('分析条件:', data);
    
    // 模拟分析结果
    const result = {
        totalBudget: 300000.00,
        actualCost: 258900.00,
        budgetRate: '86.30%',
        progress: '75%',
        details: [
            {
                name: '新品研发项目',
                type: '研发项目',
                budget: 150000.00,
                actualCost: 128900.00,
                executionRate: '85.93%',
                progress: '80%',
                status: '进行中'
            },
            {
                name: '产能扩建项目',
                type: '生产项目',
                budget: 150000.00,
                actualCost: 130000.00,
                executionRate: '86.67%',
                progress: '70%',
                status: '进行中'
            }
        ],
        structure: {
            labels: ['人工成本', '材料成本', '其他成本'],
            data: [120000, 98900, 40000]
        },
        trend: {
            labels: ['1月', '2月', '3月'],
            budget: [250000, 275000, 300000],
            actual: [220000, 240000, 258900]
        },
        progress: {
            labels: ['需求分析', '设计开发', '测试验证', '项目验收'],
            planned: [100, 80, 60, 40],
            actual: [100, 85, 55, 30]
        }
    };

    // 更新显示
    updateResult(result);
    Message.show('分析完成', 'success');
}

// 更新分析结果
function updateResult(result) {
    // 更新汇总数据
    document.getElementById('totalBudget').textContent = result.totalBudget.toFixed(2);
    document.getElementById('actualCost').textContent = result.actualCost.toFixed(2);
    document.getElementById('budgetRate').textContent = result.budgetRate;
    document.getElementById('progress').textContent = result.progress;

    // 更新分析表格
    const analysisTable = new Table('analysisTable');
    analysisTable.setData(result.details);

    // 更新成本结构图表
    const structureChart = new Chart('costStructureChart');
    structureChart.setData({
        labels: result.structure.labels,
        datasets: [{
            data: result.structure.data,
            backgroundColor: ['#4dabf7', '#51cf66', '#ffd43b']
        }]
    });

    // 更新成本趋势图表
    const trendChart = new Chart('costTrendChart');
    trendChart.setData({
        labels: result.trend.labels,
        datasets: [
            {
                label: '预算成本',
                data: result.trend.budget,
                borderColor: '#4dabf7'
            },
            {
                label: '实际成本',
                data: result.trend.actual,
                borderColor: '#51cf66'
            }
        ]
    });

    // 更新项目进度图表
    const progressChart = new Chart('progressChart');
    progressChart.setData({
        labels: result.progress.labels,
        datasets: [
            {
                label: '计划进度',
                data: result.progress.planned,
                backgroundColor: '#4dabf7'
            },
            {
                label: '实际进度',
                data: result.progress.actual,
                backgroundColor: '#51cf66'
            }
        ]
    });
}

// 导出结果
function exportResult() {
    // TODO: 导出分析结果
    console.log('导出结果');
    Message.show('导出成功', 'success');
}

// 搜索记录
function searchRecords() {
    const type = document.getElementById('searchType').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // TODO: 根据条件重新加载数据
    console.log('搜索条件:', { type, startDate, endDate });
}

// 查看详情
function viewDetail(id) {
    // TODO: 显示分析记录详情
    console.log('查看详情:', id);
} 