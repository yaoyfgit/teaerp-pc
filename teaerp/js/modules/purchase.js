// 显示创建需求弹窗
function showCreateModal() {
    const modal = document.getElementById('createModal');
    modal.classList.add('show');
}

// 隐藏创建需求弹窗
function hideCreateModal() {
    const modal = document.getElementById('createModal');
    modal.classList.remove('show');
}

// 添加需求明细行
function addDetailRow() {
    const tbody = document.querySelector('.detail-table tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>
            <select class="form-control">
                <option>请选择商品</option>
            </select>
        </td>
        <td><input type="number" class="form-control"></td>
        <td><input type="number" class="form-control"></td>
        <td>
            <select class="form-control">
                <option>请选择供应商</option>
            </select>
        </td>
        <td><input type="text" class="form-control"></td>
        <td><button type="button" class="button secondary" onclick="removeDetailRow(this)">删除</button></td>
    `;
    tbody.appendChild(newRow);
}

// 删除需求明细行
function removeDetailRow(button) {
    const row = button.closest('tr');
    row.remove();
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 这里可以添加页面初始化的代码
    // 比如从后端加载数据等
});

// 添加订单明细行
function addOrderDetailRow() {
    const tbody = document.querySelector('.detail-table tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>
            <select class="form-control" onchange="updateRowAmount(this)">
                <option value="">请选择商品</option>
            </select>
        </td>
        <td><input type="number" class="form-control" onchange="updateRowAmount(this)"></td>
        <td><input type="number" class="form-control" onchange="updateRowAmount(this)"></td>
        <td><input type="number" class="form-control" readonly></td>
        <td><input type="text" class="form-control"></td>
        <td><button type="button" class="button secondary" onclick="removeOrderDetailRow(this)">删除</button></td>
    `;
    tbody.appendChild(newRow);
}

// 删除订单明细行
function removeOrderDetailRow(button) {
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

// 加载订单明细
function loadOrderDetails(orderId) {
    if (!orderId) return;
    
    // TODO: 这里应该从后端加载订单明细数据
    // 这里只是模拟数据
    const details = [
        {
            product: '商品A',
            orderQty: 100,
            receivedQty: 0,
            maxQty: 100
        },
        {
            product: '商品B',
            orderQty: 50,
            receivedQty: 20,
            maxQty: 30
        }
    ];

    const tbody = document.querySelector('.detail-table tbody');
    tbody.innerHTML = details.map(detail => `
        <tr>
            <td>${detail.product}</td>
            <td>${detail.orderQty}</td>
            <td>${detail.receivedQty}</td>
            <td><input type="number" class="form-control" max="${detail.maxQty}"></td>
            <td><input type="text" class="form-control"></td>
        </tr>
    `).join('');
}

// 加载通知收货单明细
function loadReceiveDetails(receiveId) {
    if (!receiveId) return;
    
    // TODO: 这里应该从后端加载通知收货单明细数据
    // 这里只是模拟数据
    const details = [
        {
            product: '商品A',
            notifyQty: 100,
            price: 100,
            maxQty: 100
        },
        {
            product: '商品B',
            notifyQty: 50,
            price: 200,
            maxQty: 50
        }
    ];

    const tbody = document.querySelector('.detail-table tbody');
    tbody.innerHTML = details.map(detail => `
        <tr>
            <td>${detail.product}</td>
            <td>${detail.notifyQty}</td>
            <td><input type="number" class="form-control" max="${detail.maxQty}" onchange="updateAmount(this)"></td>
            <td><input type="number" class="form-control" value="${detail.price}" onchange="updateAmount(this)"></td>
            <td><input type="number" class="form-control" readonly></td>
            <td><input type="text" class="form-control"></td>
            <td>
                <select class="form-control">
                    <option value="">请选择库位</option>
                    <option value="A-01-01">A-01-01</option>
                    <option value="A-01-02">A-01-02</option>
                </select>
            </td>
            <td><input type="text" class="form-control"></td>
        </tr>
    `).join('');
}

// 更新入库金额
function updateAmount(element) {
    const row = element.closest('tr');
    const quantity = parseFloat(row.querySelector('input[type="number"]:nth-of-type(1)').value) || 0;
    const price = parseFloat(row.querySelector('input[type="number"]:nth-of-type(2)').value) || 0;
    const amount = quantity * price;
    row.querySelector('input[readonly]').value = amount.toFixed(2);
    updateTotalInboundAmount();
}

// 更新入库总金额
function updateTotalInboundAmount() {
    const amounts = Array.from(document.querySelectorAll('.detail-table tbody input[readonly]'))
        .map(input => parseFloat(input.value) || 0);
    const total = amounts.reduce((sum, amount) => sum + amount, 0);
    document.querySelector('.detail-table tfoot td:nth-child(2)').textContent = `¥${total.toFixed(2)}`;
}

// 加载入库单明细
function loadInboundDetails(inboundId) {
    if (!inboundId) return;
    
    // TODO: 这里应该从后端加载入库单明细数据
    // 这里只是模拟数据
    const details = [
        {
            product: '商品A',
            inboundQty: 100,
            returnedQty: 0,
            maxQty: 100,
            batchNo: 'BATCH001',
            location: 'A-01-01'
        },
        {
            product: '商品B',
            inboundQty: 50,
            returnedQty: 10,
            maxQty: 40,
            batchNo: 'BATCH002',
            location: 'A-01-02'
        }
    ];

    const tbody = document.querySelector('.detail-table tbody');
    tbody.innerHTML = details.map(detail => `
        <tr>
            <td>${detail.product}</td>
            <td>${detail.inboundQty}</td>
            <td>${detail.returnedQty}</td>
            <td><input type="number" class="form-control" max="${detail.maxQty}"></td>
            <td>${detail.batchNo}</td>
            <td>${detail.location}</td>
            <td><input type="text" class="form-control"></td>
        </tr>
    `).join('');
}

// 加载通知退货单明细
function loadReturnNotifyDetails(notifyId) {
    if (!notifyId) return;
    
    // TODO: 这里应该从后端加载通知退货单明细数据
    // 这里只是模拟数据
    const details = [
        {
            product: '商品A',
            notifyQty: 10,
            price: 100,
            maxQty: 10,
            batchNo: 'BATCH001',
            location: 'A-01-01'
        },
        {
            product: '商品B',
            notifyQty: 5,
            price: 200,
            maxQty: 5,
            batchNo: 'BATCH002',
            location: 'A-01-02'
        }
    ];

    const tbody = document.querySelector('.detail-table tbody');
    tbody.innerHTML = details.map(detail => `
        <tr>
            <td>${detail.product}</td>
            <td>${detail.notifyQty}</td>
            <td><input type="number" class="form-control" max="${detail.maxQty}" onchange="updateReturnAmount(this)"></td>
            <td><input type="number" class="form-control" value="${detail.price}" onchange="updateReturnAmount(this)"></td>
            <td><input type="number" class="form-control" readonly></td>
            <td>${detail.batchNo}</td>
            <td>${detail.location}</td>
            <td><input type="text" class="form-control"></td>
        </tr>
    `).join('');
}

// 更新退货金额
function updateReturnAmount(element) {
    const row = element.closest('tr');
    const quantity = parseFloat(row.querySelector('input[type="number"]:nth-of-type(1)').value) || 0;
    const price = parseFloat(row.querySelector('input[type="number"]:nth-of-type(2)').value) || 0;
    const amount = quantity * price;
    row.querySelector('input[readonly]').value = amount.toFixed(2);
    updateTotalReturnAmount();
}

// 更新退货总金额
function updateTotalReturnAmount() {
    const amounts = Array.from(document.querySelectorAll('.detail-table tbody input[readonly]'))
        .map(input => parseFloat(input.value) || 0);
    const total = amounts.reduce((sum, amount) => sum + amount, 0);
    document.querySelector('.detail-table tfoot td:nth-child(2)').textContent = `¥${total.toFixed(2)}`;
}

// 切换标签页
function switchTab(tabId) {
    // 移除所有标签页的active类
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // 添加active类到选中的标签页
    document.querySelector(`.tab-btn[onclick*="${tabId}"]`).classList.add('active');
    document.getElementById(`${tabId}-tab`).classList.add('active');
}

// 生成对账单
function generateReconciliation() {
    const supplier = document.querySelector('.search-bar select').value;
    const startDate = document.querySelector('.date-range input:first-child').value;
    const endDate = document.querySelector('.date-range input:last-child').value;

    if (!supplier) {
        alert('请选择供应商');
        return;
    }
    if (!startDate || !endDate) {
        alert('请选择日期范围');
        return;
    }

    // TODO: 调用后端接口生成对账单
    alert('对账单生成成功');
}