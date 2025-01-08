// Tab 切换功能
document.addEventListener('DOMContentLoaded', function() {
    const tabItems = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');

    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有 active 类
            tabItems.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 添加当前 tab 的 active 类
            item.classList.add('active');
            const tabId = item.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

// 树节点操作
function toggleNode(node) {
    const icon = node.querySelector('i');
    const ul = node.nextElementSibling;
    if (ul && ul.tagName === 'UL') {
        if (icon.classList.contains('fa-minus-square')) {
            icon.classList.replace('fa-minus-square', 'fa-plus-square');
            ul.style.display = 'none';
        } else {
            icon.classList.replace('fa-plus-square', 'fa-minus-square');
            ul.style.display = 'block';
        }
    }
    event.stopPropagation();
}

function selectNode(node) {
    const allNodes = document.querySelectorAll('.tree-node');
    allNodes.forEach(n => n.classList.remove('selected'));
    node.classList.add('selected');
    event.stopPropagation();
}

// 右键菜单
const contextMenu = document.getElementById('treeContextMenu');
let selectedNode = null;

// 为所有树节点添加右键菜单事件
document.querySelectorAll('.tree-node').forEach(node => {
    node.addEventListener('contextmenu', showContextMenu);
});

function showContextMenu(event) {
    event.preventDefault();
    selectedNode = event.currentTarget;
    selectNode(selectedNode);
    
    // 设置菜单位置
    contextMenu.style.left = event.pageX + 'px';
    contextMenu.style.top = event.pageY + 'px';
    contextMenu.style.display = 'block';
}

// 点击其他区域关闭右键菜单
document.addEventListener('click', function(event) {
    if (!contextMenu.contains(event.target)) {
        contextMenu.style.display = 'none';
    }
});

// 全部展开/收起
function expandAll() {
    const allNodes = document.querySelectorAll('.tree-node');
    allNodes.forEach(node => {
        const icon = node.querySelector('i');
        const ul = node.nextElementSibling;
        if (ul && ul.tagName === 'UL') {
            icon.classList.replace('fa-plus-square', 'fa-minus-square');
            ul.style.display = 'block';
        }
    });
}

function collapseAll() {
    const allNodes = document.querySelectorAll('.tree-node');
    allNodes.forEach(node => {
        const icon = node.querySelector('i');
        const ul = node.nextElementSibling;
        if (ul && ul.tagName === 'UL') {
            icon.classList.replace('fa-minus-square', 'fa-plus-square');
            ul.style.display = 'none';
        }
    });
}

// 科目操作
function editAccount() {
    if (selectedNode) {
        // 获取选中节点的科目信息
        const accountText = selectedNode.querySelector('span').textContent;
        // TODO: 填充表单数据
        showModal('accountModal');
    }
    contextMenu.style.display = 'none';
}

function deleteAccount() {
    if (selectedNode) {
        if (confirm('确定要删除该科目吗？')) {
            // TODO: 调用删除接口
            selectedNode.parentElement.remove();
        }
    }
    contextMenu.style.display = 'none';
}

// Modal操作
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function saveAccount() {
    // TODO: 保存科目信息
    hideModal('accountModal');
} 