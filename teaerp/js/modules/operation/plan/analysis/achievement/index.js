// 引入组件
import { Chart } from '../../../../../components/chart.js';
import { Table } from '../../../../../components/table.js';
import { Pagination } from '../../../../../components/pagination.js';
import { Message } from '../../../../../components/message.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initStats();
    initCharts();
    initTable();
});

// 初始化统计数据
function initStats() {
    // 模拟数据
    const stats = {
        totalTargets: 100,
        exceededTargets: 20,
        achievedTargets: 45,
        riskTargets: 25,
        failedTargets: 10
    };

    document.getElementById('totalTargets').textContent = stats.totalTargets;
    document.getElementById('exceededTargets').textContent = stats.exceededTargets;
    document.getElementById('achievedTargets').textContent = stats.achievedTargets;
    document.getElementById('riskTargets').textContent = stats.riskTargets;
    document.getElementById('failedTargets').textContent = stats.failedTargets;
}

// 初始化图表
function initCharts() {
    // 达成趋势图
    const trendChart = new Chart('trendChart', {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [
                {
                    label: '目标值',
                    data: [100, 100, 100, 100, 100, 100],
                    borderColor: '#adb5bd',
                    borderDash: [5, 5],
                    fill: false
                },
                {
                    label: '实际值',
                    data: [85, 90, 95, 105, 110, 115],
                    borderColor: '#4dabf7',
                    fill: false
                }
            ]
        }
    });

    // 目标类型分布图
    const typeChart = new Chart('typeChart', {
        type: 'pie',
        data: {
            labels: ['销售目标', '利润目标', '客户目标', '质量目标'],
            datasets: [
                {
                    data: [40, 30, 20, 10],
                    backgroundColor: ['#ff6b6b', '#51cf66', '#339af0', '#ffd43b']
                }
            ]
        }
    });

    // 部门分布图
    const departmentChart = new Chart('departmentChart', {
        type: 'pie',
        data: {
            labels: ['销售部', '生产部', '研发部', '客服部'],
            datasets: [
                {
                    data: [35, 25, 25, 15],
                    backgroundColor: ['#ff6b6b', '#51cf66', '#339af0', '#ffd43b']
                }
            ]
        }
    });
}

// 初始化表格
function initTable() {
    const table = new Table('targetTable', {
        columns: [
            { title: '目标编号', key: 'code' },
            { title: '目标类型', key: 'type' },
            { title: '目标名称', key: 'name' },
            { title: '目标值', key: 'targetValue' },
            { title: '实际值', key: 'actualValue' },
            { title: '完成率', key: 'completion', render: (completion) => `
                <div class="progress-bar">
                    <div class="progress" style="width: ${completion}%"></div>
                    <span>${completion}%</span>
                </div>
            ` },
            { title: '达成状态', key: 'status' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="viewDetails('${row.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            ` }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            id: 'T001',
            code: 'TARGET202401001',
            type: '销售目标',
            name: '年度销售总额目标',
            targetValue: '1000万',
            actualValue: '850万',
            completion: 85,
            status: '存在风险'
        },
        {
            id: 'T002',
            code: 'TARGET202401002',
            type: '客户目标',
            name: '客户满意度目标',
            targetValue: '95%',
            actualValue: '97%',
            completion: 102,
            status: '超额完成'
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

// 查看目标详情
function viewDetails(id) {
    // TODO: 显示目标详情
    console.log('查看目标详情:', id);
}

// 分析达成情况
function analyzeAchievement() {
    const type = document.getElementById('targetType').value;
    const year = document.getElementById('year').value;
    const status = document.getElementById('status').value;

    // TODO: 调用API分析数据
    console.log('分析达成情况:', { type, year, status });
}

// 导出报表
function exportReport() {
    // TODO: 导出报表
    console.log('导出报表');
    Message.show('报表导出成功', 'success');
} 