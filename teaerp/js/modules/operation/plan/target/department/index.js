// 引入组件
import { Table } from '../../../../../components/table.js';
import { Pagination } from '../../../../../components/pagination.js';
import { Message } from '../../../../../components/message.js';
import { Modal } from '../../../../../components/modal.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initTable();
    loadDepartments();
    loadManagers();
    loadParentTargets();
});

// 初始化表格
function initTable() {
    const table = new Table('targetTable', {
        columns: [
            { title: '目标编号', key: 'code' },
            { title: '部门', key: 'departmentName' },
            { title: '目标年度', key: 'year' },
            { title: '目标类型', key: 'type' },
            { title: '目标名称', key: 'name' },
            { title: '目标值', key: 'value' },
            { title: '单位', key: 'unit' },
            { title: '开始日期', key: 'startDate' },
            { title: '结束日期', key: 'endDate' },
            { title: '分解方式', key: 'breakdownType' },
            { title: '责任人', key: 'managerName' },
            { title: '状态', key: 'status' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="viewTarget('${row.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                ${row.status === 'draft' ? `
                    <button class="button small" onclick="editTarget('${row.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="button small" onclick="deleteTarget('${row.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
                <button class="button small" onclick="showBreakdown('${row.id}')">
                    <i class="fas fa-sitemap"></i>
                </button>
            ` }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            id: 'DT001',
            code: 'DEPT202401001',
            departmentName: '销售部',
            year: '2024',
            type: '销售额目标',
            name: '季度销售目标',
            value: 2500000.00,
            unit: '元',
            startDate: '2024-01-01',
            endDate: '2024-03-31',
            breakdownType: '团队目标',
            managerName: '张三',
            status: 'approved'
        },
        {
            id: 'DT002',
            code: 'DEPT202401002',
            departmentName: '市场部',
            year: '2024',
            type: '客户满意度目标',
            name: '客户满意度提升',
            value: 95.00,
            unit: '%',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            breakdownType: '个人目标',
            managerName: '李四',
            status: 'draft'
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

// 加载部门数据
function loadDepartments() {
    // 模拟数据
    const departments = [
        { id: 'D001', name: '销售部' },
        { id: 'D002', name: '市场部' },
        { id: 'D003', name: '生产部' }
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

// 加载责任人数据
function loadManagers() {
    // 模拟数据
    const managers = [
        { id: 'U001', name: '张三' },
        { id: 'U002', name: '李四' },
        { id: 'U003', name: '王五' }
    ];

    const select = document.querySelector('select[name="managerId"]');
    managers.forEach(manager => {
        const option = document.createElement('option');
        option.value = manager.id;
        option.textContent = manager.name;
        select.appendChild(option);
    });
}

// 加载上级目标
function loadParentTargets() {
    // 模拟数据
    const targets = [
        { id: 'T001', name: '年度销售总额目标' },
        { id: 'T002', name: '市场占有率目标' }
    ];

    const select = document.querySelector('select[name="parentId"]');
    targets.forEach(target => {
        const option = document.createElement('option');
        option.value = target.id;
        option.textContent = target.name;
        select.appendChild(option);
    });
}

// 保存目标
function saveTarget() {
    const form = document.getElementById('targetForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存目标
    console.log('保存目标:', data);
    
    hideModal('targetModal');
    Message.show('目标已保存', 'success');
}

// 提交审批
function submitTarget() {
    // TODO: 调用API提交审批
    console.log('提交审批');
    
    hideModal('targetModal');
    Message.show('目标已提交审批', 'success');
}

// 查看目标
function viewTarget(id) {
    // TODO: 显示目标详情
    console.log('查看目标:', id);
}

// 编辑目标
function editTarget(id) {
    // TODO: 加载目标数据到表单
    console.log('编辑目标:', id);
    showModal('targetModal');
}

// 删除目标
function deleteTarget(id) {
    if (confirm('确定要删除该目标吗？')) {
        // TODO: 调用API删除目标
        console.log('删除目标:', id);
        Message.show('目标已删除', 'success');
    }
}

// 显示目标分解
function showBreakdown(id) {
    // TODO: 显示目标分解页面
    console.log('显示目标分解:', id);
}

// 搜索目标
function searchTargets() {
    const department = document.getElementById('searchDepartment').value;
    const year = document.getElementById('searchYear').value;
    const type = document.getElementById('searchType').value;
    const status = document.getElementById('searchStatus').value;
    
    // TODO: 根���条件重新加载数据
    console.log('搜索条件:', { department, year, type, status });
} 