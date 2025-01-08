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
    const table = new Table('standardTable', {
        columns: [
            { title: '产品类别', key: 'categoryName' },
            { title: '成本类型', key: 'costType' },
            { title: '标准值', key: 'value' },
            { title: '计量单位', key: 'unit' },
            { title: '状态', key: 'status' },
            { title: '更新时间', key: 'updateTime' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="editStandard('${row.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="button small" onclick="viewHistory('${row.id}')">
                    <i class="fas fa-history"></i>
                </button>
            ` }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            id: 'S001',
            categoryName: '红茶',
            costType: '材料成本',
            value: 15.00,
            unit: '元/kg',
            status: '生效',
            updateTime: '2024-03-15'
        },
        {
            id: 'S002',
            categoryName: '绿茶',
            costType: '人工成本',
            value: 8.50,
            unit: '元/kg',
            status: '生效',
            updateTime: '2024-03-14'
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

// 搜索标准
function searchStandards() {
    const category = document.getElementById('productCategory').value;
    const costType = document.getElementById('costType').value;
    
    // TODO: 根据条件重新加载数据
    console.log('搜索条件:', { category, costType });
}

// 保存标准
function saveStandard() {
    const form = document.getElementById('standardForm');
    const formData = new FormData(form);
    const standard = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存标准
    console.log('保存标准:', standard);
    
    hideModal('standardModal');
    Message.show('标准已保存', 'success');
}

// 编辑标准
function editStandard(id) {
    // TODO: 加载标准数据并显示编辑弹窗
    console.log('编辑标准:', id);
    showModal('standardModal');
}

// 查看历史记录
function viewHistory(id) {
    // TODO: 显示标准历史记录
    console.log('查看历史:', id);
} 