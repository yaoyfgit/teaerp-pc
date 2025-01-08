// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadVouchers();
    loadAuditRecords();
});

// 加载待审核凭证
function loadVouchers(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                id: 'PZ202401001',
                type: 'receipt',
                date: '2024-01-15',
                debit: 10000,
                credit: 10000,
                creator: '张三',
                submitTime: '2024-01-15 10:00'
            }
        ],
        total: 1
    };

    renderVoucherTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染凭证表格
function renderVoucherTable(vouchers) {
    const tbody = document.getElementById('voucherTable');
    tbody.innerHTML = vouchers.map(voucher => `
        <tr>
            <td><input type="checkbox" value="${voucher.id}"></td>
            <td>${voucher.id}</td>
            <td>${getVoucherType(voucher.type)}</td>
            <td>${voucher.date}</td>
            <td>${formatAmount(voucher.debit)}</td>
            <td>${formatAmount(voucher.credit)}</td>
            <td>${voucher.creator}</td>
            <td>${voucher.submitTime}</td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewVoucher('${voucher.id}')">查看</a>
                <a href="javascript:void(0)" class="action-link" onclick="showAuditModal('${voucher.id}')">审核</a>
            </td>
        </tr>
    `).join('');
}

// 加载审核记录
function loadAuditRecords() {
    // 模拟数据
    const records = [
        {
            voucherId: 'PZ202401001',
            type: 'receipt',
            result: 'approved',
            comment: '审核通过',
            auditor: '李四',
            auditTime: '2024-01-15 11:00'
        }
    ];

    renderAuditTable(records);
}

// 渲染审核记录表格
function renderAuditTable(records) {
    const tbody = document.getElementById('auditTable');
    tbody.innerHTML = records.map(record => `
        <tr>
            <td>${record.voucherId}</td>
            <td>${getVoucherType(record.type)}</td>
            <td><span class="status-tag ${record.result === 'approved' ? 'status-success' : 'status-error'}">
                ${record.result === 'approved' ? '通过' : '驳回'}
            </span></td>
            <td>${record.comment}</td>
            <td>${record.auditor}</td>
            <td>${record.auditTime}</td>
        </tr>
    `).join('');
}

// 获取凭证类型文本
function getVoucherType(type) {
    const types = {
        receipt: '收款凭证',
        payment: '付款凭证',
        transfer: '转账凭证',
        other: '其他凭证'
    };
    return types[type] || '未知';
}

// 格式化金额
function formatAmount(amount) {
    return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
    }).format(amount);
}

// 显示审核弹窗
function showAuditModal(voucherId) {
    const form = document.getElementById('auditForm');
    form.elements['voucherId'].value = voucherId;
    showModal('auditModal');
}

// 提交审核
function submitAudit() {
    const form = document.getElementById('auditForm');
    const formData = new FormData(form);
    const audit = Object.fromEntries(formData.entries());
    
    // TODO: 调用API提交审核
    console.log('提交审核:', audit);
    
    hideModal('auditModal');
    loadVouchers();
    loadAuditRecords();
    showMessage('审核已提交');
}

// 批量通过
function batchApprove() {
    const selectedIds = getSelectedVoucherIds();
    if (selectedIds.length === 0) {
        showMessage('请选择要审核的凭证', 'error');
        return;
    }

    if (confirm(`确定要通过选中的${selectedIds.length}张凭证吗？`)) {
        // TODO: 调用API批量通过
        console.log('批量通过:', selectedIds);
        loadVouchers();
        loadAuditRecords();
        showMessage('审核已提交');
    }
}

// 批量驳回
function batchReject() {
    const selectedIds = getSelectedVoucherIds();
    if (selectedIds.length === 0) {
        showMessage('请选择要审核的凭证', 'error');
        return;
    }

    const reason = prompt('请输入驳回原因:');
    if (reason) {
        // TODO: 调用API批量驳回
        console.log('批量驳回:', selectedIds, reason);
        loadVouchers();
        loadAuditRecords();
        showMessage('审核已提交');
    }
}

// 获取选中的凭证ID
function getSelectedVoucherIds() {
    const checkboxes = document.querySelectorAll('#voucherTable input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// 全选/取消全选
function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('#voucherTable input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (cb !== checkbox) {
            cb.checked = checkbox.checked;
        }
    });
}

// 查看凭证
function viewVoucher(id) {
    // TODO: 实现查看凭证功能
    console.log('查看凭证:', id);
}

// 搜索凭证
function searchVouchers() {
    loadVouchers(1);
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadVouchers(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadVouchers(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadVouchers(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 