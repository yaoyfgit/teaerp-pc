// 部门管理模块
document.addEventListener('DOMContentLoaded', function() {
    initDepartmentManage();
});

function initDepartmentManage() {
    loadDepartmentList();
    loadParentDepartments();
    loadManagerList();
    bindEvents();
}

function loadDepartmentList() {
    // 模拟API调用
    const mockData = [
        {
            id: 1,
            name: '总公司',
            code: 'HQ',
            manager: '张三',
            phone: '13800138000',
            orderNum: 1,
            status: 1,
            children: [
                {
                    id: 11,
                    name: '技术部',
                    code: 'TECH',
                    manager: '李四',
                    phone: '13800138001',
                    orderNum: 1,
                    status: 1,
                    children: [
                        {
                            id: 111,
                            name: '开发组',
                            code: 'DEV',
                            manager: '王五',
                            phone: '13800138002',
                            orderNum: 1,
                            status: 1
                        }
                    ]
                }
            ]
        }
    ];

    renderDepartmentList(mockData);
}

function renderDepartmentList(data, level = 0) {
    const tbody = document.querySelector('.tree-table tbody');
    let html = '';

    data.forEach(item => {
        html += `
            <tr data-id="${item.id}" data-level="${level}">
                <td>
                    ${'&nbsp;'.repeat(level * 4)}
                    ${item.children ? `<span class="toggle-icon expanded" onclick="toggleChildren(${item.id})">▼</span>` : ''}
                    ${item.name}
                </td>
                <td>${item.code}</td>
                <td>${item.manager}</td>
                <td>${item.phone}</td>
                <td>${item.orderNum}</td>
                <td>
                    <span class="department-status ${item.status ? 'active' : 'inactive'}">
                        ${item.status ? '启用' : '禁用'}
                    </span>
                </td>
                <td>
                    <a href="javascript:void(0)" onclick="editDepartment(${item.id})" class="action-link">编辑</a>
                    <a href="javascript:void(0)" onclick="addSubDepartment(${item.id})" class="action-link">添加下级</a>
                    <a href="javascript:void(0)" onclick="toggleDepartmentStatus(${item.id}, ${!item.status})" class="action-link">
                        ${item.status ? '禁用' : '启用'}
                    </a>
                    <a href="javascript:void(0)" onclick="deleteDepartment(${item.id})" class="action-link">删除</a>
                </td>
            </tr>
        `;

        if (item.children) {
            html += renderDepartmentList(item.children, level + 1);
        }
    });

    if (level === 0) {
        tbody.innerHTML = html;
    } else {
        return html;
    }
}

function toggleChildren(departmentId) {
    const parentRow = document.querySelector(`tr[data-id="${departmentId}"]`);
    const parentLevel = parseInt(parentRow.dataset.level);
    const toggleIcon = parentRow.querySelector('.toggle-icon');
    let nextRow = parentRow.nextElementSibling;
    
    while (nextRow && parseInt(nextRow.dataset.level) > parentLevel) {
        nextRow.style.display = nextRow.style.display === 'none' ? '' : 'none';
        nextRow = nextRow.nextElementSibling;
    }
    
    toggleIcon.classList.toggle('expanded');
    toggleIcon.textContent = toggleIcon.classList.contains('expanded') ? '▼' : '▶';
}

function expandAll() {
    document.querySelectorAll('tr[data-level]').forEach(row => {
        row.style.display = '';
    });
    document.querySelectorAll('.toggle-icon').forEach(icon => {
        icon.classList.add('expanded');
        icon.textContent = '▼';
    });
}

function collapseAll() {
    document.querySelectorAll('tr[data-level]').forEach(row => {
        if (parseInt(row.dataset.level) > 0) {
            row.style.display = 'none';
        }
    });
    document.querySelectorAll('.toggle-icon').forEach(icon => {
        icon.classList.remove('expanded');
        icon.textContent = '▶';
    });
}

function submitCreateDepartment() {
    const formData = {
        name: document.querySelector('[name="departmentName"]').value,
        code: document.querySelector('[name="departmentCode"]').value,
        parentId: document.querySelector('[name="parentId"]').value,
        managerId: document.querySelector('[name="managerId"]').value,
        phone: document.querySelector('[name="phone"]').value,
        email: document.querySelector('[name="email"]').value,
        orderNum: document.querySelector('[name="orderNum"]').value,
        status: document.querySelector('[name="status"]').value,
        remarks: document.querySelector('[name="remarks"]').value
    };

    // 表单验证
    if (!formData.name || !formData.code) {
        alert('请填写必填项');
        return;
    }

    // 发送请求到后端
    console.log('创建部门:', formData);
    alert('部门创建成功');
    hideModal('createDepartmentModal');
    loadDepartmentList();
}

// ... 其他函数 