// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadDemands();
    loadStockCheck();
    loadBOMTree();
    loadPlans();
});

// 加载需求数据
function loadDemands() {
    // 加载销售订单需求
    const orderDemands = [
        {
            orderNo: 'SO001',
            product: '特级大红袍',
            quantity: 1000,
            dueDate: '2024-02-01',
            priority: '高',
            customerLevel: 'A'
        },
        {
            orderNo: 'SO002',
            product: '特级铁观音',
            quantity: 800,
            dueDate: '2024-02-15',
            priority: '中',
            customerLevel: 'B'
        }
    ];
    renderOrderDemands(orderDemands);

    // 加载预测需求
    const forecastDemands = [
        {
            product: '特级大红袍',
            quantity: 2000,
            type: '季节性需求',
            period: '2024-Q1'
        },
        {
            product: '特级铁观音',
            quantity: 1500,
            type: '促销计划',
            period: '2024-02'
        }
    ];
    renderForecastDemands(forecastDemands);

    // 加载安全库存需求
    const safetyStockDemands = [
        {
            product: '特级大红袍',
            currentStock: 500,
            minStock: 1000,
            maxStock: 5000,
            reorderPoint: 1500,
            reorderQuantity: 1000
        },
        {
            product: '特级铁观音',
            currentStock: 800,
            minStock: 1200,
            maxStock: 4000,
            reorderPoint: 1800,
            reorderQuantity: 800
        }
    ];
    renderSafetyStockDemands(safetyStockDemands);
}

// 渲染销售订单需求
function renderOrderDemands(demands) {
    const tbody = document.getElementById('orderDemandTable');
    tbody.innerHTML = demands.map(demand => `
        <tr>
            <td>${demand.orderNo}</td>
            <td>${demand.product}</td>
            <td>${demand.quantity}</td>
            <td>${demand.dueDate}</td>
            <td>${demand.priority}</td>
            <td>${demand.customerLevel}</td>
        </tr>
    `).join('');
}

// 渲染预测需求
function renderForecastDemands(demands) {
    const tbody = document.getElementById('forecastDemandTable');
    tbody.innerHTML = demands.map(demand => `
        <tr>
            <td>${demand.product}</td>
            <td>${demand.quantity}</td>
            <td>${demand.type}</td>
            <td>${demand.period}</td>
        </tr>
    `).join('');
}

// 渲染安全库存需求
function renderSafetyStockDemands(demands) {
    const tbody = document.getElementById('safetyStockTable');
    tbody.innerHTML = demands.map(demand => `
        <tr>
            <td>${demand.product}</td>
            <td>${demand.currentStock}</td>
            <td>${demand.minStock}</td>
            <td>${demand.maxStock}</td>
            <td>${demand.reorderPoint}</td>
            <td>${demand.reorderQuantity}</td>
        </tr>
    `).join('');
}

// 加载库存核查数据
function loadStockCheck() {
    const stocks = [
        {
            code: 'M001',
            name: '大红袍原料',
            currentStock: 2000,
            inTransit: 1000,
            safetyStock: 1500,
            reserved: 800,
            available: 700
        },
        {
            code: 'M002',
            name: '铁观音原料',
            currentStock: 1800,
            inTransit: 500,
            safetyStock: 1200,
            reserved: 600,
            available: 500
        }
    ];
    renderStockCheck(stocks);
}

// 渲染库存核查表格
function renderStockCheck(stocks) {
    const tbody = document.getElementById('stockCheckTable');
    tbody.innerHTML = stocks.map(stock => `
        <tr>
            <td>${stock.code}</td>
            <td>${stock.name}</td>
            <td>${stock.currentStock}</td>
            <td>${stock.inTransit}</td>
            <td>${stock.safetyStock}</td>
            <td>${stock.reserved}</td>
            <td>${stock.available}</td>
        </tr>
    `).join('');
}

