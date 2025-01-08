// 供应商合同管理模块
document.addEventListener('DOMContentLoaded', function() {
    initContractManage();
});

function initContractManage() {
    loadContractList();
    bindEvents();
}

// 显示新建合同弹窗
function showCreateModal() {
    const modal = document.getElementById('createContractModal');
    modal.classList.add('show');
    // 重置表单
    modal.querySelector('form').reset();
    // 加载供应商列表
    loadSupplierOptions();
    // 加载部门列表
    loadDepartmentOptions();
}

// 隐藏弹窗
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
}

// 加载供应商选项
function loadSupplierOptions() {
    // 模拟API调用
    const suppliers = [
        { id: 1, name: '供应商A' },
        { id: 2, name: '供应商B' }
    ];
    const select = document.querySelector('[name="supplierId"]');
    select.innerHTML = '<option value="">请选择供应商</option>' + 
        suppliers.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
}

// 加载部门选项
function loadDepartmentOptions() {
    // 模拟API调用
    const departments = [
        { id: 1, name: '采购部' },
        { id: 2, name: '财务部' }
    ];
    const select = document.querySelector('[name="departmentId"]');
    select.innerHTML = '<option value="">请选择部门</option>' + 
        departments.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
}

// 加载合同列表
function loadContractList(page = 1) {
    // 模拟API调用
    const mockData = {
        total: 100,
        list: [
            {
                id: 1,
                contractNo: 'CT202403010001',
                contractName: '2024年度采购合同',
                supplierName: '供应商A',
                contractType: 'purchase',
                signDate: '2024-03-01',
                startDate: '2024-03-01',
                endDate: '2025-02-28',
                amount: 1000000,
                status: 'active'
            }
            // ... 其他合同数据
        ]
    };

    renderContractList(mockData);
}

// 渲染合同列表
function renderContractList(data) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = data.list.map(contract => `
        <tr>
            <td>${contract.contractNo}</td>
            <td>${contract.contractName}</td>
            <td>${contract.supplierName}</td>
            <td>${getContractTypeName(contract.contractType)}</td>
            <td>${contract.signDate}</td>
            <td>${contract.startDate}</td>
            <td>${contract.endDate}</td>
            <td>${formatAmount(contract.amount)}</td>
            <td>
                <span class="status-tag ${contract.status}">
                    ${getContractStatusName(contract.status)}
                </span>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="viewContract(${contract.id})" class="action-link">查看</a>
                <a href="javascript:void(0)" onclick="editContract(${contract.id})" class="action-link">编辑</a>
                <a href="javascript:void(0)" onclick="showContractExecution(${contract.id})" class="action-link">执行情况</a>
                <a href="javascript:void(0)" onclick="downloadContract(${contract.id})" class="action-link">下载</a>
            </td>
        </tr>
    `).join('');
}

// 获取合同类型名称
function getContractTypeName(type) {
    const types = {
        purchase: '采购合同',
        framework: '框架合同',
        supplementary: '补充协议'
    };
    return types[type] || type;
}

// 获取合同状态名称
function getContractStatusName(status) {
    const statuses = {
        draft: '草稿',
        active: '生效中',
        expired: '已到期',
        terminated: '已终止'
    };
    return statuses[status] || status;
}

// 格式化金额
function formatAmount(amount) {
    return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
    }).format(amount);
}

// 保存草稿
function saveDraft() {
    submitContract(true);
}

// 提交合同
function submitContract(isDraft = false) {
    const formData = {
        contractName: document.querySelector('[name="contractName"]').value,
        contractType: document.querySelector('[name="contractType"]').value,
        supplierId: document.querySelector('[name="supplierId"]').value,
        departmentId: document.querySelector('[name="departmentId"]').value,
        signDate: document.querySelector('[name="signDate"]').value,
        startDate: document.querySelector('[name="startDate"]').value,
        endDate: document.querySelector('[name="endDate"]').value,
        contractAmount: document.querySelector('[name="contractAmount"]').value,
        currency: document.querySelector('[name="currency"]').value,
        taxRate: document.querySelector('[name="taxRate"]').value,
        paymentMethod: document.querySelector('[name="paymentMethod"]').value,
        paymentDays: document.querySelector('[name="paymentDays"]').value,
        paymentTerms: document.querySelector('[name="paymentTerms"]').value,
        remarks: document.querySelector('[name="remarks"]').value,
        status: isDraft ? 'draft' : 'active'
    };

    // 表单验证
    if (!isDraft) {
        if (!formData.contractName || !formData.supplierId || !formData.startDate || !formData.endDate) {
            alert('请填写必填项');
            return;
        }
    }

    // 发送请求到后端
    console.log('提交合同:', formData);
    alert(isDraft ? '保存草稿成功' : '提交成功');
    hideModal('createContractModal');
    loadContractList();
}

