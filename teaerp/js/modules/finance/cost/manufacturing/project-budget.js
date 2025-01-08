// 引入组件
import { Table } from '../../../../components/table.js';
import { Pagination } from '../../../../components/pagination.js';
import { Message } from '../../../../components/message.js';
import { Modal } from '../../../../components/modal.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadProjects();
    initTable();
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

// 初始化表格
function initTable() {
    const table = new Table('budgetTable', {
        columns: [
            { title: '预算年度', key: 'year' },
            { title: '费用项目', key: 'projectName' },
            { title: '预算金额', key: 'amount' },
            { title: '已用金额', key: 'used' },
            { title: '剩余金额', key: 'remaining' },
            { title: '使用率', key: 'usageRate' },
            { title: '状态', key: 'status' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="editBudget('${row.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="button small" onclick="viewDetail('${row.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            ` }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            id: 'B001',
            year: '2024',
            projectName: '水费',
            amount: 120000,
            used: 80000,
            remaining: 40000,
            usageRate: '66.7%',
            status: '正常'
        },
        {
            id: 'B002',
            year: '2024',
            projectName: '电费',
            amount: 360000,
            used: 280000,
            remaining: 80000,
            usageRate: '77.8%',
            status: '预警'
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

// 保存预算
function saveBudget() {
    const form = document.getElementById('budgetForm');
    const formData = new FormData(form);
    const budget = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存预算
    console.log('保存预算:', budget);
    
    hideModal('budgetModal');
    Message.show('预算已保存', 'success');
}

// 编辑预算
function editBudget(id) {
    // TODO: 加载预算数据并显示编辑弹窗
    console.log('编辑预算:', id);
    showModal('budgetModal');
}

// 查看详情
function viewDetail(id) {
    // TODO: 显示预算详情
    console.log('查看详情:', id);
} 