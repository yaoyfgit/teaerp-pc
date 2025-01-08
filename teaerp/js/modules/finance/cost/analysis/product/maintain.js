// 引入组件
import { Table } from '../../../../../components/table.js';
import { Pagination } from '../../../../../components/pagination.js';
import { Message } from '../../../../../components/message.js';
import { Modal } from '../../../../../components/modal.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadCategories();
    initTable();
});

// 加载产品类别
function loadCategories() {
    // 模拟数据
    const categories = [
        { id: 'C001', name: '红茶' },
        { id: 'C002', name: '绿茶' },
        { id: 'C003', name: '乌龙茶' }
    ];

    const selects = document.querySelectorAll('select[name="categoryId"], #productCategory');
    selects.forEach(select => {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        });
    });
}

// 初始化表格
function initTable() {
    const table = new Table('maintainTable', {
        columns: [
            { title: '产品类别', key: 'categoryName' },
            { title: '维护类型', key: 'type' },
            { title: '维护内容', key: 'content' },
            { title: '处理结果', key: 'result' },
            { title: '维护人员', key: 'maintainer' },
            { title: '维护时间', key: 'maintainTime' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="viewDetail('${row.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            ` }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            id: 'M001',
            categoryName: '红茶',
            type: '定期审核',
            content: '审核本月成本标准执行情况',
            result: '正常',
            maintainer: '张三',
            maintainTime: '2024-03-15 14:30'
        },
        {
            id: 'M002',
            categoryName: '绿茶',
            type: '数据更新',
            content: '更新原材料市场价格',
            result: '需要关注',
            maintainer: '李四',
            maintainTime: '2024-03-14 16:20'
        }
    ];
    table.setData(mockData);

    // 初始化分页
    const pagination = new Pagination('pagination', {
        pageSize: 10,
        total: 100,
        onChange: (page) => {
            // TODO: 加载对应页的数据
            console.log('切换到第', page, '页');
        }
    });
}

// 搜索记录
function searchRecords() {
    const category = document.getElementById('productCategory').value;
    const type = document.getElementById('maintainType').value;
    
    // TODO: 根据条件重新加载数据
    console.log('搜索条件:', { category, type });
}

// 保存维护记录
function saveMaintain() {
    const form = document.getElementById('maintainForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存记录
    console.log('保存记录:', data);
    
    hideModal('maintainModal');
    Message.show('记录已保存', 'success');
}

// 查看详情
function viewDetail(id) {
    // TODO: 显示维护记录详情
    console.log('查看详情:', id);
} 