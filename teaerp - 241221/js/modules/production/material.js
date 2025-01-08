// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadMaterials();
});

// 加载物料列表
function loadMaterials(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                code: 'M001',
                name: '大红袍茶叶',
                specification: '特级',
                type: 1,
                unit: 'kg',
                createTime: '2024-01-01',
                status: 1
            },
            {
                code: 'M002',
                name: '铁观音茶叶',
                specification: '特级',
                type: 1,
                unit: 'kg',
                createTime: '2024-01-02',
                status: 1
            }
        ],
        total: 2
    };

    renderMaterialTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染物料表格
function renderMaterialTable(items) {
    const tbody = document.getElementById('materialTable');
    tbody.innerHTML = items.map(item => `
        <tr>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.specification}</td>
            <td>${getMaterialType(item.type)}</td>
            <td>${item.unit}</td>
            <td>${item.createTime}</td>
            <td><span class="status-tag ${item.status === 1 ? 'status-completed' : 'status-error'}">
                ${item.status === 1 ? '启用' : '停用'}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="editMaterial('${item.code}')">编辑</a>
                <a href="javascript:void(0)" class="action-link" onclick="toggleMaterialStatus('${item.code}')">
                    ${item.status === 1 ? '停用' : '启用'}
                </a>
            </td>
        </tr>
    `).join('');
}

// 获取物料类型文本
function getMaterialType(type) {
    const types = {
        1: '原材料',
        2: '半成品',
        3: '成品'
    };
    return types[type] || '未知';
}

// 显示新增物料弹窗
function showAddMaterialModal() {
    document.getElementById('modalTitle').textContent = '新增物料';
    document.getElementById('materialForm').reset();
    showModal('materialModal');
}

// 编辑物料
function editMaterial(code) {
    document.getElementById('modalTitle').textContent = '编辑物料';
    // 模拟获取物料数据
    const material = {
        code: 'M001',
        name: '大红袍茶叶',
        specification: '特级',
        type: 1,
        unit: 'kg',
        description: '武夷山大红袍'
    };
    
    const form = document.getElementById('materialForm');
    Object.keys(material).forEach(key => {
        const input = form.elements[key];
        if (input) {
            input.value = material[key];
        }
    });
    
    showModal('materialModal');
}

// 保存物料
function saveMaterial() {
    const form = document.getElementById('materialForm');
    const formData = new FormData(form);
    const material = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存数据
    console.log('保存物料:', material);
    
    hideModal('materialModal');
    loadMaterials();
    showMessage('保存成功');
}

// 切换物料状态
function toggleMaterialStatus(code) {
    // TODO: 调用API切换状态
    console.log('切换物料状态:', code);
    loadMaterials();
    showMessage('状态已更新');
}

// 搜索物料
function searchMaterials() {
    loadMaterials(1);
}

// 导出物料
function exportMaterials() {
    // TODO: 调用导出API
    console.log('导出物料数据');
    showMessage('导出成功');
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadMaterials(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadMaterials(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadMaterials(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 