// 显示创建订单弹窗
function showCreateModal() {
    const modal = document.getElementById('createModal');
    modal.classList.add('show');
}

// 隐藏创建订单弹窗
function hideCreateModal() {
    const modal = document.getElementById('createModal');
    modal.classList.remove('show');
}

// 添加订单明细行
function addDetailRow() {
    const tbody = document.querySelector('.detail-table tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>
            <select class="form-control" onchange="updateRowAmount(this)">
                <option value="">请选择商品</option>
                <option value="1">商品A</option>
                <option value="2">商品B</option>
            </select>
        </td>
        <td><input type="number" class="form-control" onchange="updateRowAmount(this)"></td>
        <td><input type="number" class="form-control" onchange="updateRowAmount(this)"></td>
        <td><input type="number" class="form-control" readonly></td>
        <td><input type="text" class="form-control"></td>
        <td><button type="button" class="button secondary" onclick="removeDetailRow(this)">删除</button></td>
    `;
    tbody.appendChild(newRow);
}

// 删除订单明细行
function removeDetailRow(button) {
    const row = button.closest('tr');
    row.remove();
    updateTotalAmount();
}

// 更新行金额
function updateRowAmount(element) {
    const row = element.closest('tr');
    const quantity = parseFloat(row.querySelector('input[type="number"]:nth-of-type(1)').value) || 0;
    const price = parseFloat(row.querySelector('input[type="number"]:nth-of-type(2)').value) || 0;
    const amount = quantity * price;
    row.querySelector('input[readonly]').value = amount.toFixed(2);
    updateTotalAmount();
}

// 更新总金额
function updateTotalAmount() {
    const amounts = Array.from(document.querySelectorAll('.detail-table tbody input[readonly]'))
        .map(input => parseFloat(input.value) || 0);
    const total = amounts.reduce((sum, amount) => sum + amount, 0);
    document.querySelector('.detail-table tfoot td:nth-child(2)').textContent = `¥${total.toFixed(2)}`;
}

// 保存草稿
function saveDraft() {
    // TODO: 实现保存草稿功能
    alert('保存草稿成功');
    hideCreateModal();
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 这里可以添加页面初始化的代码
    // 比如从后端加载数据等
}); 