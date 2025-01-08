// 引入组件
import { Tree } from '../../../../components/tree.js';
import { Message } from '../../../../components/message.js';
import { Modal } from '../../../../components/modal.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initCategoryTree();
});

// 初始化分类树
function initCategoryTree() {
    const tree = new Tree('categoryTree', {
        onSelect: (node) => {
            // TODO: 处理节点选择
            console.log('选中节点:', node);
        }
    });

    // 模拟数据
    const treeData = [
        {
            id: '1',
            name: '能源费用',
            children: [
                { id: '1-1', name: '水费' },
                { id: '1-2', name: '电费' },
                { id: '1-3', name: '燃气费' }
            ]
        },
        {
            id: '2',
            name: '设备费用',
            children: [
                { id: '2-1', name: '维修费' },
                { id: '2-2', name: '折旧费' }
            ]
        },
        {
            id: '3',
            name: '场地费��',
            children: [
                { id: '3-1', name: '租赁费' },
                { id: '3-2', name: '物业费' }
            ]
        }
    ];

    tree.setData(treeData);
}

// 保存分类
function saveCategory() {
    const form = document.getElementById('categoryForm');
    const formData = new FormData(form);
    const category = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存分类
    console.log('保存分类:', category);
    
    hideModal('categoryModal');
    Message.show('分类已保存', 'success');
} 