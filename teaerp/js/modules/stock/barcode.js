// 条码管理模块
document.addEventListener('DOMContentLoaded', function() {
    initBarcodeManage();
});

// 初始化条码管理
function initBarcodeManage() {
    // 加载条码规则列表
    loadBarcodeRules();
    // 加载条码列表
    loadBarcodes();
}

// 加载条码规则列表
function loadBarcodeRules() {
    // 模拟API调用
    const rules = [
        {
            id: 1,
            name: '商品条码规则',
            type: 'product',
            length: 13,
            prefix: 'P',
            checkRule: 'EAN13',
            status: 'active'
        },
        {
            id: 2,
            name: '库位条码规则',
            type: 'location',
            length: 10,
            prefix: 'L',
            checkRule: 'custom',
            status: 'active'
        }
    ];
    
    renderRuleList(rules);
}

// 渲染规则列表
function renderRuleList(rules) {
    const tbody = document.querySelector('.section:first-child .data-table tbody');
    tbody.innerHTML = rules.map(rule => `
        <tr>
            <td>${rule.name}</td>
            <td>${getBarcodeTypeName(rule.type)}</td>
            <td>${rule.length}</td>
            <td>${rule.prefix}</td>
            <td>${rule.checkRule}</td>
            <td><span class="status ${rule.status}">${getStatusName(rule.status)}</span></td>
            <td>
                <button class="button-link" onclick="editRule(${rule.id})">编辑</button>
                <button class="button-link" onclick="deleteRule(${rule.id})">删除</button>
            </td>
        </tr>
    `).join('');
}

// 获取条码类型名称
function getBarcodeTypeName(type) {
    const types = {
        product: '商品条码',
        location: '库位条码',
        box: '箱码',
        batch: '批次条码',
        serial: '流水号条码'
    };
    return types[type] || type;
}

// 显示新建规则弹窗
function showCreateRuleModal() {
    const modal = document.getElementById('createRuleModal');
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h3>新建条码规则</h3>
                <button class="close-btn" onclick="hideModal('createRuleModal')">&times;</button>
            </div>
            <div class="modal-body">
                <form class="form">
                    <!-- 基本信息 -->
                    <div class="form-section">
                        <h4>基本信息</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>规则名称</label>
                                <input type="text" class="form-control" name="ruleName" required>
                            </div>
                            <div class="form-group">
                                <label>条码类型</label>
                                <select class="form-control" name="barcodeType" onchange="handleBarcodeTypeChange(this)" required>
                                    <option value="">请选择条码类型</option>
                                    <option value="product">商品条码(EAN-13/UPC)</option>
                                    <option value="location">库位条码</option>
                                    <option value="box">箱码</option>
                                    <option value="batch">批次条码</option>
                                    <option value="serial">流水号条码</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- 编码规则设置 -->
                    <div class="form-section">
                        <h4>编��规则设置</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>编码长度</label>
                                <input type="number" class="form-control" name="codeLength" min="1" max="50" required>
                            </div>
                            <div class="form-group">
                                <label>字符类型</label>
                                <select class="form-control" name="charType" multiple>
                                    <option value="number">数字</option>
                                    <option value="uppercase">大写字母</option>
                                    <option value="lowercase">小写字母</option>
                                    <option value="special">特殊字符</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>分隔符</label>
                                <input type="text" class="form-control" name="separator" maxlength="1">
                            </div>
                            <div class="form-group">
                                <label>前缀规则</label>
                                <input type="text" class="form-control" name="prefix">
                            </div>
                            <div class="form-group">
                                <label>后缀规则</label>
                                <input type="text" class="form-control" name="suffix">
                            </div>
                        </div>
                    </div>

                    <!-- 校验规则设置 -->
                    <div class="form-section">
                        <h4>校验规则设置</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>校验算法</label>
                                <select class="form-control" name="checkAlgorithm">
                                    <option value="none">无校验</option>
                                    <option value="ean13">EAN-13校验</option>
                                    <option value="mod10">MOD10校验</option>
                                    <option value="mod11">MOD11校验</option>
                                    <option value="custom">自定义校验</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>重复性检查</label>
                                <div class="checkbox-group">
                                    <label>
                                        <input type="checkbox" name="duplicateCheck">
                                        启用重复性检查
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>错误处理</label>
                                <select class="form-control" name="errorHandling">
                                    <option value="reject">拒绝生成</option>
                                    <option value="regenerate">重新生成</option>
                                    <option value="manual">人工处理</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- 打印模板设置 -->
                    <div class="form-section">
                        <h4>打印模板设置</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>条码尺寸</label>
                                <div class="size-inputs">
                                    <input type="number" class="form-control" name="width" placeholder="宽度(mm)">
                                    <span>×</span>
                                    <input type="number" class="form-control" name="height" placeholder="高度(mm)">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>打印密度(dpi)</label>
                                <select class="form-control" name="dpi">
                                    <option value="203">203</option>
                                    <option value="300">300</option>
                                    <option value="600">600</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>条码方向</label>
                                <select class="form-control" name="orientation">
                                    <option value="horizontal">横向</option>
                                    <option value="vertical">纵向</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>人眼可识别字符</label>
                                <div class="checkbox-group">
                                    <label>
                                        <input type="checkbox" name="humanReadable" checked>
                                        显示可识别字符
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 条码格式设置 -->
                    <div class="form-section">
                        <h4>条码格式设置</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>条码格式</label>
                                <select class="form-control" name="barcodeFormat">
                                    <option value="1d">一维码</option>
                                    <option value="2d">二维码</option>
                                    <option value="composite">复合码</option>
                                </select>
                            </div>
                            <div class="form-group format-options">
                                <!-- 根据选择的格式显示对应的选项 -->
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="button" onclick="hideModal('createRuleModal')">取消</button>
                <button class="button primary" onclick="submitRule()">保存</button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    
    // 初始化表单事件
    initRuleFormEvents();
}

