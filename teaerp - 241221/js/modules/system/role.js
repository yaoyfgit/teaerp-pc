// 角色管理模块
document.addEventListener('DOMContentLoaded', function() {
    initRoleManage();
});

// 角色列表数据
let roleList = [];
let currentPage = 1;
let pageSize = 10;

function initRoleManage() {
    loadRoleList();
    loadPermissionTree();
    bindEvents();
}

function loadRoleList(page = 1) {
    currentPage = page;
    // 模拟API调用
    const mockData = {
        total: 50,
        list: [
            {
                id: 1,
                roleName: '系统管理员',
                roleCode: 'ADMIN',
                description: '系统管理员角色',
                createTime: '2024-03-15 10:00:00',
                status: 1
            }
            // ... 其他角色数据
        ]
    };

    renderRoleList(mockData);
    renderPagination(mockData.total);
}

function renderRoleList(data) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = data.list.map(role => `
        <tr>
            <td>${role.roleName}</td>
            <td>${role.roleCode}</td>
            <td>${role.description}</td>
            <td>${role.createTime}</td>
            <td>
                <span class="role-status ${role.status ? 'active' : 'inactive'}">
                    ${role.status ? '启用' : '禁用'}
                </span>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="editRole(${role.id})" class="action-link">编辑</a>
                <a href="javascript:void(0)" onclick="toggleRoleStatus(${role.id}, ${!role.status})" class="action-link">
                    ${role.status ? '禁用' : '启用'}
                </a>
                <a href="javascript:void(0)" onclick="deleteRole(${role.id})" class="action-link">删除</a>
            </td>
        </tr>
    `).join('');
}

function loadPermissionTree() {
    // 模拟权限数据
    const permissions = [
        {
            id: 1,
            name: '系统管理',
            children: [
                { id: 11, name: '用户管理' },
                { id: 12, name: '角色管理' },
                { id: 13, name: '权限管理' }
            ]
        },
        {
            id: 2,
            name: '客户管理',
            children: [
                { id: 21, name: '客户信息' },
                { id: 22, name: '合同管理' },
                { id: 23, name: '客户服务' }
            ]
        }
        // ... 其他权限数据
    ];

    renderPermissionTree(permissions);
}

function renderPermissionTree(permissions) {
    const container = document.querySelector('.permission-tree');
    container.innerHTML = permissions.map(perm => `
        <div class="permission-item parent">
            <label>
                <input type="checkbox" value="${perm.id}" onchange="togglePermission(this)">
                ${perm.name}
            </label>
            ${perm.children ? `
                <div class="permission-children">
                    ${perm.children.map(child => `
                        <div class="permission-item child">
                            <label>
                                <input type="checkbox" value="${child.id}" data-parent="${perm.id}">
                                ${child.name}
                            </label>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
}

function togglePermission(checkbox) {
    const parentId = checkbox.value;
    const childCheckboxes = document.querySelectorAll(`[data-parent="${parentId}"]`);
    childCheckboxes.forEach(child => {
        child.checked = checkbox.checked;
    });
}

function submitCreateRole() {
    const formData = {
        roleName: document.querySelector('[name="roleName"]').value,
        roleCode: document.querySelector('[name="roleCode"]').value,
        description: document.querySelector('[name="description"]').value,
        status: document.querySelector('[name="status"]').value,
        permissions: getSelectedPermissions()
    };

    // 表单验证
    if (!formData.roleName || !formData.roleCode) {
        alert('请填写必填项');
        return;
    }

    // 发送请求到后端
    console.log('创建角色:', formData);
    alert('角色创建成功');
    hideModal('createRoleModal');
    loadRoleList(currentPage);
}

function getSelectedPermissions() {
    const checkboxes = document.querySelectorAll('.permission-tree input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// ... 其他函数保持不变 