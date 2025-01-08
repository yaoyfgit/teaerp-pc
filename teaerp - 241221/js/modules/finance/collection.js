// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadCustomers();
    loadAccounts();
    loadReceipts();
    loadWriteoffs();
});

// 加载客户列表
function loadCustomers() {
    // 模拟数据
    const customers = [
        { id: 'C001', name: '上海茶叶公司' },
        { id: 'C002', name: '北京茶叶批发市场' }
    ];

    const selects = document.querySelectorAll('select[name="customer"]');
    selects.forEach(select => {
        select.innerHTML = `
            <option value="">请选择客户</option>
            ${customers.map(customer => `
                <option value="${customer.id}">${customer.name}</option>
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
            <option value="">请��择账户</option>
            ${accounts.map(account => `
                <option value="${account.id}">${account.name}</option>
            `).join('')}
        `;
    });
}

// 加载收款单列表
function loadReceipts(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                id: 'RC202401001',
                customer: '上海茶叶公司',
                amount: 50000,
                method: 'bank',
                date: '2024-01-15',
                collector: '张三',
                status: 'pending'
            }
        ],
        total: 1
    };

    renderReceiptTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染收款单表格
function renderReceiptTable(receipts) {
    const tbody = document.getElementById('receiptTable');
    tbody.innerHTML = receipts.map(receipt => `
        <tr>
            <td><input type="checkbox" value="${receipt.id}"></td>
            <td>${receipt.id}</td>
            <td>${receipt.customer}</td>
            <td>${formatAmount(receipt.amount)}</td>
            <td>${getReceiptMethod(receipt.method)}</td>
            <td>${receipt.date}</td>
            <td>${receipt.collector}</td>
            <td><span class="status-tag ${getReceiptStatusClass(receipt.status)}">
                ${getReceiptStatus(receipt.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewReceipt('${receipt.id}')">查看</a>
                ${receipt.status === 'pending' ? `
                    <a href="javascript:void(0)" class="action-link" onclick="editReceipt('${receipt.id}')">编辑</a>
                    <a href="javascript:void(0)" class="action-link" onclick="deleteReceipt('${receipt.id}')">删除</a>
                ` : ''}
                ${receipt.status === 'confirmed' ? `
                    <a href="javascript:void(0)" class="action-link" onclick="showWriteoffModal('${receipt.id}')">核销</a>
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
            id: 'AR202401001',
            customer: '上海茶叶公司',
            amount: 100000,
            received: 60000,
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
            <td>${writeoff.customer}</td>
            <td>${formatAmount(writeoff.amount)}</td>
            <td>${formatAmount(writeoff.received)}</td>
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

// 获取收款方式文本
function getReceiptMethod(method) {
    const methods = {
        cash: '现金',
        bank: '银行转账',
        check: '支票',
        other: '其他'
    };
    return methods[method] || '未知';
}

// 获取收款单状态文本
function getReceiptStatus(status) {
    const statuses = {
        pending: '待确认',
        confirmed: '已确认',
        rejected: '已驳回'
    };
    return statuses[status] || '未知';
}

// 获取收款单状态样式
function getReceiptStatusClass(status) {
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

// 显示收款登记弹窗
function showReceiveModal() {
    document.getElementById('receiveForm').reset();
    showModal('receiveModal');
}

// 保存收款单
function saveReceipt() {
    const form = document.getElementById('receiveForm');
    const formData = new FormData(form);
    const receipt = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存收款单
    console.log('保存收款单:', receipt);
    
    hideModal('receiveModal');
    loadReceipts();
    showMessage('收款单已保存');
}

// 批量确认
function batchConfirm() {
    const selectedIds = getSelectedReceiptIds();
    if (selectedIds.length === 0) {
        showMessage('请选择要确认的收款单', 'error');
        return;
    }

    if (confirm(`确定要确认选中的${selectedIds.length}张收款单吗？`)) {
        // TODO: 调用API批量确认
        console.log('批量确认:', selectedIds);
        loadReceipts();
        showMessage('收款单已确认');
    }
}

// 删除收款单
function deleteReceipt(id) {
    if (confirm('确定要删除该收款单吗？')) {
        // TODO: 调用API删除收款单
        console.log('删除收款单:', id);
        loadReceipts();
        showMessage('收款单已删除');
    }
}

// 查看收款单
function viewReceipt(id) {
    // TODO: 实现查看功能
    console.log('查看收款单:', id);
}

// 编辑收款单
function editReceipt(id) {
    // TODO: 实现编辑功能
    console.log('编辑收款单:', id);
}

// 显示核销弹窗
function showWriteoffModal(id) {
    // TODO: 根据ID获取应收账款详情
    const receivable = {
        id: 'AR202401001',
        amount: 100000,
        remaining: 40000
    };
    
    const form = document.getElementById('writeoffForm');
    form.elements['receiptId'].value = id;
    form.elements['receivableId'].value = receivable.id;
    form.elements['receivableAmount'].value = receivable.amount;
    form.elements['remainingAmount'].value = receivable.remaining;
    
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
        showMessage('核销金额不能大于未收金额', 'error');
        input.value = remaining;
    }
}

// 获取选中的收款单ID
function getSelectedReceiptIds() {
    const checkboxes = document.querySelectorAll('#receiptTable input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// 全选/取消全选
function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('#receiptTable input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (cb !== checkbox) {
            cb.checked = checkbox.checked;
        }
    });
}

// 搜索收款单
function searchReceipts() {
    loadReceipts(1);
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadReceipts(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadReceipts(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadReceipts(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息��示组件
    alert(message);
} 