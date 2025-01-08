// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    initConfig();
});

// 初始化配置
function initConfig() {
    const config = mrpMockData.config;
    
    // 初始化定时运算设置
    const timingForm = document.querySelector('form');
    timingForm.executeTime.value = config.timing.executeTime;
    timingForm.frequency.value = config.timing.frequency;
    timingForm.range.value = config.timing.range;
    timingForm.querySelector(`input[name="triggerType"][value="${config.timing.triggerType}"]`).checked = true;

    // 初始化运算参数设置
    const paramForm = document.querySelectorAll('form')[1];
    paramForm.leadTime.value = config.parameters.leadTime;
    paramForm.safetyStock.value = config.parameters.safetyStock;
    paramForm.minBatch.value = config.parameters.minBatch;
    paramForm.batchMultiple.value = config.parameters.batchMultiple;
}

// 重置配置
function resetConfig() {
    if (confirm('确定要重置配置吗？')) {
        initConfig();
    }
}

// 保存配置
function saveConfig() {
    // TODO: 实现保存配置逻辑
    alert('保存配置成功');
} 