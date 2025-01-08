// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();  // 加载左侧菜单
    initCategorySelect();  // 初始化商品分类下拉框
    loadWarningData();  // 加载预警数据
    initEventListeners();  // 初始化事件监听
});

// 初始化事件监听
function initEventListeners() {
    // 搜索框回车事件
    document.getElementById('searchKeyword').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchWarnings();
        }
    });

    // 预警类型切换事件
    document.getElementById('warningTypeSelect').addEventListener('change', searchWarnings);
    
    // 商品分类切换事件
    document.getElementById('categorySelect').addEventListener('change', searchWarnings);
}

// 初始化商品分类下拉框
function initCategorySelect() {
    fetch('/api/category/list')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('categorySelect');
            select.innerHTML = '<option value="">商品分类</option>' + 
                data.map(category => `<option value="${category.id}">${category.name}</option>`).join('');
        });
}

// 加载预警数据
function loadWarningData() {
    // 加载汇总数据
    loadSummaryData();
    // 加载预警列表
    loadWarningList();
}

// 加载汇总数据
function loadSummaryData() {
    // TODO: 替换为实际的API调用
    const mockData = {
        lowStock: 15,
        highStock: 8,
        expiring: 5,
        normal: 120
    };
    
    document.getElementById('lowStockCount').textContent = mockData.lowStock;
    document.getElementById('highStockCount').textContent = mockData.highStock;
    document.getElementById('expiringCount').textContent = mockData.expiring;
    document.getElementById('normalCount').textContent = mockData.normal;
    
    /* 实际API调用代码
    fetch('/api/stock/warning/summary')
        .then(response => response.json())
        .then(data => {
            document.getElementById('lowStockCount').textContent = data.lowStock || 0;
            document.getElementById('highStockCount').textContent = data.highStock || 0;
            document.getElementById('expiringCount').textContent = data.expiring || 0;
            document.getElementById('normalCount').textContent = data.normal || 0;
        });
    */
}

// 加载预警列表
function loadWarningList(page = 1) {
    // TODO: 替换为实际的API调用
    const mockData = {
        items: [
            {
                productCode: 'P001',
                productName: '大红袍',
                specification: '特级',
                warehouseName: '主仓库',
                currentStock: 10,
                minStock: 20,
                maxStock: 100,
                productionDate: '2024-01-01',
                expiryDate: '2024-12-31',
                warningType: 'low'
            },
            {
                productCode: 'P002',
                productName: '铁观音',
                specification: '特级',
                warehouseName: '主仓库',
                currentStock: 150,
                minStock: 20,
                maxStock: 100,
                productionDate: '2024-01-01',
                expiryDate: '2024-12-31',
                warningType: 'high'
            }
        ],
        total: 2
    };
    
    renderWarningTable(mockData.items);
    renderPagination(mockData.total, page);
    
    /* 实际API调用代码
    const params = {
        keyword: document.getElementById('searchKeyword').value,
        warningType: document.getElementById('warningTypeSelect').value,
        categoryId: document.getElementById('categorySelect').value,
        page: page,
        pageSize: 10
    };
 
    fetch('/api/stock/warning/list?' + new URLSearchParams(params))
        .then(response => response.json())
        .then(data => {
            renderWarningTable(data.items);
            renderPagination(data.total, page);
        });
    */
}

// 渲染预警表格
function renderWarningTable(items) {
    const tbody = document.getElementById('warningTable');
    tbody.innerHTML = items.map(item => `
        <tr>
            <td>${item.productCode}</td>
            <td>${item.productName}</td>
            <td>${item.specification}</td>
            <td>${item.warehouseName}</td>
            <td>${item.currentStock}</td>
            <td>${item.minStock}</td>
            <td>${item.maxStock}</td>
            <td>${formatDate(item.productionDate)}</td>
            <td>${formatDate(item.expiryDate)}</td>
            <td><span class="tag ${getWarningTagClass(item.warningType)}">${getWarningTypeText(item.warningType)}</span></td>
            <td>${getActionButtons(item)}</td>
        </tr>
    `).join('');
}

