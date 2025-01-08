// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadBalances();
    loadAdjustments();
});

// 加载科目余额
function loadBalances(period = new Date().toISOString().slice(0, 7)) {
    // 模拟数据
    const mockData = {
        items: [
            {
                code: '1001',
                name: '库存现金',
                openingBalance: 10000,
                debit: 5000,
                credit: 3000,
                closingBalance: 12000,
                foreignBalance: 'USD 1,000',
                quantityBalance: '-'
            },
            {
                code: '1002',
                name: '银行存款',
                openingBalance: 100000,
                debit: 50000,
                credit: 30000,
                closingBalance: 120000,
                foreignBalance: 'USD 10,000',
                quantityBalance: '-'
            }
        ],
        total: 2
    };

    renderBalanceTable(mockData.items);
    renderPagination(mockData.total, 1);
}

// 渲染余额表格
function renderBalanceTable(balances) {
    const tbody = document.getElementById('balanceTable');
    tbody.innerHTML = balances.map(balance => `
        <tr>
            <td>${balance.code}</td>
            <td>${balance.name}</td>
            <td>${formatAmount(balance.openingBalance)}</td>
            <td>${formatAmount(balance.debit)}</td>
            <td>${formatAmount(balance.credit)}</td>
            <td>${formatAmount(balance.closingBalance)}</td>
            <td>${balance.foreignBalance}</td>
            <td>${balance.quantityBalance}</td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewDetail('${balance.code}')">明细</a>
                <a href="javascript:void(0)" class="action-link" onclick="showAdjustModal('${balance.code}')">调节</a>
            </td>
        </tr>
    `).join('');
}

// 格式化金额
function formatAmount(amount) {
    return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
    }).format(amount);
}

// 加载调节记录
function loadAdjustments() {
    // 模拟数据
    const adjustments = [
        {
            date: '2024-01-15',
            code: '1001',
            name: '库存现金',
            amount: 1000,
            reason: '现金盘点差异调整',
            operator: '张三',
            status: 'pending'
        }
    ];

    renderAdjustmentTable(adjustments);
}

// 渲染调节表格
function renderAdjustmentTable(adjustments) {
    const tbody = document.getElementById('adjustmentTable');
    tbody.innerHTML = adjustments.map(adjustment => `
        <tr>
            <td>${adjustment.date}</td>
            <td>${adjustment.code}</td>
            <td>${adjustment.name}</td>
            <td>${formatAmount(adjustment.amount)}</td>
            <td>${adjustment.reason}</td>
            <td>${adjustment.operator}</td>
            <td><span class="status-tag ${adjustment.status === 'approved' ? 'status-success' : 'status-warning'}">
                ${getAdjustmentStatus(adjustment.status)}
            </span></td>
            <td>
                ${adjustment.status === 'pending' ? `
                    <a href="javascript:void(0)" class="action-link" onclick="approveAdjustment('${adjustment.id}')">审批</a>
                    <a href="javascript:void(0)" class="action-link" onclick="rejectAdjustment('${adjustment.id}')">驳回</a>
                ` : ''}
                <a href="javascript:void(0)" class="action-link" onclick="viewAdjustment('${adjustment.id}')">查看</a>
            </td>
        </tr>
    `).join('');
}

// 获取调节状态文本
function getAdjustmentStatus(status) {
    const statuses = {
        pending: '待审批',
        approved: '已通过',
        rejected: '已驳回'
    };
    return statuses[status] || '未知';
}

// 显示调节弹窗
function showAdjustModal(code) {
    document.getElementById('adjustForm').reset();
    if (code) {
        const select = document.querySelector('select[name="subject"]');
        select.value = code;
    }
    showModal('adjustModal');
}

// 保存调节
function saveAdjustment() {
    const form = document.getElementById('adjustForm');
    const formData = new FormData(form);
    const adjustment = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存调节
    console.log('保存调节:', adjustment);
    
    hideModal('adjustModal');
    loadAdjustments();
    showMessage('调节已保存');
}

// 审批调节
function approveAdjustment(id) {
    if (confirm('确定要通过该调节申请吗？')) {
        // TODO: 调用API审批调节
        console.log('审批调节:', id);
        loadAdjustments();
        showMessage('调节已审批通过');
    }
}

// 驳回调节
function rejectAdjustment(id) {
    const reason = prompt('请输入驳回原因:');
    if (reason) {
        // TODO: 调用API驳回调节
        console.log('驳回调节:', id, reason);
        loadAdjustments();
        showMessage('调��已驳回');
    }
}

// 查看调节详情
function viewAdjustment(id) {
    // TODO: 实现查看调节详情功能
    console.log('查看调节:', id);
}

// 查看科目明细
function viewDetail(code) {
    // TODO: 实现查看科目明细功能
    console.log('查看明细:', code);
}

// 导出余额
function exportBalances() {
    // TODO: 实现余额导出功能
    console.log('导出余额');
    showMessage('余额已导出');
}

// 搜索余额
function searchBalances() {
    loadBalances();
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadBalances(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadBalances(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadBalances(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 