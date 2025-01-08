// 客户管理模块
document.addEventListener('DOMContentLoaded', function() {
    initCustomerManage();
});

function initCustomerManage() {
    loadCustomerList();
    bindEvents();
}

// 显示新建客户弹窗
function showCreateModal() {
    const modal = document.getElementById('createCustomerModal');
    modal.classList.add('show');
    // 重置表单
    document.querySelector('#createCustomerModal form').reset();
    // 初始化地区选择器
    initRegionSelect();
    // 根据客户类型显示/隐藏企业信息
    handleCustomerTypeChange();
}

// 隐藏弹窗
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
}

// 初始化地区选择器
function initRegionSelect() {
    // TODO: 加载省市区数据
}

// 处理客户类型变化
function handleCustomerTypeChange() {
    const customerType = document.querySelector('[name="customerType"]').value;
    const companyFields = document.querySelector('.company-fields');
    if (customerType === 'company') {
        companyFields.style.display = 'block';
    } else {
        companyFields.style.display = 'none';
    }
}

// 绑定事件
function bindEvents() {
    // 客户类型变化事件
    document.querySelector('[name="customerType"]').addEventListener('change', handleCustomerTypeChange);
}

// 提交新建客户
function submitCreateCustomer() {
    const formData = {
        customerCode: document.querySelector('[name="customerCode"]').value,
        customerName: document.querySelector('[name="customerName"]').value,
        customerType: document.querySelector('[name="customerType"]').value,
        customerLevel: document.querySelector('[name="customerLevel"]').value,
        creditLimit: document.querySelector('[name="creditLimit"]').value,
        status: document.querySelector('[name="status"]').value,
        // ... 其他字段
    };

    // 表单验证
    if (!formData.customerCode || !formData.customerName) {
        alert('请填写必填项');
        return;
    }

    // 发送请求到后端
    console.log('创建客户:', formData);
    alert('客户创建成功');
    hideModal('createCustomerModal');
    loadCustomerList();
}

// 加载客户列表
function loadCustomerList(page = 1) {
    // 模拟API调用
    const mockData = {
        total: 100,
        list: [
            {
                id: 1,
                customerCode: 'CUS001',
                customerName: '示例客户',
                customerType: 'company',
                customerLevel: 'A',
                contactPerson: '张三',
                contactPhone: '13800138000',
                region: '北京市',
                creditLimit: 100000,
                status: 1
            }
            // ... 其他客户数据
        ]
    };

    renderCustomerList(mockData);
    renderPagination(mockData.total);
}

// 渲染客户列表
function renderCustomerList(data) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = data.list.map(customer => `
        <tr>
            <td>${customer.customerCode}</td>
            <td>${customer.customerName}</td>
            <td>${getCustomerTypeName(customer.customerType)}</td>
            <td>${customer.customerLevel}</td>
            <td>${customer.contactPerson}</td>
            <td>${customer.contactPhone}</td>
            <td>${customer.region}</td>
            <td>${customer.creditLimit}</td>
            <td>
                <span class="status-tag ${customer.status ? 'active' : 'inactive'}">
                    ${customer.status ? '正常' : '禁用'}
                </span>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="editCustomer(${customer.id})" class="action-link">编辑</a>
                <a href="javascript:void(0)" onclick="viewCustomer(${customer.id})" class="action-link">查看</a>
                <a href="javascript:void(0)" onclick="deleteCustomer(${customer.id})" class="action-link">删除</a>
            </td>
        </tr>
    `).join('');
}

// 获取客户类型名称
function getCustomerTypeName(type) {
    const types = {
        individual: '个人',
        company: '企业',
        government: '政府机构'
    };
    return types[type] || type;
}

// ... 其他函数 