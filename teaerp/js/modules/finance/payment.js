// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadSuppliers();
    loadAccounts();
    loadPayments();
    loadWriteoffs();
});

// 加载供应商列表
function loadSuppliers() {
    // 模拟数据
    const suppliers = [
        { id: 'S001', name: '云南茶叶供应商' },
        { id: 'S002', name: '福建茶叶供应商' }
    ];

    const selects = document.querySelectorAll('select[name="supplier"]');
    selects.forEach(select => {
        select.innerHTML = `
            <option value="">请选择供应商</option>
            ${suppliers.map(supplier => `
                <option value="${supplier.id}">${supplier.name}</option>
            `).join('')}
        `;
    });
}

// 加载账户列表
function loadAccounts() {
    // 模拟数据
    const accounts = [
        { id: 'A001', name: '工商银行账户' },
        { id: 'A002', name: '建设银行账户' }
    ];

    const selects = document.querySelectorAll('select[name="account"]');
    selects.forEach(select => {
        select.innerHTML = `
            <option value="">请选择账户</option>
            ${accounts.map(account => `
                <option value="${account.id}">${account.name}</option>
            `).join('')}
        `;
    });
}

// 加载付款单列表
function loadPayments(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                id: 'PY202401001',
                supplier: '云南茶叶供应商',
                amount: 50000,
                method: 'bank',
                date: '2024-01-15',
                payer: '张三',
                status: 'pending'
            }
        ],
        total: 1
    };

    renderPaymentTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染付款单表格
function renderPaymentTable(payments) {
    const tbody = document.getElementById('paymentTable');
    tbody.innerHTML = payments.map(payment => `
        <tr>
            <td><input type="checkbox" value="${payment.id}"></td>
            <td>${payment.id}</td>
            <td>${payment.supplier}</td>
            <td>${formatAmount(payment.amount)}</td>
            <td>${getPaymentMethod(payment.method)}</td>
            <td>${payment.date}</td>
            <td>${payment.payer}</td>
            <td><span class="status-tag ${getPaymentStatusClass(payment.status)}">
                ${getPaymentStatus(payment.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewPayment('${payment.id}')">查看</a>
                ${payment.status === 'pending' ? `
                    <a href="javascript:void(0)" class="action-link" onclick="editPayment('${payment.id}')">编辑</a>
                    <a href="javascript:void(0)" class="action-link" onclick="deletePayment('${payment.id}')">删除</a>
                ` : ''}
                ${payment.status === 'confirmed' ? `
                    <a href="javascript:void(0)" class="action-link" onclick="showWriteoffModal('${payment.id}')">核销</a>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

// 加载核销列表
function loadWriteoffs() {
    // 模拟数据
    const writeoffs = [
        {
            id: 'AP202401001',
            supplier: '云南茶叶供应商',
            amount: 100000,
            paid: 60000,
            remaining: 40000,
            writeoff: 0,
            status: 'partial'
        }
    ];

    renderWriteoffTable(writeoffs);
}

// 渲染核销表格
function renderWriteoffTable(writeoffs) {
    const tbody = document.getElementById('writeoffTable');
    tbody.innerHTML = writeoffs.map(writeoff => `
        <tr>
            <td>${writeoff.id}</td>
            <td>${writeoff.supplier}</td>
            <td>${formatAmount(writeoff.amount)}</td>
            <td>${formatAmount(writeoff.paid)}</td>
            <td>${formatAmount(writeoff.remaining)}</td>
            <td>
                <input type="number" class="form-control" style="width: 100px" 
                    value="${writeoff.writeoff}" onchange="calculateWriteoff(this)">
            </td>
            <td><span class="status-tag ${getWriteoffStatusClass(writeoff.status)}">
                ${getWriteoffStatus(writeoff.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="showWriteoffModal('${writeoff.id}')">核销</a>
            </td>
        </tr>
    `).join('');
}

// 获取付款方式文本
function getPaymentMethod(method) {
    const methods = {
        cash: '现金',
        bank: '银行转账',
        check: '支票',
        other: '其他'
    };
    return methods[method] || '未知';
}

// 获取付款单状态文本
function getPaymentStatus(status) {
    const statuses = {
        pending: '待确认',
        confirmed: '已确认',
        rejected: '已驳回'
    };
    return statuses[status] || '未知';
}

// 获取付款单状态样式
function getPaymentStatusClass(status) {
    const classes = {
        pending: 'status-warning',
        confirmed: 'status-success',
        rejected: 'status-error'
    };
    return classes[status] || '';
}

// 获取核销状态文本
function getWriteoffStatus(status) {
    const statuses = {
        none: '未核销',
        partial: '部分核销',
        complete: '已核销'
    };
    return statuses[status] || '未知';
}

// 获取核销状态样式
function getWriteoffStatusClass(status) {
    const classes = {
        none: 'status-warning',
        partial: 'status-info',
        complete: 'status-success'
    };
    return classes[status] || '';
}

// 格式化金额
function formatAmount(amount) {
    return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
    }).format(amount);
}

