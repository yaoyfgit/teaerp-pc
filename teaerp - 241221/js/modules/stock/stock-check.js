// 库存盘点模块
document.addEventListener('DOMContentLoaded', function() {
    console.log('库存盘点模块初始化');
    initStockCheck();
});

function initStockCheck() {
    bindEvents();
}

// 显示新建盘点弹窗
function showCreateModal() {
    console.log('显示新建盘点弹窗');
    const modal = document.getElementById('createModal');
    if (!modal) {
        console.error('未找到createModal元素');
        return;
    }
    modal.classList.add('show');
    // 重置表单
    modal.querySelector('form').reset();
    // 隐藏范围选择器
    document.querySelector('.range-selector').style.display = 'none';
}

// 隐藏弹窗
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
}

// 创建并开始盘点
function createAndStartCheck() {
    console.log('开始创建盘点');
    // 获取表单数据
    const formData = {
        warehouse: document.querySelector('[name="warehouse"]').value,
        range: document.querySelector('[name="range"]').value,
        remark: document.querySelector('[name="remark"]').value
    };

    // 表单验证
    if (!formData.warehouse) {
        alert('请选择盘点仓库');
        return;
    }

    // 如果是按分类或库位盘点，需要验证是否选择了具体范围
    if ((formData.range === 'category' || formData.range === 'location') && 
        !document.querySelectorAll('.checkbox-group input:checked').length) {
        alert('请选择盘点范围');
        return;
    }

    // 隐藏新建弹窗
    hideModal('createModal');

    // 显示盘点操作弹窗
    const checkModal = document.getElementById('checkModal');
    checkModal.classList.add('show');

    // 加载盘点商品列表
    loadCheckItems(formData);
}

// 加载盘点商品列表
function loadCheckItems(formData) {
    // 模拟API调用，获取需要盘点的商品列表
    const mockData = [
        {
            name: '大红袍',
            spec: '特级',
            location: 'A-01-01',
            batch: '20240301',
            systemStock: 100,
            actualStock: '',
            difference: 0,
            remark: ''
        }
        // ... 其他商品
    ];

    renderCheckItems(mockData);
}

