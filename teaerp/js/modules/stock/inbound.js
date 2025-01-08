// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initInbound();
});

// 初始化入库管理
function initInbound() {
    // 加载待办列表
    loadTodoList();
    // 加载入库单列表
    loadInboundList();
    // 加载仓库选项
    loadWarehouseOptions();
}

// 加载待办列表
function loadTodoList() {
    console.log('Loading todo list...');
    // 模拟待办数据
    const todos = [
        {
            id: 'TD001',
            sourceNo: 'PO001',
            sourceType: 'purchase',
            supplier: '供应商A',
            expectedDate: '2024-03-20',
            pendingQty: 100,
            inboundQty: 0,
            status: 'pending',
            createTime: '2024-03-19 10:00:00'
        },
        {
            id: 'TD002',
            sourceNo: 'SR001',
            sourceType: 'salesReturn',
            supplier: '客户B',
            expectedDate: '2024-03-21',
            pendingQty: 50,
            inboundQty: 20,
            status: 'processing',
            createTime: '2024-03-19 14:30:00'
        },
        {
            id: 'TD003',
            sourceNo: 'PR001',
            sourceType: 'production',
            supplier: '生产部',
            expectedDate: '2024-03-22',
            pendingQty: 200,
            inboundQty: 0,
            status: 'pending',
            createTime: '2024-03-19 16:00:00'
        }
    ];
    
    const tbody = document.querySelector('.section:first-child .data-table tbody');
    tbody.innerHTML = todos.map(todo => `
        <tr>
            <td>${todo.id}</td>
            <td>${todo.sourceNo}</td>
            <td>${getSourceTypeName(todo.sourceType)}</td>
            <td>${todo.supplier}</td>
            <td>${todo.expectedDate}</td>
            <td>${todo.pendingQty}</td>
            <td>${todo.inboundQty}</td>
            <td><span class="status ${todo.status}">${getTodoStatusName(todo.status)}</span></td>
            <td>${todo.createTime}</td>
            <td>
                <button class="button-link" onclick="createInbound('${todo.id}')">生成入库单</button>
                <button class="button-link" onclick="viewTodoDetail('${todo.id}')">查看</button>
            </td>
        </tr>
    `).join('');
}

// 加载入库单列表
function loadInboundList() {
    console.log('Loading inbound list...');
    // 模拟入库单数据
    const inbounds = [
        {
            id: 'IN001',
            todoId: 'TD001',
            sourceNo: 'PO001',
            type: 'purchase',
            supplier: '供应商A',
            warehouse: '主仓库',
            inboundDate: '2024-03-20',
            operator: '张三',
            reviewer: '李四',
            status: 'completed'
        },
        {
            id: 'IN002',
            todoId: 'TD002',
            sourceNo: 'SR001',
            type: 'salesReturn',
            supplier: '客户B',
            warehouse: '次仓库',
            inboundDate: '2024-03-21',
            operator: '王五',
            reviewer: null,
            status: 'pending'
        },
        {
            id: 'IN003',
            todoId: 'TD003',
            sourceNo: 'PR001',
            type: 'production',
            supplier: '生产部',
            warehouse: '主仓库',
            inboundDate: '2024-03-22',
            operator: '赵六',
            reviewer: null,
            status: 'draft'
        }
    ];
    
    const tbody = document.querySelector('.section:last-child .data-table tbody');
    tbody.innerHTML = inbounds.map(inbound => `
        <tr>
            <td>${inbound.id}</td>
            <td>${inbound.todoId}</td>
            <td>${inbound.sourceNo}</td>
            <td>${getInboundTypeName(inbound.type)}</td>
            <td>${inbound.supplier}</td>
            <td>${inbound.warehouse}</td>
            <td>${inbound.inboundDate}</td>
            <td>${inbound.operator}</td>
            <td>${inbound.reviewer || '-'}</td>
            <td><span class="status ${inbound.status}">${getInboundStatusName(inbound.status)}</span></td>
            <td>
                ${getInboundActions(inbound)}
            </td>
        </tr>
    `).join('');
}

// 获取入库单操作按钮
function getInboundActions(inbound) {
    const actions = [];
    
    switch(inbound.status) {
        case 'draft':
            actions.push(`<button class="button-link" onclick="editInbound('${inbound.id}')">编辑</button>`);
            actions.push(`<button class="button-link" onclick="submitForReview('${inbound.id}')">提交审核</button>`);
            actions.push(`<button class="button-link" onclick="deleteInbound('${inbound.id}')">删除</button>`);
            break;
        case 'pending':
            actions.push(`<button class="button-link" onclick="reviewInbound('${inbound.id}')">审核</button>`);
            break;
        case 'completed':
            actions.push(`<button class="button-link" onclick="viewInboundDetail('${inbound.id}')">查看</button>`);
            actions.push(`<button class="button-link" onclick="printInbound('${inbound.id}')">打印</button>`);
            break;
    }
    
    return actions.join('');
}

