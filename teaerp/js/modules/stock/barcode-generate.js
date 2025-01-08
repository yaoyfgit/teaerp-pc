// 条码生成管理
document.addEventListener('DOMContentLoaded', function() {
    initBarcodeGenerate();
});

// 初始化条码生成管理
function initBarcodeGenerate() {
    // 加载条码列表
    loadBarcodeList();
    // 加载打印模板
    loadPrintTemplates();
    // 绑定事件
    bindEvents();
}

// 加载条码列表
function loadBarcodeList() {
    // 模拟API调用
    const barcodes = [
        {
            id: 1,
            code: '6901234567890',
            type: 'product',
            relatedObject: '大红袍-特级',
            generateTime: '2024-03-20 10:00:00',
            generator: '张三',
            status: 'active'
        },
        {
            id: 2,
            code: 'L-A-01-01',
            type: 'location',
            relatedObject: '主仓库-A区-01货架-01层',
            generateTime: '2024-03-20 10:30:00',
            generator: '李四',
            status: 'active'
        }
    ];
    
    renderBarcodeList(barcodes);
}

// 渲染条码列表
function renderBarcodeList(barcodes) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = barcodes.map(barcode => `
        <tr>
            <td>
                <input type="checkbox" name="barcodeIds" value="${barcode.id}">
            </td>
            <td>${barcode.code}</td>
            <td>${getBarcodeTypeName(barcode.type)}</td>
            <td>${barcode.relatedObject}</td>
            <td>${barcode.generateTime}</td>
            <td>${barcode.generator}</td>
            <td><span class="status ${barcode.status}">${getStatusName(barcode.status)}</span></td>
            <td>
                <button class="button-link" onclick="previewSingleBarcode(${barcode.id})">预览</button>
                <button class="button-link" onclick="printSingleBarcode(${barcode.id})">打印</button>
                <button class="button-link" onclick="deleteBarcode(${barcode.id})">删除</button>
            </td>
        </tr>
    `).join('');
}

// 显示生成条码弹窗
function showGenerateModal() {
    const modal = document.getElementById('generateModal');
    modal.style.display = 'flex';
    
    // 重置表单
    modal.querySelector('form').reset();
    // 清空类型特定选项
    document.getElementById('typeSpecificOptions').innerHTML = '';
    
    // 加载条码规则
    loadBarcodeRules();
}

// 加载条码规则
function loadBarcodeRules() {
    // 模拟API调用
    const rules = [
        { id: 1, name: 'EAN-13商品条码', type: 'product' },
        { id: 2, name: '库位条码规则', type: 'location' },
        { id: 3, name: '批次条码规则', type: 'batch' }
    ];
    
    const select = document.querySelector('[name="ruleId"]');
    select.innerHTML = '<option value="">请选择条码规则</option>' + 
        rules.map(rule => `<option value="${rule.id}">${rule.name}</option>`).join('');
}

// 加载打印模板
function loadPrintTemplates() {
    // 模拟API调用
    const templates = [
        { id: 1, name: '商品标签模板' },
        { id: 2, name: '库位标签模板' },
        { id: 3, name: '批次标签模板' }
    ];
    
    const select = document.querySelector('[name="templateId"]');
    select.innerHTML = '<option value="">请选择打印模板</option>' + 
        templates.map(tpl => `<option value="${tpl.id}">${tpl.name}</option>`).join('');
}

// 绑定事件
function bindEvents() {
    // 生成类型变化事件
    document.querySelector('[name="generateType"]').addEventListener('change', handleGenerateTypeChange);
    
    // 搜索按钮点击事件
    document.querySelector('.search-bar .button').addEventListener('click', function() {
        const type = document.querySelector('[name="generateType"]').value;
        searchBarcodes(type);
    });
}

