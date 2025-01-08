// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initPriceManage();
});

// 初始化价格管理
function initPriceManage() {
    // 加载供应商列表
    loadSupplierOptions();
    // 加载品类列表
    loadCategoryOptions();
    // 加载价格列表
    loadPriceList();
}

// 加载供应商选项
function loadSupplierOptions() {
    // 模拟API调用
    const suppliers = [
        { id: 1, name: '供应商A' },
        { id: 2, name: '供应商B' },
        { id: 3, name: '供应商C' }
    ];
    const selects = document.querySelectorAll('[name="supplierId"]');
    const options = '<option value="">请选择供应商</option>' + 
        suppliers.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    selects.forEach(select => select.innerHTML = options);
}

// 加载品类选项
function loadCategoryOptions() {
    // 模拟API调用
    const categories = [
        { id: 1, name: '红茶' },
        { id: 2, name: '绿茶' },
        { id: 3, name: '乌龙茶' }
    ];
    const selects = document.querySelectorAll('[name="category"]');
    const options = '<option value="">请选择品类</option>' + 
        categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    selects.forEach(select => select.innerHTML = options);
}

// 加载商品选项
function loadProductOptions(categoryId) {
    // 模拟API调用
    const products = [
        { id: 1, name: '大红袍', category: 1 },
        { id: 2, name: '铁观音', category: 3 },
        { id: 3, name: '龙井', category: 2 }
    ];
    const select = document.querySelector('[name="productId"]');
    select.innerHTML = '<option value="">请选择商品</option>' + 
        products.filter(p => !categoryId || p.category == categoryId)
            .map(p => `<option value="${p.id}">${p.name}</option>`).join('');
}

// 加载价格列表
function loadPriceList(page = 1) {
    // 模拟API调用
    const mockData = {
        total: 100,
        list: [
            {
                id: 1,
                productCode: 'P001',
                productName: '大红袍',
                category: '红茶',
                supplierName: '供应商A',
                price: 1000,
                unit: 'kg',
                minOrderQuantity: 10,
                startDate: '2024-03-01',
                endDate: '2024-12-31',
                status: 'active'
            },
            {
                id: 2,
                productCode: 'P002',
                productName: '铁观音',
                category: '乌龙茶',
                supplierName: '供应商B',
                price: 800,
                unit: 'kg',
                minOrderQuantity: 5,
                startDate: '2024-03-01',
                endDate: '2024-12-31',
                status: 'active'
            }
        ]
    };
    renderPriceList(mockData);
}

// 渲染价格列表
function renderPriceList(data) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = data.list.map(price => `
        <tr>
            <td>${price.productCode}</td>
            <td>${price.productName}</td>
            <td>${price.category}</td>
            <td>${price.supplierName}</td>
            <td>${formatAmount(price.price)}/${price.unit}</td>
            <td>${price.unit}</td>
            <td>${price.minOrderQuantity}${price.unit}</td>
            <td>${price.startDate}</td>
            <td>${price.endDate || '-'}</td>
            <td><span class="status-tag ${price.status}">${getPriceStatusName(price.status)}</span></td>
            <td>
                <a href="javascript:void(0)" onclick="editPrice(${price.id})" class="action-link">编辑</a>
                <a href="javascript:void(0)" onclick="viewPriceHistory(${price.id})" class="action-link">历史</a>
                <a href="javascript:void(0)" onclick="terminatePrice(${price.id})" class="action-link">终止</a>
            </td>
        </tr>
    `).join('');
}

// 显示新建价格弹窗
function showCreateModal() {
    const modal = document.getElementById('priceModal');
    modal.querySelector('h3').textContent = '新建价格';
    modal.classList.add('show');
    // 重置表单
    modal.querySelector('form').reset();
}

// 编辑价格
function editPrice(id) {
    const modal = document.getElementById('priceModal');
    modal.querySelector('h3').textContent = '编辑价格';
    modal.classList.add('show');
    // TODO: 加载价格详情
    loadPriceDetail(id);
}

// 加载价格详情
function loadPriceDetail(id) {
    // 模拟API调用
    const mockData = {
        id: 1,
        supplierId: 1,
        categoryId: 1,
        productId: 1,
        price: 1000,
        unit: 'kg',
        minOrderQuantity: 10,
        startDate: '2024-03-01',
        endDate: '2024-12-31',
        remarks: ''
    };
    fillPriceForm(mockData);
}

// 填充价格表单
function fillPriceForm(data) {
    const form = document.querySelector('#priceModal .form');
    form.querySelector('[name="supplierId"]').value = data.supplierId;
    form.querySelector('[name="category"]').value = data.categoryId;
    loadProductOptions(data.categoryId);
    form.querySelector('[name="productId"]').value = data.productId;
    form.querySelector('[name="unit"]').value = data.unit;
    form.querySelector('[name="price"]').value = data.price;
    form.querySelector('[name="minOrderQuantity"]').value = data.minOrderQuantity;
    form.querySelector('[name="startDate"]').value = data.startDate;
    form.querySelector('[name="endDate"]').value = data.endDate;
    form.querySelector('[name="remarks"]').value = data.remarks;
}

// 提交价格
function submitPrice() {
    const form = document.querySelector('#priceModal .form');
    const formData = {
        supplierId: form.querySelector('[name="supplierId"]').value,
        categoryId: form.querySelector('[name="category"]').value,
        productId: form.querySelector('[name="productId"]').value,
        unit: form.querySelector('[name="unit"]').value,
        price: form.querySelector('[name="price"]').value,
        minOrderQuantity: form.querySelector('[name="minOrderQuantity"]').value,
        startDate: form.querySelector('[name="startDate"]').value,
        endDate: form.querySelector('[name="endDate"]').value,
        remarks: form.querySelector('[name="remarks"]').value
    };

    // 表单验证
    if (!formData.supplierId || !formData.productId || !formData.price || !formData.startDate) {
        alert('请填写必填项');
        return;
    }

    // 发送请求到后端
    console.log('提交价格:', formData);
    alert('保存成功');
    hideModal('priceModal');
    loadPriceList();
}

// 查看价格历史
function viewPriceHistory(id) {
    // TODO: 实现价格历史查看功能
    console.log('查看价格历史:', id);
}

// 终止价格
function terminatePrice(id) {
    if (confirm('确定要终止该价格吗？')) {
        // TODO: 调用后端API终止价格
        console.log('终止价格:', id);
        alert('价格已终止');
        loadPriceList();
    }
}

// 导入价格
function importPrice() {
    // TODO: 实现价格导入功能
    console.log('导入价格');
}

// 导出价格
function exportPrice() {
    // TODO: 实现价格导出功能
    console.log('导出价格');
}

// 获取价格状态名称
function getPriceStatusName(status) {
    const statuses = {
        draft: '草稿',
        active: '生效中',
        expired: '已到期',
        terminated: '已终止'
    };
    return statuses[status] || status;
}

// 格式化金额
function formatAmount(amount) {
    return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
    }).format(amount);
}

// 绑定事件
document.addEventListener('DOMContentLoaded', function() {
    // 品类选择联动商品
    document.querySelector('[name="category"]').addEventListener('change', function() {
        loadProductOptions(this.value);
    });
}); 