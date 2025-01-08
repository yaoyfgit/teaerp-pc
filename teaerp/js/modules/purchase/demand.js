// 显示新建需求弹窗
function showCreateModal() {
    const modal = document.getElementById('createModal');
    modal.style.display = 'flex';
    // 加载商品和供应商选项
    loadProductOptions();
    loadSupplierOptions();
}

// 隐藏弹窗
function hideCreateModal() {
    const modal = document.getElementById('createModal');
    modal.style.display = 'none';
    // 重置表单
    modal.querySelector('form').reset();
}

// 加载商品选项
function loadProductOptions() {
    // 模拟商品数据
    const products = [
        { code: 'P001', name: '大红袍', spec: '特级' },
        { code: 'P002', name: '铁观音', spec: '一级' }
    ];
    
    // 填充所有商品选择下拉框
    const selects = document.querySelectorAll('.detail-table select:first-child');
    selects.forEach(select => {
        select.innerHTML = `
            <option value="">请选择商品</option>
            ${products.map(p => `
                <option value="${p.code}">${p.name} - ${p.spec}</option>
            `).join('')}
        `;
    });
}

// 加载供应商选项
function loadSupplierOptions() {
    // 模拟供应商数据
    const suppliers = [
        { id: 1, name: '福建茶叶供应商A', products: ['P001', 'P002'] },
        { id: 2, name: '云南茶叶供应商B', products: ['P001'] },
        { id: 3, name: '安徽茶叶供应商C', products: ['P002'] }
    ];
    
    // 填充所有供应商选择下拉框
    const selects = document.querySelectorAll('.detail-table select[name="supplier"]');
    selects.forEach(select => {
        // 获取当前行选择的商品编码
        const tr = select.closest('tr');
        const productSelect = tr.querySelector('select:first-child');
        const selectedProductCode = productSelect.value;
        
        // 根据选择的商品筛选供应商
        const filteredSuppliers = selectedProductCode ? 
            suppliers.filter(s => s.products.includes(selectedProductCode)) : 
            suppliers;
        
        select.innerHTML = `
            <option value="">请选择供应商</option>
            ${filteredSuppliers.map(s => `
                <option value="${s.id}">${s.name}</option>
            `).join('')}
        `;
    });
}

