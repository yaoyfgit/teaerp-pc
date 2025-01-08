// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    initOrderDemand();
    initForecastDemand();
    initStockCheck();
    initSafetyStockTable();
    initBomTree();
    initProductionPlan();
    initPurchasePlan();
});

// 初始化订单需求表格
function initOrderDemand() {
    const tbody = document.getElementById('orderDemandTable');
    tbody.innerHTML = mrpMockData.execute.orderDemand.map(item => `
        <tr>
            <td>${item.orderId}</td>
            <td>${item.product}</td>
            <td>${item.quantity}</td>
            <td>${item.dueDate}</td>
            <td>
                <span class="status-badge ${item.priority === '高' ? 'warning' : 'info'}">
                    ${item.priority}
                </span>
            </td>
            <td>
                <span class="status-badge ${item.customerLevel === 'A' ? 'success' : 'secondary'}">
                    ${item.customerLevel}
                </span>
            </td>
        </tr>
    `).join('');
}

// 初始化预测需求表格
function initForecastDemand() {
    const tbody = document.getElementById('forecastDemandTable');
    tbody.innerHTML = mrpMockData.execute.forecastDemand.map(item => `
        <tr>
            <td>${item.product}</td>
            <td>${item.quantity}</td>
            <td>${item.type}</td>
            <td>${item.period}</td>
        </tr>
    `).join('');
}

// 初始化库存核查表格
function initStockCheck() {
    const tbody = document.getElementById('stockCheckTable');
    tbody.innerHTML = mrpMockData.execute.stockCheck.map(item => `
        <tr>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.currentStock}</td>
            <td>${item.incomingStock}</td>
            <td>${item.safetyStock}</td>
            <td>${item.reservedStock}</td>
            <td>
                <span class="status-badge ${item.availableStock > item.safetyStock ? 'success' : 'warning'}">
                    ${item.availableStock}
                </span>
            </td>
        </tr>
    `).join('');
}

// 初始化安全库存需求表格
function initSafetyStockTable() {
    const tbody = document.getElementById('safetyStockTable');
    tbody.innerHTML = mrpMockData.execute.safetyStockDemand.map(item => `
        <tr>
            <td>${item.product}</td>
            <td>${item.currentStock}</td>
            <td>${item.minStock}</td>
            <td>${item.maxStock}</td>
            <td>${item.reorderPoint}</td>
            <td>
                <span class="status-badge ${item.currentStock < item.reorderPoint ? 'warning' : 'success'}">
                    ${item.reorderQty}
                </span>
            </td>
        </tr>
    `).join('');
}

// 初始化BOM树
function initBomTree() {
    const bomTree = document.getElementById('bomTree');
    bomTree.innerHTML = renderBomNodes(mrpMockData.execute.bomTree);
}

// 渲染BOM节点
function renderBomNodes(nodes) {
    return nodes.map(node => `
        <div class="bom-node">
            <div class="bom-node-content">
                <span class="bom-node-id">${node.id}</span>
                <span class="bom-node-name">${node.product || node.material}</span>
                <span class="bom-node-qty">${node.quantity} ${node.unit || '件'}</span>
            </div>
            ${node.children && node.children.length > 0 ? 
                `<div class="bom-node-children">
                    ${renderBomNodes(node.children)}
                </div>` 
                : ''
            }
        </div>
    `).join('');
}

// 初始化生产计划表格
function initProductionPlan() {
    const tbody = document.getElementById('productionPlanTable');
    tbody.innerHTML = mrpMockData.execute.productionPlan.map(item => `
        <tr>
            <td>${item.product}</td>
            <td>${item.quantity}</td>
            <td>${item.startDate}</td>
            <td>${item.endDate}</td>
            <td>${item.workshop}</td>
            <td>${item.workstation}</td>
        </tr>
    `).join('');
}

// 初始化采购计划表格
function initPurchasePlan() {
    const tbody = document.getElementById('purchasePlanTable');
    tbody.innerHTML = mrpMockData.execute.purchasePlan.map(item => `
        <tr>
            <td>${item.material}</td>
            <td>${item.quantity}</td>
            <td>${item.supplier}</td>
            <td>${item.leadTime}</td>
            <td>${item.expectedDate}</td>
        </tr>
    `).join('');
}

// 保存草稿
function saveDraft() {
    // TODO: 实现保存草稿逻辑
    alert('保存草稿成功');
}

// 执行MRP运算
function executeMRP() {
    if (confirm('确定要执行MRP运算吗？')) {
        // TODO: 实现MRP运算逻辑
    }
} 