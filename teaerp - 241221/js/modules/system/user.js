// 用户管理模块
document.addEventListener('DOMContentLoaded', function() {
    initUserManage();
});

function initUserManage() {
    // 加载部门数据
    loadDepartments();
    // 加载用户列表
    loadUserList();
    // 绑定事件处理
    bindEvents();
}

function loadDepartments() {
    // 加载部门数据的逻辑
}

// 用户列表数据
let userList = [];
let currentPage = 1;
let pageSize = 10;

function loadUserList(page = 1) {
    currentPage = page;
    // 模拟API调用
    const mockData = {
        total: 100,
        list: [
            {
                id: 1,
                username: 'admin',
                realName: '管理员',
                department: '技术部',
                position: '系统管理员',
                phone: '13800138000',
                email: 'admin@example.com',
                status: 1,
                lastLogin: '2024-03-15 10:00:00'
            }
            // ... 其他用户数据
        ]
    };

    renderUserList(mockData);
    renderPagination(mockData.total);
}

function renderUserList(data) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = data.list.map(user => `
        <tr>
            <td>${user.username}</td>
            <td>${user.realName}</td>
            <td>${user.department}</td>
            <td>${user.position}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>
                <span class="user-status ${user.status ? 'active' : 'inactive'}">
                    ${user.status ? '启用' : '禁用'}
                </span>
            </td>
            <td>${user.lastLogin}</td>
            <td>
                <a href="javascript:void(0)" onclick="editUser(${user.id})" class="action-link">编辑</a>
                <a href="javascript:void(0)" onclick="toggleUserStatus(${user.id}, ${!user.status})" class="action-link">
                    ${user.status ? '禁用' : '启用'}
                </a>
                <a href="javascript:void(0)" onclick="resetPassword(${user.id})" class="action-link">重置密码</a>
                <a href="javascript:void(0)" onclick="deleteUser(${user.id})" class="action-link">删除</a>
            </td>
        </tr>
    `).join('');
}

function renderPagination(total) {
    const totalPages = Math.ceil(total / pageSize);
    const pagination = document.querySelector('.pagination');
    
    let html = `<a href="javascript:void(0)" class="page-btn" onclick="loadUserList(${currentPage - 1})">&lt;</a>`;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            html += `<a href="javascript:void(0)" class="page-btn active">${i}</a>`;
        } else {
            html += `<a href="javascript:void(0)" class="page-btn" onclick="loadUserList(${i})">${i}</a>`;
        }
    }
    
    html += `<a href="javascript:void(0)" class="page-btn" onclick="loadUserList(${currentPage + 1})">&gt;</a>`;
    
    pagination.innerHTML = html;
}

function submitCreateUser() {
    const formData = {
        username: document.querySelector('[name="username"]').value,
        realName: document.querySelector('[name="realName"]').value,
        password: document.querySelector('[name="password"]').value,
        confirmPassword: document.querySelector('[name="confirmPassword"]').value,
        departmentId: document.querySelector('[name="departmentId"]').value,
        positionId: document.querySelector('[name="positionId"]').value,
        phone: document.querySelector('[name="phone"]').value,
        email: document.querySelector('[name="email"]').value,
        roleId: document.querySelector('[name="roleId"]').value,
        status: document.querySelector('[name="status"]').value,
        remarks: document.querySelector('[name="remarks"]').value
    };

    // 表单验证
    if (!formData.username || !formData.realName || !formData.password) {
        alert('请填写必填项');
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        alert('两次输入的密码不一致');
        return;
    }

    // 发送请求到后端
    // 这里模拟API调用
    console.log('创建用户:', formData);
    alert('用户创建成功');
    hideModal('createUserModal');
    loadUserList(currentPage);
}

function resetPassword(userId) {
    if (confirm('确定要重置该用户的密码吗？')) {
        // 这里调用重置密码的API
        console.log('重置密码:', userId);
        alert('密码重置成功');
    }
}

function bindEvents() {
    // 绑定各种事件处理函数
}

// 显示新建用户弹窗
function showCreateModal() {
    const modal = document.getElementById('createUserModal');
    modal.style.display = 'flex';
}

// 创建新用户
function createUser(formData) {
    // 创建用户的逻辑
}

// 编辑用户
function editUser(userId) {
    // 编辑用户的逻辑
}

// 删除用户
function deleteUser(userId) {
    // 删除用户的逻辑
}

// 修改用户状态
function toggleUserStatus(userId, status) {
    // 修改用户状态的逻辑
} 