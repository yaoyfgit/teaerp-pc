// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadSuppliers();
    loadAccounts();
    loadAdvances();
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

// 加载预付账款列表
function loadAdvances(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                id: 'AD202401001',
                supplier: '云南茶叶供应商',
                amount: 100000,
                method: 'bank',
                date: '2024-01-15',
                purpose: '预付货款',
                status: 'pending'
            }
        ],
        total: 1
    };

    renderAdvanceTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染预付账款表格
function renderAdvanceTable(advances) {
    const tbody = document.getElementById('advanceTable');
    tbody.innerHTML = advances.map(advance => `
        <tr>
            <td><input type="checkbox" value="${advance.id}"></td>
            <td>${advance.id}</td>
            <td>${advance.supplier}</td>
            <td>${formatAmount(advance.amount)}</td>
            <td>${getPaymentMethod(advance.method)}</td>
            <td>${advance.date}</td>
            <td>${advance.purpose}</td>
            <td><span class="status-tag ${getAdvanceStatusClass(advance.status)}">
                ${getAdvanceStatus(advance.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewAdvance('${advance.id}')">查看</a>
                ${advance.status === 'pending' ? `
                    <a href="javascript:void(0)" class="action-link" onclick="editAdvance('${advance.id}')">编辑</a>
                    <a href="javascript:void(0)" class="action-link" onclick="deleteAdvance('${advance.id}')">删除</a>
                ` : ''}
                ${advance.status === 'confirmed' ? `
                    <a href="javascript:void(0)" class="action-link" onclick="showWriteoffModal('${advance.id}')">核销</a>
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
            id: 'AD202401001',
            supplier: '云南茶叶供应商',
            amount: 100000,
            writeoffed: 60000,
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
            <td>${formatAmount(writeoff.writeoffed)}</td>
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

// 获取预付状态文本
function getAdvanceStatus(status) {
    const statuses = {
        pending: '待确认',
        confirmed: '已确认',
        rejected: '已驳回'
    };
    return statuses[status] || '未知';
}

// 获取预付状态样���
function getAdvanceStatusClass(status) {
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

// 显示预付登记弹窗
function showAdvanceModal() {
    document.getElementById('advanceForm').reset();
    showModal('advanceModal');
}

// 保存预付账款
function saveAdvance() {
    const form = document.getElementById('advanceForm');
    const formData = new FormData(form);
    const advance = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存预付账款
    console.log('保存预付账款:', advance);
    
    hideModal('advanceModal');
    loadAdvances();
    showMessage('预付账款已保存');
}

// 批量确认
function batchConfirm() {
    const selectedIds = getSelectedAdvanceIds();
    if (selectedIds.length === 0) {
        showMessage('请选择要确认的预付账款', 'error');
        return;
    }

    if (confirm(`确定要确认选中的${selectedIds.length}笔预付账款吗？`)) {
        // TODO: 调用API批量确认
        console.log('批量确认:', selectedIds);
        loadAdvances();
        showMessage('预付账款已确认');
    }
}

// 删除预付账款
function deleteAdvance(id) {
    if (confirm('确定要删除该预付账款吗？')) {
        // TODO: 调用API删除预付账款
        console.log('删除预付账款:', id);
        loadAdvances();
        showMessage('预付账款已删除');
    }
}

// 查看预付账款
function viewAdvance(id) {
    // TODO: 实现查看功能
    console.log('查看预付账款:', id);
}

// 编辑预付账款
function editAdvance(id) {
    // TODO: 实现编辑功能
    console.log('编辑预付账款:', id);
}

// 显示核销弹窗
function showWriteoffModal(id) {
    // TODO: 根据ID获取预付账款详情
    const advance = {
        id: 'AD202401001',
        amount: 100000,
        remaining: 40000
    };
    
    const form = document.getElementById('writeoffForm');
    form.elements['advanceId'].value = id;
    form.elements['advanceNo'].value = advance.id;
    form.elements['advanceAmount'].value = advance.amount;
    form.elements['remainingAmount'].value = advance.remaining;
    
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
        showMessage('核销金额不能大于剩余金额', 'error');
        input.value = remaining;
    }
}

// 获取选中的预付账款ID
function getSelectedAdvanceIds() {
    const checkboxes = document.querySelectorAll('#advanceTable input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// 全选/取消全选
function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('#advanceTable input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (cb !== checkbox) {
            cb.checked = checkbox.checked;
        }
    });
}

// 搜索预付账款
function searchAdvances() {
    loadAdvances(1);
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadAdvances(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadAdvances(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadAdvances(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 