// 获取来源类型名称
function getSourceTypeName(type) {
    const types = {
        purchase: '采购通知收货单',
        salesReturn: '销售退货通知单',
        production: '生产入库单',
        productionReturn: '生产退料单',
        other: '其他入库单'
    };
    return types[type] || type;
}

// 获取入库类型名称
function getInboundTypeName(type) {
    const types = {
        purchase: '采购入库',
        salesReturn: '销售退货',
        production: '生产入库',
        other: '其他入库'
    };
    return types[type] || type;
}

// 获取待办状态名称
function getTodoStatusName(status) {
    const statuses = {
        pending: '待处理',
        processing: '处理中',
        completed: '已完成',
        cancelled: '已取消'
    };
    return statuses[status] || status;
}

// 获取入库单状态名称
function getInboundStatusName(status) {
    const statuses = {
        draft: '草稿',
        pending: '待审核',
        reviewing: '审核中',
        completed: '已完成',
        cancelled: '已取消'
    };
    return statuses[status] || status;
}

// 创建入库单
function createInbound(todoId) {
    console.log('创建入库单:', todoId);
    
    // 显示入库单弹窗
    const modal = document.getElementById('inboundModal');
    modal.style.display = 'flex';
    modal.querySelector('h3').textContent = '新建入库单';
    
    // 设置默认值
    const formElement = modal.querySelector('form') || modal.querySelector('.form');
    if (formElement) {
        if (formElement.tagName === 'FORM') {
            formElement.reset();
        } else {
            formElement.querySelectorAll('input, select, textarea').forEach(element => {
                if (element.type === 'checkbox' || element.type === 'radio') {
                    element.checked = false;
                } else {
                    element.value = '';
                }
            });
        }
    }
    
    // 加载待办单详情
    const todo = getTodoById(todoId);
    if (todo) {
        // 设置入库类型
        const typeSelect = modal.querySelector('[name="inboundType"]');
        if (typeSelect) {
            typeSelect.value = todo.sourceType;
        }
        
        // 设置默认日期为今天
        const dateInput = modal.querySelector('[name="inboundDate"]');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
        
        // 设置经办人
        const operatorInput = modal.querySelector('[name="operator"]');
        if (operatorInput) {
            operatorInput.value = '当前用户';  // TODO: 从登录信息获取
        }
        
        // 清空明细表格，只保留添加行
        const tbody = modal.querySelector('.data-table tbody');
        if (tbody) {
            const addRow = tbody.querySelector('.add-row');
            tbody.innerHTML = '';
            if (addRow) {
                tbody.appendChild(addRow);
            }
            
            // 如果有待办明细，添加到表格中
            if (todo.details && todo.details.length > 0) {
                todo.details.forEach(detail => {
                    const tr = document.createElement('tr');
                    const batchNo = generateBatchNo();
                    const today = new Date().toISOString().split('T')[0];
                    
                    tr.innerHTML = `
                        <td>${detail.productCode}</td>
                        <td>${detail.productName}</td>
                        <td>${detail.specification}</td>
                        <td>${detail.unit}</td>
                        <td>
                            <input type="text" class="form-control" name="batchNo[]" 
                                   value="${batchNo}" readonly>
                        </td>
                        <td>
                            <input type="date" class="form-control" name="productionDate[]"
                                   value="${today}">
                        </td>
                        <td>
                            <input type="number" class="form-control" name="validDays[]" 
                                   placeholder="保质期天数">
                        </td>
                        <td>
                            <input type="number" class="form-control" name="inboundQty[]" 
                                   value="${detail.quantity || ''}" min="0">
                        </td>
                        <td>
                            <button type="button" class="button-icon" onclick="removeTableRow(this)" title="删除">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </td>
                    `;
                    tbody.insertBefore(tr, addRow);
                });
            }
        }
    }
}

// 隐藏弹窗
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        // 清空表单数据
        const formElement = modal.querySelector('form') || modal.querySelector('.form');
        if (formElement) {
            if (formElement.tagName === 'FORM') {
                formElement.reset();
            } else {
                formElement.querySelectorAll('input, select, textarea').forEach(element => {
                    if (element.type === 'checkbox' || element.type === 'radio') {
                        element.checked = false;
                    } else {
                        element.value = '';
                    }
                });
            }
        }
        // 清空明细表格，只保留添加行
        const tbody = modal.querySelector('.data-table tbody');
        if (tbody) {
            const addRow = tbody.querySelector('.add-row');
            tbody.innerHTML = '';
            if (addRow) {
                tbody.appendChild(addRow);
            }
        }
    }
}

