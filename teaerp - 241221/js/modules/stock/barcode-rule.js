// 条码规则管理
document.addEventListener('DOMContentLoaded', function() {
    initBarcodeRule();
});

// 初始化条码规则管理
function initBarcodeRule() {
    // 加载规则列表
    loadRuleList();
    // 绑定事件
    bindEvents();
}

// 加载规则列表
function loadRuleList() {
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
    const tbody = document.querySelector('.data-table tbody');
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

// 绑定事件
function bindEvents() {
    // 搜索按钮点击事件
    document.querySelector('.search-bar .button').addEventListener('click', function() {
        const type = document.querySelector('[name="barcodeType"]').value;
        searchRules(type);
    });
}

// 搜索规则
function searchRules(type) {
    // TODO: 实现规则搜索
    console.log('搜索条码类型:', type);
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

// 获取状态名称
function getStatusName(status) {
    const statuses = {
        active: '启用',
        inactive: '禁用'
    };
    return statuses[status] || status;
} 