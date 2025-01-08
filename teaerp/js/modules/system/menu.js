// 菜单管理模块
document.addEventListener('DOMContentLoaded', function() {
    initMenuManage();
});

function initMenuManage() {
    loadMenuList();
    loadParentMenus();
    loadIcons();
    bindEvents();
}

function loadMenuList() {
    // 模拟API调用
    const mockData = [
        {
            id: 1,
            name: '系统管理',
            icon: 'setting',
            type: 'dir',
            path: '/system',
            permission: 'system',
            orderNum: 1,
            status: 1,
            children: [
                {
                    id: 11,
                    name: '用户管理',
                    icon: 'user',
                    type: 'menu',
                    path: '/system/user',
                    permission: 'system:user',
                    orderNum: 1,
                    status: 1,
                    children: [
                        {
                            id: 111,
                            name: '查看',
                            type: 'button',
                            permission: 'system:user:view',
                            orderNum: 1,
                            status: 1
                        },
                        {
                            id: 112,
                            name: '新增',
                            type: 'button',
                            permission: 'system:user:add',
                            orderNum: 2,
                            status: 1
                        }
                    ]
                }
            ]
        }
    ];

    renderMenuList(mockData);
}

function renderMenuList(data, level = 0) {
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
                <td>${item.icon ? `<i class="icon-${item.icon}"></i>` : '-'}</td>
                <td>
                    <span class="menu-type ${item.type}">
                        ${getMenuTypeName(item.type)}
                    </span>
                </td>
                <td>${item.path || '-'}</td>
                <td>${item.permission || '-'}</td>
                <td>${item.orderNum}</td>
                <td>
                    <span class="status ${item.status ? 'active' : 'inactive'}">
                        ${item.status ? '显示' : '隐藏'}
                    </span>
                </td>
                <td>
                    <a href="javascript:void(0)" onclick="editMenu(${item.id})" class="action-link">编辑</a>
                    <a href="javascript:void(0)" onclick="addSubMenu(${item.id})" class="action-link">添加下级</a>
                    <a href="javascript:void(0)" onclick="toggleMenuStatus(${item.id}, ${!item.status})" class="action-link">
                        ${item.status ? '隐藏' : '显示'}
                    </a>
                    <a href="javascript:void(0)" onclick="deleteMenu(${item.id})" class="action-link">删除</a>
                </td>
            </tr>
        `;

        if (item.children) {
            html += renderMenuList(item.children, level + 1);
        }
    });

    if (level === 0) {
        tbody.innerHTML = html;
    } else {
        return html;
    }
}

function getMenuTypeName(type) {
    const types = {
        dir: '目录',
        menu: '菜单',
        button: '按钮'
    };
    return types[type] || type;
}

function handleMenuTypeChange(select) {
    const type = select.value;
    const routeFields = document.querySelector('.route-fields');
    const iconField = document.querySelector('.icon-field');

    if (type === 'button') {
        routeFields.classList.remove('show');
        iconField.classList.remove('show');
    } else {
        routeFields.classList.add('show');
        iconField.classList.add('show');
    }
}

function submitCreateMenu() {
    const formData = {
        type: document.querySelector('[name="menuType"]').value,
        parentId: document.querySelector('[name="parentId"]').value,
        name: document.querySelector('[name="menuName"]').value,
        icon: document.querySelector('[name="icon"]').value,
        routePath: document.querySelector('[name="routePath"]').value,
        componentPath: document.querySelector('[name="componentPath"]').value,
        permission: document.querySelector('[name="permission"]').value,
        orderNum: document.querySelector('[name="orderNum"]').value,
        status: document.querySelector('[name="status"]').value,
        target: document.querySelector('[name="target"]').value,
        remarks: document.querySelector('[name="remarks"]').value
    };

    // 表单验证
    if (!formData.name) {
        alert('请填写菜单名称');
        return;
    }

    // 发送请求到后端
    console.log('创建菜单:', formData);
    alert('菜单创建成功');
    hideModal('createMenuModal');
    loadMenuList();
}

// ... 其他函数 