// 生成批次号
function generateBatchNo() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `B${year}${month}${day}${random}`;
}

// 添加入库明细行
function addInboundDetail() {
    const tbody = document.querySelector('#inboundModal .data-table tbody');
    const addRow = tbody.querySelector('.add-row');
    const tr = document.createElement('tr');
    const batchNo = generateBatchNo();
    const today = new Date().toISOString().split('T')[0];
    
    tr.innerHTML = `
        <td>
            <select class="form-control" name="productCode[]" onchange="handleProductChange(this)">
                <option value="">请选择商品</option>
                ${getProductOptions()}
            </select>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <input type="text" class="form-control" name="batchNo[]" 
                   value="${batchNo}" readonly>
        </td>
        <td>
            <input type="date" class="form-control" name="productionDate[]"
                   value="${today}">
        </td>
        <td>
            <input type="number" class="form-control" name="validDays[]" 
                   placeholder="保质期天数">
        </td>
        <td>
            <input type="number" class="form-control" name="inboundQty[]" min="0">
        </td>
        <td>
            <button type="button" class="button-icon" onclick="removeTableRow(this)" title="删除">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </td>
    `;
    tbody.insertBefore(tr, addRow);
}

// 获取商品选项
function getProductOptions() {
    // 模拟商品列表数据
    const products = [
        { code: 'P001', name: '大红袍 - 特级' },
        { code: 'P002', name: '铁观音 - 一级' },
        { code: 'P003', name: '龙井 - 特级' }
    ];
    
    return products.map(p => `<option value="${p.code}">${p.name}</option>`).join('');
}

// 处理商品选择变化
function handleProductChange(select) {
    const code = select.value;
    if (!code) return;
    
    const product = getMockProduct(code);
    if (product) {
        const tr = select.closest('tr');
        tr.cells[1].textContent = product.name;
        tr.cells[2].textContent = product.specification;
        tr.cells[3].textContent = product.unit;
    }
}

// 查看待办详情
function viewTodoDetail(todoId) {
    console.log('查看待办详情:', todoId);
    const todo = getTodoById(todoId);
    if (!todo) {
        alert('未找到待办信息');
        return;
    }
    
    // 显示待办详情弹窗
    let detailModal = document.getElementById('todoDetailModal');
    if (!detailModal) {
        detailModal = createTodoDetailModal();
        document.body.appendChild(detailModal);
    }
    
    // 填充待办详情
    const content = detailModal.querySelector('.todo-detail');
    content.innerHTML = `
        <div class="detail-header">
            <span class="status ${todo.status}">${getTodoStatusName(todo.status)}</span>
        </div>
        <div class="detail-section">
            <h4>基本信息</h4>
            <div class="detail-content">
                <div class="detail-grid">
                    <div class="detail-row">
                        <span class="detail-label">待办编号：</span>
                        <span class="detail-value">${todo.id}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">来源单据号：</span>
                        <span class="detail-value">${todo.sourceNo}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">来源类型：</span>
                        <span class="detail-value">${getSourceTypeName(todo.sourceType)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">供应商/客户：</span>
                        <span class="detail-value">${todo.supplier}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">预计入库日期：</span>
                        <span class="detail-value">${todo.expectedDate}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">创建时间：</span>
                        <span class="detail-value">${todo.createTime}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-section">
            <h4>入库明细</h4>
            <div class="detail-content">
                <table class="detail-table">
                    <thead>
                        <tr>
                            <th>商品编码</th>
                            <th>商品名称</th>
                            <th>规格型号</th>
                            <th>单位</th>
                            <th>待入库数量</th>
                            <th>已入库数量</th>
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
                                <td>${todo.inboundQty || 0}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    detailModal.style.display = 'flex';
}

// 创建待办详情弹窗
function createTodoDetailModal() {
    const modal = document.createElement('div');
    modal.id = 'todoDetailModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h3>待办详情</h3>
                <button class="close-btn" onclick="hideModal('todoDetailModal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="todo-detail">
                    <!-- 待办详情内容 -->
                </div>
            </div>
            <div class="modal-footer">
                <button class="button" onclick="hideModal('todoDetailModal')">关闭</button>
            </div>
        </div>
    `;
    return modal;
}

