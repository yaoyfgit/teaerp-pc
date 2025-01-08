// 引入组件
import { Table } from '../../../components/table.js';
import { Pagination } from '../../../components/pagination.js';
import { Chart } from '../../../components/chart.js';
import { Message } from '../../../components/message.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initCharts();
    initTable();
});

// 初始化图表
function initCharts() {
    // 成本趋势图表
    const trendChart = new Chart('costTrendChart', {
        title: '人工成本趋势'
    });

    // 模拟数据
    const trendData = {
        xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
        series: [
            {
                name: '基本工资',
                data: [80000, 82000, 85000, 84000, 86000, 88000],
                options: {
                    type: 'bar',
                    stack: 'total'
                }
            },
            {
                name: '加班工资',
                data: [12000, 13500, 14000, 15000, 14500, 15600],
                options: {
                    type: 'bar',
                    stack: 'total'
                }
            },
            {
                name: '社保成本',
                data: [30000, 31000, 31500, 32000, 32000, 32500],
                options: {
                    type: 'bar',
                    stack: 'total'
                }
            }
        ]
    };
    trendChart.setData(trendData);

    // 部门成本分布图表
    const deptChart = new Chart('deptCostChart', {
        type: 'pie'
    });

    // 模拟数据
    const deptData = {
        series: [{
            name: '部门成本',
            data: [
                { name: '生产部', value: 58000 },
                { name: '包装部', value: 32000 },
                { name: '质检部', value: 25000 },
                { name: '仓储部', value: 13500 }
            ],
            options: {
                radius: '60%'
            }
        }]
    };
    deptChart.setData(deptData);

    // 监听周期选择变化
    document.getElementById('trendPeriod').addEventListener('change', function(e) {
        // TODO: 根据选择的周期重新加载数据
        Message.show('数据已更新', 'success');
    });
}

// 初始化表格
function initTable() {
    const table = new Table('costTable', {
        columns: [
            { title: '部门', key: 'department' },
            { title: '���数', key: 'headcount' },
            { title: '基本工资', key: 'baseSalary' },
            { title: '加班工资', key: 'overtimePay' },
            { title: '社保成本', key: 'insurance' },
            { title: '其他成本', key: 'otherCost' },
            { title: '合计', key: 'total' }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            department: '生产部',
            headcount: 12,
            baseSalary: 48000,
            overtimePay: 6000,
            insurance: 12000,
            otherCost: 2000,
            total: 68000
        },
        {
            department: '包装部',
            headcount: 8,
            baseSalary: 28000,
            overtimePay: 4500,
            insurance: 7000,
            otherCost: 1500,
            total: 41000
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

// 导出数据
function exportData() {
    // TODO: 实现导出功能
    Message.show('数据导出中...', 'info');
} 