// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化菜单
    Menu.renderMenu();
    // 初始化菜单切换功能
    initMenuToggle();
    // 初始化Tab切换
    initTabs();
    // 初始化表单事件
    initFormEvents();
});

// Tab切换功能
function initTabs() {
    const tabItems = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');

    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            tabItems.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            item.classList.add('active');
            const tabId = item.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// 表单事件
function initFormEvents() {
    // 金额输入格式化
    const amountInputs = document.querySelectorAll('input[type="number"]');
    amountInputs.forEach(input => {
        input.addEventListener('change', () => {
            const value = parseFloat(input.value);
            if (!isNaN(value)) {
                input.value = value.toFixed(2);
                updateAmountSummary();
            }
        });
    });
}

// 更新金额汇总
function updateAmountSummary() {
    const debitInputs = document.querySelectorAll('.voucher-entries input[type="number"]:nth-child(3)');
    const creditInputs = document.querySelectorAll('.voucher-entries input[type="number"]:nth-child(4)');

    const debitTotal = Array.from(debitInputs).reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0);
    const creditTotal = Array.from(creditInputs).reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0);

    document.querySelector('.amount-summary span:first-child').textContent = `借方合计：¥${debitTotal.toFixed(2)}`;
    document.querySelector('.amount-summary span:last-child').textContent = `贷方合计：¥${creditTotal.toFixed(2)}`;
}

// 添加凭证分录行
function addVoucherEntry() {
    const tbody = document.querySelector('.voucher-entries tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>
            <input type="text" class="standard-input">
        </td>
        <td>
            <select class="standard-select">
                <option value="">选择科目</option>
            </select>
        </td>
        <td>
            <input type="number" class="standard-input" step="0.01">
        </td>
        <td>
            <input type="number" class="standard-input" step="0.01">
        </td>
        <td>
            <button type="button" class="standard-button small danger" onclick="removeVoucherEntry(this)">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    tbody.appendChild(newRow);
    initFormEvents();
}

// 删除凭证分录行
function removeVoucherEntry(button) {
    button.closest('tr').remove();
    updateAmountSummary();
}

// Modal操作
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// 保存凭证
function saveVoucher() {
    // TODO: 实现保存凭证的逻辑
    hideModal('voucherModal');
}

// 批量审核
function batchApprove() {
    const selectedRows = document.querySelectorAll('.standard-table tbody input[type="checkbox"]:checked');
    if (selectedRows.length === 0) {
        alert('请选择要审核的凭证');
        return;
    }
    // TODO: 实现批量审核的逻辑
}

// 批量驳回
function batchReject() {
    const selectedRows = document.querySelectorAll('.standard-table tbody input[type="checkbox"]:checked');
    if (selectedRows.length === 0) {
        alert('请选择要驳回的凭证');
        return;
    }
    // TODO: 实现批量驳回的逻辑
} 