// 引入组件
import { Table } from '../../../../components/table.js';
import { Pagination } from '../../../../components/pagination.js';
import { Chart } from '../../../../components/chart.js';
import { Message } from '../../../../components/message.js';
import { Modal } from '../../../../components/modal.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadProjects();
    initRuleTable();
    initControlTable();
    initWarningChart();
});

// 加载费用项目
function loadProjects() {
    // 模拟数据
    const projects = [
        { id: 'P001', name: '水费' },
        { id: 'P002', name: '电费' },
        { id: 'P003', name: '维修费' }
    ];

    const select = document.querySelector('select[name="projectId"]');
    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.name;
        select.appendChild(option);
    });
}

// 初始化规则表格
function initRuleTable() {
    const table = new Table('ruleTable', {
        columns: [
            { title: '费用项目', key: 'projectName' },
            { title: '预警类型', key: 'type' },
            { title: '预警条件', key: 'condition' },
            { title: '预警级别', key: 'level' },
            { title: '状态', key: 'status' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="editRule('${row.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="button small danger" onclick="deleteRule('${row.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            ` }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            id: 'R001',
            projectName: '水费',
            type: '预算预警',
            condition: '使用率>80%',
            level: '中级',
            status: '启用'
        },
        {
            id: 'R002',
            projectName: '电费',
            type: '趋势预警',
            condition: '环比增长>20%',
            level: '高级',
            status: '启用'
        }
    ];
    table.setData(mockData);
}

// 初始化控制记录表格
function initControlTable() {
    const table = new Table('controlTable', {
        columns: [
            { title: '时间', key: 'time' },
            { title: '费用项目', key: 'projectName' },
            { title: '预警类型', key: 'type' },
            { title: '预警内容', key: 'content' },
            { title: '处理状态', key: 'status' },
            { title: '处理人', key: 'handler' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="viewRecord('${row.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            ` }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            id: 'C001',
            time: '2024-03-15 14:30',
            projectName: '水费',
            type: '预算预警',
            content: '本月使用率已达85%',
            status: '已处理',
            handler: '张三'
        },
        {
            id: 'C002',
            time: '2024-03-14 16:20',
            projectName: '电费',
            type: '趋势预警',
            content: '环比增长达25%',
            status: '处理中',
            handler: '李四'
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

// 初始化预警监控图表
function initWarningChart() {
    const chart = new Chart('warningChart');

    // 模拟数据
    const chartData = {
        xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
        series: [
            {
                name: '预警次数',
                data: [2, 3, 1, 4, 2, 5],
                options: {
                    type: 'bar'
                }
            },
            {
                name: '处理率',
                data: [100, 100, 100, 75, 50, 20],
                options: {
                    type: 'line',
                    yAxisIndex: 1
                }
            }
        ],
        yAxis: [
            { name: '次数' },
            { 
                name: '处理率(%)',
                max: 100,
                splitLine: { show: false }
            }
        ]
    };
    chart.setData(chartData);
}

// 保存规则
function saveRule() {
    const form = document.getElementById('ruleForm');
    const formData = new FormData(form);
    const rule = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存规则
    console.log('保存规则:', rule);
    
    hideModal('ruleModal');
    Message.show('规则已保存', 'success');
}

// 编辑规则
function editRule(id) {
    // TODO: 加载规则数据并显示编辑弹窗
    console.log('编辑规则:', id);
    showModal('ruleModal');
}

// 删除规则
function deleteRule(id) {
    if (confirm('确定要删除该规则吗？')) {
        // TODO: 调用API删除规则
        console.log('删除规则:', id);
        Message.show('规则已删除', 'success');
    }
}

// 查看记录详情
function viewRecord(id) {
    // TODO: 显示记录详情
    console.log('查看记录:', id);
} 