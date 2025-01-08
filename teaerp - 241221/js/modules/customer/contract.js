// 复用供应商合同的大部分功能，但修改一些业务逻辑
// 显示销售订单选择器
function showOrderSelector() {
    console.log('显示销售订单选择器');
    const modal = document.getElementById('orderSelectorModal');
    if (!modal) {
        console.error('未找到orderSelectorModal元素');
        return;
    }
    modal.classList.add('show');
    loadSalesOrders();
}

// 加载销售订单列表
function loadSalesOrders() {
    console.log('加载销售订单列表');
    // 模拟API调用
    const mockData = [
        {
            id: 1,
            orderNo: 'SO202403010001',
            orderDate: '2024-03-01',
            productName: '大红袍',
            quantity: 100,
            price: 1200,
            amount: 120000,
            status: 'confirmed'
        },
        {
            id: 2,
            orderNo: 'SO202403010002',
            orderDate: '2024-03-01',
            productName: '铁观音',
            quantity: 50,
            price: 1000,
            amount: 50000,
            status: 'confirmed'
        }
    ];

    renderSalesOrders(mockData);
}

// 渲染销售订单列表
function renderSalesOrders(orders) {
    console.log('渲染销售订单列表', orders);
    const tbody = document.querySelector('#orderSelectorModal tbody');
    if (!tbody) {
        console.error('未找到销售订单列表tbody元素');
        return;
    }

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

// 确认选择的销售订单
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

    // 更新已选择的订单示
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

// 加载收款计划
function loadPaymentPlan(contractId) {
    // 模拟API调用
    const mockData = [
        {
            id: 1,
            period: 1,
            planDate: '2024-03-15',
            amount: 600000,
            condition: '合同签订后',
            status: 'completed'
        },
        {
            id: 2,
            period: 2,
            planDate: '2024-04-15',
            amount: 600000,
            condition: '首批发货后',
            status: 'pending'
        }
    ];
    renderPaymentPlan(mockData);
}

// 加载收款记录
function loadPaymentRecord(contractId) {
    // 模拟API调用
    const mockData = [
        {
            date: '2024-03-15',
            amount: 600000,
            method: '银行转账',
            fromAccount: '建设银行',
            toAccount: '工商银行',
            operator: '张三',
            status: 'completed',
            remarks: ''
        }
    ];
    renderPaymentRecord(mockData);
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('初始化客户合同管理');
    initContractManage();
});

function initContractManage() {
    loadContractList();
    // 绑定事件
    document.querySelector('.search-bar button').addEventListener('click', searchContracts);
    document.querySelector('[name="contractType"]').addEventListener('change', searchContracts);
    document.querySelector('[name="status"]').addEventListener('change', searchContracts);
}

// 加载合同列表
function loadContractList() {
    // 模拟API调用
    const mockData = {
        total: 100,
        list: [
            {
                id: 1,
                contractNo: 'CT202403010001',
                contractName: '2024年度茶叶销售合同',
                customerName: '茶叶专卖店',
                contractType: 'sales',
                amount: 100000,
                signDate: '2024-03-01',
                startDate: '2024-03-01',
                endDate: '2024-12-31',
                progress: 35,
                status: 'active'
            },
            {
                id: 2,
                contractNo: 'CT202403010002',
                contractName: '2024年度茶具销售合同',
                customerName: '茶具商城',
                contractType: 'sales',
                amount: 200000,
                signDate: '2024-03-02',
                startDate: '2024-03-02',
                endDate: '2024-12-31',
                progress: 20,
                status: 'active'
            }
        ]
    };

    renderContractList(mockData);
}

// 渲染合同列表
function renderContractList(data) {
    console.log('渲染合同列表', data);
    const tbody = document.querySelector('.data-table tbody');
    if (!tbody) {
        console.error('未找到表格tbody元素');
        return;
    }

    tbody.innerHTML = data.list.map(contract => `
        <tr>
            <td>${contract.contractNo}</td>
            <td>${contract.contractName}</td>
            <td>${contract.customerName}</td>
            <td>${getContractTypeName(contract.contractType)}</td>
            <td>${formatAmount(contract.amount)}</td>
            <td>${contract.signDate}</td>
            <td>${contract.startDate}</td>
            <td>${contract.endDate}</td>
            <td>
                <div class="progress">
                    <div class="progress-bar" style="width: ${contract.progress}%">${contract.progress}%</div>
                </div>
            </td>
            <td><span class="status-tag ${contract.status}">${getContractStatusName(contract.status)}</span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewContract(${contract.id})">查看</a>
                <a href="javascript:void(0)" class="action-link" onclick="editContract(${contract.id})">编辑</a>
                <a href="javascript:void(0)" class="action-link" onclick="showContractExecution(${contract.id})">执行情况</a>
                <a href="javascript:void(0)" class="action-link" onclick="downloadContract(${contract.id})">下载</a>
            </td>
        </tr>
    `).join('');
}