// 显示生成条码弹窗
function showGenerateModal() {
    const modal = document.getElementById('generateModal');
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h3>生成条码</h3>
                <button class="close-btn" onclick="hideModal('generateModal')">&times;</button>
            </div>
            <div class="modal-body">
                <form class="form">
                    <!-- 基本信息 -->
                    <div class="form-section">
                        <h4>基本信息</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>生成类型</label>
                                <select class="form-control" name="generateType" onchange="handleGenerateTypeChange(this)" required>
                                    <option value="">请选择生成类型</option>
                                    <option value="product">商品条码</option>
                                    <option value="location">库位条码</option>
                                    <option value="batch">批次条码</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>条码规则</label>
                                <select class="form-control" name="ruleId" required>
                                    <option value="">请选择条码规则</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- 商品条码生成选项 -->
                    <div id="productBarcodeOptions" class="form-section" style="display: none;">
                        <h4>商品条码生成</h4>
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
                        
                        <!-- 内箱设置 -->
                        <div id="innerBoxSettings" class="sub-section" style="display: none;">
                            <h5>内箱设置</h5>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>装箱数量</label>
                                    <input type="number" class="form-control" name="innerQuantity" min="1">
                                </div>
                                <div class="form-group">
                                    <label>内箱规格</label>
                                    <input type="text" class="form-control" name="innerSpec">
                                </div>
                            </div>
                        </div>

                        <!-- 外箱设置 -->
                        <div id="outerBoxSettings" class="sub-section" style="display: none;">
                            <h5>外箱设置</h5>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>箱规</label>
                                    <input type="number" class="form-control" name="outerQuantity" min="1">
                                </div>
                                <div class="form-group">
                                    <label>物流信息</label>
                                    <input type="text" class="form-control" name="logisticsInfo">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 库位条码生成选项 -->
                    <div id="locationBarcodeOptions" class="form-section" style="display: none;">
                        <h4>库位条码生成</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>仓库选择</label>
                                <select class="form-control" name="warehouseId" required>
                                    <option value="">请选择仓��</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>生成类型</label>
                                <select class="form-control" name="locationType">
                                    <option value="shelf">货架条码</option>
                                    <option value="location">库位条码</option>
                                    <option value="area">区域条码</option>
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

                    <!-- 批次条码生成选项 -->
                    <div id="batchBarcodeOptions" class="form-section" style="display: none;">
                        <h4>批次条码生成</h4>
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
                                <label>收货日期</label>
                                <input type="date" class="form-control" name="receiveDate">
                            </div>
                        </div>
                    </div>

                    <!-- 打印设置 -->
                    <div class="form-section">
                        <h4>打印设置</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>打印数量</label>
                                <input type="number" class="form-control" name="printQuantity" min="1" value="1">
                            </div>
                            <div class="form-group">
                                <label>打印模板</label>
                                <select class="form-control" name="templateId">
                                    <option value="">请选择打印模板</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="button" onclick="hideModal('generateModal')">取消</button>
                <button class="button" onclick="previewBarcode()">预览</button>
                <button class="button primary" onclick="generateBarcode()">生成并打印</button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    
    // 初始化表单事件
    initGenerateFormEvents();
}

