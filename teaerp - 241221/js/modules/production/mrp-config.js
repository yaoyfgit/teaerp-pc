// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadConfig();
});

// 加载配置
function loadConfig() {
    // TODO: 从后端加载配置数据
    const config = {
        executeTime: '23:00',
        frequency: 'daily',
        range: 30,
        triggerType: 'auto',
        leadTime: 7,
        safetyStock: 1.2,
        minBatch: 100,
        batchMultiple: 50
    };

    // 填充表单
    Object.keys(config).forEach(key => {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) {
            if (input.type === 'radio') {
                document.querySelector(`[name="${key}"][value="${config[key]}"]`).checked = true;
            } else {
                input.value = config[key];
            }
        }
    });
}

// 保存配置
function saveConfig() {
    const forms = document.querySelectorAll('form');
    const config = {};
    
    forms.forEach(form => {
        const formData = new FormData(form);
        for (let [key, value] of formData.entries()) {
            config[key] = value;
        }
    });

    // TODO: 调用API保存配置
    console.log('保存配置:', config);
    showMessage('配置已保存');
}

// 重置配置
function resetConfig() {
    if (confirm('确定要重置配置吗？')) {
        document.querySelectorAll('form').forEach(form => form.reset());
        loadConfig();
        showMessage('配置已重置');
    }
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 