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
    const table = new Table('adjustTable', {
        columns: [
            { title: '产品类别', key: 'categoryName' },
            { title: '调整类型', key: 'type' },
            { title: '调整项目', key: 'item' },
            { title: '调整前值', key: 'beforeValue' },
            { title: '调整后值', key: 'afterValue' },
            { title: '调整人员', key: 'adjuster' },
            { title: '调整时间', key: 'adjustTime' },
            { title: '生效日期', key: 'effectiveDate' },
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
            id: 'A001',
            categoryName: '红茶',
            type: '价格调整',
            item: '茶叶原料',
            beforeValue: 15.00,
            afterValue: 16.50,
            adjuster: '张三',
            adjustTime: '2024-03-15 14:30',
            effectiveDate: '2024-04-01'
        },
        {
            id: 'A002',
            categoryName: '绿茶',
            type: '标准调整',
            item: '包装工序',
            beforeValue: 2.00,
            afterValue: 1.80,
            adjuster: '李四',
            adjustTime: '2024-03-14 16:20',
            effectiveDate: '2024-04-01'
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
    const type = document.getElementById('adjustType').value;
    
    // TODO: 根据条件重新加载数据
    console.log('搜索条件:', { category, type });
}

// 保存调整记录
function saveAdjust() {
    const form = document.getElementById('adjustForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存记录
    console.log('保存记录:', data);
    
    hideModal('adjustModal');
    Message.show('记录已保存', 'success');
}

// 查看详情
function viewDetail(id) {
    // TODO: 显示调整记录详情
    console.log('查看详情:', id);
} 