// 添加明细行
function addDetailRow() {
    const tbody = document.querySelector('.detail-table tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>
            <select class="form-control" onchange="handleProductChange(this)">
                <option value="">请选择商品</option>
            </select>
        </td>
        <td><input type="number" class="form-control" min="1"></td>
        <td><input type="number" class="form-control" step="0.01"></td>
        <td>
            <select class="form-control" name="supplier">
                <option value="">请选择供应商</option>
            </select>
        </td>
        <td><input type="text" class="form-control"></td>
        <td>
            <button type="button" class="button-icon" onclick="removeDetailRow(this)" title="删除">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </td>
    `;
    tbody.appendChild(tr);
    
    // 加载商品选项
    loadProductOptions();
    // 加载供应商选项（此时没有选择商品，显示所有供应商）
    loadSupplierOptions();
}

// 删除明细行
function removeDetailRow(btn) {
    const tr = btn.closest('tr');
    tr.remove();
}

// 处理商品选择变化
function handleProductChange(select) {
    const tr = select.closest('tr');
    
    // 只更新供应商选项
    const supplierSelect = tr.querySelector('select[name="supplier"]');
    if (supplierSelect) {
        loadSupplierOptions();
    }
}

// 查看需求详情
function viewDemand(demandId) {
    // 获取需求详情
    const demand = getMockDemand(demandId);
    if (!demand) {
        alert('未找到需求信息');
        return;
    }
    
    // 显示详情弹窗
    let detailModal = document.getElementById('demandDetailModal');
    if (!detailModal) {
        detailModal = createDemandDetailModal();
        document.body.appendChild(detailModal);
    }
    
    // 填充详情内容
    const content = detailModal.querySelector('.demand-detail');
    content.innerHTML = `
        <div class="detail-header">
            <span class="status ${demand.status}">${getDemandStatusName(demand.status)}</span>
        </div>
        <div class="detail-section">
            <h4>基本信息</h4>
            <div class="detail-content">
                <div class="detail-grid">
                    <div class="detail-row">
                        <span class="detail-label">需求单号：</span>
                        <span class="detail-value">${demand.id}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">期望到货日期：</span>
                        <span class="detail-value">${demand.expectedDate}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">申请人：</span>
                        <span class="detail-value">${demand.applicant}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">申请日期：</span>
                        <span class="detail-value">${demand.applyDate}</span>
                    </div>
                    <div class="detail-row detail-remarks">
                        <span class="detail-label">备注：</span>
                        <span class="detail-value">${demand.remarks || '-'}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-section">
            <h4>需求明细</h4>
            <div class="detail-content">
                <table class="detail-table">
                    <thead>
                        <tr>
                            <th>商品</th>
                            <th>数量</th>
                            <th>建议单价</th>
                            <th>推荐供应商</th>
                            <th>备注</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${demand.details.map(detail => `
                            <tr>
                                <td>${detail.productName}</td>
                                <td>${detail.quantity}</td>
                                <td>${detail.price}</td>
                                <td>${detail.supplier}</td>
                                <td>${detail.remarks || '-'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    detailModal.style.display = 'flex';
}

// 编辑需求
function editDemand(demandId) {
    const demand = getMockDemand(demandId);
    if (!demand) {
        alert('未找到需求信息');
        return;
    }
    
    // 显示编辑弹窗
    const modal = document.getElementById('createModal');
    modal.style.display = 'flex';
    modal.querySelector('h3').textContent = '编辑采购需求';
    
    // 填充表单数据
    const form = modal.querySelector('form');
    form.querySelector('[type="date"]').value = demand.expectedDate;
    form.querySelector('textarea').value = demand.remarks || '';
    
    // 填充明细数据
    const tbody = form.querySelector('.detail-table tbody');
    tbody.innerHTML = '';
    demand.details.forEach(detail => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <select class="form-control" onchange="handleProductChange(this)">
                    <option value="">请选择商品</option>
                </select>
            </td>
            <td><input type="number" class="form-control" value="${detail.quantity}" min="1"></td>
            <td><input type="number" class="form-control" value="${detail.price}" step="0.01"></td>
            <td>
                <select class="form-control" name="supplier">
                    <option value="">请选择供应商</option>
                </select>
            </td>
            <td><input type="text" class="form-control" value="${detail.remarks || ''}"></td>
            <td>
                <button type="button" class="button-icon" onclick="removeDetailRow(this)" title="删除">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
        
        // 设置商品选择
        const productSelect = tr.querySelector('select:first-child');
        loadProductOptions();
        productSelect.value = detail.productCode;
        
        // 加载并设置供应商
        loadSupplierOptions();
        const supplierSelect = tr.querySelector('select[name="supplier"]');
        if (supplierSelect) {
            supplierSelect.value = detail.supplierId;
        }
    });
}

// 一键采购
function quickPurchase(demandId) {
    const demand = getMockDemand(demandId);
    if (!demand) {
        alert('未找到需求信息');
        return;
    }
    
    // TODO: 实现一键采购逻辑
    console.log('一键采购:', demand);
    alert('采购订单已生成');
}

// 获取模拟需求数据
function getMockDemand(demandId) {
    // 模拟需求数据
    const demands = [
        {
            id: 'PD202403010001',
            applicant: '张三',
            applyDate: '2024-03-01',
            expectedDate: '2024-03-10',
            status: 'new',
            details: [
                {
                    productName: '大红袍 - 特级',
                    quantity: 100,
                    price: 1200,
                    supplier: '供应商A',
                    remarks: '优先采购'
                }
            ]
        }
    ];
    
    return demands.find(d => d.id === demandId);
}

// 获取需求状态名称
function getDemandStatusName(status) {
    const statusMap = {
        new: '新建',
        processing: '处理中',
        completed: '已完成',
        cancelled: '已取消'
    };
    return statusMap[status] || status;
}

// 隐藏弹窗
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        // 如果是创建弹窗，重置表单
        if (modalId === 'createModal') {
            const form = modal.querySelector('form');
            if (form) {
                form.reset();
            }
        }
    }
}

// 创建需求详情弹窗
function createDemandDetailModal() {
    const modal = document.createElement('div');
    modal.id = 'demandDetailModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>需求详情</h3>
                <button class="close-btn" onclick="hideModal('demandDetailModal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="demand-detail">
                    <!-- 需求详情内容 -->
                </div>
            </div>
            <div class="modal-footer">
                <button class="button" onclick="hideModal('demandDetailModal')">关闭</button>
            </div>
        </div>
    `;
    return modal;
}

// 保存需求
function saveDemand() {
    // 获取表单数据
    const modal = document.getElementById('createModal');
    const form = modal.querySelector('form');
    const formData = {
        expectedDate: form.querySelector('[type="date"]').value,
        remarks: form.querySelector('textarea').value,
        details: []
    };

    // 验证日期
    if (!formData.expectedDate) {
        alert('请选择期望到货日期');
        return;
    }

    // 获取明细数据
    const tbody = form.querySelector('.detail-table tbody');
    const rows = Array.from(tbody.querySelectorAll('tr')).filter(row => !row.classList.contains('add-row'));
    
    if (rows.length === 0) {
        alert('请添加需求明细');
        return;
    }

    // 收集明细数据
    let isValid = true;
    rows.forEach((row, index) => {
        try {
            // 获取输入控件
            const inputs = {
                product: row.querySelector('select:first-child'),
                quantity: row.querySelector('td:nth-child(2) input[type="number"]'),
                price: row.querySelector('td:nth-child(3) input[type="number"]'),
                supplier: row.querySelector('select[name="supplier"]'),
                remarks: row.querySelector('td:nth-child(5) input[type="text"]')
            };

            // 验证所有输入控件是否存在
            for (const [key, element] of Object.entries(inputs)) {
                if (!element) {
                    console.error(`第${index + 1}行：找不到${key}输入控件`);
                    isValid = false;
                    return;
                }
            }

            // 验证商品
            if (!inputs.product.value) {
                alert(`第${index + 1}行：请选择商品`);
                isValid = false;
                return;
            }

            // 验证数量
            const quantity = inputs.quantity.value;
            if (!quantity) {
                alert(`第${index + 1}行：请输入数量`);
                isValid = false;
                return;
            }
            const quantityNum = parseFloat(quantity);
            if (isNaN(quantityNum) || quantityNum <= 0) {
                alert(`第${index + 1}行：请输入有效的数量`);
                isValid = false;
                return;
            }

            // 验证单价
            const price = inputs.price.value;
            if (!price) {
                alert(`第${index + 1}行：请输入建议单价`);
                isValid = false;
                return;
            }
            const priceNum = parseFloat(price);
            if (isNaN(priceNum) || priceNum < 0) {
                alert(`第${index + 1}行：请输入有效的建议单价`);
                isValid = false;
                return;
            }

            // 验证供应商
            if (!inputs.supplier.value) {
                alert(`第${index + 1}行：请选择供应商`);
                isValid = false;
                return;
            }

            // 构建明细对象
            const detail = {
                productCode: inputs.product.value,
                productName: inputs.product.selectedOptions[0].text,
                quantity: quantityNum,
                price: priceNum,
                supplierId: inputs.supplier.value,
                supplierName: inputs.supplier.selectedOptions[0].text,
                remarks: inputs.remarks.value || ''
            };

            formData.details.push(detail);
        } catch (error) {
            console.error(`处理第${index + 1}行时出错:`, error);
            isValid = false;
            return;
        }
    });

    if (!isValid) return;

    // 判断是新建还是编辑
    const isEdit = document.querySelector('#createModal h3').textContent.includes('编辑');
    
    // TODO: 调用后端API保存数据
    console.log('保存需求:', formData);
    
    // 模拟保存成功
    alert(isEdit ? '需求修改成功' : '需求保存成功');
    hideModal('createModal');
    
    // 刷新列表（实际项目中应该调用API重新加载数据）
    const listTbody = document.querySelector('.data-table tbody');
    if (!isEdit) {
        // 新建添加一行
        const tr = document.createElement('tr');
        const demandId = `PD${new Date().getTime()}`;
        tr.innerHTML = `
            <td>${demandId}</td>
            <td>当前用户</td>
            <td>${new Date().toLocaleDateString()}</td>
            <td>${formData.expectedDate}</td>
            <td><span class="status new">新建</span></td>
            <td>
                <a href="javascript:void(0)" onclick="viewDemand('${demandId}')" class="action-link">查看</a>
                <a href="javascript:void(0)" onclick="editDemand('${demandId}')" class="action-link">编辑</a>
                <a href="javascript:void(0)" onclick="quickPurchase('${demandId}')" class="action-link">一键采购</a>
            </td>
        `;
        listTbody.insertBefore(tr, listTbody.firstChild);
    }
} 