// 渲染盘点商品列表
function renderCheckItems(items) {
    const tbody = document.querySelector('#checkModal .detail-table tbody');
    tbody.innerHTML = items.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.spec}</td>
            <td>${item.location}</td>
            <td>${item.batch}</td>
            <td>${item.systemStock}</td>
            <td><input type="number" class="form-control" value="${item.actualStock}" onchange="updateDiff(this)"></td>
            <td>${item.difference}</td>
            <td><input type="text" class="form-control" value="${item.remark}"></td>
        </tr>
    `).join('');
}

// 更新差异数量
function updateDiff(input) {
    const row = input.closest('tr');
    const systemStock = parseInt(row.cells[4].textContent);
    const actualStock = parseInt(input.value) || 0;
    const diff = actualStock - systemStock;
    row.cells[6].textContent = diff;

    // 根据差异显示不同的颜色
    if (diff < 0) {
        row.cells[6].style.color = '#f44336'; // 红色，盘亏
    } else if (diff > 0) {
        row.cells[6].style.color = '#4caf50'; // 绿色，盘盈
    } else {
        row.cells[6].style.color = ''; // 默认颜色，无差异
    }
}

// 保存草稿
function saveDraft() {
    // 获取盘点数据
    const data = getCheckData();
    console.log('保存草稿:', data);
    alert('保存成功');
    hideModal('checkModal');
    // 刷新列表
    location.reload();
}

// 提交审核
function submitCheck() {
    // 获取盘点数据
    const data = getCheckData();
    
    // 验证是否所有商品都已盘点
    const unfinished = document.querySelectorAll('#checkModal .detail-table input[type="number"]').length;
    if (unfinished) {
        alert('还有商品未完成盘点');
        return;
    }

    console.log('提交审核:', data);
    alert('提交成功');
    hideModal('checkModal');
    // 刷新列表
    location.reload();
}

// 获取盘点数据
function getCheckData() {
    const items = [];
    document.querySelectorAll('#checkModal .detail-table tbody tr').forEach(row => {
        items.push({
            name: row.cells[0].textContent,
            spec: row.cells[1].textContent,
            location: row.cells[2].textContent,
            batch: row.cells[3].textContent,
            systemStock: parseInt(row.cells[4].textContent),
            actualStock: parseInt(row.cells[5].querySelector('input').value) || 0,
            difference: parseInt(row.cells[6].textContent),
            remark: row.cells[7].querySelector('input').value
        });
    });

    return {
        checkNo: document.querySelector('#checkModal .stock-info span').textContent,
        warehouse: document.querySelector('#checkModal .stock-info span:last-child').textContent,
        items: items
    };
}

// 绑定事件
function bindEvents() {
    // 盘点范围变化事件
    document.querySelector('[name="range"]').addEventListener('change', function() {
        const rangeSelector = document.querySelector('.range-selector');
        if (this.value === 'category' || this.value === 'location') {
            rangeSelector.style.display = 'block';
            // 加载对应的选项
            loadRangeOptions(this.value);
        } else {
            rangeSelector.style.display = 'none';
        }
    });

    // 处理扫码输入
    const scanInput = document.getElementById('scanInput');
    if (scanInput) {
        scanInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleScan();
            }
        });
    }
}

// 加载范围选项
function loadRangeOptions(type) {
    const container = document.querySelector('.checkbox-group');
    if (type === 'category') {
        // 加载商品分类
        container.innerHTML = `
            <label><input type="checkbox" value="1">茶叶</label>
            <label><input type="checkbox" value="2">茶具</label>
            <label><input type="checkbox" value="3">包装材料</label>
        `;
    } else {
        // 加载库位
        container.innerHTML = `
            <label><input type="checkbox" value="A">A区</label>
            <label><input type="checkbox" value="B">B区</label>
            <label><input type="checkbox" value="C">C区</label>
        `;
    }
}

// 处理扫码输入
function handleScan() {
    const barcode = document.getElementById('scanInput').value.trim();
    if (!barcode) {
        alert('请输入或扫描商品条码');
        return;
    }

    // 模拟API调用，根据条码获取商品信息
    const mockProduct = {
        name: '大红袍',
        spec: '特级',
        location: 'A-01-01',
        batch: '20240301',
        systemStock: 100
    };

    addProductToCheck(mockProduct);
    document.getElementById('scanInput').value = '';
}

// 显示商品选择器
function showProductSelector() {
    const modal = document.getElementById('productSelectorModal');
    modal.classList.add('show');
    loadProducts();
}

// 加载商品列表
function loadProducts() {
    // 模拟API调用
    const mockProducts = [
        {
            code: 'P001',
            name: '大红袍',
            spec: '特级',
            location: 'A-01-01',
            systemStock: 100
        },
        // ... 其他商品
    ];

    renderProducts(mockProducts);
}

// 渲染商品列表
function renderProducts(products) {
    const tbody = document.querySelector('#productSelectorModal tbody');
    tbody.innerHTML = products.map(product => `
        <tr>
            <td><input type="checkbox" value="${product.code}"></td>
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${product.spec}</td>
            <td>${product.location}</td>
            <td>${product.systemStock}</td>
        </tr>
    `).join('');
}

// 添加选中的商品
function addSelectedProducts() {
    const selectedProducts = [];
    document.querySelectorAll('#productSelectorModal tbody input:checked').forEach(checkbox => {
        const row = checkbox.closest('tr');
        selectedProducts.push({
            name: row.cells[2].textContent,
            spec: row.cells[3].textContent,
            location: row.cells[4].textContent,
            systemStock: parseInt(row.cells[5].textContent),
            batch: '20240301' // 这里可以根据实际情况获取批次
        });
    });

    selectedProducts.forEach(product => addProductToCheck(product));
    hideModal('productSelectorModal');
}

// 添加商品到盘点列表
function addProductToCheck(product) {
    const tbody = document.querySelector('#checkModal .detail-table tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${product.name}</td>
        <td>${product.spec}</td>
        <td>${product.location}</td>
        <td>${product.batch}</td>
        <td>${product.systemStock}</td>
        <td><input type="number" class="form-control" onchange="updateDiff(this)"></td>
        <td>0</td>
        <td><input type="text" class="form-control"></td>
        <td>
            <a href="javascript:void(0)" class="action-link" onclick="removeCheckItem(this)">删除</a>
        </td>
    `;
    tbody.appendChild(tr);
}