// 加载BOM树
function loadBOMTree() {
    const bomData = {
        id: 'P001',
        name: '特级大红袍',
        quantity: 1000,
        children: [
            {
                id: 'M001',
                name: '大红袍原料',
                quantity: 1200,
                unit: 'kg'
            },
            {
                id: 'M002',
                name: '内包装',
                quantity: 1000,
                unit: '个',
                children: [
                    {
                        id: 'M003',
                        name: '铝箔袋',
                        quantity: 1000,
                        unit: '个'
                    },
                    {
                        id: 'M004',
                        name: '标签',
                        quantity: 1000,
                        unit: '张'
                    }
                ]
            },
            {
                id: 'M005',
                name: '外包装',
                quantity: 200,
                unit: '箱',
                children: [
                    {
                        id: 'M006',
                        name: '纸箱',
                        quantity: 200,
                        unit: '个'
                    },
                    {
                        id: 'M007',
                        name: '胶带',
                        quantity: 400,
                        unit: '米'
                    }
                ]
            }
        ]
    };
    renderBOMTree(bomData);
}

// 渲染BOM树
function renderBOMTree(data, level = 0) {
    const container = document.getElementById('bomTree');
    if (level === 0) {
        container.innerHTML = '';
    }

    const item = document.createElement('div');
    item.className = 'bom-item';
    item.style.marginLeft = `${level * 20}px`;
    
    item.innerHTML = `
        <div class="bom-header">
            <span class="bom-code">${data.id}</span>
            <span class="bom-name">${data.name}</span>
            <span class="bom-quantity">${data.quantity}${data.unit || ''}</span>
        </div>
    `;

    container.appendChild(item);

    if (data.children) {
        data.children.forEach(child => {
            renderBOMTree(child, level + 1);
        });
    }
}

// 加载计划数据
function loadPlans() {
    // 加载生产计划
    const productionPlans = [
        {
            product: '特级大红袍',
            quantity: 1000,
            startDate: '2024-01-20',
            endDate: '2024-01-25',
            workshop: '制茶一车间',
            workstation: '炒茶工位'
        },
        {
            product: '特级铁观音',
            quantity: 800,
            startDate: '2024-01-26',
            endDate: '2024-01-30',
            workshop: '制茶二车间',
            workstation: '炒茶工位'
        }
    ];
    renderProductionPlans(productionPlans);

    // 加载采购计划
    const purchasePlans = [
        {
            material: '大红袍原料',
            quantity: 1200,
            supplier: '福建茶叶供应商',
            leadTime: '7天',
            expectedDate: '2024-01-18'
        },
        {
            material: '铝箔袋',
            quantity: 2000,
            supplier: '包装材料供应商',
            leadTime: '3天',
            expectedDate: '2024-01-15'
        }
    ];
    renderPurchasePlans(purchasePlans);
}

// 渲染生产计划
function renderProductionPlans(plans) {
    const tbody = document.getElementById('productionPlanTable');
    tbody.innerHTML = plans.map(plan => `
        <tr>
            <td>${plan.product}</td>
            <td>${plan.quantity}</td>
            <td>${plan.startDate}</td>
            <td>${plan.endDate}</td>
            <td>${plan.workshop}</td>
            <td>${plan.workstation}</td>
        </tr>
    `).join('');
}

// 渲染采购计划
function renderPurchasePlans(plans) {
    const tbody = document.getElementById('purchasePlanTable');
    tbody.innerHTML = plans.map(plan => `
        <tr>
            <td>${plan.material}</td>
            <td>${plan.quantity}</td>
            <td>${plan.supplier}</td>
            <td>${plan.leadTime}</td>
            <td>${plan.expectedDate}</td>
        </tr>
    `).join('');
}

// 保存草稿
function saveDraft() {
    // TODO: 调用API保存草稿
    console.log('保存草稿');
    showMessage('草稿已保存');
}

// 执行MRP运算
function executeMRP() {
    // TODO: 调用API执行MRP运算
    console.log('执行MRP运算');
    showMessage('MRP运算已启动');
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 