// 权限管理模块
document.addEventListener('DOMContentLoaded', function() {
    initPermissionManage();
});

function initPermissionManage() {
    loadPermissionList();
    loadParentPermissions();
    bindEvents();
}

function loadPermissionList() {
    // 模拟API调用
    const mockData = [
        {
            id: 1,
            name: '系统管理',
            code: 'system',
            type: 'menu',
            path: '/system',
            orderNum: 1,
            status: 1,
            children: [
                {
                    id: 11,
                    name: '用户管理',
                    code: 'system:user',
                    type: 'menu',
                    path: '/system/user',
                    orderNum: 1,
                    status: 1,
                    children: [
                        {
                            id: 111,
                            name: '查看用户',
                            code: 'system:user:view',
                            type: 'operation',
                            orderNum: 1,
                            status: 1
                        },
                        {
                            id: 112,
                            name: '新增用户',
                            code: 'system:user:add',
                            type: 'operation',
                            orderNum: 2,
                            status: 1
                        }
                    ]
                }
            ]
        }
    ];

    renderPermissionList(mockData);
}

function renderPermissionList(data, level = 0) {
    const tbody = document.querySelector('.tree-table tbody');
    let html = '';

    data.forEach(item => {
        html += `
            <tr>
                <td>
                    ${'&nbsp;'.repeat(level * 4)}
                    ${item.children ? '<span class="expand-icon">▼</span>' : ''}
                    ${item.name}
                </td>
                <td>${item.code}</td>
                <td>
                    <span class="permission-type ${item.type}">
                        ${getPermissionTypeName(item.type)}
                    </span>
                </td>
                <td>${item.path || '-'}</td>
                <td>${item.orderNum}</td>
                <td>
                    <span class="status ${item.status ? 'active' : 'inactive'}">
                        ${item.status ? '启用' : '禁用'}
                    </span>
                </td>
                <td>
                    <a href="javascript:void(0)" onclick="editPermission(${item.id})" class="action-link">编辑</a>
                    <a href="javascript:void(0)" onclick="togglePermissionStatus(${item.id}, ${!item.status})" class="action-link">
                        ${item.status ? '禁用' : '启用'}
                    </a>
                    <a href="javascript:void(0)" onclick="deletePermission(${item.id})" class="action-link">删除</a>
                </td>
            </tr>
        `;

        if (item.children) {
            html += renderPermissionList(item.children, level + 1);
        }
    });

    if (level === 0) {
        tbody.innerHTML = html;
    } else {
        return html;
    }
}

function getPermissionTypeName(type) {
    const types = {
        menu: '菜单权限',
        operation: '操作权限',
        data: '数据权限'
    };
    return types[type] || type;
}

function handleTypeChange(select) {
    const type = select.value;
    document.querySelectorAll('.menu-fields, .operation-fields, .data-fields').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelector(`.${type}-fields`).style.display = 'flex';
}

function submitCreatePermission() {
    const formData = {
        name: document.querySelector('[name="permissionName"]').value,
        code: document.querySelector('[name="permissionCode"]').value,
        type: document.querySelector('[name="permissionType"]').value,
        parentId: document.querySelector('[name="parentId"]').value,
        orderNum: document.querySelector('[name="orderNum"]').value,
        status: document.querySelector('[name="status"]').value,
        remarks: document.querySelector('[name="remarks"]').value
    };

    // 根据权限类型添加特定字段
    switch (formData.type) {
        case 'menu':
            formData.menuPath = document.querySelector('[name="menuPath"]').value;
            formData.menuIcon = document.querySelector('[name="menuIcon"]').value;
            break;
        case 'operation':
            formData.operationCode = document.querySelector('[name="operationCode"]').value;
            formData.operationType = document.querySelector('[name="operationType"]').value;
            break;
        case 'data':
            formData.dataScope = document.querySelector('[name="dataScope"]').value;
            break;
    }

    // 表单验证
    if (!formData.name || !formData.code) {
        alert('请填写必填项');
        return;
    }

    // 发送请求到后端
    console.log('创建权限:', formData);
    alert('权限创建成功');
    hideModal('createPermissionModal');
    loadPermissionList();
}

// ... 其他函数 