// 删除盘点商品
function removeCheckItem(link) {
    if (confirm('确定要删除该商品吗？')) {
        link.closest('tr').remove();
    }
}

// 显示盘点复核弹窗
function showReviewModal(link) {
    const modal = document.getElementById('reviewModal');
    modal.classList.add('show');
    loadDiffItems();
}

// 加载差异商品列表
function loadDiffItems() {
    // 模拟API调用
    const mockData = [
        {
            name: '大红袍',
            spec: '特级',
            location: 'A-01-01',
            systemStock: 100,
            actualStock: 95,
            difference: -5
        }
    ];
    renderDiffItems(mockData);
}

// 开始差异复查
function startRecheck() {
    // 实现差异复查逻辑
}

// 确认差异
function confirmDiff() {
    // 实现差异确认逻辑
}

// 显示复核记录
function showReviewHistory() {
    // 实现显示复核记录逻辑
}

// 显示差异分析弹窗
function showDiffAnalysisModal(link) {
    const modal = document.getElementById('diffAnalysisModal');
    modal.classList.add('show');
}

// 显示差异处理弹窗
function showDiffHandleModal(link) {
    const modal = document.getElementById('diffHandleModal');
    modal.classList.add('show');
}

// 切换处理方案/跟踪标签页
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // 切换标签页样式
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // 切换内容
        const tabId = this.dataset.tab;
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = content.id === tabId ? 'block' : 'none';
        });
    });
});

// 提交差异分析
function submitDiffAnalysis() {
    const formData = {
        diffReason: document.querySelector('[name="diffReason"]').value,
        responsibleDept: document.querySelector('[name="responsibleDept"]').value,
        responsiblePerson: document.querySelector('[name="responsiblePerson"]').value,
        suggestion: document.querySelector('[name="suggestion"]').value
    };
    
    console.log('提交差异分析:', formData);
    alert('提交成功');
    hideModal('diffAnalysisModal');
}

// 提交差异处理
function submitDiffHandle() {
    const formData = {
        overageHandle: document.querySelector('[name="overageHandle"]').value,
        shortageHandle: document.querySelector('[name="shortageHandle"]').value,
        accountingSuggestion: document.querySelector('[name="accountingSuggestion"]').value,
        handleStatus: document.querySelector('[name="handleStatus"]').value,
        handleResult: document.querySelector('[name="handleResult"]').value,
        handleSummary: document.querySelector('[name="handleSummary"]').value
    };
    
    console.log('提交差异处理:', formData);
    alert('提交成功');
    hideModal('diffHandleModal');
}

// 开始盘点
function startCheck(link) {
    // 获取当前行的盘点单号
    const row = link.closest('tr');
    const checkNo = row.cells[0].textContent;
    const warehouse = row.cells[1].textContent;

    // 显示盘点操作弹窗
    const checkModal = document.getElementById('checkModal');
    checkModal.classList.add('show');

    // 设置盘点单信息
    document.querySelector('#checkModal .stock-info span:first-child').textContent = checkNo;
    document.querySelector('#checkModal .stock-info span:last-child').textContent = warehouse;

    // 加载该盘点单的商品列表
    loadCheckItemsByNo(checkNo);
}

// 根据盘点单号加载商品列表
function loadCheckItemsByNo(checkNo) {
    // 模拟API调用，获取盘点单的商品列表
    const mockData = [
        {
            name: '大红袍',
            spec: '特级',
            location: 'A-01-01',
            batch: '20240301',
            systemStock: 100,
            actualStock: '',
            difference: 0,
            remark: ''
        },
        {
            name: '铁观音',
            spec: '一级',
            location: 'A-01-02',
            batch: '20240301',
            systemStock: 80,
            actualStock: '',
            difference: 0,
            remark: ''
        }
    ];

    // 渲染商品列表
    const tbody = document.querySelector('#checkModal .detail-table tbody');
    tbody.innerHTML = mockData.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.spec}</td>
            <td>${item.location}</td>
            <td>${item.batch}</td>
            <td>${item.systemStock}</td>
            <td><input type="number" class="form-control" onchange="updateDiff(this)"></td>
            <td>0</td>
            <td><input type="text" class="form-control"></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="removeCheckItem(this)">删除</a>
            </td>
        </tr>
    `).join('');
}
 