// 绑定事件
function bindEvents() {
    // 日期联动
    document.querySelector('[name="startDate"]').addEventListener('change', function() {
        const endDateInput = document.querySelector('[name="endDate"]');
        if (this.value && (!endDateInput.value || endDateInput.value < this.value)) {
            endDateInput.value = this.value;
        }
        endDateInput.min = this.value;
    });
}

// 显示采购订单选择器
function showOrderSelector() {
    const modal = document.getElementById('orderSelectorModal');
    modal.classList.add('show');
    loadPurchaseOrders();
}

// 加载采购订单列表
function loadPurchaseOrders() {
    // 模拟API调用
    const mockData = [
        {
            id: 1,
            orderNo: 'PO202403010001',
            orderDate: '2024-03-01',
            productName: '大红袍',
            quantity: 100,
            price: 1000,
            amount: 100000,
            status: 'confirmed'
        },
        {
            id: 2,
            orderNo: 'PO202403010002',
            orderDate: '2024-03-01',
            productName: '铁观音',
            quantity: 50,
            price: 800,
            amount: 40000,
            status: 'confirmed'
        }
    ];
    renderPurchaseOrders(mockData);
}

// 渲染采购订单列表
function renderPurchaseOrders(orders) {
    const tbody = document.querySelector('#orderSelectorModal tbody');
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td><input type="checkbox" value="${order.id}"></td>
            <td>${order.orderNo}</td>
            <td>${order.orderDate}</td>
            <td>${order.productName}</td>
            <td>${order.quantity}</td>
            <td>${formatAmount(order.price)}</td>
            <td>${formatAmount(order.amount)}</td>
            <td><span class="status-tag ${order.status}">${getOrderStatusName(order.status)}</span></td>
        </tr>
    `).join('');
}

// 确认选择的采购订单
function confirmSelectedOrders() {
    const selectedOrders = [];
    document.querySelectorAll('#orderSelectorModal tbody input:checked').forEach(checkbox => {
        const row = checkbox.closest('tr');
        selectedOrders.push({
            id: checkbox.value,
            orderNo: row.cells[1].textContent,
            amount: parseFloat(row.cells[6].textContent.replace(/[^\d.-]/g, ''))
        });
    });

    // 更新已选择的订单显示
    renderSelectedOrders(selectedOrders);
    // 更新合同金额
    updateContractAmount(selectedOrders);
    hideModal('orderSelectorModal');
}

// 渲染已选择的订单
function renderSelectedOrders(orders) {
    const container = document.querySelector('.selected-orders');
    container.innerHTML = orders.map(order => `
        <div class="selected-order-item">
            <span>${order.orderNo}</span>
            <span>${formatAmount(order.amount)}</span>
            <button class="button-icon" onclick="removeSelectedOrder('${order.id}')">
                <i class="icon-close"></i>
            </button>
        </div>
    `).join('');
}

// 移除已选择的订单
function removeSelectedOrder(orderId) {
    const orderItem = document.querySelector(`.selected-order-item button[onclick*="${orderId}"]`).closest('.selected-order-item');
    const amount = parseFloat(orderItem.querySelector('span:last-child').textContent.replace(/[^\d.-]/g, ''));
    orderItem.remove();
    
    // 更新合同金额
    const currentAmount = parseFloat(document.querySelector('[name="contractAmount"]').value) || 0;
    document.querySelector('[name="contractAmount"]').value = (currentAmount - amount).toFixed(2);
}

// 更新合同金额
function updateContractAmount(orders) {
    const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
    document.querySelector('[name="contractAmount"]').value = totalAmount.toFixed(2);
}

// 获取订单状态名称
function getOrderStatusName(status) {
    const statuses = {
        draft: '草稿',
        confirmed: '已确认',
        processing: '执行中',
        completed: '已完成',
        cancelled: '已取消'
    };
    return statuses[status] || status;
}

// 显示合同执行情况
function showContractExecution(contractId) {
    const modal = document.getElementById('contractExecutionModal');
    modal.classList.add('show');
    // 初始化标签页
    initTabs();
    loadContractExecution(contractId);
}

// 初始化标签页
function initTabs() {
    document.querySelectorAll('#contractExecutionModal .tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签的active类
            document.querySelectorAll('#contractExecutionModal .tab').forEach(t => {
                t.classList.remove('active');
            });
            // 添加当前标签的active类
            this.classList.add('active');
            
            // 隐藏所有内容
            document.querySelectorAll('#contractExecutionModal .tab-content').forEach(content => {
                content.style.display = 'none';
            });
            // 显示当前标签对应的内容
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).style.display = 'block';
        });
    });
}

// 加载合同执行情况
function loadContractExecution(contractId) {
    // 加载执行进度
    loadExecutionProgress(contractId);
    // 加载付���计划
    loadPaymentPlan(contractId);
    // 加载付款记录
    loadPaymentRecord(contractId);
    // 加载开票记录
    loadInvoiceRecord(contractId);
}

// 加载执行进度
function loadExecutionProgress(contractId) {
    // 模拟API调用
    const mockData = {
        progress: 60,
        milestones: [
            {
                name: '合同签订',
                planDate: '2024-03-01',
                actualDate: '2024-03-01',
                status: 'completed',
                remarks: ''
            },
            {
                name: '首批发货',
                planDate: '2024-03-15',
                actualDate: '',
                status: 'pending',
                remarks: ''
            }
        ]
    };
    renderExecutionProgress(mockData);
}

// 加载付款计划
function loadPaymentPlan(contractId) {
    // 模拟API调用
    const mockData = [
        {
            id: 1,
            period: 1,
            planDate: '2024-03-15',
            amount: 500000,
            condition: '合同签订后',
            status: 'completed'
        },
        {
            id: 2,
            period: 2,
            planDate: '2024-04-15',
            amount: 500000,
            condition: '首批发货后',
            status: 'pending'
        }
    ];
    renderPaymentPlan(mockData);
}

// 加载付款记录
function loadPaymentRecord(contractId) {
    // 模拟API调用
    const mockData = [
        {
            date: '2024-03-15',
            amount: 500000,
            method: '银行转账',
            fromAccount: '工商银行',
            toAccount: '建设银行',
            operator: '张三',
            status: 'completed',
            remarks: ''
        }
    ];
    renderPaymentRecord(mockData);
}

// 加载开票记录
function loadInvoiceRecord(contractId) {
    // 模拟API调用
    const mockData = [
        {
            date: '2024-03-15',
            number: 'INV202403150001',
            type: '增值税专用发票',
            amount: 500000,
            taxRate: 13,
            taxAmount: 65000,
            total: 565000,
            status: 'completed'
        }
    ];
    renderInvoiceRecord(mockData);
}

// 渲染执行进度
function renderExecutionProgress(data) {
    // 更新进度条
    document.querySelector('.progress').style.width = `${data.progress}%`;
    document.querySelector('.progress-text').textContent = `合同执行进度：${data.progress}%`;

    // 更新里程碑列表
    const tbody = document.querySelector('#execution-progress tbody');
    tbody.innerHTML = data.milestones.map(milestone => `
        <tr>
            <td>${milestone.name}</td>
            <td>${milestone.planDate}</td>
            <td>${milestone.actualDate || '-'}</td>
            <td><span class="status-tag ${milestone.status}">${getStatusName(milestone.status)}</span></td>
            <td>${milestone.remarks || '-'}</td>
        </tr>
    `).join('');
}

// 更新进度
function updateProgress(input) {
    const progress = input.value;
    document.querySelector('.progress').style.width = `${progress}%`;
    document.querySelector('.progress-text').textContent = `合同执行进度：${progress}%`;
    
    // 保存进度
    saveProgress(progress);
}

// 添加里程碑
function addMilestone() {
    const milestone = {
        name: '',
        planDate: '',
        actualDate: '',
        status: 'pending',
        remarks: ''
    };
    
    const tr = document.createElement('tr');
    tr.innerHTML = getMilestoneRowHtml(milestone, true);
    document.querySelector('#execution-progress tbody').appendChild(tr);
}

// 编辑里程碑
function editMilestone(btn) {
    const tr = btn.closest('tr');
    const milestone = {
        name: tr.cells[0].textContent,
        planDate: tr.cells[1].textContent,
        actualDate: tr.cells[2].textContent,
        status: tr.cells[3].querySelector('.status-tag').classList[1],
        remarks: tr.cells[4].textContent
    };
    
    tr.innerHTML = getMilestoneRowHtml(milestone, true);
}

// 保存里程碑
function saveMilestone(btn) {
    const tr = btn.closest('tr');
    const milestone = {
        name: tr.querySelector('[name="milestoneName"]').value,
        planDate: tr.querySelector('[name="planDate"]').value,
        actualDate: tr.querySelector('[name="actualDate"]').value,
        status: tr.querySelector('[name="status"]').value,
        remarks: tr.querySelector('[name="remarks"]').value
    };
    
    tr.innerHTML = getMilestoneRowHtml(milestone, false);
}

// 获取里程碑行HTML
function getMilestoneRowHtml(milestone, isEdit) {
    if (isEdit) {
        return `
            <td><input type="text" class="form-control" name="milestoneName" value="${milestone.name}"></td>
            <td><input type="date" class="form-control" name="planDate" value="${milestone.planDate}"></td>
            <td><input type="date" class="form-control" name="actualDate" value="${milestone.actualDate}"></td>
            <td>
                <select class="form-control" name="status">
                    <option value="pending" ${milestone.status === 'pending' ? 'selected' : ''}>待完成</option>
                    <option value="completed" ${milestone.status === 'completed' ? 'selected' : ''}>���完成</option>
                </select>
            </td>
            <td><input type="text" class="form-control" name="remarks" value="${milestone.remarks}"></td>
            <td>
                <a href="javascript:void(0)" onclick="saveMilestone(this)" class="action-link">保存</a>
                <a href="javascript:void(0)" onclick="deleteMilestone(this)" class="action-link">删除</a>
            </td>
        `;
    } else {
        return `
            <td>${milestone.name}</td>
            <td>${milestone.planDate}</td>
            <td>${milestone.actualDate || '-'}</td>
            <td><span class="status-tag ${milestone.status}">${getStatusName(milestone.status)}</span></td>
            <td>${milestone.remarks || '-'}</td>
            <td>
                <a href="javascript:void(0)" onclick="editMilestone(this)" class="action-link">编辑</a>
                <a href="javascript:void(0)" onclick="deleteMilestone(this)" class="action-link">删除</a>
            </td>
        `;
    }
}

// 删除里程碑
function deleteMilestone(btn) {
    if (confirm('确定要删除该里程碑吗？')) {
        btn.closest('tr').remove();
    }
}

// 添加付款计划
function addPaymentPlan() {
    const plan = {
        period: document.querySelectorAll('#payment-plan tbody tr').length + 1,
        planDate: '',
        amount: '',
        condition: '',
        status: 'pending'
    };
    
    const tr = document.createElement('tr');
    tr.innerHTML = getPaymentPlanRowHtml(plan, true);
    document.querySelector('#payment-plan tbody').appendChild(tr);
}

// 获取付款计划行HTML
function getPaymentPlanRowHtml(plan, isEdit) {
    if (isEdit) {
        return `
            <td>${plan.period}</td>
            <td><input type="date" class="form-control" name="planDate" value="${plan.planDate}"></td>
            <td><input type="number" class="form-control" name="amount" value="${plan.amount}"></td>
            <td><input type="text" class="form-control" name="condition" value="${plan.condition}"></td>
            <td>
                <select class="form-control" name="status">
                    <option value="pending" ${plan.status === 'pending' ? 'selected' : ''}>待付款</option>
                    <option value="completed" ${plan.status === 'completed' ? 'selected' : ''}>已付款</option>
                </select>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="savePaymentPlan(this)" class="action-link">保存</a>
                <a href="javascript:void(0)" onclick="deletePaymentPlan(this)" class="action-link">删除</a>
            </td>
        `;
    } else {
        return `
            <td>${plan.period}</td>
            <td>${plan.planDate}</td>
            <td>${formatAmount(plan.amount)}</td>
            <td>${plan.condition}</td>
            <td><span class="status-tag ${plan.status}">${getStatusName(plan.status)}</span></td>
            <td>
                <a href="javascript:void(0)" onclick="editPaymentPlan(this)" class="action-link">编辑</a>
                <a href="javascript:void(0)" onclick="deletePaymentPlan(this)" class="action-link">删除</a>
            </td>
        `;
    }
}

// 添加付款记录
function addPaymentRecord() {
    const record = {
        date: '',
        amount: '',
        method: '',
        fromAccount: '',
        toAccount: '',
        operator: '',
        status: 'pending',
        remarks: ''
    };
    
    const tr = document.createElement('tr');
    tr.innerHTML = getPaymentRecordRowHtml(record, true);
    document.querySelector('#payment-record tbody').appendChild(tr);
}

// 获取付款记录行HTML
function getPaymentRecordRowHtml(record, isEdit) {
    if (isEdit) {
        return `
            <td><input type="date" class="form-control" name="paymentDate" value="${record.date}"></td>
            <td><input type="number" class="form-control" name="paymentAmount" value="${record.amount}"></td>
            <td>
                <select class="form-control" name="paymentMethod">
                    <option value="transfer" ${record.method === 'transfer' ? 'selected' : ''}>银行转账</option>
                    <option value="cash" ${record.method === 'cash' ? 'selected' : ''}>现金</option>
                    <option value="check" ${record.method === 'check' ? 'selected' : ''}>支票</option>
                </select>
            </td>
            <td><input type="text" class="form-control" name="fromAccount" value="${record.fromAccount}"></td>
            <td><input type="text" class="form-control" name="toAccount" value="${record.toAccount}"></td>
            <td><input type="text" class="form-control" name="operator" value="${record.operator}"></td>
            <td>
                <select class="form-control" name="status">
                    <option value="pending" ${record.status === 'pending' ? 'selected' : ''}>待确认</option>
                    <option value="completed" ${record.status === 'completed' ? 'selected' : ''}>已确认</option>
                </select>
            </td>
            <td><input type="text" class="form-control" name="remarks" value="${record.remarks}"></td>
            <td>
                <a href="javascript:void(0)" onclick="savePaymentRecord(this)" class="action-link">保存</a>
                <a href="javascript:void(0)" onclick="deletePaymentRecord(this)" class="action-link">删除</a>
            </td>
        `;
    } else {
        return `
            <td>${record.date}</td>
            <td>${formatAmount(record.amount)}</td>
            <td>${getPaymentMethodName(record.method)}</td>
            <td>${record.fromAccount}</td>
            <td>${record.toAccount}</td>
            <td>${record.operator}</td>
            <td><span class="status-tag ${record.status}">${getStatusName(record.status)}</span></td>
            <td>${record.remarks || '-'}</td>
            <td>
                <a href="javascript:void(0)" onclick="editPaymentRecord(this)" class="action-link">编辑</a>
                <a href="javascript:void(0)" onclick="deletePaymentRecord(this)" class="action-link">删除</a>
            </td>
        `;
    }
}

// 添加开票记录
function addInvoiceRecord() {
    const record = {
        date: '',
        number: '',
        type: '',
        amount: '',
        taxRate: '',
        taxAmount: '',
        total: '',
        status: 'pending'
    };
    
    const tr = document.createElement('tr');
    tr.innerHTML = getInvoiceRecordRowHtml(record, true);
    document.querySelector('#invoice-record tbody').appendChild(tr);
}

// 获取开票记录行HTML
function getInvoiceRecordRowHtml(record, isEdit) {
    if (isEdit) {
        return `
            <td><input type="date" class="form-control" name="invoiceDate" value="${record.date}"></td>
            <td><input type="text" class="form-control" name="invoiceNumber" value="${record.number}"></td>
            <td>
                <select class="form-control" name="invoiceType">
                    <option value="special" ${record.type === 'special' ? 'selected' : ''}>增值税专用发票</option>
                    <option value="normal" ${record.type === 'normal' ? 'selected' : ''}>增值税普通发票</option>
                </select>
            </td>
            <td><input type="number" class="form-control" name="amount" value="${record.amount}" onchange="calculateInvoiceTotal(this)"></td>
            <td><input type="number" class="form-control" name="taxRate" value="${record.taxRate}" onchange="calculateInvoiceTotal(this)"></td>
            <td><input type="number" class="form-control" name="taxAmount" value="${record.taxAmount}" readonly></td>
            <td><input type="number" class="form-control" name="total" value="${record.total}" readonly></td>
            <td>
                <select class="form-control" name="status">
                    <option value="pending" ${record.status === 'pending' ? 'selected' : ''}>待开票</option>
                    <option value="completed" ${record.status === 'completed' ? 'selected' : ''}>已开票</option>
                </select>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="saveInvoiceRecord(this)" class="action-link">保存</a>
                <a href="javascript:void(0)" onclick="deleteInvoiceRecord(this)" class="action-link">删除</a>
            </td>
        `;
    } else {
        return `
            <td>${record.date}</td>
            <td>${record.number}</td>
            <td>${getInvoiceTypeName(record.type)}</td>
            <td>${formatAmount(record.amount)}</td>
            <td>${record.taxRate}%</td>
            <td>${formatAmount(record.taxAmount)}</td>
            <td>${formatAmount(record.total)}</td>
            <td><span class="status-tag ${record.status}">${getStatusName(record.status)}</span></td>
            <td>
                <a href="javascript:void(0)" onclick="editInvoiceRecord(this)" class="action-link">编辑</a>
                <a href="javascript:void(0)" onclick="deleteInvoiceRecord(this)" class="action-link">删除</a>
            </td>
        `;
    }
}

// 计算发票税额和总额
function calculateInvoiceTotal(input) {
    const tr = input.closest('tr');
    const amount = parseFloat(tr.querySelector('[name="amount"]').value) || 0;
    const taxRate = parseFloat(tr.querySelector('[name="taxRate"]').value) || 0;
    const taxAmount = amount * (taxRate / 100);
    const total = amount + taxAmount;
    
    tr.querySelector('[name="taxAmount"]').value = taxAmount.toFixed(2);
    tr.querySelector('[name="total"]').value = total.toFixed(2);
}

// 获取付款方式名称
function getPaymentMethodName(method) {
    const methods = {
        transfer: '银行转账',
        cash: '现金',
        check: '支票'
    };
    return methods[method] || method;
}

// 获取发票类型名称
function getInvoiceTypeName(type) {
    const types = {
        special: '增值税专用发票',
        normal: '增值税普通发票'
    };
    return types[type] || type;
}

// 保存付款记录
function savePaymentRecord(btn) {
    const tr = btn.closest('tr');
    const record = {
        date: tr.querySelector('[name="paymentDate"]').value,
        amount: tr.querySelector('[name="paymentAmount"]').value,
        method: tr.querySelector('[name="paymentMethod"]').value,
        fromAccount: tr.querySelector('[name="fromAccount"]').value,
        toAccount: tr.querySelector('[name="toAccount"]').value,
        operator: tr.querySelector('[name="operator"]').value,
        status: tr.querySelector('[name="status"]').value,
        remarks: tr.querySelector('[name="remarks"]').value
    };
    
    tr.innerHTML = getPaymentRecordRowHtml(record, false);
}

// 保存开票记录
function saveInvoiceRecord(btn) {
    const tr = btn.closest('tr');
    const record = {
        date: tr.querySelector('[name="invoiceDate"]').value,
        number: tr.querySelector('[name="invoiceNumber"]').value,
        type: tr.querySelector('[name="invoiceType"]').value,
        amount: tr.querySelector('[name="amount"]').value,
        taxRate: tr.querySelector('[name="taxRate"]').value,
        taxAmount: tr.querySelector('[name="taxAmount"]').value,
        total: tr.querySelector('[name="total"]').value,
        status: tr.querySelector('[name="status"]').value
    };
    
    tr.innerHTML = getInvoiceRecordRowHtml(record, false);
}

// 删除付款记录
function deletePaymentRecord(btn) {
    if (confirm('确定要删除该付款记录吗？')) {
        btn.closest('tr').remove();
    }
}

// 删除开票记录
function deleteInvoiceRecord(btn) {
    if (confirm('确定要删除该开票记录吗？')) {
        btn.closest('tr').remove();
    }
}