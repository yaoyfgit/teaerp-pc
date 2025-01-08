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
    loadEmployees();
    loadParentTargets();
});

// 初始化表格
function initTable() {
    const table = new Table('targetTable', {
        columns: [
            { title: '目标编号', key: 'code' },
            { title: '部门', key: 'departmentName' },
            { title: '员工', key: 'employeeName' },
            { title: '目标年度', key: 'year' },
            { title: '目标类型', key: 'type' },
            { title: '目标名称', key: 'name' },
            { title: '目标值', key: 'value' },
            { title: '单位', key: 'unit' },
            { title: '开始日期', key: 'startDate' },
            { title: '结束日期', key: 'endDate' },
            { title: '分解方式', key: 'breakdownType' },
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
            id: 'ET001',
            code: 'EMP202401001',
            departmentName: '销售部',
            employeeName: '张三',
            year: '2024',
            type: '个人销售目标',
            name: '月度销售目标',
            value: 500000.00,
            unit: '元',
            startDate: '2024-01-01',
            endDate: '2024-01-31',
            breakdownType: '月度目标',
            status: 'approved'
        },
        {
            id: 'ET002',
            code: 'EMP202401002',
            departmentName: '销售部',
            employeeName: '李四',
            year: '2024',
            type: '绩效目标',
            name: '客户满意度提升',
            value: 95.00,
            unit: '%',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            breakdownType: '季度目标',
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

// 加载员工数据
function loadEmployees() {
    // 模拟数据
    const employees = [
        { id: 'E001', name: '张三' },
        { id: 'E002', name: '李四' },
        { id: 'E003', name: '王五' }
    ];

    const selects = document.querySelectorAll('select[name="employeeId"], #searchEmployee');
    selects.forEach(select => {
        employees.forEach(emp => {
            const option = document.createElement('option');
            option.value = emp.id;
            option.textContent = emp.name;
            select.appendChild(option);
        });
    });
}

// 加载上级目标
function loadParentTargets() {
    // 模拟数据
    const targets = [
        { id: 'T001', name: '部门销售目标' },
        { id: 'T002', name: '部门绩效目标' }
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
    const employee = document.getElementById('searchEmployee').value;
    const year = document.getElementById('searchYear').value;
    const type = document.getElementById('searchType').value;
    const status = document.getElementById('searchStatus').value;
    
    // TODO: 根据条件重新加载数据
    console.log('搜索条件:', { department, employee, year, type, status });
}

// 监听部门选择变化
document.querySelector('select[name="departmentId"]').onchange = function() {
    // TODO: 根据选择的部门加载对应的员工列表
    console.log('选择部门:', this.value);
}; 