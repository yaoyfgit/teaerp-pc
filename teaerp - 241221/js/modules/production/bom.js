// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadBOMList();
});

// 加载BOM列表
function loadBOMList(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                code: 'P001',
                name: '特级大红袍',
                version: 'V1.0',
                creator: '张三',
                createTime: '2024-01-01',
                status: 1
            },
            {
                code: 'P002',
                name: '特级铁观音',
                version: 'V2.0',
                creator: '李四',
                createTime: '2024-01-02',
                status: 1
            }
        ],
        total: 2
    };

    renderBOMTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染BOM表格
function renderBOMTable(items) {
    const tbody = document.getElementById('bomTable');
    tbody.innerHTML = items.map(item => `
        <tr>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.version}</td>
            <td>${item.creator}</td>
            <td>${item.createTime}</td>
            <td><span class="status-tag ${item.status === 1 ? 'status-completed' : 'status-error'}">
                ${item.status === 1 ? '启用' : '停用'}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewBOMStructure('${item.code}')">查看</a>
                <a href="javascript:void(0)" class="action-link" onclick="editBOM('${item.code}')">编辑</a>
                <a href="javascript:void(0)" class="action-link" onclick="toggleBOMStatus('${item.code}')">
                    ${item.status === 1 ? '停用' : '启用'}
                </a>
            </td>
        </tr>
    `).join('');
}

// 查看BOM结构
function viewBOMStructure(code) {
    document.getElementById('modalTitle').textContent = 'BOM结构查看';
    loadBOMTree(code);
    showModal('bomModal');
}

// 加载BOM树结构
function loadBOMTree(code) {
    // 模拟BOM树数据
    const mockBOMTree = {
        code: 'P001',
        name: '特级大红袍',
        children: [
            {
                code: 'M001',
                name: '大红袍原料',
                quantity: 1,
                unit: 'kg'
            },
            {
                code: 'M002',
                name: '包装盒',
                quantity: 1,
                unit: '个',
                children: [
                    {
                        code: 'M003',
                        name: '内盒',
                        quantity: 1,
                        unit: '个'
                    },
                    {
                        code: 'M004',
                        name: '外盒',
                        quantity: 1,
                        unit: '个'
                    }
                ]
            }
        ]
    };

    renderBOMTree(mockBOMTree);
}

// 渲染BOM树
function renderBOMTree(node, level = 0) {
    const tree = document.getElementById('bomTree');
    if (level === 0) {
        tree.innerHTML = '';
    }

    const nodeHtml = `
        <div class="bom-node" style="margin-left: ${level * 20}px">
            <div class="bom-node-content">
                <span>${node.code} - ${node.name}</span>
                ${node.quantity ? `<span>${node.quantity} ${node.unit}</span>` : ''}
            </div>
        </div>
    `;

    if (level === 0) {
        tree.innerHTML = nodeHtml;
    } else {
        tree.innerHTML += nodeHtml;
    }

    if (node.children) {
        node.children.forEach(child => renderBOMTree(child, level + 1));
    }
}

// 编辑BOM
function editBOM(code) {
    document.getElementById('modalTitle').textContent = 'BOM结构编辑';
    loadBOMTree(code);
    showModal('bomModal');
}

// 保存BOM
function saveBOM() {
    // TODO: 调用API保存BOM数据
    console.log('保存BOM');
    hideModal('bomModal');
    loadBOMList();
    showMessage('保存成功');
}

// 切换BOM状态
function toggleBOMStatus(code) {
    // TODO: 调用API切换状态
    console.log('切换BOM状态:', code);
    loadBOMList();
    showMessage('状态已更新');
}

// 搜索BOM
function searchBOM() {
    loadBOMList(1);
}

// 导出BOM
function exportBOM() {
    // TODO: 调用导出API
    console.log('导出BOM数据');
    showMessage('导出成功');
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadBOMList(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadBOMList(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadBOMList(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 