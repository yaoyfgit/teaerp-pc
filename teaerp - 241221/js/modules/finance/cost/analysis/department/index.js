// 引入组件
import { Table } from '../../../../../components/table.js';
import { Pagination } from '../../../../../components/pagination.js';
import { Message } from '../../../../../components/message.js';
import { Chart } from '../../../../../components/chart.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadDepartments();
    initTables();
    initFormSubmit();
    initTabs();
    initCharts();
});

// 加载部门数据
function loadDepartments() {
    // 模拟数据
    const departments = [
        { id: 'D001', name: '生产部' },
        { id: 'D002', name: '销售部' },
        { id: 'D003', name: '研发部' }
    ];

    const selects = document.querySelectorAll('select[name="departmentId"], #searchDepartment');
    selects.forEach(select => {
        departments.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept.id;
            option.textContent = dept.name;
            select.appendChild(option);
        });
    });
}

// 初始化表格
function initTables() {
    // 分析表格
    const analysisTable = new Table('analysisTable', {
        columns: [
            { title: '项目', key: 'name' },
            { title: '直接成本', key: 'directCost' },
            { title: '间接成本', key: 'indirectCost' },
            { title: '总成本', key: 'totalCost' },
            { title: '预算金额', key: 'budget' },
            { title: '完成率', key: 'completionRate' }
        ]
    });

    // 历史记录表格
    const historyTable = new Table('historyTable', {
        columns: [
            { title: '分析日期', key: 'analysisDate' },
            { title: '部门', key: 'departmentName' },
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
            id: 'A001',
            analysisDate: '2024-03-15',
            departmentName: '生产部',
            period: '2024-02',
            dimension: '按成本类型',
            totalCost: 128900.00,
            analyzer: '张三'
        },
        {
            id: 'A002',
            analysisDate: '2024-03-15',
            departmentName: '销售部',
            period: '2024-02',
            dimension: '按业务活动',
            totalCost: 85800.00,
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
            labels: ['直接成本', '间接成本'],
            datasets: [{
                data: [0, 0],
                backgroundColor: ['#4dabf7', '#51cf66']
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
                    label: '直接成本',
                    data: [],
                    borderColor: '#4dabf7'
                },
                {
                    label: '间接成本',
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

    // 成本对比图表
    const compareChart = new Chart('costCompareChart', {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: '实际成本',
                    data: [],
                    backgroundColor: '#4dabf7'
                },
                {
                    label: '预算金额',
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
                text: '成本对比分析'
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
        totalCost: 128900.00,
        directCost: 89500.00,
        indirectCost: 39400.00,
        budgetRate: '85.93%',
        details: [
            {
                name: '人工费用',
                directCost: 45800.00,
                indirectCost: 22400.00,
                totalCost: 68200.00,
                budget: 75000.00,
                completionRate: '90.93%'
            },
            {
                name: '材料费用',
                directCost: 43700.00,
                indirectCost: 17000.00,
                totalCost: 60700.00,
                budget: 65000.00,
                completionRate: '93.38%'
            }
        ],
        trend: {
            labels: ['1月', '2月', '3月'],
            direct: [85000, 89500, 92000],
            indirect: [35000, 39400, 41000]
        },
        compare: {
            labels: ['人工费用', '材料费用', '其他费用'],
            actual: [68200, 60700, 39400],
            budget: [75000, 65000, 45000]
        }
    };

    // 更新显示
    updateResult(result);
    Message.show('分析完成', 'success');
}

// 更新分析结果
function updateResult(result) {
    // 更新汇总数据
    document.getElementById('totalCost').textContent = result.totalCost.toFixed(2);
    document.getElementById('directCost').textContent = result.directCost.toFixed(2);
    document.getElementById('indirectCost').textContent = result.indirectCost.toFixed(2);
    document.getElementById('budgetRate').textContent = result.budgetRate;

    // 更新分析表格
    const analysisTable = new Table('analysisTable');
    analysisTable.setData(result.details);

    // 更新成本结构图表
    const structureChart = new Chart('costStructureChart');
    structureChart.setData({
        labels: ['直接成本', '间接成本'],
        datasets: [{
            data: [result.directCost, result.indirectCost],
            backgroundColor: ['#4dabf7', '#51cf66']
        }]
    });

    // 更新成本趋势图表
    const trendChart = new Chart('costTrendChart');
    trendChart.setData({
        labels: result.trend.labels,
        datasets: [
            {
                label: '直接成本',
                data: result.trend.direct,
                borderColor: '#4dabf7'
            },
            {
                label: '间接成本',
                data: result.trend.indirect,
                borderColor: '#51cf66'
            }
        ]
    });

    // 更新成本对比图表
    const compareChart = new Chart('costCompareChart');
    compareChart.setData({
        labels: result.compare.labels,
        datasets: [
            {
                label: '实际成本',
                data: result.compare.actual,
                backgroundColor: '#4dabf7'
            },
            {
                label: '预算金额',
                data: result.compare.budget,
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
    const department = document.getElementById('searchDepartment').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // TODO: 根据条件重新加载数据
    console.log('搜索条件:', { department, startDate, endDate });
}

// 查看详情
function viewDetail(id) {
    // TODO: 显示分析记录详情
    console.log('查看详情:', id);
} 