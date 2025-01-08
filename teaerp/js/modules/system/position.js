// 岗位管理模块
document.addEventListener('DOMContentLoaded', function() {
    initPositionManage();
});

function initPositionManage() {
    loadPositionList();
    loadDepartments();
    bindEvents();
}

function loadPositionList(page = 1) {
    // 模拟API调用
    const mockData = {
        total: 100,
        list: [
            {
                id: 1,
                name: '技术总监',
                code: 'TD',
                department: '技术部',
                level: 1,
                count: 1,
                orderNum: 1,
                status: 1
            },
            {
                id: 2,
                name: '开发工程师',
                code: 'DEV',
                department: '技术部',
                level: 3,
                count: 10,
                orderNum: 2,
                status: 1
            }
        ]
    };

    renderPositionList(mockData);
    renderPagination(mockData.total);
}

function renderPositionList(data) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = data.list.map(position => `
        <tr>
            <td>${position.name}</td>
            <td>${position.code}</td>
            <td>${position.department}</td>
            <td>
                <span class="position-level ${getLevelClass(position.level)}">
                    ${getLevelName(position.level)}
                </span>
            </td>
            <td>
                <span class="position-count">${position.count}人</span>
            </td>
            <td>${position.orderNum}</td>
            <td>
                <span class="status ${position.status ? 'active' : 'inactive'}">
                    ${position.status ? '启用' : '禁用'}
                </span>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="editPosition(${position.id})" class="action-link">编辑</a>
                <a href="javascript:void(0)" onclick="togglePositionStatus(${position.id}, ${!position.status})" class="action-link">
                    ${position.status ? '禁用' : '启用'}
                </a>
                <a href="javascript:void(0)" onclick="deletePosition(${position.id})" class="action-link">删除</a>
            </td>
        </tr>
    `).join('');
}

function getLevelClass(level) {
    const classes = {
        1: 'high',
        2: 'middle',
        3: 'low'
    };
    return classes[level] || '';
}

function getLevelName(level) {
    const names = {
        1: '高层',
        2: '中层',
        3: '基层'
    };
    return names[level] || '';
}

function submitCreatePosition() {
    const formData = {
        name: document.querySelector('[name="positionName"]').value,
        code: document.querySelector('[name="positionCode"]').value,
        departmentId: document.querySelector('[name="departmentId"]').value,
        level: document.querySelector('[name="positionLevel"]').value,
        orderNum: document.querySelector('[name="orderNum"]').value,
        status: document.querySelector('[name="status"]').value,
        duty: document.querySelector('[name="duty"]').value,
        requirement: document.querySelector('[name="requirement"]').value,
        remarks: document.querySelector('[name="remarks"]').value
    };

    // 表单验证
    if (!formData.name || !formData.code || !formData.departmentId) {
        alert('请填写必填项');
        return;
    }

    // 发送请求到后端
    console.log('创建岗位:', formData);
    alert('岗位创建成功');
    hideModal('createPositionModal');
    loadPositionList();
}

// ... 其他函数 