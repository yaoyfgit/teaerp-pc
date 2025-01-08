// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadBOMList();
});

// 显示新增BOM模态框
function showAddBOMModal() {
    document.getElementById('bomForm').reset();
    showModal('bomModal');
    // 初始化思维导图
    setTimeout(() => {
        initMindmap();
    }, 100);
}

// 保存BOM
function saveBOM() {
    const form = document.getElementById('bomForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存BOM数据
    console.log('保存BOM数据:', data);
    
    // 关闭模态框
    hideModal('bomModal');
    // 显示成功提示
    Message.show('BOM已保存', 'success');
    // 重新加载列表
    loadBOMList();
}

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

// 定义全局变量存储当前操作的 BOM 编码
let currentBOMCode = null;

// 查看BOM结构
function viewBOMStructure(code) {
    currentBOMCode = code;  // 保存当前BOM编码
    document.getElementById('modalTitle').textContent = 'BOM结构查看';
    loadBOMTree(code);
    showModal('bomStructureModal');
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
        <div class="bom-node">
            <div class="bom-node-content">
                <div class="bom-node-info">
                    ${node.children && node.children.length > 0 ? `
                        <span class="expand-icon" onclick="toggleNode(this)">
                            <i class="fas fa-chevron-down"></i>
                        </span>
                    ` : '<span style="width: 20px;"></span>'}
                    <span>${node.code} - ${node.name}</span>
                    ${node.quantity ? `<span>${node.quantity} ${node.unit}</span>` : ''}
                </div>
                <div class="bom-node-actions">
                    ${level > 0 ? `
                        <button class="button" onclick="editMaterial('${node.code}')">编辑</button>
                        <button class="button danger" onclick="removeMaterial('${node.code}')">删除</button>
                    ` : `
                        <button class="button" onclick="addBOMNode()">添加物料</button>
                    `}
                    <button class="button" onclick="addChildMaterial('${node.code}')">添加子项</button>
                </div>
            </div>
            ${node.children && node.children.length > 0 ? `
                <div class="bom-node-children">
                    ${node.children.map(child => renderBOMTree(child, level + 1)).join('')}
                </div>
            ` : ''}
        </div>
    `;

    if (level === 0) {
        tree.innerHTML = nodeHtml;
    }
    return nodeHtml;
}

// 添加物料节点
function addBOMNode() {
    document.getElementById('materialForm').reset();
    currentParentCode = null; // 清空父节点编码，表示添加顶级物料
    showModal('materialModal');
}

// 保存物料
function saveMaterial() {
    const form = document.getElementById('materialForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // 添加父节点信息
    data.parentCode = currentParentCode;
    
    // TODO: 调用API保存物料数据
    console.log('保存物料数据:', data);
    
    hideModal('materialModal');
    // 重新加载BOM树
    if (currentBOMCode) {
        loadBOMTree(currentBOMCode);
    }
}

// 编辑物料
function editMaterial(code) {
    // TODO: 加载物料数据
    const mockMaterial = {
        materialCode: code,
        materialName: '测试物料',
        quantity: 1,
        unit: '个',
        remark: '测试备注'
    };
    
    // 填充表单
    const form = document.getElementById('materialForm');
    Object.keys(mockMaterial).forEach(key => {
        const input = form.elements[key];
        if (input) {
            input.value = mockMaterial[key];
        }
    });
    
    showModal('materialModal');
}

// 删除物料
function removeMaterial(code) {
    if (confirm('确定要删除该物料吗？')) {
        // TODO: 调用API删除物料
        console.log('删除物料:', code);
        if (currentBOMCode) {
            loadBOMTree(currentBOMCode);
        }
    }
}

// 添加子物料
function addChildMaterial(parentCode) {
    document.getElementById('materialForm').reset();
    currentParentCode = parentCode; // 保存父节点编码
    showModal('materialModal');
}

// 展开/收起节点
function toggleNode(icon) {
    const node = icon.closest('.bom-node');
    node.classList.toggle('collapsed');
    icon.querySelector('i').classList.toggle('fa-chevron-down');
    icon.querySelector('i').classList.toggle('fa-chevron-right');
}

// 展开全部
function expandAll() {
    document.querySelectorAll('.bom-node').forEach(node => {
        node.classList.remove('collapsed');
        const icon = node.querySelector('.expand-icon i');
        if (icon) {
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-down');
        }
    });
}

// 收起全部
function collapseAll() {
    document.querySelectorAll('.bom-node').forEach(node => {
        if (node.querySelector('.bom-node-children')) {
            node.classList.add('collapsed');
            const icon = node.querySelector('.expand-icon i');
            if (icon) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-right');
            }
        }
    });
}

// 拖拽相关变量
let dragStartX = 0;
let dragStartY = 0;
let nodeDragStartX = 0;
let nodeDragStartY = 0;
let draggingNode = null;

// 添加拖拽相关函数
function startDragging(e) {
    if (e.target.closest('.node-actions') || e.target.closest('.quantity-editor')) {
        return; // 如果点击的是按钮或输入框，不启动拖拽
    }
    
    draggingNode = e.target.closest('.mindmap-node');
    if (!draggingNode) return;
    
    e.preventDefault();
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    nodeDragStartX = parseInt(draggingNode.style.left);
    nodeDragStartY = parseInt(draggingNode.style.top);
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDragging);
    
    draggingNode.style.zIndex = '1000';
    draggingNode.classList.add('dragging');
}

function drag(e) {
    if (!draggingNode) return;
    
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    
    draggingNode.style.left = `${nodeDragStartX + dx}px`;
    draggingNode.style.top = `${nodeDragStartY + dy}px`;
    
    // 更新节点位置数据
    const nodeId = draggingNode.id.replace('node-', '');
    const node = mindmapNodes.find(n => n.id === nodeId);
    if (node) {
        node.x = nodeDragStartX + dx;
        node.y = nodeDragStartY + dy;
    }
    
    // 更新连接线
    updateConnections();
}

function endDragging() {
    if (!draggingNode) return;
    
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', endDragging);
    
    draggingNode.style.zIndex = '';
    draggingNode.classList.remove('dragging');
    draggingNode = null;
}

// 缩放功能
function zoomIn() {
    scale = Math.min(scale * 1.2, 2);
    applyZoom();
}

function zoomOut() {
    scale = Math.max(scale / 1.2, 0.5);
    applyZoom();
}

function applyZoom() {
    const container = document.getElementById('bomMindmap');
    container.style.transform = `scale(${scale})`;
    container.style.transformOrigin = 'center center';
    updateConnections();
}

// 编辑BOM
function editBOM(code) {
    currentBOMCode = code;
    // 加载BOM数据
    const mockBOMData = {
        productCode: code,
        productName: '特级大红袍',
        version: 'V1.0',
        effectiveDate: '2024-03-20',
        remark: '测试备注'
    };
    
    // 填充表单
    const form = document.getElementById('bomForm');
    Object.keys(mockBOMData).forEach(key => {
        const input = form.elements[key];
        if (input) {
            input.value = mockBOMData[key];
        }
    });
    
    showModal('bomModal');
    // 初始化思维导图并加载数据
    setTimeout(() => {
        initMindmap();
        loadMindmapData(code);
    }, 100);
}

// 切换BOM状态
function toggleBOMStatus(code) {
    if (confirm('确定要切换该BOM的状态吗？')) {
        // TODO: 调用API切换状态
        console.log('切换BOM状态:', code);
        loadBOMList();
        Message.show('状态已更新', 'success');
    }
}

// 导出BOM
function exportBOM() {
    // TODO: 调用导出API
    console.log('导出BOM数据');
    Message.show('导出成功', 'success');
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" onclick="loadBOMList(${currentPage - 1})">&lt;</a>`;
    }
    
    for (let i = 1; i <= pageCount; i++) {
        if (i === currentPage) {
            html += `<span class="current">${i}</span>`;
        } else {
            html += `<a href="javascript:void(0)" onclick="loadBOMList(${i})">${i}</a>`;
        }
    }
    
    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" onclick="loadBOMList(${currentPage + 1})">&gt;</a>`;
    }
    
    pagination.innerHTML = html;
}

