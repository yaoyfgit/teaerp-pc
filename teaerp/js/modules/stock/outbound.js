// 出库管理模块
document.addEventListener('DOMContentLoaded', function() {
    initOutbound();
});

// 初始化出库管理
function initOutbound() {
    // 加载待办列表
    loadTodoList();
    // 加载出库单列表
    loadOutboundList();
    // 加载仓库选项
    loadWarehouseOptions();
}

// 显示新建出库单弹窗
function createOutbound() {
    const modal = document.getElementById('outboundModal');
    if (!modal) {
        console.error('未找到outboundModal元素');
        return;
    }
    modal.style.display = 'flex';
    
    // 重置表单
    const form = modal.querySelector('form');
    if (form) form.reset();
    
    // 清空明细表格
    const tbody = modal.querySelector('.detail-table tbody');
    if (tbody) {
        tbody.innerHTML = `
            <tr class="scan-row">
                <td colspan="9">
                    <div class="product-select">
                        <input type="text" class="form-control scan-input" 
                               placeholder="扫描商品条码或输入商品编码" 
                               onchange="handleProductScan(this)">
                        <button type="button" class="button-icon" onclick="showProductSelector(this)" title="选择商品">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;

        // 添加表头
        const thead = modal.querySelector('.detail-table thead');
        if (thead) {
            thead.innerHTML = `
                <tr>
                    <th>商品编码</th>
                    <th>商品名称</th>
                    <th>规格型号</th>
                    <th>单位</th>
                    <th>仓库</th>
                    <th>批次号</th>
                    <th>库存数量</th>
                    <th>出库数量</th>
                    <th>操作</th>
                </tr>
            `;
        }
    }

    // 初始化日期为当前日期
    const dateInput = modal.querySelector('[name="outboundDate"]');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }

    // 初始化经办人为当前用户
    const operatorInput = modal.querySelector('[name="operator"]');
    if (operatorInput) {
        operatorInput.value = getCurrentUser();
    }
}

// 获取当前用户
function getCurrentUser() {
    // TODO: 从登录信息获取当前用户
    return '张三';
}

// 查看出库单详情
function viewOutboundDetail(id) {
    // 模拟API调用获取详情
    const detail = {
        id: id,
        outboundNo: 'CK202403200001',
        outboundType: 'sales',
        outboundDate: '2024-03-20',
        operator: '张三',
        status: 'pending',
        details: [
            {
                productCode: 'P001',
                productName: '大红袍',
                specification: '特级',
                unit: '盒',
                warehouse: '主仓库',
                batchNo: 'B20240320001',
                stockQty: 100,
                outboundQty: 10
            }
        ]
    };
    
    showOutboundDetail(detail);
}

// 显示出库单详情
function showOutboundDetail(detail) {
    const modal = document.getElementById('outboundDetailModal');
    if (!modal) {
        console.error('未找到outboundDetailModal元素');
        return;
    }
    
    // 填充基本信息
    modal.querySelector('[name="outboundNo"]').value = detail.outboundNo;
    modal.querySelector('[name="outboundType"]').value = detail.outboundType;
    modal.querySelector('[name="outboundDate"]').value = detail.outboundDate;
    modal.querySelector('[name="operator"]').value = detail.operator;
    
    // 填充明细表格
    const tbody = modal.querySelector('.detail-table tbody');
    if (tbody) {
        tbody.innerHTML = detail.details.map(item => `
            <tr>
                <td>${item.productCode}</td>
                <td>${item.productName}</td>
                <td>${item.specification}</td>
                <td>${item.unit}</td>
                <td>${item.warehouse}</td>
                <td>${item.batchNo}</td>
                <td>${item.stockQty}</td>
                <td>${item.outboundQty}</td>
                <td></td>
            </tr>
        `).join('');
    }
    
    modal.style.display = 'flex';
}

// 编辑出库单
function editOutbound(id) {
    // 模拟API调用获取数据
    const data = {
        id: id,
        outboundNo: 'CK202403200001',
        outboundType: 'sales',
        outboundDate: '2024-03-20',
        operator: '张三',
        details: [
            {
                productCode: 'P001',
                productName: '大红袍',
                specification: '特级',
                unit: '盒',
                warehouse: '主仓库',
                batchNo: 'B20240320001',
                stockQty: 100,
                outboundQty: 10
            }
        ]
    };
    
    // 显示编辑弹窗
    const modal = document.getElementById('outboundModal');
    if (!modal) {
        console.error('未找到outboundModal元素');
        return;
    }
    
    // 填充表单数据
    modal.querySelector('[name="outboundType"]').value = data.outboundType;
    modal.querySelector('[name="outboundDate"]').value = data.outboundDate;
    modal.querySelector('[name="operator"]').value = data.operator;
    
    // 填充明细表格
    const tbody = modal.querySelector('.detail-table tbody');
    if (tbody) {
        tbody.innerHTML = data.details.map(item => `
            <tr>
                <td>${item.productCode}</td>
                <td>${item.productName}</td>
                <td>${item.specification}</td>
                <td>${item.unit}</td>
                <td>
                    <select class="form-control" name="warehouseId[]" onchange="loadWarehouseBatches(this)">
                        <option value="${item.warehouse}">${item.warehouse}</option>
                    </select>
                </td>
                <td>
                    <select class="form-control" name="batchNo[]">
                        <option value="${item.batchNo}">${item.batchNo}</option>
                    </select>
                </td>
                <td>
                    <input type="number" class="form-control" name="stockQty[]" 
                           value="${item.stockQty}" readonly>
                </td>
                <td>
                    <input type="number" class="form-control" name="outboundQty[]" 
                           value="${item.outboundQty}" min="1" onchange="validateOutboundQty(this)">
                </td>
                <td>
                    <button type="button" class="button-icon" onclick="removeTableRow(this)" title="删除">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        `).join('') + `
            <tr class="scan-row">
                <td colspan="9">
                    <div class="product-select">
                        <input type="text" class="form-control scan-input" 
                               placeholder="扫描商品条码或输入商品编码" 
                               onchange="handleProductScan(this)">
                        <button type="button" class="button-icon" onclick="showProductSelector(this)" title="选择商品">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }
    
    modal.style.display = 'flex';
}

