// 显示库存明细弹窗
function showStockDetail(element) {
    const row = element.closest('tr');
    const modal = document.getElementById('stockDetailModal');
    
    // 获取当前行的商品信息
    const productName = row.cells[1].textContent;
    const specification = row.cells[2].textContent;
    
    // 更新弹窗中的商品信息
    modal.querySelector('.stock-info span:nth-child(1)').textContent = productName;
    modal.querySelector('.stock-info span:nth-child(2)').textContent = specification;
    
    // TODO: 这里应该调用后端接口获取详细的库存信息
    // 现在使用静态数据演示
    
    modal.classList.add('show');
}

// 显示出入库记录弹窗
function showStockFlow(element) {
    const row = element.closest('tr');
    const modal = document.getElementById('stockFlowModal');
    
    // 获取当前行的商品信息
    const productName = row.cells[1].textContent;
    const specification = row.cells[2].textContent;
    
    // 更新弹窗中的商品信息
    modal.querySelector('.stock-info span:nth-child(1)').textContent = productName;
    modal.querySelector('.stock-info span:nth-child(2)').textContent = specification;
    
    // TODO: 这里应该调用后端接口获取出入库记录
    // 现在使用静态数据演示
    
    modal.classList.add('show');
}

// 隐藏弹窗
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// 导出库存数据
function exportStock() {
    // TODO: 实现导出功能
    alert('导出成功');
}

// 格式化数字显示
function formatNumber(number) {
    return new Intl.NumberFormat('zh-CN').format(number);
}

// 格式化金额显示
function formatAmount(amount) {
    return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
    }).format(amount);
}

// 更新库存汇总数据
function updateSummary() {
    // TODO: 这里应该调用后端接口获取最新的汇总数据
    const summaryData = {
        totalProducts: 1234,
        totalQuantity: 45678,
        totalAmount: 789012,
        warningCount: 23
    };
    
    document.querySelector('.summary-card:nth-child(1) .number').textContent = 
        formatNumber(summaryData.totalProducts);
    document.querySelector('.summary-card:nth-child(2) .number').textContent = 
        formatNumber(summaryData.totalQuantity);
    document.querySelector('.summary-card:nth-child(3) .amount').textContent = 
        formatAmount(summaryData.totalAmount);
    document.querySelector('.summary-card:nth-child(4) .number').textContent = 
        formatNumber(summaryData.warningCount);
}

// 搜索库存
function searchStock() {
    const keyword = document.querySelector('.search-bar input').value;
    const warehouse = document.querySelector('.search-bar select:nth-child(2)').value;
    const category = document.querySelector('.search-bar select:nth-child(3)').value;
    
    // TODO: 这里应该调用后端接口进行搜索
    console.log('搜索条件:', { keyword, warehouse, category });
}

// 初始化事件监听
document.addEventListener('DOMContentLoaded', function() {
    // 初始化搜索按钮事件
    document.querySelector('.search-bar .button').addEventListener('click', searchStock);
    
    // 初始化汇总数据
    updateSummary();
    
    // 监听回车键搜索
    document.querySelector('.search-bar input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchStock();
        }
    });
    
    // 监听弹窗关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => modal.classList.remove('show'));
        }
    });
    
    // 点击弹窗背景关闭
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    });
});

// 表格排序功能
function initTableSort() {
    const table = document.querySelector('.data-table table');
    const headers = table.querySelectorAll('th');
    
    headers.forEach((header, index) => {
        if (header.classList.contains('sortable')) {
            header.addEventListener('click', () => {
                const isAsc = header.classList.contains('asc');
                
                // 清除其他列的排序状态
                headers.forEach(h => h.classList.remove('asc', 'desc'));
                
                // 设置当前列的排序状态
                header.classList.toggle('asc', !isAsc);
                header.classList.toggle('desc', isAsc);
                
                // 执行排序
                sortTable(index, !isAsc);
            });
        }
    });
}

