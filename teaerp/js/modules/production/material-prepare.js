// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadPlans();
    loadMaterialList();
    loadRecords();
});

// 加载生产计划
function loadPlans() {
    // 模拟数据
    const plans = [
        { id: 'P001', name: '2024年1月生产计划' },
        { id: 'P002', name: '2024年第2周生产计划' }
    ];
    
    const select = document.querySelector('.search-bar select');
    plans.forEach(plan => {
        const option = document.createElement('option');
        option.value = plan.id;
        option.textContent = plan.name;
        select.appendChild(option);
    });
}

// 加载物料清单
function loadMaterialList(planId) {
    // 模拟数据
    const materials = [
        {
            id: 'M001',
            code: 'M001',
            name: '大红袍原料',
            specification: '特级',
            required: 1000,
            stock: 800,
            picked: 500,
            pending: 300,
            unit: 'kg',
            status: 'partial'
        },
        {
            id: 'M002',
            code: 'M002',
            name: '铝箔袋',
            specification: '100g',
            required: 10000,
            stock: 12000,
            picked: 8000,
            pending: 2000,
            unit: '个',
            status: 'sufficient'
        }
    ];

    renderMaterialTable(materials);
}

// 渲染物料表格
function renderMaterialTable(materials) {
    const tbody = document.getElementById('materialTable');
    tbody.innerHTML = materials.map(material => `
        <tr>
            <td>${material.code}</td>
            <td>${material.name}</td>
            <td>${material.specification}</td>
            <td>${material.required}</td>
            <td>${material.stock}</td>
            <td>${material.picked}</td>
            <td>${material.pending}</td>
            <td>${material.unit}</td>
            <td><span class="status-tag ${getMaterialStatusClass(material.status)}">
                ${getMaterialStatus(material.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="showPickModal('${material.id}', '${material.name}')">领用</a>
                <a href="javascript:void(0)" class="action-link" onclick="showReturnModal('${material.id}', '${material.name}')">退库</a>
            </td>
        </tr>
    `).join('');
}

// 获取物料状态文本
function getMaterialStatus(status) {
    const statuses = {
        sufficient: '库存充足',
        partial: '部分不足',
        insufficient: '库存不足'
    };
    return statuses[status] || '未知';
}

// 获取物料状态样式类
function getMaterialStatusClass(status) {
    const classes = {
        sufficient: 'status-success',
        partial: 'status-warning',
        insufficient: 'status-error'
    };
    return classes[status] || '';
}

// 加载领退记录
function loadRecords(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                id: 'R001',
                materialCode: 'M001',
                materialName: '大红袍原料',
                type: 'pick',
                quantity: 500,
                operator: '张三',
                operateTime: '2024-01-15 10:00',
                remark: '生产领用'
            },
            {
                id: 'R002',
                materialCode: 'M002',
                materialName: '铝箔袋',
                type: 'return',
                quantity: 100,
                operator: '李四',
                operateTime: '2024-01-15 11:00',
                remark: '质量不合格退回'
            }
        ],
        total: 2
    };

    renderRecordTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染领退记录表格
function renderRecordTable(records) {
    const tbody = document.getElementById('recordTable');
    tbody.innerHTML = records.map(record => `
        <tr>
            <td>${record.id}</td>
            <td>${record.materialCode}</td>
            <td>${record.materialName}</td>
            <td>${record.type === 'pick' ? '领用' : '退库'}</td>
            <td>${record.quantity}</td>
            <td>${record.operator}</td>
            <td>${record.operateTime}</td>
            <td>${record.remark}</td>
        </tr>
    `).join('');
}

// 显示领用弹窗
function showPickModal(materialId, materialName) {
    const form = document.getElementById('pickForm');
    form.elements['materialId'].value = materialId;
    form.elements['materialName'].value = materialName;
    showModal('pickModal');
}

// 显示退库弹窗
function showReturnModal(materialId, materialName) {
    const form = document.getElementById('returnForm');
    form.elements['materialId'].value = materialId;
    form.elements['materialName'].value = materialName;
    showModal('returnModal');
}

// 保存领用
function savePick() {
    const form = document.getElementById('pickForm');
    const formData = new FormData(form);
    const pick = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存领用记录
    console.log('保存领用:', pick);
    
    hideModal('pickModal');
    loadMaterialList();
    loadRecords();
    showMessage('领用已保存');
}

// 保存退库
function saveReturn() {
    const form = document.getElementById('returnForm');
    const formData = new FormData(form);
    const return_ = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存退库记录
    console.log('保存退库:', return_);
    
    hideModal('returnModal');
    loadMaterialList();
    loadRecords();
    showMessage('退库已保存');
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadRecords(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadRecords(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadRecords(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 