// 删除出库单
function deleteOutbound(id) {
    if (!confirm('确定要删除该出库单吗？')) return;
    
    // TODO: 调用删除API
    console.log('删除出库单:', id);
    alert('出库单删除成功');
    loadOutboundList(); // 刷新列表
}

// 加载仓库选项
function loadWarehouseOptions() {
    const warehouses = [
        { id: 1, name: '主仓库' },
        { id: 2, name: '次仓库' }
    ];
    
    const selects = document.querySelectorAll('[name="warehouseId[]"]');
    selects.forEach(select => {
        select.innerHTML = '<option value="">请选择仓库</option>' + 
            warehouses.map(w => `<option value="${w.id}">${w.name}</option>`).join('');
    });
}

// 加载仓库批次
function loadWarehouseBatches(select) {
    const warehouseId = select.value;
    if (!warehouseId) return;
    
    // 模拟API调用
    const batches = [
        { id: 1, batchNo: 'B20240320001', quantity: 100 },
        { id: 2, batchNo: 'B20240320002', quantity: 200 }
    ];
    
    const tr = select.closest('tr');
    const batchSelect = tr.querySelector('[name="batchNo[]"]');
    const stockQtyInput = tr.querySelector('[name="stockQty[]"]');
    
    batchSelect.innerHTML = '<option value="">请选择批次</option>' + 
        batches.map(b => `<option value="${b.batchNo}" data-qty="${b.quantity}">${b.batchNo}</option>`).join('');
        
    batchSelect.onchange = function() {
        const option = this.selectedOptions[0];
        if (option) {
            stockQtyInput.value = option.dataset.qty || 0;
        }
    };
}