// 表格排序实现
function sortTable(column, asc) {
    const table = document.querySelector('.data-table table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // 排序行
    rows.sort((a, b) => {
        const aValue = a.cells[column].textContent;
        const bValue = b.cells[column].textContent;
        
        // 根据列的类型选择比较方式
        if (a.cells[column].classList.contains('number')) {
            return (parseFloat(aValue) - parseFloat(bValue)) * (asc ? 1 : -1);
        } else {
            return aValue.localeCompare(bValue) * (asc ? 1 : -1);
        }
    });
    
    // 重新插入排序后的行
    rows.forEach(row => tbody.appendChild(row));
}

// 显示新建调拨弹窗
function showTransferModal() {
    const modal = document.getElementById('transferModal');
    if (!modal) {
        console.error('找不到调拨弹窗');
        return;
    }
    
    // 重置表单
    const form = document.getElementById('transferForm');
    if (form) {
        form.reset();
        // 清空明细表格
        const tbody = form.querySelector('tbody');
        if (tbody) {
            tbody.innerHTML = '';
        }
    }
    
    // 生成调拨单号
    const transferNo = generateTransferNo();
    const transferNoInput = modal.querySelector('input[name="transferNo"]');
    if (transferNoInput) {
        transferNoInput.value = transferNo;
    }
    
    // 设置当前日期
    const dateInput = modal.querySelector('input[name="transferDate"]');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    // 加载仓库列表
    loadWarehouseList();
    
    // 显示弹窗
    modal.classList.add('show');
}

// 生成调拨单号
function generateTransferNo() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ST${year}${month}${day}${random}`;
}

// 加载仓库列表
async function loadWarehouseList() {
    try {
        // 模拟仓库数据
        const warehouses = [
            { id: 1, name: '主仓库' },
            { id: 2, name: '次仓库' },
            { id: 3, name: '临时仓库' }
        ];
        
        const fromSelect = document.querySelector('select[name="fromWarehouse"]');
        const toSelect = document.querySelector('select[name="toWarehouse"]');
        
        if (fromSelect && toSelect) {
            const options = warehouses.map(warehouse => 
                `<option value="${warehouse.id}">${warehouse.name}</option>`
            ).join('');
            
            fromSelect.innerHTML = '<option value="">请选择仓库</option>' + options;
            toSelect.innerHTML = '<option value="">请选择仓库</option>' + options;
        }
    } catch (error) {
        console.error('加载仓库列表失败:', error);
        showToast('加载仓库列表失败', 'error');
    }
}

// 添加调拨明细行
function addTransferItem() {
    const tbody = document.querySelector('#transferForm tbody');
    if (!tbody) return;
    
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>
            <div class="input-group">
                <input type="text" class="form-control" name="productCode[]" readonly>
                <button type="button" class="button" onclick="selectProduct(this)">选择</button>
            </div>
        </td>
        <td><input type="text" class="form-control" name="productName[]" readonly></td>
        <td><input type="text" class="form-control" name="specification[]" readonly></td>
        <td><input type="text" class="form-control" name="unit[]" readonly></td>
        <td><input type="number" class="form-control" name="quantity[]" min="1" onchange="validateQuantity(this)"></td>
        <td><input type="text" class="form-control" name="availableQty[]" readonly></td>
        <td>
            <select class="form-control" name="batchNo[]">
                <option value="">请选择批次</option>
            </select>
        </td>
        <td><input type="text" class="form-control" name="remark[]"></td>
        <td>
            <a href="#" class="action-link" onclick="deleteTransferItem(this)">删除</a>
        </td>
    `;
    tbody.appendChild(tr);
}

// 选择商品
async function selectProduct(button) {
    const tr = button.closest('tr');
    // TODO: 这里应该弹出商品选择弹窗
    // 临时模拟选择商品
    const product = {
        code: 'P001',
        name: '铁观音',
        specification: '特级',
        unit: '斤',
        availableQty: 100,
        batches: [
            { no: 'B20240301', qty: 50 },
            { no: 'B20240302', qty: 50 }
        ]
    };
    
    fillProductInfo(tr, product);
}

// 填充商品信息
function fillProductInfo(tr, product) {
    tr.querySelector('[name^="productCode"]').value = product.code;
    tr.querySelector('[name^="productName"]').value = product.name;
    tr.querySelector('[name^="specification"]').value = product.specification;
    tr.querySelector('[name^="unit"]').value = product.unit;
    tr.querySelector('[name^="availableQty"]').value = product.availableQty;
    
    // 填充批次选项
    const batchSelect = tr.querySelector('[name^="batchNo"]');
    batchSelect.innerHTML = '<option value="">请选择批次</option>' + 
        product.batches.map(batch => 
            `<option value="${batch.no}">${batch.no}(${batch.qty})</option>`
        ).join('');
}

// 验证调拨数量
function validateQuantity(input) {
    const tr = input.closest('tr');
    const availableQty = parseFloat(tr.querySelector('[name^="availableQty"]').value) || 0;
    const transferQty = parseFloat(input.value) || 0;
    
    if (transferQty > availableQty) {
        showToast('调拨数量不能大于可用库存', 'error');
        input.value = availableQty;
    }
}

// 删除调拨明细行
function deleteTransferItem(link) {
    if (confirm('确认删除该明细行吗？')) {
        link.closest('tr').remove();
    }
}

// 保存调拨单
async function saveTransfer() {
    const form = document.getElementById('transferForm');
    if (!form) return;
    
    // 验证表单
    if (!validateTransferForm()) {
        return;
    }
    
    try {
        // TODO: 这里应该调用后端接口保存调拨单
        // 模拟保存成功
        showToast('保存成功');
        hideModal('transferModal');
        // 刷新列表
        location.reload();
    } catch (error) {
        console.error('保存调拨单失败:', error);
        showToast('保存失败，请重试', 'error');
    }
}

