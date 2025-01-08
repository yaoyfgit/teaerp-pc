// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initDateRange();
});

// 初始化日期范围
function initDateRange() {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 1); // 从明天开始
    
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 30); // 默认30天
    
    document.querySelector('input[name="startDate"]').value = formatDate(startDate);
    document.querySelector('input[name="endDate"]').value = formatDate(endDate);
}

// 运行MRP
function runMRP() {
    const form = document.getElementById('mrpForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API运行MRP
    console.log('运行MRP:', data);
    
    // 模拟运算结果
    const mockResult = {
        items: [
            {
                code: 'P001',
                name: '特级大红袍',
                type: 'product',
                demandQty: 1000,
                stockQty: 200,
                inTransitQty: 0,
                suggestPurchaseQty: 0,
                suggestProductQty: 800,
                demandDate: '2024-03-25'
            },
            {
                code: 'M001',
                name: '大红袍原料',
                type: 'material',
                demandQty: 900,
                stockQty: 100,
                inTransitQty: 200,
                suggestPurchaseQty: 600,
                suggestProductQty: 0,
                demandDate: '2024-03-23'
            }
        ],
        total: 2
    };
    
    showMRPResult(mockResult);
}

// 显示MRP结果
function showMRPResult(result) {
    document.querySelector('.mrp-result').style.display = 'block';
    renderMRPTable(result.items);
    renderPagination(result.total, 1);
}

// 渲染MRP结果表格
function renderMRPTable(items) {
    const tbody = document.getElementById('mrpResultTable');
    tbody.innerHTML = items.map(item => `
        <tr>
            <td><input type="checkbox" value="${item.code}"></td>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${getItemTypeText(item.type)}</td>
            <td>${item.demandQty}</td>
            <td>${item.stockQty}</td>
            <td>${item.inTransitQty}</td>
            <td>${item.suggestPurchaseQty}</td>
            <td>${item.suggestProductQty}</td>
            <td>${item.demandDate}</td>
        </tr>
    `).join('');
}

// 生成计划
function generatePlan() {
    const selectedItems = Array.from(document.querySelectorAll('#mrpResultTable input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    
    if (selectedItems.length === 0) {
        Message.show('请选择需要生成计划的物料', 'warning');
        return;
    }
    
    // TODO: 调用API生成计划
    console.log('生成计划:', selectedItems);
    Message.show('计划生成成功', 'success');
}

// 导出MRP结果
function exportMRP() {
    // TODO: 实现导出功能
    Message.show('导出成功', 'success');
}

// 重置表单
function resetForm() {
    document.getElementById('mrpForm').reset();
    initDateRange();
    document.querySelector('.mrp-result').style.display = 'none';
}

// 工具函数
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function getItemTypeText(type) {
    const typeMap = {
        product: '产成品',
        material: '原材料'
    };
    return typeMap[type] || '未知';
}

// 全选/取消全选
function toggleAllItems(checkbox) {
    const checkboxes = document.querySelectorAll('#mrpResultTable input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = checkbox.checked);
}

// 搜索MRP结果
function searchMRPResult() {
    // TODO: 实现搜索功能
    console.log('搜索MRP结果');
} 