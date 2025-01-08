// 初始化页面数据
function initPageData() {
    // 初始化统计数据
    initOverview();
    // 初始化表格数据
    initTableData();
}

// 初始化统计数据
function initOverview() {
    const overviewData = {
        warningCount: 12,
        stockoutCount: 5,
        overstockCount: 8,
        processedCount: 15
    };

    document.querySelector('.overview-item:nth-child(1) .number').textContent = overviewData.warningCount;
    document.querySelector('.overview-item:nth-child(2) .number').textContent = overviewData.stockoutCount;
    document.querySelector('.overview-item:nth-child(3) .number').textContent = overviewData.overstockCount;
    document.querySelector('.overview-item:nth-child(4) .number').textContent = overviewData.processedCount;
}

// 初始化表格数据
function initTableData() {
    const warningData = [
        {
            id: 1,
            code: 'P001',
            name: '大红袍',
            category: '乌龙茶',
            spec: '250g/盒',
            warehouse: '主仓库',
            stock: 10,
            warningValue: 20,
            type: 'warning',
            time: '2024-01-20 10:30:00',
            status: 'pending'
        },
        {
            id: 2,
            code: 'P002',
            name: '铁观音',
            category: '乌龙茶',
            spec: '100g/盒',
            warehouse: '主仓库',
            stock: 0,
            warningValue: 10,
            type: 'stockout',
            time: '2024-01-20 11:20:00',
            status: 'pending'
        },
        {
            id: 3,
            code: 'P003',
            name: '龙井',
            category: '绿茶',
            spec: '50g/盒',
            warehouse: '次仓库',
            stock: 200,
            warningValue: 100,
            type: 'overstock',
            time: '2024-01-20 14:15:00',
            status: 'processed'
        }
    ];

    renderWarningTable(warningData);
}

// 渲染预警表格
function renderWarningTable(data) {
    const tbody = document.getElementById('warningTable');
    tbody.innerHTML = data.map(item => `
        <tr>
            <td>
                <input type="checkbox" class="standard-checkbox" value="${item.id}">
            </td>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.spec}</td>
            <td>${item.warehouse}</td>
            <td>${item.stock}</td>
            <td>${item.warningValue}</td>
            <td><span class="stock-status ${item.type}">${formatWarningType(item.type)}</span></td>
            <td>${item.time}</td>
            <td><span class="check-status ${item.status}">${formatStatus(item.status)}</span></td>
            <td>
                <div class="button-group">
                    <button class="standard-button" onclick="processWarning(${item.id})">
                        <i class="fas fa-check"></i> 处理
                    </button>
                    <button class="standard-button" onclick="viewDetail(${item.id})">
                        <i class="fas fa-eye"></i> 查看
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 格式化预警类型
function formatWarningType(type) {
    const typeMap = {
        warning: '库存预警',
        stockout: '缺货预警',
        overstock: '积压预警'
    };
    return typeMap[type] || type;
}

// 格式化状态
function formatStatus(status) {
    const statusMap = {
        pending: '待处理',
        processing: '处理中',
        processed: '已处理'
    };
    return statusMap[status] || status;
}

// 全选/取消全选
function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('#warningTable input[type="checkbox"]');
    checkboxes.forEach(item => {
        item.checked = checkbox.checked;
    });
}

// 查询预警
function searchWarning() {
    // TODO: 实现查询功能
}

// 导出预警
function exportWarning() {
    // TODO: 实现导出功能
}

// 批量处理
function batchProcess() {
    const selectedIds = [];
    const checkboxes = document.querySelectorAll('#warningTable input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        selectedIds.push(checkbox.value);
    });

    if (selectedIds.length === 0) {
        alert('请选择要处理的预警记录');
        return;
    }

    showModal('processModal');
}

// 处理单个预警
function processWarning(id) {
    // 设置当前处理的预警ID
    document.getElementById('processForm').dataset.warningId = id;
    showModal('processModal');
}

// 查看详情
function viewDetail(id) {
    // TODO: 实现查看详情功能
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

// 提交处理
function submitProcess() {
    const form = document.getElementById('processForm');
    const warningId = form.dataset.warningId;
    const formData = new FormData(form);

    // TODO: 发送处理请求到后端
    console.log('处理预警:', {
        warningId,
        processType: formData.get('processType'),
        remark: formData.get('remark')
    });

    hideModal('processModal');
    form.reset();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initPageData();
}); 