// 初始化规则表单事件
function initRuleFormEvents() {
    // 监听条码类型变化
    document.querySelector('[name="barcodeType"]').addEventListener('change', handleBarcodeTypeChange);
    // 监听条码格式变化
    document.querySelector('[name="barcodeFormat"]').addEventListener('change', handleFormatChange);
}

// 处理条码类型变化
function handleBarcodeTypeChange(select) {
    const type = select.value;
    const form = select.closest('form');
    
    // 重置表单
    resetTypeSpecificFields(form);
    
    // 根据类型显示特定字段
    switch(type) {
        case 'product':
            showProductFields(form);
            break;
        case 'location':
            showLocationFields(form);
            break;
        case 'box':
            showBoxFields(form);
            break;
        case 'batch':
            showBatchFields(form);
            break;
        case 'serial':
            showSerialFields(form);
            break;
    }
}

// 重置类型特定字段
function resetTypeSpecificFields(form) {
    // 隐藏所有特定字段区域
    const specificSections = form.querySelectorAll('.type-specific');
    specificSections.forEach(section => section.remove());
}

// 显示商品条码特定字段
function showProductFields(form) {
    const section = document.createElement('div');
    section.className = 'form-section type-specific';
    section.innerHTML = `
        <h4>商品条码设置</h4>
        <div class="form-row">
            <div class="form-group">
                <label>前缀设置</label>
                <input type="text" class="form-control" name="productPrefix" placeholder="商品前缀">
            </div>
            <div class="form-group">
                <label>厂商编码</label>
                <input type="text" class="form-control" name="manufacturerCode">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>商品编码</label>
                <input type="text" class="form-control" name="productCode">
            </div>
            <div class="form-group">
                <label>校验位规则</label>
                <select class="form-control" name="checkDigitRule">
                    <option value="ean13">EAN-13校验</option>
                    <option value="upc">UPC校验</option>
                </select>
            </div>
        </div>
    `;
    insertAfterBasicInfo(form, section);
}

// 显示库位条码特定字段
function showLocationFields(form) {
    const section = document.createElement('div');
    section.className = 'form-section type-specific';
    section.innerHTML = `
        <h4>库位条码设置</h4>
        <div class="form-row">
            <div class="form-group">
                <label>仓库标识</label>
                <input type="text" class="form-control" name="warehouseId">
            </div>
            <div class="form-group">
                <label>区域编码</label>
                <input type="text" class="form-control" name="areaCode">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>货架编码</label>
                <input type="text" class="form-control" name="shelfCode">
            </div>
            <div class="form-group">
                <label>层位编码</label>
                <input type="text" class="form-control" name="levelCode">
            </div>
        </div>
    `;
    insertAfterBasicInfo(form, section);
}

