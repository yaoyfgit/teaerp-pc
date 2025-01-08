// 打开弹窗
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// 关闭弹窗
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// 切换标签页
function switchTab(event, tabId) {
    const tabItem = event.target;
    const tabPane = document.getElementById(tabId);
    
    // 移除所有标签页的active类
    document.querySelectorAll('.tab-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // 添加当前标签页的active类
    tabItem.classList.add('active');
    if (tabPane) {
        tabPane.classList.add('active');
    }
}

// 初始化标签页事件
document.addEventListener('DOMContentLoaded', function() {
    // 为所有标签页添加点击事件
    document.querySelectorAll('.tab-item').forEach(item => {
        item.addEventListener('click', function(e) {
            const tabId = this.getAttribute('data-tab');
            switchTab(e, tabId + 'Settings');
        });
    });
});

// 搜索预警记录
function searchWarning() {
    // 实现搜索逻辑
    console.log('搜索预警记录');
}

// 导出预警记录
function exportWarning() {
    // 实现导出逻辑
    console.log('导出预警记录');
}

// 保存预警设置
function saveSettings() {
    // 实现保存设置逻辑
    console.log('保存预警设置');
    closeModal('settingModal');
}

// 处理预警
function handleWarning() {
    // 实现预警处理逻辑
    console.log('处理预警');
    closeModal('handleModal');
}

// 编辑规则
function editRule(ruleId) {
    // 实现编辑规则逻辑
    console.log('编辑规则:', ruleId);
}

// 删除规则
function deleteRule(ruleId) {
    // 实现删除规则逻辑
    console.log('删除规则:', ruleId);
} 