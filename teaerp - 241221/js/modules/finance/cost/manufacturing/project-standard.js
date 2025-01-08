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
    const table = new Table('standardTable', {
        columns: [
            { title: '费用项目', key: 'projectName' },
            { title: '标准类型', key: 'type' },
            { title: '标准值', key: 'value' },
            { title: '计量单位', key: 'unit' },
            { title: '状态', key: 'status' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="editStandard('${row.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="button small danger" onclick="deleteStandard('${row.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            ` }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            id: 'S001',
            projectName: '水费',
            type: '固定标准',
            value: '5.00',
            unit: '元/吨',
            status: '启用'
        },
        {
            id: 'S002',
            projectName: '电费',
            type: '范围标准',
            value: '0.80-1.20',
            unit: '元/度',
            status: '启用'
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

// 保存标准
function saveStandard() {
    const form = document.getElementById('standardForm');
    const formData = new FormData(form);
    const standard = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存标准
    console.log('保存标准:', standard);
    
    hideModal('standardModal');
    Message.show('标准已保存', 'success');
}

// 编辑标准
function editStandard(id) {
    // TODO: 加载标准数据并显示编辑弹窗
    console.log('编辑标准:', id);
    showModal('standardModal');
}

// 删除标准
function deleteStandard(id) {
    if (confirm('确定要删除该标准吗？')) {
        // TODO: 调用API删除标准
        console.log('删除标准:', id);
        Message.show('标准已删除', 'success');
    }
} 