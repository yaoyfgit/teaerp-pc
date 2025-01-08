// 弹窗相关函数
window.showModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

window.hideModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// 加载计划信息
window.loadPlanInfo = function(planId) {
    if (!planId) return;

    // 模拟数据
    const planData = {
        'PL202403200001': {
            value: 1000,
            startDate: '2024-01-01',
            endDate: '2024-03-31'
        },
        'PL202403200002': {
            value: 50,
            startDate: '2024-01-01',
            endDate: '2024-03-31'
        },
        'PL202403200003': {
            value: 100,
            startDate: '2024-01-01',
            endDate: '2024-03-31'
        }
    };

    const plan = planData[planId];
    if (plan) {
        document.querySelector('input[name="originalValue"]').value = plan.value;
        document.querySelector('input[name="originalStartDate"]').value = plan.startDate;
        document.querySelector('input[name="originalEndDate"]').value = plan.endDate;
    }
}

// 处理调整类型变化
window.handleAdjustTypeChange = function(type) {
    const valueAdjustFields = document.querySelectorAll('.value-adjust');
    const dateAdjustFields = document.querySelectorAll('.date-adjust');

    if (type === 'value') {
        valueAdjustFields.forEach(field => field.style.display = 'block');
        dateAdjustFields.forEach(field => field.style.display = 'none');
    } else if (type === 'date') {
        valueAdjustFields.forEach(field => field.style.display = 'none');
        dateAdjustFields.forEach(field => field.style.display = 'block');
    } else {
        valueAdjustFields.forEach(field => field.style.display = 'none');
        dateAdjustFields.forEach(field => field.style.display = 'none');
    }
}

// 查看调整申请
window.viewAdjust = function(id) {
    // TODO: 加载调整申请详情
    showModal('viewModal');
}

// 审批调整申请
window.approveAdjust = function(id) {
    // TODO: 加载审批详情
    showModal('approveModal');
}

// 保存调整申请
window.saveAdjustment = function() {
    const form = document.getElementById('adjustForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // TODO: 实现保存逻辑
    hideModal('adjustModal');
    alert('调整申请已提交');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化表单事件
    const adjustTypeSelect = document.querySelector('select[name="adjustType"]');
    if (adjustTypeSelect) {
        handleAdjustTypeChange(adjustTypeSelect.value);
    }
}); 