// 搜索BOM
function searchBOM() {
    loadBOMList(1);
}

// 思维导图相关变量
let mindmapNodes = [];
let connections = [];
let draggedNode = null;
let scale = 1;
let currentParentCode = null;

// 初始化思维导图
function initMindmap() {
    const container = document.getElementById('bomMindmap');
    container.innerHTML = `
        <svg class="connection-container"></svg>
        <div class="nodes-container"></div>
    `;
    mindmapNodes = [];
    
    // 添加根节点
    const form = document.getElementById('bomForm');
    const rootNode = {
        id: 'root',
        code: form.elements['productCode'].value || '新产品',
        name: form.elements['productName'].value || '请输入产品名称',
        x: 400,  // 固定初始位置
        y: 50,
        children: []
    };
    
    addMindmapNode(rootNode);
    mindmapNodes.push(rootNode);
}

// 添加思维导图节点
function addMindmapNode(nodeData) {
    const container = document.querySelector('#bomMindmap .nodes-container');
    const node = document.createElement('div');
    node.className = `mindmap-node ${nodeData.id === 'root' ? 'root' : ''}`;
    node.id = `node-${nodeData.id}`;
    node.style.left = `${nodeData.x}px`;
    node.style.top = `${nodeData.y}px`;
    
    node.innerHTML = `
        <div class="node-content">
            <span>${nodeData.code} - ${nodeData.name}</span>
            ${nodeData.id !== 'root' ? `
                <div class="quantity-editor">
                    <input type="number" value="${nodeData.quantity || 1}" min="0" step="0.01"
                           onchange="updateNodeQuantity('${nodeData.id}', this.value)">
                    <select onchange="updateNodeUnit('${nodeData.id}', this.value)">
                        <option value="个" ${nodeData.unit === '个' ? 'selected' : ''}>个</option>
                        <option value="kg" ${nodeData.unit === 'kg' ? 'selected' : ''}>kg</option>
                        <option value="g" ${nodeData.unit === 'g' ? 'selected' : ''}>g</option>
                    </select>
                </div>
            ` : ''}
        </div>
        <div class="node-actions">
            <button class="button small" onclick="addChildNode('${nodeData.id}')">
                <i class="fas fa-plus"></i>
            </button>
            ${nodeData.id !== 'root' ? `
                <button class="button small danger" onclick="removeNode('${nodeData.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            ` : ''}
        </div>
    `;
    
    node.addEventListener('mousedown', startDragging);
    container.appendChild(node);
    
    if (nodeData.parentId) {
        drawConnection(nodeData.parentId, nodeData.id);
    }
}

// 选择物料后的处理
function selectMaterial(code, name, unit) {
    const nodeId = Date.now().toString();
    const parentNode = currentParentCode ? 
        mindmapNodes.find(n => n.id === currentParentCode) : 
        mindmapNodes.find(n => n.id === 'root');
    
    if (!parentNode) return;
    
    // 计算新节点位置
    const newX = parentNode.x;
    const newY = parentNode.y + 100 + (parentNode.children ? parentNode.children.length * 60 : 0);
    
    const newNode = {
        id: nodeId,
        code: code,
        name: name,
        quantity: 1,
        unit: unit,
        parentId: parentNode.id,
        x: newX + 200,  // 在父节点右侧
        y: newY,
        children: []
    };
    
    if (!parentNode.children) parentNode.children = [];
    parentNode.children.push(newNode);
    mindmapNodes.push(newNode);
    
    addMindmapNode(newNode);
    drawConnection(parentNode.id, nodeId);
    hideModal('materialSelectModal');
    currentParentCode = null;
}

// 绘制连接线
function drawConnection(parentId, childId) {
    const svg = document.querySelector('#bomMindmap .connection-container');
    const parentEl = document.getElementById(`node-${parentId}`);
    const childEl = document.getElementById(`node-${childId}`);
    
    if (!parentEl || !childEl || !svg) return;
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.id = `connection-${parentId}-${childId}`;
    path.classList.add('mindmap-connection');
    
    const parentRect = parentEl.getBoundingClientRect();
    const childRect = childEl.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    
    const startX = parentRect.left + parentRect.width / 2 - svgRect.left;
    const startY = parentRect.bottom - svgRect.top;
    const endX = childRect.left + childRect.width / 2 - svgRect.left;
    const endY = childRect.top - svgRect.top;
    
    // 使用三次贝塞尔曲线创建平滑的S形连接线
    const deltaY = endY - startY;
    const controlPoint1Y = startY + deltaY * 0.25;
    const controlPoint2Y = startY + deltaY * 0.75;
    
    path.setAttribute('d', `M ${startX},${startY} 
                          C ${startX},${controlPoint1Y} 
                            ${endX},${controlPoint2Y} 
                            ${endX},${endY}`);
    
    svg.appendChild(path);
}

// 更新连接线
function updateConnections() {
    const svg = document.querySelector('#bomMindmap .connection-container');
    if (!svg) return;
    
    svg.innerHTML = '';
    mindmapNodes.forEach(node => {
        if (node.parentId) {
            drawConnection(node.parentId, node.id);
        }
    });
}

// 加载思维导图数据
function loadMindmapData(code) {
    // 模拟数据
    const mockData = {
        id: 'root',
        code: code,
        name: '特级大红袍',
        children: [
            {
                id: 'node1',
                code: 'M001',
                name: '大红袍原料',
                quantity: 1,
                unit: 'kg',
                children: []
            },
            {
                id: 'node2',
                code: 'M002',
                name: '包装盒',
                quantity: 1,
                unit: '个',
                children: [
                    {
                        id: 'node3',
                        code: 'M003',
                        name: '内盒',
                        quantity: 1,
                        unit: '个',
                        children: []
                    },
                    {
                        id: 'node4',
                        code: 'M004',
                        name: '外盒',
                        quantity: 1,
                        unit: '个',
                        children: []
                    }
                ]
            }
        ]
    };

    // 清空现有节点
    mindmapNodes = [];
    const container = document.getElementById('bomMindmap');
    container.innerHTML = '';

    // 递归添加节点
    function addNodes(nodeData, parentId = null) {
        const node = { ...nodeData };
        if (parentId) {
            const parent = mindmapNodes.find(n => n.id === parentId);
            if (parent) {
                parent.children = parent.children || [];
                parent.children.push(node);
            }
        }
        mindmapNodes.push(node);
        if (node.children) {
            node.children.forEach(child => addNodes(child, node.id));
        }
    }

    addNodes(mockData);
    mindmapNodes.forEach(node => addMindmapNode(node));
    autoLayout();
}

// 添加物料节点
function addMaterialNode() {
    showModal('materialSelectModal');
    // 加载物料列表
    loadMaterialList();
}

// 加载物料列表
function loadMaterialList() {
    // 模拟物料数据
    const mockMaterials = [
        { code: 'M001', name: '大红袍原料', spec: '特级', unit: 'kg' },
        { code: 'M002', name: '包装盒', spec: '标准', unit: '个' },
        { code: 'M003', name: '内盒', spec: '标准', unit: '个' },
        { code: 'M004', name: '外盒', spec: '标准', unit: '个' }
    ];

    const materialList = document.getElementById('materialList');
    materialList.innerHTML = mockMaterials.map(material => `
        <div class="material-item" onclick="selectMaterial('${material.code}', '${material.name}', '${material.unit}')">
            <div class="material-info">
                <div class="material-code">${material.code}</div>
                <div class="material-name">${material.name}</div>
                <div class="material-spec">${material.spec}</div>
            </div>
            <div class="material-unit">${material.unit}</div>
        </div>
    `).join('');
}

// 添加子节点
function addChildNode(parentId) {
    currentParentCode = parentId;
    addMaterialNode();
}

// 更新节点数量
function updateNodeQuantity(nodeId, value) {
    const node = mindmapNodes.find(n => n.id === nodeId);
    if (node) {
        node.quantity = parseFloat(value);
    }
}

// 更新节点单位
function updateNodeUnit(nodeId, value) {
    const node = mindmapNodes.find(n => n.id === nodeId);
    if (node) {
        node.unit = value;
    }
}

// 删除节点
function removeNode(nodeId) {
    if (confirm('确定要删除该物料吗？')) {
        const index = mindmapNodes.findIndex(n => n.id === nodeId);
        if (index > -1) {
            mindmapNodes.splice(index, 1);
            // 从父节点的children中移除
            mindmapNodes.forEach(node => {
                if (node.children) {
                    node.children = node.children.filter(child => child.id !== nodeId);
                }
            });
            // 重新渲染
            const container = document.getElementById('bomMindmap');
            container.innerHTML = '';
            mindmapNodes.forEach(node => addMindmapNode(node));
            autoLayout();
        }
    }
}

// 添加 CSS 样式
const style = document.createElement('style');
style.textContent = `
    .mindmap-node .node-actions {
        display: none;
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 4px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        z-index: 1000;
    }

    .mindmap-node:hover .node-actions {
        display: flex;
        gap: 4px;
    }

    .mindmap-node .node-actions button {
        padding: 4px 8px;
        font-size: 12px;
        background: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        cursor: pointer;
    }

    .mindmap-node .node-actions button:hover {
        background: #f5f5f5;
    }

    .mindmap-node .node-actions button.danger {
        color: #ff4d4f;
        border-color: #ff4d4f;
    }

    .mindmap-node .node-actions button.danger:hover {
        background: #fff1f0;
    }

    .mindmap-connection {
        stroke: #91d5ff;
        stroke-width: 2;
        fill: none;
        pointer-events: none;
    }
`;
document.head.appendChild(style); 