// 显示箱码特定字段
function showBoxFields(form) {
    const section = document.createElement('div');
    section.className = 'form-section type-specific';
    section.innerHTML = `
        <h4>箱码设置</h4>
        <div class="form-row">
            <div class="form-group">
                <label>商品标识</label>
                <input type="text" class="form-control" name="productId">
            </div>
            <div class="form-group">
                <label>数量编码</label>
                <input type="text" class="form-control" name="quantityCode">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>批次编码</label>
                <input type="text" class="form-control" name="batchCode">
            </div>
            <div class="form-group">
                <label>序列号</label>
                <input type="text" class="form-control" name="serialNumber">
            </div>
        </div>
    `;
    insertAfterBasicInfo(form, section);
}

// 显示批次条码特定字段
function showBatchFields(form) {
    const section = document.createElement('div');
    section.className = 'form-section type-specific';
    section.innerHTML = `
        <h4>批次条码设置</h4>
        <div class="form-row">
            <div class="form-group">
                <label>生���日期编码</label>
                <input type="text" class="form-control" name="productionDateCode">
            </div>
            <div class="form-group">
                <label>批次流水号</label>
                <input type="text" class="form-control" name="batchSerialNumber">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>供应商编码</label>
                <input type="text" class="form-control" name="supplierCode">
            </div>
        </div>
    `;
    insertAfterBasicInfo(form, section);
}

// 显示流水号条码特定字段
function showSerialFields(form) {
    const section = document.createElement('div');
    section.className = 'form-section type-specific';
    section.innerHTML = `
        <h4>流水号条码设置</h4>
        <div class="form-row">
            <div class="form-group">
                <label>业务类型标识</label>
                <input type="text" class="form-control" name="businessTypeId">
            </div>
            <div class="form-group">
                <label>日期编码</label>
                <input type="text" class="form-control" name="dateCode">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>序号规则</label>
                <input type="text" class="form-control" name="serialRule">
            </div>
        </div>
    `;
    insertAfterBasicInfo(form, section);
}

// 在基本信息后插入特定字段
function insertAfterBasicInfo(form, section) {
    const basicInfo = form.querySelector('.form-section');
    basicInfo.parentNode.insertBefore(section, basicInfo.nextSibling);
}

// 处理条码格式变化
function handleFormatChange(select) {
    const format = select.value;
    const optionsContainer = select.closest('.form-row').querySelector('.format-options');
    
    // 根据选择的格式显示对应选项
    switch(format) {
        case '1d':
            optionsContainer.innerHTML = get1DFormatOptions();
            break;
        case '2d':
            optionsContainer.innerHTML = get2DFormatOptions();
            break;
        case 'composite':
            optionsContainer.innerHTML = getCompositeFormatOptions();
            break;
    }
}

// 获取一维码格式选项
function get1DFormatOptions() {
    return `
        <label>一维码类型</label>
        <select class="form-control" name="1dType">
            <option value="code128">Code 128</option>
            <option value="code39">Code 39</option>
            <option value="ean13">EAN-13</option>
            <option value="upc">UPC</option>
        </select>
    `;
}

// 获取二维码格式选项
function get2DFormatOptions() {
    return `
        <label>二维码类型</label>
        <select class="form-control" name="2dType">
            <option value="qrcode">QR Code</option>
            <option value="datamatrix">Data Matrix</option>
            <option value="pdf417">PDF417</option>
        </select>
    `;
}

// 获取复合码格式选项
function getCompositeFormatOptions() {
    return `
        <label>复合码类型</label>
        <select class="form-control" name="compositeType">
            <option value="cc-a">CC-A</option>
            <option value="cc-b">CC-B</option>
            <option value="cc-c">CC-C</option>
        </select>
    `;
}

