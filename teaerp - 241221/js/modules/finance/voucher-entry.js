// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadSubjects();
    loadVouchers();
    initVoucherNumber();
});

// 加载科目列表
function loadSubjects() {
    // 模拟数据
    const subjects = [
        { code: '1001', name: '库存现金' },
        { code: '1002', name: '银行存款' },
        { code: '2001', name: '应付账款' }
    ];

    const selects = document.querySelectorAll('select[name$=".subject"]');
    selects.forEach(select => {
        select.innerHTML = `
            <option value="">请选择科目</option>
            ${subjects.map(subject => `
                <option value="${subject.code}">${subject.code} ${subject.name}</option>
            `).join('')}
        `;
    });
}

// 初始化凭证号
function initVoucherNumber() {
    const input = document.querySelector('input[name="number"]');
    // TODO: 调用API获取下一个凭证号
    input.value = 'PZ202401001';
}

// 添加分录
function addEntry() {
    const tbody = document.getElementById('entryTable');
    const index = tbody.children.length;
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>
            <input type="text" class="form-control" name="entries[${index}].summary">
        </td>
        <td>
            <select class="form-control" name="entries[${index}].subject">
                <option value="">请选择科目</option>
            </select>
        </td>
        <td>
            <input type="number" class="form-control" name="entries[${index}].debit" 
                onchange="calculateBalance()">
        </td>
        <td>
            <input type="number" class="form-control" name="entries[${index}].credit"
                onchange="calculateBalance()">
        </td>
        <td>
            <a href="javascript:void(0)" onclick="removeEntry(this)">删除</a>
        </td>
    `;
    tbody.appendChild(tr);
    loadSubjects();
}

// 删除分录
function removeEntry(link) {
    if (document.getElementById('entryTable').children.length > 1) {
        link.closest('tr').remove();
        calculateBalance();
    } else {
        showMessage('至少需要保留一条分录', 'error');
    }
}

// 计算借贷平衡
function calculateBalance() {
    let totalDebit = 0;
    let totalCredit = 0;

    document.querySelectorAll('input[name$=".debit"]').forEach(input => {
        totalDebit += parseFloat(input.value || 0);
    });

    document.querySelectorAll('input[name$=".credit"]').forEach(input => {
        totalCredit += parseFloat(input.value || 0);
    });

    document.getElementById('totalDebit').textContent = totalDebit.toFixed(2);
    document.getElementById('totalCredit').textContent = totalCredit.toFixed(2);

    return Math.abs(totalDebit - totalCredit) < 0.01;
}

// 保存凭证
function saveVoucher(action) {
    if (!calculateBalance()) {
        showMessage('借贷不平衡', 'error');
        return;
    }

    const form = document.getElementById('voucherForm');
    const formData = new FormData(form);
    const voucher = {
        ...Object.fromEntries(formData.entries()),
        entries: [],
        status: action === 'draft' ? 'draft' : 'pending'
    };

    // 处理分录
    const entries = [];
    document.querySelectorAll('#entryTable tr').forEach((tr, index) => {
        entries.push({
            summary: formData.get(`entries[${index}].summary`),
            subject: formData.get(`entries[${index}].subject`),
            debit: parseFloat(formData.get(`entries[${index}].debit`) || 0),
            credit: parseFloat(formData.get(`entries[${index}].credit`) || 0)
        });
    });
    voucher.entries = entries;

    // TODO: 调用API保存凭证
    console.log('保��凭证:', voucher);

    showMessage(action === 'draft' ? '凭证已保存为草稿' : '凭证已提交审核');
    clearForm();
    loadVouchers();
}

// 清空表单
function clearForm() {
    document.getElementById('voucherForm').reset();
    document.getElementById('entryTable').innerHTML = `
        <tr>
            <td>
                <input type="text" class="form-control" name="entries[0].summary">
            </td>
            <td>
                <select class="form-control" name="entries[0].subject">
                    <option value="">请选择科目</option>
                </select>
            </td>
            <td>
                <input type="number" class="form-control" name="entries[0].debit" 
                    onchange="calculateBalance()">
            </td>
            <td>
                <input type="number" class="form-control" name="entries[0].credit"
                    onchange="calculateBalance()">
            </td>
            <td>
                <a href="javascript:void(0)" onclick="removeEntry(this)">删除</a>
            </td>
        </tr>
    `;
    loadSubjects();
    initVoucherNumber();
    calculateBalance();
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
                status: 'pending'
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
            <td><span class="status-tag ${getVoucherStatusClass(voucher.status)}">
                ${getVoucherStatus(voucher.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewVoucher('${voucher.id}')">查看</a>
                ${voucher.status === 'draft' ? `
                    <a href="javascript:void(0)" class="action-link" onclick="editVoucher('${voucher.id}')">编辑</a>
                    <a href="javascript:void(0)" class="action-link" onclick="deleteVoucher('${voucher.id}')">删除</a>
                ` : ''}
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

// 查看凭证
function viewVoucher(id) {
    // TODO: 实现查看凭证功能
    console.log('查看凭证:', id);
}

// 编辑凭证
function editVoucher(id) {
    // TODO: 实现编辑凭证功能
    console.log('编辑凭证:', id);
}

// 删除凭证
function deleteVoucher(id) {
    if (confirm('确定要删除该凭证吗？')) {
        // TODO: 调用API删除凭证
        console.log('删除凭证:', id);
        loadVouchers();
        showMessage('凭证已删除');
    }
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