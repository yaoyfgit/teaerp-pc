// 引入组件
import { Table } from '../../../../../components/table.js';
import { Pagination } from '../../../../../components/pagination.js';
import { Message } from '../../../../../components/message.js';
import { Modal } from '../../../../../components/modal.js';
import { Chart } from '../../../../../components/chart.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initTable();
    updateStats();
    initCharts();
});

// 初始化表格
function initTable() {
    const table = new Table('progressTable', {
        columns: [
            { title: '目标编号', key: 'code' },
            { title: '目标类型', key: 'type' },
            { title: '目标名称', key: 'name' },
            { title: '目标值', key: 'value' },
            { title: '单位', key: 'unit' },
            { title: '开始日期', key: 'startDate' },
            { title: '结束日期', key: 'endDate' },
            { title: '完成进度', key: 'progress', render: (progress) => `
                <div class="progress-bar">
                    <div class="progress" style="width: ${progress}%"></div>
                    <span>${progress}%</span>
                </div>
            ` },
            { title: '完成状态', key: 'status' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="viewProgress('${row.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="button small" onclick="updateProgress('${row.id}')">
                    <i class="fas fa-edit"></i>
                </button>
            ` }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            id: 'T001',
            code: 'TARGET202401001',
            type: '公司目标',
            name: '年度销售总额目标',
            value: 10000000.00,
            unit: '元',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            progress: 85,
            status: '进行中'
        },
        {
            id: 'T002',
            code: 'TARGET202401002',
            type: '部门目标',
            name: '客户满意度目标',
            value: 95.00,
            unit: '%',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            progress: 92,
            status: '进行中'
        }
    ];
    table.setData(mockData);

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

// 更新统计数据
function updateStats() {
    // 模拟数据
    const stats = {
        totalTargets: 100,
        completedTargets: 45,
        inProgressTargets: 35,
        notStartedTargets: 20,
        avgCompletion: 78.5
    };

    document.getElementById('totalTargets').textContent = stats.totalTargets;
    document.getElementById('completedTargets').textContent = stats.completedTargets;
    document.getElementById('inProgressTargets').textContent = stats.inProgressTargets;
    document.getElementById('notStartedTargets').textContent = stats.notStartedTargets;
    document.getElementById('avgCompletion').textContent = stats.avgCompletion.toFixed(1) + '%';
}

// 初始化图表
function initCharts() {
    // 完成率趋势图
    const trendChart = new Chart('trendChart', {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [
                {
                    label: '目标完成率',
                    data: [65, 70, 75, 80, 82, 85],
                    borderColor: '#4dabf7',
                    fill: false
                }
            ]
        }
    });

    // 目标分布图
    const distributionChart = new Chart('distributionChart', {
        type: 'pie',
        data: {
            labels: ['提前完成', '按时完成', '延期完成', '未完成'],
            datasets: [
                {
                    data: [15, 30, 10, 45],
                    backgroundColor: ['#51cf66', '#4dabf7', '#ffd43b', '#ff6b6b']
                }
            ]
        }
    });
}

// 查看进度详情
function viewProgress(id) {
    // TODO: 显示进度详情
    console.log('查看进度:', id);
}

// 更新进度
function updateProgress(id) {
    // TODO: 加载进度数据到表单
    console.log('更新进度:', id);
    showModal('progressModal');
}

// 保存进度
function saveProgress() {
    const form = document.getElementById('progressForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存进度
    console.log('保存进度:', data);
    
    hideModal('progressModal');
    Message.show('进度已更新', 'success');
}

// 搜索进度
function searchProgress() {
    const type = document.getElementById('searchType').value;
    const year = document.getElementById('searchYear').value;
    const status = document.getElementById('searchStatus').value;
    
    // TODO: 根据条件重新加载数据
    console.log('搜索条件:', { type, year, status });
} 