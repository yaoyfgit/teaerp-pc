// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    initPlanTable();
});

// 初始化计划表格
function initPlanTable() {
    const tbody = document.getElementById('planTable');
    tbody.innerHTML = mockData.plans.map(item => `
        <tr>
            <td>${item.planId}</td>
            <td>${item.planName}</td>
            <td>${item.planType}</td>
            <td>${item.startDate}</td>
            <td>${item.endDate}</td>
            <td>
                <div class="progress-bar">
                    <div class="progress" style="width: ${item.progress}%"></div>
                    <span class="progress-text">${item.progress}%</span>
                </div>
            </td>
            <td>
                <span class="status-badge ${getStatusClass(item.status)}">${item.status}</span>
            </td>
            <td class="operation-column">
                <button class="standard-button secondary" onclick="showPlanModal('${item.planId}')">
                    <i class="fas fa-edit"></i> 编辑
                </button>
                <button class="standard-button secondary" onclick="deletePlan('${item.planId}')">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </td>
        </tr>
    `).join('');
}

// 获取状态对应的样式类
function getStatusClass(status) {
    switch (status) {
        case '进行中':
            return 'info';
        case '延期中':
            return 'warning';
        case '已完成':
            return 'success';
        case '未开始':
            return 'secondary';
        default:
            return '';
    }
}

// 搜索计划
function searchPlans() {
    // TODO: 实现搜索逻辑
}

// 导出计划
function exportPlans() {
    // TODO: 实现导出逻辑
}

// 显示计划弹窗
function showPlanModal(planId) {
    const modal = document.getElementById('planModal');
    modal.style.display = 'block';
    if (planId) {
        // 编辑模式：加载计划数据
        const plan = mockData.plans.find(p => p.planId === planId);
        if (plan) {
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit"></i> 编辑计划';
            const form = document.getElementById('planForm');
            form.name.value = plan.planName;
            form.type.value = plan.planType;
            form.startDate.value = plan.startDate;
            form.endDate.value = plan.endDate;
        }
    } else {
        // 新增模式：清空表单
        document.getElementById('modalTitle').innerHTML = '<i class="fas fa-plus"></i> 新增计划';
        document.getElementById('planForm').reset();
    }
}

// 隐藏弹窗
function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// 保存计划
function savePlan() {
    // TODO: 实现保存逻辑
    hideModal('planModal');
}

// 删除计划
function deletePlan(planId) {
    if (confirm('确定要删除该计划吗？')) {
        // TODO: 实现删除逻辑
    }
} 