// 验证出库数量
function validateOutboundQty(input) {
    const tr = input.closest('tr');
    const stockQty = parseFloat(tr.querySelector('[name="stockQty[]"]').value) || 0;
    const outboundQty = parseFloat(input.value) || 0;
    
    if (outboundQty > stockQty) {
        alert('出库数量不能大于库存数量');
        input.value = stockQty;
    }
}

// 移除表格行
function removeTableRow(button) {
    const tr = button.closest('tr');
    if (tr) tr.remove();
}

// 隐藏模态框
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// 获取表单数据
function getFormData() {
    const modal = document.getElementById('outboundModal');
    if (!modal) {
        console.error('未找到outboundModal元素');
        return null;
    }

    const formData = {
        outboundType: modal.querySelector('[name="outboundType"]')?.value || '',
        outboundDate: modal.querySelector('[name="outboundDate"]')?.value || '',
        operator: modal.querySelector('[name="operator"]')?.value || '',
        remarks: modal.querySelector('[name="remarks"]')?.value || '',
        details: []
    };
    
    // 获取明细数据
    const rows = modal.querySelectorAll('.detail-table tbody tr:not(.scan-row)');
    rows.forEach(row => {
        if (!row.cells || row.cells.length < 4) return;
        
        formData.details.push({
            productCode: row.cells[0]?.textContent || '',
            productName: row.cells[1]?.textContent || '',
            specification: row.cells[2]?.textContent || '',
            unit: row.cells[3]?.textContent || '',
            warehouseId: row.querySelector('[name="warehouseId[]"]')?.value || '',
            batchNo: row.querySelector('[name="batchNo[]"]')?.value || '',
            stockQty: parseFloat(row.querySelector('[name="stockQty[]"]')?.value) || 0,
            outboundQty: parseFloat(row.querySelector('[name="outboundQty[]"]')?.value) || 0
        });
    });
    
    return formData;
}

// 验证表单数据
function validateFormData(data, isDraft = false) {
    if (!data.outboundType) {
        alert('请选择出库类型');
        return false;
    }
    if (!data.outboundDate) {
        alert('请选择出库日期');
        return false;
    }
    if (!data.operator) {
        alert('请填���经办人');
        return false;
    }
    
    // 草稿可以不验证明细
    if (isDraft) return true;
    
    if (data.details.length === 0) {
        alert('请添加出库明细');
        return false;
    }
    
    // 验证明细数据
    for (const detail of data.details) {
        if (!detail.warehouseId) {
            alert('请选择仓库');
            return false;
        }
        if (!detail.batchNo) {
            alert('请选择批次');
            return false;
        }
        if (!detail.outboundQty) {
            alert('请输入出库数量');
            return false;
        }
        if (detail.outboundQty > detail.stockQty) {
            alert('出库数量不能大于库存数量');
            return false;
        }
    }
    
    return true;
}

// 显示商品选择器
function showProductSelector(button) {
    const modal = document.getElementById('productSelectorModal');
    if (!modal) {
        console.error('未找到productSelectorModal元素');
        return;
    }
    
    // 加载商品列表
    loadProductList();
    
    // 显示弹窗
    modal.style.display = 'flex';
}

// 加载商品列表
function loadProductList(keyword = '', category = '') {
    // 模拟API调用
    const products = [
        {
            code: 'P001',
            name: '大红袍',
            specification: '特级',
            unit: '盒',
            stockQty: 100,
            category: 'tea'
        },
        {
            code: 'P002',
            name: '铁观音',
            specification: '一级',
            unit: '盒',
            stockQty: 200,
            category: 'tea'
        },
        {
            code: 'P003',
            name: '茶叶礼盒',
            specification: '豪华',
            unit: '套',
            stockQty: 50,
            category: 'gift'
        }
    ];
    
    // 过滤商品
    let filteredProducts = products;
    if (keyword) {
        const loweredKeyword = keyword.toLowerCase();
        filteredProducts = products.filter(p => 
            p.code.toLowerCase().includes(loweredKeyword) || 
            p.name.toLowerCase().includes(loweredKeyword)
        );
    }
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // 渲染商品列表
    const tbody = document.querySelector('#productSelectorModal .data-table tbody');
    if (tbody) {
        tbody.innerHTML = filteredProducts.map(product => `
            <tr>
                <td>${product.code}</td>
                <td>${product.name}</td>
                <td>${product.specification}</td>
                <td>${product.unit}</td>
                <td>${product.stockQty}</td>
                <td>
                    <button class="button-link" onclick="selectProduct('${product.code}')">选择</button>
                </td>
            </tr>
        `).join('');
    }
}