// 初始化生成表单事件
function initGenerateFormEvents() {
    // 监听生成类型变化
    document.querySelector('[name="generateType"]').addEventListener('change', handleGenerateTypeChange);
    // 监听包装规格变化
    document.querySelector('[name="packagingType"]')?.addEventListener('change', handlePackagingTypeChange);
    // 加载条码规则列表
    loadBarcodeRules();
}

// 处理生成类型变化
function handleGenerateTypeChange(select) {
    const type = select.value;
    
    // 隐藏所有选项区域
    hideAllOptions();
    
    // 加载对应类型的条码规则
    loadBarcodeRulesByType(type);
    
    // 显示对应类型的选项
    switch(type) {
        case 'product':
            showElement('productBarcodeOptions');
            loadProducts();
            break;
        case 'location':
            showElement('locationBarcodeOptions');
            loadWarehouses();
            break;
        case 'batch':
            showElement('batchBarcodeOptions');
            loadSuppliers();
            break;
    }
}

// 处理包装规格变化
function handlePackagingTypeChange(select) {
    const type = select.value;
    
    // 隐藏所有包装设置
    hideElement('innerBoxSettings');
    hideElement('outerBoxSettings');
    
    // 显示对应的包装设置
    switch(type) {
        case 'inner':
            showElement('innerBoxSettings');
            break;
        case 'outer':
            showElement('outerBoxSettings');
            break;
    }
}

// 加载条码规则
function loadBarcodeRulesByType(type) {
    // 模拟API调用
    const rules = [
        { id: 1, name: 'EAN-13商品条码', type: 'product' },
        { id: 2, name: '库位条码规则', type: 'location' },
        { id: 3, name: '批次条码规则', type: 'batch' }
    ];
    
    const select = document.querySelector('[name="ruleId"]');
    select.innerHTML = '<option value="">请选择条码规则</option>' + 
        rules.filter(rule => rule.type === type)
            .map(rule => `<option value="${rule.id}">${rule.name}</option>`)
            .join('');
}

// 加载商品列表
function loadProducts() {
    // 模拟API调用
    const products = [
        { id: 1, name: '商品1', price: 100 },
        { id: 2, name: '商品2', price: 200 },
        { id: 3, name: '商品3', price: 300 }
    ];
    
    const select = document.querySelector('[name="productId"]');
    select.innerHTML = '<option value="">请选择商品</option>' + 
        products.map(product => `<option value="${product.id}">${product.name}</option>`)
            .join('');
}

// 打印模板管理
function showTemplateModal() {
    const modal = document.createElement('div');
    modal.id = 'templateModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h3>打印模板设计</h3>
                <button class="close-btn" onclick="hideModal('templateModal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="template-designer">
                    <!-- 模板设计区域 -->
                    <div class="design-area">
                        <div class="template-canvas" id="templateCanvas">
                            <!-- 可拖拽的元素将在这里显示 -->
                        </div>
                        <div class="element-toolbar">
                            <button class="button" onclick="addBarcodeElement()">添加条码</button>
                            <button class="button" onclick="addTextElement()">添加文字</button>
                            <button class="button" onclick="addImageElement()">添加图片</button>
                            <button class="button" onclick="addLineElement()">添加线条</button>
                        </div>
                    </div>

                    <!-- 属性设置面板 -->
                    <div class="properties-panel">
                        <h4>模板属性</h4>
                        <div class="form-group">
                            <label>模板名称</label>
                            <input type="text" class="form-control" name="templateName">
                        </div>
                        <div class="form-group">
                            <label>纸张规格</label>
                            <select class="form-control" name="paperSize">
                                <option value="custom">自定义</option>
                                <option value="a4">A4</option>
                                <option value="a5">A5</option>
                                <option value="label-small">小标签(40x30mm)</option>
                                <option value="label-medium">中标签(60x40mm)</option>
                                <option value="label-large">大标签(100x70mm)</option>
                            </select>
                        </div>
                        <div class="form-row custom-size" style="display: none;">
                            <div class="form-group">
                                <label>宽度(mm)</label>
                                <input type="number" class="form-control" name="width">
                            </div>
                            <div class="form-group">
                                <label>高度(mm)</label>
                                <input type="number" class="form-control" name="height">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>打印密度(dpi)</label>
                            <select class="form-control" name="dpi">
                                <option value="203">203</option>
                                <option value="300">300</option>
                                <option value="600">600</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>打印速度</label>
                            <select class="form-control" name="speed">
                                <option value="2">2 inch/s</option>
                                <option value="4">4 inch/s</option>
                                <option value="6">6 inch/s</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>打印温度</label>
                            <input type="range" class="form-control" name="temperature" min="0" max="15" value="8">
                        </div>
                        <div class="form-group">
                            <label>打印方向</label>
                            <select class="form-control" name="orientation">
                                <option value="portrait">纵向</option>
                                <option value="landscape">横向</option>
                            </select>
                        </div>
                    </div>

                    <!-- 元素属性面板 -->
                    <div class="element-properties" style="display: none;">
                        <h4>元素属性</h4>
                        <!-- 元素属性将根据选中的元素动态显示 -->
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="button" onclick="previewTemplate()">预览</button>
                <button class="button" onclick="saveTemplate()">保存</button>
                <button class="button primary" onclick="saveAndUseTemplate()">保存并使用</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // 初始化模板设计器
    initTemplateDesigner();
}

