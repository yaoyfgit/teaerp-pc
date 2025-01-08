// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadSubjects();
    loadVouchers();
});

// 加载科目列表
function loadSubjects() {
    // 模拟数据
    const subjects = [
        { code: '1001', name: '库存现金' },
        { code: '1002', name: '银行存款' },
        { code: '2001', name: '应付账款' }
    ];

    const select = document.querySelector('select[name="subject"]');
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.code;
        option.textContent = `${subject.code} ${subject.name}`;
        select.appendChild(option);
    });
}

// 加载凭证列表
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
                auditor: '李四',
                status: 'approved'
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
            <td>${voucher.id}</td>
            <td>${getVoucherType(voucher.type)}</td>
            <td>${voucher.date}</td>
            <td>${formatAmount(voucher.debit)}</td>
            <td>${formatAmount(voucher.credit)}</td>
            <td>${voucher.creator}</td>
            <td>${voucher.auditor || '-'}</td>
            <td><span class="status-tag ${getVoucherStatusClass(voucher.status)}">
                ${getVoucherStatus(voucher.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewVoucher('${voucher.id}')">查看</a>
                <a href="javascript:void(0)" class="action-link" onclick="printVoucher('${voucher.id}')">打印</a>
            </td>
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

// 获取凭证状态文本
function getVoucherStatus(status) {
    const statuses = {
        draft: '草稿',
        pending: '待审核',
        approved: '已审核',
        rejected: '已驳回'
    };
    return statuses[status] || '未知';
}

// 获取凭证状态样式
function getVoucherStatusClass(status) {
    const classes = {
        draft: 'status-info',
        pending: 'status-warning',
        approved: 'status-success',
        rejected: 'status-error'
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

// 查询凭证
function searchVouchers() {
    const form = document.getElementById('queryForm');
    const formData = new FormData(form);
    const query = Object.fromEntries(formData.entries());
    
    // TODO: 调用API查询凭证
    console.log('查询条件:', query);
    loadVouchers(1);
}

// 重置表单
function resetForm() {
    document.getElementById('queryForm').reset();
}

// 导出结果
function exportResults() {
    // TODO: 实现导出功能
    console.log('导出查询结果');
    showMessage('查询结果已导出');
}

// 保存查询
function saveQuery() {
    showModal('saveQueryModal');
}

// 执行保存查询
function doSaveQuery() {
    const queryForm = document.getElementById('queryForm');
    const saveForm = document.getElementById('saveQueryForm');
    const query = {
        ...Object.fromEntries(new FormData(queryForm).entries()),
        ...Object.fromEntries(new FormData(saveForm).entries())
    };
    
    // TODO: 调用API保存查询
    console.log('保存查询:', query);
    
    hideModal('saveQueryModal');
    showMessage('查询已保存');
}

// 管理常用查询
function manageQueries() {
    // TODO: 实现常用查询管理功能
    console.log('管理常用查询');
}

// 查看凭证
function viewVoucher(id) {
    // TODO: 实现查看凭证功能
    console.log('查看凭证:', id);
}

// 打印凭证
function printVoucher(id) {
    // TODO: 实现打印凭证功能
    console.log('打印凭证:', id);
    showMessage('凭证已打印');
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