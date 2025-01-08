// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadAdjustments();
    loadPlans();
});

// 加载调整记录
function loadAdjustments(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                id: 'A001',
                planId: 'P001',
                planName: '2024年1月生产计划',
                type: 'quantity',
                reason: '设备故障影响产能',
                content: '调整产量从10000降至8000',
                applicant: '张三',
                applyTime: '2024-01-15 10:00',
                status: 'pending'
            }
        ],
        total: 1
    };

    renderAdjustmentTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染调整记录表格
function renderAdjustmentTable(items) {
    const tbody = document.getElementById('adjustmentTable');
    tbody.innerHTML = items.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.planName}</td>
            <td>${getAdjustmentType(item.type)}</td>
            <td>${item.reason}</td>
            <td>${item.content}</td>
            <td>${item.applicant}</td>
            <td>${item.applyTime}</td>
            <td><span class="status-tag ${getAdjustmentStatusClass(item.status)}">
                ${getAdjustmentStatus(item.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewAdjustment('${item.id}')">查看</a>
                ${item.status === 'pending' ? `
                    <a href="javascript:void(0)" class="action-link" onclick="approveAdjustment('${item.id}')">审批</a>
                    <a href="javascript:void(0)" class="action-link" onclick="cancelAdjustment('${item.id}')">撤销</a>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

// 获取调整类型文本
function getAdjustmentType(type) {
    const types = {
        quantity: '产量调整',
        schedule: '进度调整',
        resource: '资源调整'
    };
    return types[type] || '未知';
}

// 获取调整状态文本
function getAdjustmentStatus(status) {
    const statuses = {
        pending: '待审批',
        approved: '已通过',
        rejected: '已驳回'
    };
    return statuses[status] || '未知';
}

// 获取调整状态样式类
function getAdjustmentStatusClass(status) {
    const classes = {
        pending: 'status-warning',
        approved: 'status-success',
        rejected: 'status-error'
    };
    return classes[status] || '';
}

// 加载计划列表
function loadPlans() {
    // TODO: 从后端获取计划列表
    const plans = [
        { id: 'P001', name: '2024年1月生产计划' },
        { id: 'P002', name: '2024年第2周生产计划' }
    ];
    
    const select = document.querySelector('select[name="planId"]');
    plans.forEach(plan => {
        const option = document.createElement('option');
        option.value = plan.id;
        option.textContent = plan.name;
        select.appendChild(option);
    });
}

// 提交调整申请
function submitAdjustment() {
    const form = document.getElementById('adjustForm');
    const formData = new FormData(form);
    const adjustment = Object.fromEntries(formData.entries());
    
    // TODO: 调用API提交调整申请
    console.log('提交调整:', adjustment);
    
    hideModal('adjustModal');
    loadAdjustments();
    showMessage('调整申请已提交');
}

// 审批调整
function approveAdjustment(id) {
    if (confirm('确定要通过该调整申请吗？')) {
        // TODO: 调用API审批调整
        console.log('审批调整:', id);
        loadAdjustments();
        showMessage('调整��审批通过');
    }
}

// 撤销调整
function cancelAdjustment(id) {
    if (confirm('确定要撤销该调整申请吗？')) {
        // TODO: 调用API撤销调整
        console.log('撤销调整:', id);
        loadAdjustments();
        showMessage('调整已撤销');
    }
}

// 搜索调整记录
function searchAdjustments() {
    loadAdjustments(1);
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadAdjustments(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadAdjustments(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadAdjustments(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 