// 显示付款登记弹窗
function showPaymentModal() {
    document.getElementById('paymentForm').reset();
    showModal('paymentModal');
}

// 保存付款单
function savePayment() {
    const form = document.getElementById('paymentForm');
    const formData = new FormData(form);
    const payment = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存付款单
    console.log('保存付款单:', payment);
    
    hideModal('paymentModal');
    loadPayments();
    showMessage('付款单已保存');
}

// 批量确认
function batchConfirm() {
    const selectedIds = getSelectedPaymentIds();
    if (selectedIds.length === 0) {
        showMessage('请选择要确认的付款单', 'error');
        return;
    }

    if (confirm(`确定要确认选中的${selectedIds.length}张付款单吗？`)) {
        // TODO: 调用API批量确认
        console.log('批量确认:', selectedIds);
        loadPayments();
        showMessage('付款单已确认');
    }
}

// 删除付款单
function deletePayment(id) {
    if (confirm('确定要删除该付款单吗？')) {
        // TODO: 调用API删除付款单
        console.log('删除付款单:', id);
        loadPayments();
        showMessage('付款单已删除');
    }
}

// 查看付款单
function viewPayment(id) {
    // TODO: 实现查看功能
    console.log('查看付款单:', id);
}

// 编辑付款单
function editPayment(id) {
    // TODO: 实现编辑功能
    console.log('编辑付款单:', id);
}

// 显示核销弹窗
function showWriteoffModal(id) {
    // TODO: 根据ID获取应付账款详情
    const payable = {
        id: 'AP202401001',
        amount: 100000,
        remaining: 40000
    };
    
    const form = document.getElementById('writeoffForm');
    form.elements['paymentId'].value = id;
    form.elements['payableId'].value = payable.id;
    form.elements['payableAmount'].value = payable.amount;
    form.elements['remainingAmount'].value = payable.remaining;
    
    showModal('writeoffModal');
}

// 保存核销
function saveWriteoff() {
    const form = document.getElementById('writeoffForm');
    const formData = new FormData(form);
    const writeoff = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存核销
    console.log('保存核销:', writeoff);
    
    hideModal('writeoffModal');
    loadWriteoffs();
    showMessage('核销已保存');
}

// 计算核销金额
function calculateWriteoff(input) {
    const row = input.closest('tr');
    const remaining = parseFloat(row.cells[4].textContent.replace(/[^\d.-]/g, ''));
    const writeoff = parseFloat(input.value || 0);
    
    if (writeoff > remaining) {
        showMessage('核销金额不能大于未付金额', 'error');
        input.value = remaining;
    }
}

// 获取选中的付款单ID
function getSelectedPaymentIds() {
    const checkboxes = document.querySelectorAll('#paymentTable input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// 全选/取消全选
function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('#paymentTable input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (cb !== checkbox) {
            cb.checked = checkbox.checked;
        }
    });
}

// 搜索付款单
function searchPayments() {
    loadPayments(1);
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadPayments(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadPayments(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadPayments(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 