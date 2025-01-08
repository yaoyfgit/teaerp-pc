// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initWarehouseSelect();
    initCategorySelect();
    loadWarningData();
});

// 初始化仓库下拉框
function initWarehouseSelect() {
    fetch('/api/warehouse/list')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('warehouseSelect');
            data.forEach(warehouse => {
                const option = document.createElement('option');
                option.value = warehouse.id;
                option.textContent = warehouse.name;
                select.appendChild(option);
            });
        });
}

// 初始化商品类别下拉框
function initCategorySelect() {
    fetch('/api/category/list')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('categorySelect');
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                select.appendChild(option);
            });
        });
}

// 加载预警数据
function loadWarningData(page = 1) {
    const params = {
        warehouseId: document.getElementById('warehouseSelect').value,
        categoryId: document.getElementById('categorySelect').value,
        warningType: document.getElementById('warningTypeSelect').value,
        page: page,
        pageSize: 10
    };

    fetch('/api/stock/warning/list?' + new URLSearchParams(params))
        .then(response => response.json())
        .then(data => {
            renderWarningTable(data.items);
            renderPagination(data.total, page);
        });
}

// 渲染预警表格
function renderWarningTable(items) {
    const tbody = document.getElementById('warningTable');
    tbody.innerHTML = '';
    
    items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.productCode}</td>
            <td>${item.productName}</td>
            <td>${item.specification}</td>
            <td>${item.warehouseName}</td>
            <td>${item.currentStock}</td>
            <td>${item.minStock}</td>
            <td>${item.maxStock}</td>
            <td class="${item.warningType === 1 ? 'status-low' : 'status-high'}">
                ${item.warningType === 1 ? '库存不足' : '库存积压'}
            </td>
            <td>
                <button class="btn-text" onclick="viewDetail('${item.productCode}')">查看</button>
                <button class="btn-text" onclick="setWarningRule('${item.productCode}')">设置</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 查询按钮点击事件
function searchWarnings() {
    loadWarningData(1);
}

// 查看商品详情
function viewDetail(productCode) {
    window.location.href = `./inventory.html?productCode=${productCode}`;
}

// 设置预警规则
function setWarningRule(productCode) {
    // TODO: 实现设置预警规则的弹窗
    alert('设置预警规则功能开发中...');
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    // 上一页
    if (currentPage > 1) {
        const prev = document.createElement('span');
        prev.className = 'page-item';
        prev.textContent = '上一页';
        prev.onclick = () => loadWarningData(currentPage - 1);
        pagination.appendChild(prev);
    }

    // 页码
    for (let i = 1; i <= pageCount; i++) {
        const pageNum = document.createElement('span');
        pageNum.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageNum.textContent = i;
        pageNum.onclick = () => loadWarningData(i);
        pagination.appendChild(pageNum);
    }

    // 下一页
    if (currentPage < pageCount) {
        const next = document.createElement('span');
        next.className = 'page-item';
        next.textContent = '下一页';
        next.onclick = () => loadWarningData(currentPage + 1);
        pagination.appendChild(next);
    }
} 