// 初始化模板设计器
function initTemplateDesigner() {
    // 初始化画布
    const canvas = document.getElementById('templateCanvas');
    makeElementsDraggable(canvas);
    
    // 监听纸张规格变化
    document.querySelector('[name="paperSize"]').addEventListener('change', handlePaperSizeChange);
    
    // 初始化其他事件监听
    initDesignerEvents();
}

// 添加条码元素
function addBarcodeElement() {
    const element = createDesignElement('barcode', {
        type: '1d',
        format: 'code128',
        width: 100,
        height: 40,
        text: '示例条码'
    });
    document.getElementById('templateCanvas').appendChild(element);
    makeElementDraggable(element);
}

// 添加文字元素
function addTextElement() {
    const element = createDesignElement('text', {
        text: '示例文字',
        fontSize: 12,
        fontFamily: 'Arial'
    });
    document.getElementById('templateCanvas').appendChild(element);
    makeElementDraggable(element);
}

// 添加图片元素
function addImageElement() {
    const element = createDesignElement('image', {
        src: '',
        width: 50,
        height: 50
    });
    document.getElementById('templateCanvas').appendChild(element);
    makeElementDraggable(element);
}

// 添加线条元素
function addLineElement() {
    const element = createDesignElement('line', {
        length: 100,
        thickness: 1,
        direction: 'horizontal'
    });
    document.getElementById('templateCanvas').appendChild(element);
    makeElementDraggable(element);
}

// 创建设计元素
function createDesignElement(type, props) {
    const element = document.createElement('div');
    element.className = `design-element ${type}-element`;
    element.dataset.type = type;
    element.dataset.props = JSON.stringify(props);
    
    // 根据类型设置元素内容
    switch(type) {
        case 'barcode':
            element.innerHTML = `<div class="barcode-preview">${props.text}</div>`;
            break;
        case 'text':
            element.innerHTML = props.text;
            break;
        case 'image':
            element.innerHTML = '<div class="image-placeholder">图片</div>';
            break;
        case 'line':
            element.className += props.direction === 'horizontal' ? ' horizontal' : ' vertical';
            break;
    }
    
    return element;
}

// 使元素可拖拽
function makeElementDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        
        // 显示元素属性
        showElementProperties(element);
    }
    
    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// 预览模板
