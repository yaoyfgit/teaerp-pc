// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadCustomers();
    loadStatements();
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

// 加载对账单列表
function loadStatements(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                id: 'ST202401001',
                customer: '上海茶叶公司',
                period: '2024-01',
                amount: 100000,
                received: 95000,
                difference: 5000,
                createTime: '2024-01-15 10:00',
                status: 'pending'
            }
        ],
        total: 1
    };

    renderStatementTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染对账单表格
function renderStatementTable(statements) {
    const tbody = document.getElementById('statementTable');
    tbody.innerHTML = statements.map(statement => `
        <tr>
            <td><input type="checkbox" value="${statement.id}"></td>
            <td>${statement.id}</td>
            <td>${statement.customer}</td>
            <td>${statement.period}</td>
            <td>${formatAmount(statement.amount)}</td>
            <td>${formatAmount(statement.received)}</td>
            <td>${formatAmount(statement.difference)}</td>
            <td>${statement.createTime}</td>
            <td><span class="status-tag ${getStatementStatusClass(statement.status)}">
                ${getStatementStatus(statement.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewStatement('${statement.id}')">查看</a>
                <a href="javascript:void(0)" class="action-link" onclick="sendStatement('${statement.id}')">发送</a>
                ${statement.status === 'pending' ? `
                    <a href="javascript:void(0)" class="action-link" onclick="deleteStatement('${statement.id}')">删除</a>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

// 加载对账明细
function loadDetails(statementId) {
    // 模拟数据
    const details = [
        {
            id: 'D001',
            documentNo: 'AR202401001',
            type: 'invoice',
            date: '2024-01-15',
            ourAmount: 10000,
            theirAmount: 9500,
            difference: 500,
            reason: '时间性差异',
            status: 'pending'
        }
    ];

    renderDetailTable(details);
}

// 渲染明细表格
function renderDetailTable(details) {
    const tbody = document.getElementById('detailTable');
    tbody.innerHTML = details.map(detail => `
        <tr>
            <td>${detail.documentNo}</td>
            <td>${getDocumentType(detail.type)}</td>
            <td>${detail.date}</td>
            <td>${formatAmount(detail.ourAmount)}</td>
            <td>${formatAmount(detail.theirAmount)}</td>
            <td>${formatAmount(detail.difference)}</td>
            <td>${detail.reason || '-'}</td>
            <td><span class="status-tag ${getDetailStatusClass(detail.status)}">
                ${getDetailStatus(detail.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="showDifferenceModal('${detail.id}')">处理差异</a>
            </td>
        </tr>
    `).join('');
}

// 获取单据类型文本
function getDocumentType(type) {
    const types = {
        invoice: '销售发票',
        receipt: '收款单',
        other: '其他'
    };
    return types[type] || '未知';
}

// 获取对账单状态文本
function getStatementStatus(status) {
    const statuses = {
        pending: '待确认',
        confirmed: '已确认',
        rejected: '已驳回'
    };
    return statuses[status] || '未知';
}

// 获取对账单状态样式
function getStatementStatusClass(status) {
    const classes = {
        pending: 'status-warning',
        confirmed: 'status-success',
        rejected: 'status-error'
    };
    return classes[status] || '';
}

// 获取明细状态文本
function getDetailStatus(status) {
    const statuses = {
        pending: '待处理',
        processing: '处理中',
        resolved: '已解决'
    };
    return statuses[status] || '未知';
}

// 获取明细状态样式
function getDetailStatusClass(status) {
    const classes = {
        pending: 'status-warning',
        processing: 'status-info',
        resolved: 'status-success'
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

// 显示生成对账单弹窗
function generateStatement() {
    document.getElementById('generateForm').reset();
    showModal('generateModal');
}

// 执行生成对账单
function doGenerate() {
    const form = document.getElementById('generateForm');
    const formData = new FormData(form);
    const statement = Object.fromEntries(formData.entries());
    
    // TODO: 调用API生成对账单
    console.log('生成对账单:', statement);
    
    hideModal('generateModal');
    loadStatements();
    showMessage('对账单已生成');
}

// 批量发送对账单
function batchSend() {
    const selectedIds = getSelectedStatementIds();
    if (selectedIds.length === 0) {
        showMessage('请选择要发送的对账单', 'error');
        return;
    }

    if (confirm(`确定要发送选中的${selectedIds.length}张对账单吗？`)) {
        // TODO: 调用API批量发送
        console.log('批量发送:', selectedIds);
        loadStatements();
        showMessage('对账单已发送');
    }
}

// 发送单张对账单
function sendStatement(id) {
    if (confirm('确定要发送该对账单吗？')) {
        // TODO: 调用API发送对账单
        console.log('发送对账单:', id);
        loadStatements();
        showMessage('对账单已发送');
    }
}

// 删除对账单
function deleteStatement(id) {
    if (confirm('确定要删除该对账单吗？')) {
        // TODO: 调用API删除对账单
        console.log('删除对账单:', id);
        loadStatements();
        showMessage('对账单已删除');
    }
}

// 查看对账单
function viewStatement(id) {
    // TODO: 实现查看功能
    console.log('查看对账单:', id);
    loadDetails(id);
}

// 显示差异处理弹窗
function showDifferenceModal(detailId) {
    const form = document.getElementById('differenceForm');
    form.elements['detailId'].value = detailId;
    showModal('differenceModal');
}

// 保存差异处理
function saveDifference() {
    const form = document.getElementById('differenceForm');
    const formData = new FormData(form);
    const difference = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存差异处理
    console.log('保存差异处理:', difference);
    
    hideModal('differenceModal');
    loadDetails(difference.statementId);
    showMessage('差异处理已保存');
}

// 获取选中的对账单ID
function getSelectedStatementIds() {
    const checkboxes = document.querySelectorAll('#statementTable input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// 全选/取消全选
function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('#statementTable input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (cb !== checkbox) {
            cb.checked = checkbox.checked;
        }
    });
}

// 搜索对账单
function searchStatements() {
    loadStatements(1);
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadStatements(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadStatements(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadStatements(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 