// 创建入库单详情弹窗
function createInboundDetailModal() {
    const modal = document.createElement('div');
    modal.id = 'inboundDetailModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h3>入库单详情</h3>
                <button class="close-btn" onclick="hideModal('inboundDetailModal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="inbound-detail">
                    <!-- 入库单详情内容将在 viewInboundDetail 中填充 -->
                </div>
            </div>
            <div class="modal-footer">
                <button class="button" onclick="hideModal('inboundDetailModal')">关闭</button>
            </div>
        </div>
    `;
    return modal;
}

// 查看入库单详情
function viewInboundDetail(inboundId) {
    console.log('查看入库单详情:', inboundId);
    const inbound = getMockInbound(inboundId);
    if (!inbound) {
        alert('未找到入库单信息');
        return;
    }
    
    // 显示入库单详情弹窗
    let detailModal = document.getElementById('inboundDetailModal');
    if (!detailModal) {
        detailModal = createInboundDetailModal();
        document.body.appendChild(detailModal);
    }
    
    // 填充入库单详情
    const content = detailModal.querySelector('.inbound-detail');
    content.innerHTML = `
        <div class="detail-header">
            <span class="status ${inbound.status}">${getInboundStatusName(inbound.status)}</span>
        </div>
        <div class="detail-section">
            <h4>基本信息</h4>
            <div class="detail-content">
                <div class="detail-grid">
                    <div class="detail-row">
                        <span class="detail-label">入库单号：</span>
                        <span class="detail-value">${inbound.id}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">关联单号：</span>
                        <span class="detail-value">${inbound.sourceNo}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">入库类型：</span>
                        <span class="detail-value">${getInboundTypeName(inbound.type)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">入库日期：</span>
                        <span class="detail-value">${inbound.inboundDate}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">入库仓库：</span>
                        <span class="detail-value">${inbound.warehouse}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">经办人：</span>
                        <span class="detail-value">${inbound.operator}</span>
                    </div>
                    <div class="detail-row detail-remarks">
                        <span class="detail-label">备注：</span>
                        <span class="detail-value">${inbound.remarks || '-'}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-section">
            <h4>入库明细</h4>
            <div class="detail-content">
                <table class="detail-table">
                    <thead>
                        <tr>
                            <th>商品编码</th>
                            <th>商品名称</th>
                            <th>规格型号</th>
                            <th>单位</th>
                            <th>批次号</th>
                            <th>生产日期</th>
                            <th>保质期</th>
                            <th>入库数量</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${inbound.details.map(detail => `
                            <tr>
                                <td>${detail.productCode}</td>
                                <td>${detail.productName}</td>
                                <td>${detail.specification}</td>
                                <td>${detail.unit}</td>
                                <td>${detail.batchNo}</td>
                                <td>${detail.productionDate}</td>
                                <td>${detail.validDays}天</td>
                                <td>${detail.inboundQty}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    detailModal.style.display = 'flex';
}

// 获取模拟入库单数据
function getMockInbound(inboundId) {
    // 模拟入库单数据
    const inbounds = [
        {
            id: 'IN001',
            todoId: 'TD001',
            sourceNo: 'PO001',
            type: 'purchase',
            supplier: '供应商A',
            warehouse: '主仓库',
            inboundDate: '2024-03-20',
            operator: '张三',
            status: 'completed',
            details: [
                {
                    productCode: 'P001',
                    productName: '大红袍',
                    specification: '特级',
                    unit: 'kg',
                    batchNo: 'B240320001',
                    productionDate: '2024-03-20',
                    validDays: 365,
                    inboundQty: 100
                }
            ]
        }
    ];
    
    return inbounds.find(inbound => inbound.id === inboundId);
}

// 根据ID获取待办信息
function getTodoById(todoId) {
    // 模拟从待办列表中查找
    const todos = [
        {
            id: 'TD001',
            sourceNo: 'PO001',
            sourceType: 'purchase',
            supplier: '供应商A',
            expectedDate: '2024-03-20',
            pendingQty: 100,
            inboundQty: 0,
            status: 'pending',
            createTime: '2024-03-19 10:00:00',
            details: [
                {
                    productCode: 'P001',
                    productName: '商品A',
                    specification: '规格1',
                    unit: '件',
                    quantity: 100
                }
            ]
        },
        {
            id: 'TD002',
            sourceNo: 'SR001',
            sourceType: 'salesReturn',
            supplier: '客户B',
            expectedDate: '2024-03-21',
            pendingQty: 50,
            inboundQty: 20,
            status: 'processing',
            createTime: '2024-03-19 14:30:00',
            details: [
                {
                    productCode: 'P002',
                    productName: '商品B',
                    specification: '规格2',
                    unit: '箱',
                    quantity: 50
                }
            ]
        }
    ];
    
    return todos.find(todo => todo.id === todoId);
}

// 保存为草稿
function saveAsDraft() {
    // TODO: 实现保存草稿功能
    console.log('保存草稿');
    alert('已保存为草稿');
    hideModal('inboundModal');
}

// 提交入库单
function submitInbound() {
    // TODO: 实现提交入库单功能
    console.log('提交入库单');
    alert('入库单已提交');
    hideModal('inboundModal');
}