function previewTemplate() {
    const templateData = getTemplateData();
    
    // 创建预览窗口
    const previewWindow = window.open('', '_blank', 'width=800,height=600');
    previewWindow.document.write(`
        <html>
            <head>
                <title>打印预览</title>
                <style>
                    body { margin: 0; padding: 20px; }
                    .preview-page {
                        width: ${templateData.width}mm;
                        height: ${templateData.height}mm;
                        position: relative;
                        margin: 0 auto;
                        background: white;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                    .preview-element {
                        position: absolute;
                    }
                </style>
            </head>
            <body>
                <div class="preview-page">
                    ${generatePreviewContent(templateData)}
                </div>
            </body>
        </html>
    `);
}

// 生成预览内容
function generatePreviewContent(templateData) {
    const elements = document.querySelectorAll('#templateCanvas .design-element');
    return Array.from(elements).map(element => {
        const type = element.dataset.type;
        const props = JSON.parse(element.dataset.props);
        const style = `
            left: ${element.style.left};
            top: ${element.style.top};
            transform: ${element.style.transform || 'none'};
        `;
        
        switch(type) {
            case 'barcode':
                return generateBarcodePreview(props, style);
            case 'text':
                return generateTextPreview(props, style);
            case 'image':
                return generateImagePreview(props, style);
            case 'line':
                return generateLinePreview(props, style);
            default:
                return '';
        }
    }).join('');
}

// 批量打印
function batchPrint() {
    const printData = getPrintData();
    if (!validatePrintData(printData)) return;
    
    // 显示打印进度对话框
    showPrintProgress();
    
    // 开始打印任务
    startPrintJob(printData).then(result => {
        if (result.success) {
            updatePrintProgress(100);
            savePrintRecord(result);
            alert('打印完成');
        } else {
            handlePrintError(result.error);
        }
    }).catch(error => {
        console.error('打印失败:', error);
        handlePrintError(error);
    });
}

// 获取打印数据
function getPrintData() {
    return {
        template: getTemplateData(),
        printer: document.querySelector('[name="printerId"]').value,
        quantity: parseInt(document.querySelector('[name="printQuantity"]').value),
        barcodes: getSelectedBarcodes()
    };
}

// 显示打印进度
function showPrintProgress() {
    const modal = document.createElement('div');
    modal.id = 'printProgressModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>打印进度</h3>
            </div>
            <div class="modal-body">
                <div class="progress-container">
                    <div class="progress-bar" style="width: 0%"></div>
                    <div class="progress-text">0%</div>
                </div>
                <div class="print-status">
                    准备打印...
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// 更新打印进度
function updatePrintProgress(percent, status = '') {
    const progressBar = document.querySelector('#printProgressModal .progress-bar');
    const progressText = document.querySelector('#printProgressModal .progress-text');
    const statusText = document.querySelector('#printProgressModal .print-status');
    
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${percent}%`;
    if (status) {
        statusText.textContent = status;
    }
}

// 保存打印记录
function savePrintRecord(result) {
    const record = {
        date: new Date().toISOString(),
        template: result.template,
        quantity: result.quantity,
        printer: result.printer,
        operator: getCurrentUser(),
        status: result.success ? 'success' : 'failed',
        error: result.error
    };
    
    // 保存到打印记录
    savePrintHistory(record);
}

// 处理打印错误
function handlePrintError(error) {
    const errorModal = document.createElement('div');
    errorModal.id = 'printErrorModal';
    errorModal.className = 'modal';
    errorModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>打印错误</h3>
                <button class="close-btn" onclick="hideModal('printErrorModal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="error-message">
                    ${error.message || '打印失败，请检查打印机状态后重试'}
                </div>
                <div class="error-details">
                    ${error.details || ''}
                </div>
            </div>
            <div class="modal-footer">
                <button class="button" onclick="retryPrint()">重试</button>
                <button class="button" onclick="hideModal('printErrorModal')">关闭</button>
            </div>
        </div>
    `;
    document.body.appendChild(errorModal);
    errorModal.style.display = 'flex';
}

// 重试打印
function retryPrint() {
    hideModal('printErrorModal');
    batchPrint();
}