// 验证调拨表单
function validateTransferForm() {
    const form = document.getElementById('transferForm');
    if (!form) return false;
    
    const fromWarehouse = form.querySelector('[name="fromWarehouse"]').value;
    const toWarehouse = form.querySelector('[name="toWarehouse"]').value;
    
    if (!fromWarehouse) {
        showToast('请选择调出仓库', 'error');
        return false;
    }
    if (!toWarehouse) {
        showToast('请选择调入仓库', 'error');
        return false;
    }
    if (fromWarehouse === toWarehouse) {
        showToast('调出仓库和调入仓库不能相同', 'error');
        return false;
    }
    
    const tbody = form.querySelector('tbody');
    if (!tbody.children.length) {
        showToast('请添加调拨明细', 'error');
        return false;
    }
    
    return true;
}

// 初始化页面事件
document.addEventListener('DOMContentLoaded', function() {
    // 绑定新建按钮事件
    const createBtn = document.querySelector('.action-bar .button');
    if (createBtn) {
        createBtn.addEventListener('click', showTransferModal);
    }
    
    // 绑定弹窗关闭按钮事件
    const closeBtn = document.querySelector('.modal .close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => hideModal('transferModal'));
    }
    
    // 点击弹窗背景关闭弹窗
    const modal = document.getElementById('transferModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideModal('transferModal');
            }
        });
    }
});

// 开始盘点
function startCheck(element) {
    const tr = element.closest('tr');
    const checkNo = tr.cells[0].textContent;
    
    try {
        // 更新状态显示
        const statusCell = tr.cells[5];
        statusCell.innerHTML = '<span class="status processing">盘点中</span>';
        
        // 更新操作按钮
        const actionCell = tr.cells[6];
        actionCell.innerHTML = `
            <a href="#" class="action-link" onclick="showCheckDetail(this)">查看</a>
            <a href="#" class="action-link" onclick="editCheck(this)">编辑</a>
            <a href="#" class="action-link" onclick="submitCheck(this)">提交</a>
        `;
        
        showToast('已开始盘点');
    } catch (error) {
        console.error('开始盘点失败:', error);
        showToast('开始盘点失败，请重试', 'error');
    }
}

// 显示盘点明细
function showCheckDetail(element) {
    const tr = element.closest('tr');
    const checkNo = tr.cells[0].textContent;
    const modal = document.getElementById('checkDetailModal');
    
    if (!modal) {
        console.error('找不到盘点明细弹窗');
        return;
    }
    
    // 设置盘点单号
    const title = modal.querySelector('.modal-header h3');
    if (title) {
        title.textContent = `盘点明细 - ${checkNo}`;
    }
    
    // TODO: 这里应该调用后端接口获取盘点明细数据
    // 现在使用静态数据演示
    const detailData = [
        {
            productCode: 'P001',
            productName: '铁观音',
            specification: '特级',
            unit: '斤',
            systemQty: 100,
            actualQty: 98,
            difference: -2,
            remark: '货架A1'
        }
    ];
    
    // 填充明细表格
    const tbody = modal.querySelector('tbody');
    if (tbody) {
        tbody.innerHTML = detailData.map(item => `
            <tr>
                <td>${item.productCode}</td>
                <td>${item.productName}</td>
                <td>${item.specification}</td>
                <td>${item.unit}</td>
                <td>${item.systemQty}</td>
                <td>
                    <input type="number" class="form-control" value="${item.actualQty}" 
                           onchange="updateDifference(this)">
                </td>
                <td>${item.difference}</td>
                <td>
                    <input type="text" class="form-control" value="${item.remark}">
                </td>
            </tr>
        `).join('');
    }
    
    // 显示弹窗
    modal.classList.add('show');
}

// 更新盘点差异
function updateDifference(input) {
    const tr = input.closest('tr');
    const systemQty = parseFloat(tr.cells[4].textContent);
    const actualQty = parseFloat(input.value) || 0;
    const difference = actualQty - systemQty;
    
    tr.cells[6].textContent = difference;
    
    // 根据差异值设置样式
    if (difference < 0) {
        tr.cells[6].classList.add('text-danger');
    } else if (difference > 0) {
        tr.cells[6].classList.add('text-warning');
    } else {
        tr.cells[6].classList.remove('text-danger', 'text-warning');
    }
}

// 提交盘点
function submitCheck(element) {
    if (!confirm('确认提交盘点结果吗？提交后将无法修改。')) {
        return;
    }
    
    const tr = element.closest('tr');
    try {
        // TODO: 这里应该调用后端接口提交盘点结果
        
        // 更新状态显示
        const statusCell = tr.cells[5];
        statusCell.innerHTML = '<span class="status completed">已完成</span>';
        
        // 更新操作按钮
        const actionCell = tr.cells[6];
        actionCell.innerHTML = `
            <a href="#" class="action-link" onclick="showCheckDetail(this)">查看</a>
        `;
        
        showToast('提交成功');
    } catch (error) {
        console.error('提交盘点失败:', error);
        showToast('提交失败，请重试', 'error');
    }
} 