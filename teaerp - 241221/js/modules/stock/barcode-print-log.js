// 打印记录管理
document.addEventListener('DOMContentLoaded', function() {
    initPrintLog();
});

// 初始化打印记录管理
function initPrintLog() {
    // 加载打印记录列表
    loadPrintLogs();
    // 设置默认日期范围
    setDefaultDateRange();
    // 绑定事件
    bindEvents();
}

// 设置默认日期范围(近30天)
function setDefaultDateRange() {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    document.querySelector('[name="startDate"]').value = formatDate(startDate);
    document.querySelector('[name="endDate"]').value = formatDate(endDate);
}

// 加载打印记录列表
function loadPrintLogs(page = 1) {
    // 模拟API调用
    const logs = [
        {
            id: 'P202403200001',
            type: 'product',
            content: '大红袍-特级 x 100',
            template: '商品标签模板',
            printer: 'HP-1020',
            quantity: 100,
            printTime: '2024-03-20 10:00:00',
            operator: '张三',
            status: 'success'
        },
        {
            id: 'P202403200002',
            type: 'location',
            content: '主仓库-A区货架标签',
            template: '库位标签模板',
            printer: 'HP-1020',
            quantity: 50,
            printTime: '2024-03-20 11:00:00',
            operator: '李四',
            status: 'failed',
            error: '打印机缺纸'
        }
    ];
    
    renderPrintLogs(logs);
}

// 渲染打印记录列表
function renderPrintLogs(logs) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = logs.map(log => `
        <tr>
            <td>${log.id}</td>
            <td>${getPrintTypeName(log.type)}</td>
            <td>${log.content}</td>
            <td>${log.template}</td>
            <td>${log.printer}</td>
            <td>${log.quantity}</td>
            <td>${log.printTime}</td>
            <td>${log.operator}</td>
            <td><span class="status ${log.status}">${getStatusName(log.status)}</span></td>
            <td>
                <button class="button-link" onclick="viewPrintDetail('${log.id}')">详情</button>
                ${log.status === 'failed' ? `
                    <button class="button-link" onclick="retryPrint('${log.id}')">重试</button>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

// 绑定事件
function bindEvents() {
    // 搜索按钮点击事件
    document.querySelector('.search-bar .button').addEventListener('click', searchLogs);
    
    // 日期范围变化事件
    document.querySelector('[name="startDate"]').addEventListener('change', validateDateRange);
    document.querySelector('[name="endDate"]').addEventListener('change', validateDateRange);
}

// 搜索记录
function searchLogs() {
    const keyword = document.querySelector('.search-bar input').value;
    const type = document.querySelector('[name="printType"]').value;
    const status = document.querySelector('[name="status"]').value;
    const startDate = document.querySelector('[name="startDate"]').value;
    const endDate = document.querySelector('[name="endDate"]').value;
    
    // TODO: 调用后端API搜索记录
    console.log('搜索条件:', { keyword, type, status, startDate, endDate });
}

// 验证日期范围
function validateDateRange() {
    const startDate = document.querySelector('[name="startDate"]').value;
    const endDate = document.querySelector('[name="endDate"]').value;
    
    if (startDate && endDate && startDate > endDate) {
        alert('开始日期不能大于结束日期');
        return false;
    }
    return true;
}

// 查看打印详情
function viewPrintDetail(id) {
    // 模拟API调用获取详情
    const detail = {
        id: 'P202403200001',
        type: 'product',
        content: '大红袍-特级 x 100',
        template: '商品标签模板',
        printer: 'HP-1020',
        quantity: 100,
        printTime: '2024-03-20 10:00:00',
        operator: '张三',
        status: 'success',
        parameters: {
            dpi: 300,
            speed: '4 inch/s',
            temperature: 8
        }
    };
    
    showPrintDetail(detail);
}

// 显示打印详情
function showPrintDetail(detail) {
    const modal = document.getElementById('printDetailModal');
    
    // 填充基本信息
    modal.querySelector('[class="label"]:contains("任务编号") + .value').textContent = detail.id;
    modal.querySelector('[class="label"]:contains("打印类型") + .value').textContent = getPrintTypeName(detail.type);
    modal.querySelector('[class="label"]:contains("打印时间") + .value').textContent = detail.printTime;
    modal.querySelector('[class="label"]:contains("打印人") + .value').textContent = detail.operator;
    
    // 填充打印设置
    modal.querySelector('[class="label"]:contains("打印机") + .value').textContent = detail.printer;
    modal.querySelector('[class="label"]:contains("打印模板") + .value').textContent = detail.template;
    modal.querySelector('[class="label"]:contains("打印数量") + .value').textContent = detail.quantity;
    modal.querySelector('[class="label"]:contains("打印参数") + .value').textContent = 
        JSON.stringify(detail.parameters, null, 2);
    
    // 显示错误信息(如果有)
    const errorSection = modal.querySelector('.error-section');
    if (detail.error) {
        errorSection.style.display = 'block';
        errorSection.querySelector('.error-message').textContent = detail.error;
    } else {
        errorSection.style.display = 'none';
    }
    
    // 显示重试按钮(仅失败状态)
    modal.querySelector('.retry-btn').style.display = detail.status === 'failed' ? 'inline-block' : 'none';
    
    modal.style.display = 'flex';
}

// 重试打印
function retryPrint(id) {
    if (!confirm('确定要重新打印吗？')) return;
    
    // TODO: 调用打印功能
    console.log('重新打印:', id);
    alert('开始重新打印');
    hideModal('printDetailModal');
}

// 导出记录
function exportLog() {
    const startDate = document.querySelector('[name="startDate"]').value;
    const endDate = document.querySelector('[name="endDate"]').value;
    
    if (!validateDateRange()) return;
    
    // TODO: 调用导出功能
    console.log('导出记录:', { startDate, endDate });
    alert('记录导出成功');
}

// 清空记录
function clearLog() {
    if (!confirm('确定要清空所有打印记录吗？此操作不可恢复！')) return;
    
    // TODO: 调用清空功能
    console.log('清空记录');
    alert('记录已清空');
    loadPrintLogs();
}

// 获取打印类型名称
function getPrintTypeName(type) {
    const types = {
        product: '商品标签',
        location: '库位标签',
        batch: '批次标签'
    };
    return types[type] || type;
}

// 获取状态名称
function getStatusName(status) {
    const statuses = {
        success: '打印成功',
        failed: '打印失败',
        cancelled: '已取消'
    };
    return statuses[status] || status;
}

// 格式化日期
function formatDate(date) {
    return date.toISOString().split('T')[0];
}