// 搜索商品
function searchProducts(keyword = '') {
    const category = document.querySelector('#productSelectorModal select').value;
    loadProductList(keyword, category);
}

// 按分类筛选商品
function filterProducts(category) {
    const keyword = document.querySelector('#productSelectorModal input').value;
    loadProductList(keyword, category);
}

// 选择商品
function selectProduct(code) {
    const product = getMockProduct(code);
    if (product) {
        addProductRow(product);
        hideModal('productSelectorModal');
    } else {
        alert('未找到商品信息');
    }
}

// 处理商品扫码
function handleProductScan(input) {
    const code = input.value.trim();
    if (!code) return;
    
    // 模拟API调用获取商品信息
    const product = getMockProduct(code);
    if (product) {
        addProductRow(product);
        input.value = ''; // 清空扫码输入框
    } else {
        alert('未找到商品信息');
    }
}

// 获取模拟商品数据
function getMockProduct(code) {
    // 模拟商品数据库
    const products = {
        'P001': {
            code: 'P001',
            name: '大红袍',
            specification: '特级',
            unit: '盒'
        },
        'P002': {
            code: 'P002',
            name: '铁观音',
            specification: '一级',
            unit: '盒'
        }
    };
    return products[code];
}

// 添加商品行
function addProductRow(product) {
    const tbody = document.querySelector('.detail-table tbody');
    const scanRow = tbody.querySelector('.scan-row');
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${product.code}</td>
        <td>${product.name}</td>
        <td>${product.specification}</td>
        <td>${product.unit}</td>
        <td>
            <select class="form-control" name="warehouseId[]" onchange="loadWarehouseBatches(this)">
                <option value="">请选择仓库</option>
                ${getMockWarehouses().map(w => `
                    <option value="${w.id}">${w.name}</option>
                `).join('')}
            </select>
        </td>
        <td>
            <select class="form-control" name="batchNo[]">
                <option value="">请选择批次</option>
            </select>
        </td>
        <td>
            <input type="number" class="form-control" name="stockQty[]" readonly>
        </td>
        <td>
            <input type="number" class="form-control" name="outboundQty[]" 
                   min="1" onchange="validateOutboundQty(this)">
        </td>
        <td>
            <button type="button" class="button-icon" onclick="removeTableRow(this)" title="删除">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </td>
    `;
    
    tbody.insertBefore(newRow, scanRow);
}

// 查看待办详情
function viewTodoDetail(todoId) {
    // 模拟API调用获取待办详情
    const todo = getMockTodoDetail(todoId);
    if (!todo) {
        alert('未找到待办详情');
        return;
    }
    
    // 显示待办详情
    const detailModal = document.getElementById('todoDetailModal');
    if (!detailModal) {
        console.error('未找到todoDetailModal元素');
        return;
    }
    
    // 填充详情内容
    detailModal.querySelector('.todo-detail').innerHTML = `
        <div class="detail-section">
            <h4>基本信息</h4>
            <div class="detail-content">
                <div class="detail-row">
                    <span class="detail-label">待办编号：</span>
                    <span class="detail-value">${todo.id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">来源单号：</span>
                    <span class="detail-value">${todo.sourceNo}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">来源类型：</span>
                    <span class="detail-value">${getTodoSourceName(todo.sourceType)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">创建时间：</span>
                    <span class="detail-value">${todo.createTime}</span>
                </div>
            </div>
        </div>
        <div class="detail-section">
            <h4>出库明细</h4>
            <div class="detail-content">
                <table class="detail-table">
                    <thead>
                        <tr>
                            <th>商品编码</th>
                            <th>商品名称</th>
                            <th>规格型号</th>
                            <th>单位</th>
                            <th>待出库数量</th>
                            <th>已出库数量</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${todo.details.map(detail => `
                            <tr>
                                <td>${detail.productCode}</td>
                                <td>${detail.productName}</td>
                                <td>${detail.specification}</td>
                                <td>${detail.unit}</td>
                                <td>${detail.quantity}</td>
                                <td>${todo.outboundQty || 0}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    detailModal.style.display = 'flex';
}

// 获取模拟待办详情
function getMockTodoDetail(todoId) {
    // 模拟待办数据
    const todos = [
        {
            id: 'TD001',
            sourceNo: 'SO001',
            sourceType: 'sales',
            createTime: '2024-03-20 10:00:00',
            details: [
                {
                    productCode: 'P001',
                    productName: '大红袍',
                    specification: '特级',
                    unit: '盒',
                    quantity: 50
                }
            ]
        }
    ];
    return todos.find(todo => todo.id === todoId);
}

// 获取待办来源类型名称
function getTodoSourceName(type) {
    const types = {
        sales: '销售订单',
        purchase_return: '采购退货',
        production: '生产领料'
    };
    return types[type] || type;
}

// 保存为草稿
function saveAsDraft() {
    const formData = getFormData();
    if (!formData) {
        alert('获取表单数据失败');
        return;
    }
    if (!validateFormData(formData, true)) return;
    
    // TODO: 调用保存API
    console.log('保存草稿:', formData);
    alert('已保存为草稿');
    hideModal('outboundModal');
    loadOutboundList(); // 刷���列表
}

// 提交出库单
function submitOutbound() {
    const formData = getFormData();
    if (!formData) {
        alert('获取表单数据失败');
        return;
    }
    if (!validateFormData(formData)) return;
    
    // TODO: 调用提交API
    console.log('提交出库单:', formData);
    alert('出库单提交成功');
    hideModal('outboundModal');
    loadOutboundList(); // 刷新列表
}

// 加载出库单列表
function loadOutboundList() {
    // 模拟API调用
    const outbounds = [
        {
            id: 1,
            outboundNo: 'CK202403200001',
            outboundType: 'sales',
            outboundDate: '2024-03-20',
            operator: '张三',
            status: 'draft'
        }
    ];
    
    // 渲染列表
    const tbody = document.querySelector('.outbound-list tbody');
    if (tbody) {
        tbody.innerHTML = outbounds.map(item => `
            <tr>
                <td>${item.outboundNo}</td>
                <td>${getOutboundTypeName(item.outboundType)}</td>
                <td>${item.outboundDate}</td>
                <td>${item.operator}</td>
                <td><span class="status ${item.status}">${getStatusName(item.status)}</span></td>
                <td>
                    <button class="button-link" onclick="viewOutboundDetail(${item.id})">查看</button>
                    <button class="button-link" onclick="editOutbound(${item.id})">编辑</button>
                    <button class="button-link" onclick="deleteOutbound(${item.id})">删除</button>
                </td>
            </tr>
        `).join('');
    }
}

// 获取出库类型名称
function getOutboundTypeName(type) {
    const types = {
        sales: '销售出库',
        purchaseReturn: '采购退货',
        production: '生产领料',
        other: '其他出库'
    };
    return types[type] || type;
}

// 获取状态名称
function getStatusName(status) {
    const statuses = {
        draft: '草稿',
        pending: '待审核',
        approved: '已审核',
        completed: '已完成',
        cancelled: '已取消'
    };
    return statuses[status] || status;
}

// 获取模拟仓库数据
function getMockWarehouses() {
    return [
        { id: 1, name: '主仓库' },
        { id: 2, name: '次仓库' }
    ];
}
  