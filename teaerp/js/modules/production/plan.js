// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadPlanList();
});

// 加载生产计划列表
function loadPlanList(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                planNo: 'PP202403001',
                productCode: 'P001',
                productName: '特级大红袍',
                quantity: 1000,
                startDate: '2024-03-20',
                endDate: '2024-03-25',
                status: 'draft'
            },
            {
                planNo: 'PP202403002',
                productCode: 'P002',
                productName: '特级铁观音',
                quantity: 500,
                startDate: '2024-03-21',
                endDate: '2024-03-26',
                status: 'confirmed'
            }
        ],
        total: 2
    };

    renderPlanTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染生产计划表格
function renderPlanTable(items) {
    const tbody = document.getElementById('planTable');
    tbody.innerHTML = items.map(item => `
        <tr>
            <td>${item.planNo}</td>
            <td>${item.productCode}</td>
            <td>${item.productName}</td>
            <td>${item.quantity}</td>
            <td>${item.startDate}</td>
            <td>${item.endDate}</td>
            <td><span class="status-tag ${getStatusClass(item.status)}">
                ${getStatusText(item.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" onclick="editPlan('${item.planNo}')">编辑</a>
                <a href="javascript:void(0)" onclick="confirmPlan('${item.planNo}')">确认</a>
                <a href="javascript:void(0)" onclick="deletePlan('${item.planNo}')">删除</a>
            </td>
        </tr>
    `).join('');
}

// 导入MRP计划
function importMRPPlan() {
    // TODO: 实现MRP计划导入逻辑
    Message.show('功能开发中...', 'info');
}

// 显示新增计划弹窗
function showAddPlanModal() {
    document.getElementById('planForm').reset();
    showModal('planModal');
}

// 保存生产计划
function savePlan() {
    const form = document.getElementById('planForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存数据
    console.log('保存生产计划:', data);
    
    hideModal('planModal');
    Message.show('保存成功', 'success');
    loadPlanList();
}

// 显示产品选择器
function showProductSelector() {
    // TODO: 实现产品选择功能
    Message.show('功能开发中...', 'info');
}

// 状态相关函数
function getStatusClass(status) {
    const statusMap = {
        draft: 'status-pending',
        confirmed: 'status-processing',
        processing: 'status-processing',
        completed: 'status-completed'
    };
    return statusMap[status] || 'status-pending';
}

function getStatusText(status) {
    const statusMap = {
        draft: '草稿',
        confirmed: '已确认',
        processing: '执行中',
        completed: '已完成'
    };
    return statusMap[status] || '未知';
} 