// 显示合同执行情况
function showContractExecution(contractId) {
    console.log('显示合同执行情况', contractId);
    const modal = document.getElementById('contractExecutionModal');
    if (!modal) {
        console.error('未找到contractExecutionModal元素');
        return;
    }
    modal.classList.add('show');
    initTabs();
    loadContractExecution(contractId);
}

// 初始化标签页
function initTabs() {
    console.log('初始化标签页');
    document.querySelectorAll('#contractExecutionModal .tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

// 切换标签页
function switchTab(tabId) {
    console.log('切换标签页', tabId);
    // 移除所有标签的active类
    document.querySelectorAll('#contractExecutionModal .tab').forEach(t => {
        t.classList.remove('active');
    });
    // 添加当前签的active类
    document.querySelector(`#contractExecutionModal .tab[data-tab="${tabId}"]`).classList.add('active');

    // 隐藏所有内容
    document.querySelectorAll('#contractExecutionModal .tab-content').forEach(content => {
        content.style.display = 'none';
    });
    // 显示当前标签对应的内容
    document.getElementById(tabId).style.display = 'block';
}

// 加载合同执行情况
function loadContractExecution(contractId) {
    // 加载执行进度
    loadExecutionProgress(contractId);
    // 加载收款计划
    loadPaymentPlan(contractId);
    // 加载收款记录
    loadPaymentRecord(contractId);
    // 加载开票记录
    loadInvoiceRecord(contractId);
}

// 加载执行进度
function loadExecutionProgress(contractId) {
    // 模拟API调用
    const mockData = {
        progress: 35,
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
    // 绑定��度编辑事件
    bindProgressEvents();
}

// 绑定进度编辑事件
function bindProgressEvents() {
    // 进度条编辑
    const progressInput = document.querySelector('[name="progress"]');
    if (progressInput) {
        progressInput.addEventListener('change', function() {
            const progress = this.value;
            document.querySelector('#execution-progress .progress').style.width = `${progress}%`;
            document.querySelector('#execution-progress .progress-text').textContent = `合同执行进度：${progress}%`;
        });
    }
}

// 渲染执行进度
function renderExecutionProgress(data) {
    // 更新进度条
    const progressHtml = `
        <div class="form-group">
            <label>整体进度</label>
            <input type="number" class="form-control" name="progress" min="0" max="100" value="${data.progress}">
        </div>
        <div class="progress-bar">
            <div class="progress" style="width: ${data.progress}%"></div>
        </div>
        <div class="progress-text">合同执行进度：${data.progress}%</div>
    `;
    document.querySelector('#execution-progress .progress-info').innerHTML = progressHtml;

    // 更新里程碑列表
    const tbody = document.querySelector('#execution-progress tbody');
    tbody.innerHTML = data.milestones.map(milestone => getMilestoneRowHtml(milestone, false)).join('');
}

// 获取合同类型名称
function getContractTypeName(type) {
    const types = {
        sales: '销售合同',
        framework: '框架协议',
        supplementary: '补充协议'
    };
    return types[type] || type;
}

// 获取合同状态名
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

// 显示新建合同弹窗
function showCreateModal() {
    const modal = document.getElementById('createContractModal');
    modal.classList.add('show');
    // 重置表单
    modal.querySelector('form').reset();
    // 加载客户列表
    loadCustomerOptions();
}

// 加载客户列表
function loadCustomerOptions() {
    // 模拟API调用
    const customers = [
        { id: 1, name: '茶叶专卖店' },
        { id: 2, name: '茶具商城' },
        { id: 3, name: '连锁茶店' }
    ];
    const select = document.querySelector('[name="customerId"]');
    select.innerHTML = '<option value="">请选择客户</option>' + 
        customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

// 提交新建合同
function submitCreateContract() {
    const formData = {
        contractName: document.querySelector('[name="contractName"]').value,
        contractType: document.querySelector('[name="contractType"]').value,
        customerId: document.querySelector('[name="customerId"]').value,
        amount: document.querySelector('[name="amount"]').value,
        signDate: document.querySelector('[name="signDate"]').value,
        startDate: document.querySelector('[name="startDate"]').value,
        endDate: document.querySelector('[name="endDate"]').value,
        remarks: document.querySelector('[name="remarks"]').value,
        relatedOrders: Array.from(document.querySelectorAll('.selected-order-item')).map(item => ({
            orderNo: item.querySelector('span:first-child').textContent,
            amount: parseFloat(item.querySelector('span:last-child').textContent.replace(/[^\d.-]/g, ''))
        }))
    };

    // 表单验证
    if (!formData.contractName || !formData.customerId) {
        alert('请填写必填项');
        return;
    }

    // 发送请求到后端
    console.log('提交合同:', formData);
    alert('合同创建成功');
    hideModal('createContractModal');
    loadContractList();
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
    tr.classList.add('editable-row');
    tr.innerHTML = getMilestoneRowHtml(milestone, true);
    document.querySelector('#execution-progress tbody').appendChild(tr);
}

// 编辑里程碑
function editMilestone(btn) {
    const tr = btn.closest('tr');
    tr.classList.add('editable-row');
    const milestone = {
        name: tr.cells[0].textContent,
        planDate: tr.cells[1].textContent,
        actualDate: tr.cells[2].textContent === '-' ? '' : tr.cells[2].textContent,
        status: tr.cells[3].querySelector('.status-tag').classList[1],
        remarks: tr.cells[4].textContent === '-' ? '' : tr.cells[4].textContent
    };
    
    tr.innerHTML = getMilestoneRowHtml(milestone, true);
}

// 保存里程碑
function saveMilestone(btn) {
    const tr = btn.closest('tr');
    tr.classList.remove('editable-row');
    const milestone = {
        name: tr.querySelector('[name="milestoneName"]').value,
        planDate: tr.querySelector('[name="planDate"]').value,
        actualDate: tr.querySelector('[name="actualDate"]').value,
        status: tr.querySelector('[name="status"]').value,
        remarks: tr.querySelector('[name="remarks"]').value
    };
    
    tr.innerHTML = getMilestoneRowHtml(milestone, false);
    
    // 计算并更新整体进度
    updateOverallProgress();
}

// 获取里程碑行HTML
function getMilestoneRowHtml(milestone, isEdit) {
    if (isEdit) {
        return `
            <td><input type="text" class="form-control" name="milestoneName" value="${milestone.name}" required></td>
            <td><input type="date" class="form-control" name="planDate" value="${milestone.planDate}" required></td>
            <td><input type="date" class="form-control" name="actualDate" value="${milestone.actualDate}"></td>
            <td>
                <select class="form-control" name="status">
                    <option value="pending" ${milestone.status === 'pending' ? 'selected' : ''}>待完成</option>
                    <option value="processing" ${milestone.status === 'processing' ? 'selected' : ''}>进行中</option>
                    <option value="completed" ${milestone.status === 'completed' ? 'selected' : ''}>已完成</option>
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
        // 更新整体进度
        updateOverallProgress();
    }
}

// 更新整体进度
function updateOverallProgress() {
    const rows = document.querySelectorAll('#execution-progress tbody tr');
    const total = rows.length;
    if (total === 0) return;
    
    const completed = Array.from(rows).filter(row => 
        row.querySelector('.status-tag.completed')
    ).length;
    
    const progress = Math.round((completed / total) * 100);
    document.querySelector('#execution-progress .progress').style.width = `${progress}%`;
    document.querySelector('#execution-progress .progress-text').textContent = `合同执行进度：${progress}%`;
}

// 添加收款计划
function addPaymentPlan() {
    const plan = {
        period: document.querySelectorAll('#payment-plan tbody tr').length + 1,
        planDate: '',
        amount: '',
        condition: '',
        status: 'pending'
    };
    
    const tr = document.createElement('tr');
    tr.classList.add('editable-row');
    tr.innerHTML = getPaymentPlanRowHtml(plan, true);
    document.querySelector('#payment-plan tbody').appendChild(tr);
}

// 获取收款计划行HTML
function getPaymentPlanRowHtml(plan, isEdit) {
    if (isEdit) {
        return `
            <td>${plan.period}</td>
            <td><input type="date" class="form-control" name="planDate" value="${plan.planDate}"></td>
            <td><input type="number" class="form-control" name="amount" value="${plan.amount}"></td>
            <td><input type="text" class="form-control" name="condition" value="${plan.condition}"></td>
            <td>
                <select class="form-control" name="status">
                    <option value="pending" ${plan.status === 'pending' ? 'selected' : ''}>待收款</option>
                    <option value="completed" ${plan.status === 'completed' ? 'selected' : ''}>已收款</option>
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

// 添加收款记录
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
    tr.classList.add('editable-row');
    tr.innerHTML = getPaymentRecordRowHtml(record, true);
    document.querySelector('#payment-record tbody').appendChild(tr);
}

// 获取收款记录行HTML
function getPaymentRecordRowHtml(record, isEdit) {
    if (isEdit) {
        return `
            <td><input type="date" class="form-control" name="paymentDate" value="${record.date}"></td>
            <td><input type="number" class="form-control" name="amount" value="${record.amount}"></td>
            <td>
                <select class="form-control" name="method">
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
    tr.classList.add('editable-row');
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

// ... 其他函数与供应商合同类似，但需要调整相关文案和业务逻辑 