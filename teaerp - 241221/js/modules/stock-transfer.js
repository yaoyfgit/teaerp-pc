// 显示新建调拨弹窗
function showCreateModal() {
    const modal = document.getElementById('createModal');
    modal.classList.add('show');
}

// 更新调出仓库的库位选项
function updateSourceLocation(warehouseId) {
    if (!warehouseId) return;
    
    // TODO: 这里应该调用后端接口获取仓库的库位信息
    const locations = {
        '1': [
            { id: 'A-01-01', name: 'A-01-01' },
            { id: 'A-01-02', name: 'A-01-02' }
        ],
        '2': [
            { id: 'B-01-01', name: 'B-01-01' },
            { id: 'B-01-02', name: 'B-01-02' }
        ]
    };
    
    // 更新所有明细行的调出库位选项
    const rows = document.querySelectorAll('.detail-table tbody tr');
    rows.forEach(row => {
        const locationSelect = row.querySelector('td:nth-child(3) select');
        locationSelect.innerHTML = `
            <option value="">请选择库位</option>
            ${locations[warehouseId].map(loc => 
                `<option value="${loc.id}">${loc.name}</option>`
            ).join('')}
        `;
    });
}

// 更新商品信息
function updateProductInfo(select) {
    const row = select.closest('tr');
    const productId = select.value;
    if (!productId) return;
    
    // TODO: 这里应该调用后端接口获取商品信息
    const productInfo = {
        '1': { spec: '特级', stock: 100, batch: '20240301' },
        '2': { spec: '优级', stock: 200, batch: '20240302' }
    };
    
    const info = productInfo[productId];
    row.cells[1].textContent = info.spec;
    row.cells[4].textContent = info.stock;
    row.cells[6].textContent = info.batch;
    
    // 设置调拨数量的最大值
    row.querySelector('input[type="number"]').max = info.stock;
}

// 添加调拨明细行
function addDetailRow() {
    const tbody = document.querySelector('.detail-table tbody');
    const sourceWarehouse = document.querySelector('select[onchange="updateSourceLocation(this.value)"]').value;
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>
            <select class="form-control" onchange="updateProductInfo(this)">
                <option value="">请选择商品</option>
                <option value="1">商品A</option>
                <option value="2">商品B</option>
            </select>
        </td>
        <td></td>
        <td>
            <select class="form-control">
                <option value="">请选择库位</option>
                ${sourceWarehouse ? getLocationOptions(sourceWarehouse) : ''}
            </select>
        </td>
        <td>
            <select class="form-control">
                <option value="">请选择库位</option>
                <option value="B-01-01">B-01-01</option>
                <option value="B-01-02">B-01-02</option>
            </select>
        </td>
        <td>0</td>
        <td><input type="number" class="form-control" max="0"></td>
        <td></td>
        <td>
            <button type="button" class="button secondary" onclick="removeDetailRow(this)">删除</button>
        </td>
    `;
    tbody.appendChild(newRow);
}

// 获取库位选项HTML
function getLocationOptions(warehouseId) {
    const locations = {
        '1': [
            { id: 'A-01-01', name: 'A-01-01' },
            { id: 'A-01-02', name: 'A-01-02' }
        ],
        '2': [
            { id: 'B-01-01', name: 'B-01-01' },
            { id: 'B-01-02', name: 'B-01-02' }
        ]
    };
    
    return locations[warehouseId].map(loc => 
        `<option value="${loc.id}">${loc.name}</option>`
    ).join('');
}

// 删除调拨明细行
function removeDetailRow(button) {
    button.closest('tr').remove();
}

// 保存草稿
function saveDraft() {
    // 收集表单��据
    const formData = collectFormData();
    
    // TODO: 调用后端接口保存草稿
    console.log('保存草稿:', formData);
    alert('保存草稿成功');
    hideModal('createModal');
}

// 提交审核
function submitTransfer() {
    // 收集表单数据
    const formData = collectFormData();
    
    // 表单验证
    if (!validateForm(formData)) return;
    
    // TODO: 调用后端接口提交审核
    console.log('提交审核:', formData);
    alert('提交审核成功');
    hideModal('createModal');
}

// 收集表单数据
function collectFormData() {
    const modal = document.getElementById('createModal');
    const form = modal.querySelector('form');
    
    const formData = {
        sourceWarehouse: form.querySelector('select[onchange="updateSourceLocation(this.value)"]').value,
        targetWarehouse: form.querySelector('.form-row .form-group:nth-child(2) select').value,
        reason: form.querySelector('textarea').value,
        details: []
    };
    
    // 收集明细数据
    const rows = form.querySelectorAll('.detail-table tbody tr');
    rows.forEach(row => {
        formData.details.push({
            productId: row.querySelector('select').value,
            sourceLocation: row.querySelector('td:nth-child(3) select').value,
            targetLocation: row.querySelector('td:nth-child(4) select').value,
            quantity: row.querySelector('input[type="number"]').value,
            batch: row.cells[6].textContent
        });
    });
    
    return formData;
}

// 表单验证
function validateForm(formData) {
    if (!formData.sourceWarehouse) {
        alert('请选择调出仓库');
        return false;
    }
    if (!formData.targetWarehouse) {
        alert('请选择调入仓库');
        return false;
    }
    if (formData.sourceWarehouse === formData.targetWarehouse) {
        alert('调出仓库和调入仓库不能相同');
        return false;
    }
    if (!formData.details.length) {
        alert('请添加调拨明细');
        return false;
    }
    
    for (const detail of formData.details) {
        if (!detail.productId) {
            alert('请选择商品');
            return false;
        }
        if (!detail.sourceLocation) {
            alert('请选择调出库位');
            return false;
        }
        if (!detail.targetLocation) {
            alert('请选择调入库位');
            return false;
        }
        if (!detail.quantity || detail.quantity <= 0) {
            alert('请输入有效的调拨数量');
            return false;
        }
    }
    
    return true;
}

// 查看调拨单详情
function showDetail(element) {
    const row = element.closest('tr');
    const transferId = row.cells[0].textContent;
    
    // TODO: 这里应该调用后端接口获取调拨单详情
    console.log('查看调拨单:', transferId);
}

// 编辑调拨单
function editTransfer(element) {
    const row = element.closest('tr');
    const transferId = row.cells[0].textContent;
    
    // TODO: 这里应该调用后端接口获取调拨单数据并填充表单
    console.log('编辑调拨单:', transferId);
}

// 审核调拨单
function approveTransfer(element) {
    const row = element.closest('tr');
    const transferId = row.cells[0].textContent;
    
    if (confirm('确认审核该调拨单吗？')) {
        // TODO: 这里应该调用后端接口进行审核
        console.log('审核调拨单:', transferId);
        alert('审核成功');
    }
}

// 删除调拨单
function deleteTransfer(element) {
    const row = element.closest('tr');
    const transferId = row.cells[0].textContent;
    
    if (confirm('确认删除该调拨单吗？')) {
        // TODO: 这里应该调用后端接口进行删除
        console.log('删除调拨单:', transferId);
        row.remove();
        alert('删除成功');
    }
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化搜索功能
    document.querySelector('.search-bar .button').addEventListener('click', function() {
        const keyword = document.querySelector('.search-bar input').value;
        const status = document.querySelector('.search-bar select').value;
        
        // TODO: 这里应该调用后端接口进行搜索
        console.log('搜索条件:', { keyword, status });
    });
}); 