// 格式化日期
function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('zh-CN');
}

// 获取预警标签样式
function getWarningTagClass(type) {
    const classMap = {
        'low': 'warning',
        'high': 'danger',
        'expire': 'warning'
    };
    return classMap[type] || '';
}

// 获取预警类型文本
function getWarningTypeText(type) {
    const textMap = {
        'low': '库存不足',
        'high': '库存积压',
        'expire': '临期预警'
    };
    return textMap[type] || '正常';
}

// 获取操作按钮
function getActionButtons(item) {
    let buttons = [];
    
    // 库存不足时显示生成采购需求按钮
    if (item.warningType === 'low') {
        buttons.push(`<a href="javascript:void(0)" class="action-link" onclick="createPurchaseDemand('${item.productCode}')">生成采购需求</a>`);
    }
    
    // 所有记录都显示库存流水按钮
    buttons.push(`<a href="javascript:void(0)" class="action-link" onclick="showStockFlow('${item.productCode}')">库存流水</a>`);
    
    return buttons.join('');
}

// 搜索预警记录
function searchWarnings() {
    loadWarningList(1);
}

// 显示预警设置弹窗
function showSettingModal() {
    document.getElementById('settingModal').style.display = 'block';
    loadProducts(document.querySelector('#settingModal select').value);
}

// 隐藏弹窗
function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// 加载商品列表
function loadProducts(categoryId) {
    if (!categoryId) return;
    
    fetch(`/api/product/list?categoryId=${categoryId}`)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('.detail-table tbody');
            tbody.innerHTML = data.map(product => `
                <tr data-product-code="${product.code}">
                    <td>${product.name}</td>
                    <td>${product.specification}</td>
                    <td><input type="number" class="form-control" value="${product.minStock || 0}" min="0"></td>
                    <td><input type="number" class="form-control" value="${product.maxStock || 0}" min="0"></td>
                    <td><input type="number" class="form-control" value="${product.expiryDays || 30}" min="1"></td>
                </tr>
            `).join('');
        });
}

// 保存预警设置
function saveSettings() {
    const settings = Array.from(document.querySelectorAll('.detail-table tbody tr')).map(row => ({
        productCode: row.dataset.productCode,
        minStock: parseInt(row.querySelector('td:nth-child(3) input').value),
        maxStock: parseInt(row.querySelector('td:nth-child(4) input').value),
        expiryDays: parseInt(row.querySelector('td:nth-child(5) input').value)
    }));

    fetch('/api/stock/warning/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
    })
    .then(response => response.json())
    .then(() => {
        hideModal('settingModal');
        loadWarningData();
        showMessage('预警设置保存成功');
    })
    .catch(() => showMessage('保存失败，请重试', 'error'));
}

// 生成采购需求
function createPurchaseDemand(productCode) {
    fetch('/api/purchase/demand/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productCode })
    })
    .then(response => response.json())
    .then(() => {
        showMessage('采购需求已生成');
        loadWarningData();
    })
    .catch(() => showMessage('生成采购需求失败，请重试', 'error'));
}

// 查看库存流水
function showStockFlow(productCode) {
    window.location.href = `./stock-flow.html?productCode=${productCode}`;
}

// 导出预警数据
function exportWarnings() {
    const params = {
        keyword: document.getElementById('searchKeyword').value,
        warningType: document.getElementById('warningTypeSelect').value,
        categoryId: document.getElementById('categorySelect').value
    };

    window.location.href = '/api/stock/warning/export?' + new URLSearchParams(params);
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // 假设已有消息提示组件
    if (window.Toast) {
        Toast.show(message, type);
    } else {
        alert(message);
    }
}

// 渲染分���
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    // 上一页
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadWarningList(${currentPage - 1})">&lt;</a>`;
    }

    // 页码
    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadWarningList(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    // 下一页
    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadWarningList(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}