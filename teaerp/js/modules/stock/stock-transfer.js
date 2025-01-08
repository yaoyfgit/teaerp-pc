// 初始化页面数据
function initPageData() {
    // 初始化统计数据
    initOverview();
    // 初始化表格数据
    initTableData();
    // 初始化表单事件
    initFormEvents();
}

// 初始化统计数据
function initOverview() {
    const overviewData = {
        pendingCount: 5,
        processingCount: 3,
        completedCount: 8,
        transferCount: 256
    };

    document.querySelector('.overview-item:nth-child(1) .number').textContent = overviewData.pendingCount;
    document.querySelector('.overview-item:nth-child(2) .number').textContent = overviewData.processingCount;
    document.querySelector('.overview-item:nth-child(3) .number').textContent = overviewData.completedCount;
    document.querySelector('.overview-item:nth-child(4) .number').textContent = overviewData.transferCount;
}

// 初始化表格数据
function initTableData() {
    const transferData = [
        {
            id: 1,
            code: 'DB202401200001',
            fromWarehouse: '主仓库',
            toWarehouse: '次仓库',
            productCount: 5,
            status: 'pending',
            creator: '张三',
            createTime: '2024-01-20 10:30:00',
            completeTime: '-',
            remark: '日常调拨'
        },
        {
            id: 2,
            code: 'DB202401200002',
            fromWarehouse: '次仓库',
            toWarehouse: '主仓库',
            productCount: 3,
            status: 'processing',
            creator: '李四',
            createTime: '2024-01-20 14:20:00',
            completeTime: '-',
            remark: '库存平衡'
        },
        {
            id: 3,
            code: 'DB202401190003',
            fromWarehouse: '主仓库',
            toWarehouse: '次仓库',
            productCount: 8,
            status: 'completed',
            creator: '王五',
            createTime: '2024-01-19 09:15:00',
            completeTime: '2024-01-19 16:30:00',
            remark: '紧急调拨'
        }
    ];

    renderTransferTable(transferData);
}

// 渲染调拨表格
function renderTransferTable(data) {
    const tbody = document.getElementById('transferTable');
    tbody.innerHTML = data.map(item => `
        <tr>
            <td>${item.code}</td>
            <td>${item.fromWarehouse}</td>
            <td>${item.toWarehouse}</td>
            <td>${item.productCount}</td>
            <td><span class="check-status ${item.status}">${formatStatus(item.status)}</span></td>
            <td>${item.creator}</td>
            <td>${item.createTime}</td>
            <td>${item.completeTime}</td>
            <td>${item.remark}</td>
            <td>
                <div class="button-group">
                    ${renderActionButtons(item)}
                </div>
            </td>
        </tr>
    `).join('');
}

// 渲染操作按钮
function renderActionButtons(item) {
    switch (item.status) {
        case 'pending':
            return `
                <button class="standard-button primary" onclick="approveTransfer(${item.id})">
                    <i class="fas fa-check"></i> 审核
                </button>
                <button class="standard-button" onclick="viewDetail(${item.id})">
                    <i class="fas fa-eye"></i> 查看
                </button>
            `;
        case 'processing':
            return `
                <button class="standard-button primary" onclick="confirmTransfer(${item.id})">
                    <i class="fas fa-check-circle"></i> 确认
                </button>
                <button class="standard-button" onclick="viewDetail(${item.id})">
                    <i class="fas fa-eye"></i> 查看
                </button>
            `;
        case 'completed':
            return `
                <button class="standard-button" onclick="viewDetail(${item.id})">
                    <i class="fas fa-eye"></i> 查看
                </button>
                <button class="standard-button" onclick="exportDetail(${item.id})">
                    <i class="fas fa-file-export"></i> 导出
                </button>
            `;
        default:
            return '';
    }
}

// 格式化状态
function formatStatus(status) {
    const statusMap = {
        pending: '待审核',
        processing: '调拨中',
        completed: '已完成'
    };
    return statusMap[status] || status;
}

