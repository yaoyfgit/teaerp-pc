// 供应商管理模块
document.addEventListener('DOMContentLoaded', function() {
    initSupplierManage();
});

function initSupplierManage() {
    loadSupplierList();
    bindEvents();
}

// 显示新建供应商弹窗
function showCreateModal() {
    const modal = document.getElementById('createSupplierModal');
    modal.classList.add('show');
    // 重置表单
    modal.querySelector('form').reset();
    // 初始化地区选择器
    initRegionSelect();
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

// 绑定事件
function bindEvents() {
    // 省市区联动
    document.querySelector('[name="province"]').addEventListener('change', loadCities);
    document.querySelector('[name="city"]').addEventListener('change', loadDistricts);
}

// 加载供应商列表
function loadSupplierList(page = 1) {
    // 模拟API调用
    const mockData = {
        total: 100,
        list: [
            {
                id: 1,
                code: 'SUP001',
                companyName: '示例供应商',
                companyType: 'manufacturer',
                contactPerson: '张三',
                contactPhone: '13800138000',
                creditLimit: 100000,
                cooperationStatus: 'active'
            }
            // ... 其他供应商数据
        ]
    };

    renderSupplierList(mockData);
}

// 渲染供应商列表
function renderSupplierList(data) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = data.list.map(supplier => `
        <tr>
            <td>${supplier.code}</td>
            <td>${supplier.companyName}</td>
            <td>${getCompanyTypeName(supplier.companyType)}</td>
            <td>${supplier.contactPerson}</td>
            <td>${supplier.contactPhone}</td>
            <td>${supplier.creditLimit}</td>
            <td>
                <span class="status-tag ${supplier.cooperationStatus}">
                    ${getCooperationStatusName(supplier.cooperationStatus)}
                </span>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="editSupplier(${supplier.id})" class="action-link">编辑</a>
                <a href="javascript:void(0)" onclick="viewSupplier(${supplier.id})" class="action-link">查看</a>
                <a href="javascript:void(0)" onclick="deleteSupplier(${supplier.id})" class="action-link">删除</a>
            </td>
        </tr>
    `).join('');
}

// 获取企业类型名称
function getCompanyTypeName(type) {
    const types = {
        manufacturer: '生产商',
        distributor: '经销商',
        agent: '代理商'
    };
    return types[type] || type;
}

// 获取合作状态名称
function getCooperationStatusName(status) {
    const statuses = {
        active: '合作中',
        suspended: '已暂停',
        terminated: '已终止'
    };
    return statuses[status] || status;
}

// 提交新建供应商
function submitCreateSupplier() {
    const formData = {
        companyName: document.querySelector('[name="companyName"]').value,
        companyType: document.querySelector('[name="companyType"]').value,
        businessLicense: document.querySelector('[name="businessLicense"]').value,
        taxNumber: document.querySelector('[name="taxNumber"]').value,
        contactPerson: document.querySelector('[name="contactPerson"]').value,
        contactPhone: document.querySelector('[name="contactPhone"]').value,
        position: document.querySelector('[name="position"]').value,
        province: document.querySelector('[name="province"]').value,
        city: document.querySelector('[name="city"]').value,
        district: document.querySelector('[name="district"]').value,
        address: document.querySelector('[name="address"]').value,
        bankName: document.querySelector('[name="bankName"]').value,
        bankAccount: document.querySelector('[name="bankAccount"]').value,
        settlementMethod: document.querySelector('[name="settlementMethod"]').value,
        paymentMethod: document.querySelector('[name="paymentMethod"]').value,
        settlementPeriod: document.querySelector('[name="settlementPeriod"]').value,
        creditLimit: document.querySelector('[name="creditLimit"]').value,
        cooperationStatus: document.querySelector('[name="cooperationStatus"]').value
    };

    // 表单验证
    if (!formData.companyName) {
        alert('请填写企业名称');
        return;
    }

    // 发送请求到后端
    console.log('创建供应商:', formData);
    alert('供应商创建成功');
    hideModal('createSupplierModal');
    loadSupplierList();
} 