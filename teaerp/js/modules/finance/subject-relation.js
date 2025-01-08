// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadSubjectTree();
    loadMappings();
});

// 加载科目树
function loadSubjectTree() {
    // 模拟数据
    const treeData = [
        {
            id: '1',
            name: '资产',
            children: [
                {
                    id: '1001',
                    name: '库存现金',
                    children: []
                },
                {
                    id: '1002',
                    name: '银行存款',
                    children: []
                }
            ]
        },
        {
            id: '2',
            name: '负债',
            children: [
                {
                    id: '2001',
                    name: '应付账款',
                    children: []
                }
            ]
        }
    ];

    renderSubjectTree(treeData);
}

// 渲染科目树
function renderSubjectTree(data, level = 0) {
    const treeView = document.getElementById('subjectTree');
    treeView.innerHTML = data.map(item => `
        <div class="tree-node" data-level="${level}">
            <div class="node-content">
                <i class="fas ${item.children.length > 0 ? 'fa-caret-right' : 'fa-circle'} node-icon"></i>
                <span class="node-text">${item.name}</span>
                <div class="node-tools">
                    <a href="javascript:void(0)" onclick="addChild('${item.id}')">添加子科目</a>
                    <a href="javascript:void(0)" onclick="editNode('${item.id}')">编辑</a>
                    ${level > 0 ? `<a href="javascript:void(0)" onclick="deleteNode('${item.id}')">删除</a>` : ''}
                </div>
            </div>
            ${item.children.length > 0 ? `
                <div class="node-children">
                    ${renderSubjectTree(item.children, level + 1)}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// 加载科目映射
function loadMappings() {
    // 模拟数据
    const mappings = [
        {
            id: 'M001',
            sourceSubject: '1001',
            sourceSubjectName: '库存现金',
            targetSubject: '1002',
            targetSubjectName: '银行存款',
            type: 'direct',
            rule: '直接转换',
            status: 'enabled'
        }
    ];

    renderMappingTable(mappings);
}

// 渲染映���表格
function renderMappingTable(mappings) {
    const tbody = document.getElementById('mappingTable');
    tbody.innerHTML = mappings.map(mapping => `
        <tr>
            <td>${mapping.sourceSubjectName}</td>
            <td>${mapping.targetSubjectName}</td>
            <td>${getMappingType(mapping.type)}</td>
            <td>${mapping.rule}</td>
            <td><span class="status-tag ${mapping.status === 'enabled' ? 'status-success' : 'status-error'}">
                ${mapping.status === 'enabled' ? '启用' : '禁用'}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="editMapping('${mapping.id}')">编辑</a>
                <a href="javascript:void(0)" class="action-link" onclick="toggleMappingStatus('${mapping.id}')">
                    ${mapping.status === 'enabled' ? '禁用' : '启用'}
                </a>
                <a href="javascript:void(0)" class="action-link" onclick="deleteMapping('${mapping.id}')">删除</a>
            </td>
        </tr>
    `).join('');
}

// 获取映射类型文本
function getMappingType(type) {
    const types = {
        direct: '直接映射',
        split: '拆分映射',
        merge: '合并映射'
    };
    return types[type] || '未知';
}

// 展开所有节点
function expandAll() {
    document.querySelectorAll('.node-children').forEach(node => {
        node.style.display = 'block';
    });
    document.querySelectorAll('.fa-caret-right').forEach(icon => {
        icon.classList.replace('fa-caret-right', 'fa-caret-down');
    });
}

// 收起所有节点
function collapseAll() {
    document.querySelectorAll('.node-children').forEach(node => {
        node.style.display = 'none';
    });
    document.querySelectorAll('.fa-caret-down').forEach(icon => {
        icon.classList.replace('fa-caret-down', 'fa-caret-right');
    });
}

// 添加子科目
function addChild(parentId) {
    // TODO: 实现添加子科目功能
    console.log('添加子科目:', parentId);
}

// 编辑节点
function editNode(nodeId) {
    // TODO: 实现编辑节点功能
    console.log('编辑节点:', nodeId);
}

// 删除节点
function deleteNode(nodeId) {
    if (confirm('确定要删除该科目吗？')) {
        // TODO: 调用API删除节点
        console.log('删除节点:', nodeId);
        loadSubjectTree();
        showMessage('科目已删除');
    }
}

// 显示新增映射弹窗
function showAddMappingModal() {
    document.getElementById('mappingForm').reset();
    showModal('mappingModal');
}

// 编辑映射
function editMapping(id) {
    // TODO: 根据ID获取映射详情
    const mapping = {
        sourceSubject: '1001',
        targetSubject: '1002',
        type: 'direct',
        rule: '直接转换'
    };
    
    const form = document.getElementById('mappingForm');
    Object.keys(mapping).forEach(key => {
        const input = form.elements[key];
        if (input) {
            input.value = mapping[key];
        }
    });
    
    showModal('mappingModal');
}

// 切换映射状态
function toggleMappingStatus(id) {
    // TODO: 调用API切换映射状态
    console.log('切换映射状态:', id);
    loadMappings();
    showMessage('状态已更新');
}

// 删除映射
function deleteMapping(id) {
    if (confirm('确定要删除该映射吗？')) {
        // TODO: 调用API删除映射
        console.log('删除映射:', id);
        loadMappings();
        showMessage('映射已删除');
    }
}

// 保存映射
function saveMapping() {
    const form = document.getElementById('mappingForm');
    const formData = new FormData(form);
    const mapping = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存映射
    console.log('保存映射:', mapping);
    
    hideModal('mappingModal');
    loadMappings();
    showMessage('映射已保存');
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: ��用统一的消息提示组件
    alert(message);
} 