// 初始化表单事件
function initFormEvents() {
    // 监听仓库选择
    const fromWarehouse = document.querySelector('select[name="fromWarehouse"]');
    const toWarehouse = document.querySelector('select[name="toWarehouse"]');
    
    if (fromWarehouse && toWarehouse) {
        fromWarehouse.addEventListener('change', function() {
            // 更新调入仓库选项
            updateToWarehouse(this.value);
        });
    }
}

// 更新调入仓库选项
function updateToWarehouse(fromValue) {
    const toWarehouse = document.querySelector('select[name="toWarehouse"]');
    const options = toWarehouse.options;
    
    // 启用所有选项
    for (let i = 0; i < options.length; i++) {
        options[i].disabled = false;
    }
    
    // 禁用已选择的调出仓库
    if (fromValue) {
        const option = toWarehouse.querySelector(`option[value="${fromValue}"]`);
        if (option) {
            option.disabled = true;
        }
    }
    
    // 如果当前选中的是禁用项，清除选择
    if (toWarehouse.selectedOptions[0].disabled) {
        toWarehouse.value = '';
    }
}

// 新建调拨
function createTransfer() {
    showModal('createModal');
}

// 添加调拨商品
function addTransferItem() {
    const tbody = document.getElementById('transferItemTable');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>
            <input type="text" class="standard-input" name="code[]" required>
        </td>
        <td>
            <input type="text" class="standard-input" name="name[]" required>
        </td>
        <td>
            <input type="text" class="standard-input" name="spec[]">
        </td>
        <td>
            <input type="number" class="standard-input" name="available[]" readonly>
        </td>
        <td>
            <input type="number" class="standard-input" name="quantity[]" required>
        </td>
        <td>
            <input type="text" class="standard-input" name="itemRemark[]">
        </td>
        <td>
            <button type="button" class="standard-button" onclick="removeTransferItem(this)">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    tbody.appendChild(tr);
}

// 移除调拨商品
function removeTransferItem(btn) {
    btn.closest('tr').remove();
}

// 提交新建
function submitCreate() {
    const form = document.getElementById('createForm');
    const formData = new FormData(form);

    // TODO: 发送创建请求到后端
    console.log('创建调拨:', {
        fromWarehouse: formData.get('fromWarehouse'),
        toWarehouse: formData.get('toWarehouse'),
        remark: formData.get('remark'),
        items: getTransferItems()
    });

    hideModal('createModal');
    form.reset();
}

// 获取调拨商品数据
function getTransferItems() {
    const items = [];
    const codes = document.getElementsByName('code[]');
    const names = document.getElementsByName('name[]');
    const specs = document.getElementsByName('spec[]');
    const quantities = document.getElementsByName('quantity[]');
    const remarks = document.getElementsByName('itemRemark[]');

    for (let i = 0; i < codes.length; i++) {
        items.push({
            code: codes[i].value,
            name: names[i].value,
            spec: specs[i].value,
            quantity: quantities[i].value,
            remark: remarks[i].value
        });
    }

    return items;
}

// 审核调拨
function approveTransfer(id) {
    // TODO: 实现审核功能
    console.log('审核调拨:', id);
}

// 确认调拨
function confirmTransfer(id) {
    // TODO: 实现确认功能
    console.log('确认调拨:', id);
}

// 查看详情
function viewDetail(id) {
    // TODO: 实现查看详情功能
    console.log('查看详情:', id);
}

// 导出详情
function exportDetail(id) {
    // TODO: 实现导出详情功能
    console.log('导出详情:', id);
}

// 查询调拨
function searchTransfer() {
    // TODO: 实现查询功能
}

// 导出调拨
function exportTransfer() {
    // TODO: 实现导出功能
}

// 显示弹窗
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

// 隐藏弹窗
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initPageData();
}); 