// 处理生成类型变化
function handleGenerateTypeChange(event) {
    const type = event.target.value;
    const optionsContainer = document.getElementById('typeSpecificOptions');
    
    // 根据类型显示不同的选项
    switch(type) {
        case 'product':
            showProductOptions(optionsContainer);
            break;
        case 'location':
            showLocationOptions(optionsContainer);
            break;
        case 'batch':
            showBatchOptions(optionsContainer);
            break;
        default:
            optionsContainer.innerHTML = '';
    }
}

// 显示商品条码选项
function showProductOptions(container) {
    container.innerHTML = `
        <div class="form-section">
            <h4>商品信息</h4>
            <div class="form-row">
                <div class="form-group">
                    <label>商品选择</label>
                    <select class="form-control" name="productId" required>
                        <option value="">请选择商品</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>包装规格</label>
                    <select class="form-control" name="packagingType">
                        <option value="unit">单品</option>
                        <option value="inner">内箱</option>
                        <option value="outer">外箱</option>
                    </select>
                </div>
            </div>
        </div>
    `;
    
    // 加载商品列表
    loadProducts();
}

// 显示库位条码选项
function showLocationOptions(container) {
    container.innerHTML = `
        <div class="form-section">
            <h4>库位信息</h4>
            <div class="form-row">
                <div class="form-group">
                    <label>仓库选择</label>
                    <select class="form-control" name="warehouseId" required>
                        <option value="">请选择仓库</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>区域选择</label>
                    <select class="form-control" name="areaId">
                        <option value="">请选择区域</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>起始编号</label>
                    <input type="text" class="form-control" name="startCode">
                </div>
                <div class="form-group">
                    <label>结束编号</label>
                    <input type="text" class="form-control" name="endCode">
                </div>
            </div>
        </div>
    `;
    
    // 加载仓库列表
    loadWarehouses();
}

// 显示批次条码选项
function showBatchOptions(container) {
    container.innerHTML = `
        <div class="form-section">
            <h4>批次信息</h4>
            <div class="form-row">
                <div class="form-group">
                    <label>批次类型</label>
                    <select class="form-control" name="batchType">
                        <option value="production">生产批次</option>
                        <option value="purchase">采购批次</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>生产日期</label>
                    <input type="date" class="form-control" name="productionDate">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>供应商</label>
                    <select class="form-control" name="supplierId">
                        <option value="">请选择供应商</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>批次数量</label>
                    <input type="number" class="form-control" name="batchQuantity" min="1">
                </div>
            </div>
        </div>
    `;
    
    // 加载供应商列表
    loadSuppliers();
}

// 生成条码
function generateBarcode() {
    const formData = new FormData(document.querySelector('#generateModal form'));
    const data = Object.fromEntries(formData.entries());
    
    if (!validateGenerateData(data)) return;
    
    // 调用后端API生成条码
    console.log('生成条码:', data);
    alert('条码生成成功');
    hideModal('generateModal');
    loadBarcodeList(); // 刷新列表
}

// 验证生成数据
function validateGenerateData(data) {
    if (!data.generateType) {
        alert('请选择生成类型');
        return false;
    }
    if (!data.ruleId) {
        alert('请选择条码规则');
        return false;
    }
    
    // 根据类型验证特定字段
    switch(data.generateType) {
        case 'product':
            if (!data.productId) {
                alert('请选择商品');
                return false;
            }
            break;
        case 'location':
            if (!data.warehouseId) {
                alert('请选择仓库');
                return false;
            }
            break;
        case 'batch':
            if (!data.productionDate) {
                alert('请选择生产日期');
                return false;
            }
            break;
    }
    
    return true;
}

// 批量打印
function batchPrint() {
    const selectedIds = Array.from(document.querySelectorAll('input[name="barcodeIds"]:checked'))
        .map(cb => cb.value);
    
    if (selectedIds.length === 0) {
        alert('请选择要打印的条码');
        return;
    }
    
    // TODO: 调用打印功能
    console.log('打印条码:', selectedIds);
}

// 全选/取消全选
function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('input[name="barcodeIds"]');
    checkboxes.forEach(cb => cb.checked = checkbox.checked);
} 