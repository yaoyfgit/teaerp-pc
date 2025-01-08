// 引入组件
import { Table } from '../../../../../components/table.js';
import { Pagination } from '../../../../../components/pagination.js';
import { Message } from '../../../../../components/message.js';
import { Chart } from '../../../../../components/chart.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadCategories();
    initTables();
    initFormSubmit();
    initTabs();
});

// 加载产品类别
function loadCategories() {
    // 模拟数据
    const categories = [
        { id: 'C001', name: '红茶' },
        { id: 'C002', name: '绿茶' },
        { id: 'C003', name: '乌龙茶' }
    ];

    const select = document.querySelector('select[name="categoryId"]');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });
}

// 初始化表格
function initTables() {
    // 材料成本明细表格
    const materialTable = new Table('materialTable', {
        columns: [
            { title: '材料名称', key: 'name' },
            { title: '规格型号', key: 'spec' },
            { title: '单位', key: 'unit' },
            { title: '数量', key: 'quantity' },
            { title: '单价', key: 'price' },
            { title: '金额', key: 'amount' }
        ]
    });

    // 人工成本明细表格
    const laborTable = new Table('laborTable', {
        columns: [
            { title: '工序名称', key: 'name' },
            { title: '工时数', key: 'hours' },
            { title: '工时单价', key: 'price' },
            { title: '金额', key: 'amount' }
        ]
    });

    // 制造费用明细表格
    const manufacturingTable = new Table('manufacturingTable', {
        columns: [
            { title: '费用项目', key: 'name' },
            { title: '分配标准', key: 'standard' },
            { title: '分配比例', key: 'ratio' },
            { title: '金额', key: 'amount' }
        ]
    });

    // 计算历史表格
    const historyTable = new Table('historyTable', {
        columns: [
            { title: '计算日期', key: 'calculateDate' },
            { title: '产品类别', key: 'categoryName' },
            { title: '计算期间', key: 'period' },
            { title: '计算方法', key: 'method' },
            { title: '单位成本', key: 'unitCost' },
            { title: '计算人员', key: 'calculator' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="viewDetail('${row.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            ` }
        ]
    });

    // 模拟数据
    const mockHistoryData = [
        {
            id: 'H001',
            calculateDate: '2024-03-15',
            categoryName: '红茶',
            period: '2024-02',
            method: '加权平均法',
            unitCost: 18.75,
            calculator: '张三'
        },
        {
            id: 'H002',
            calculateDate: '2024-03-15',
            categoryName: '绿茶',
            period: '2024-02',
            method: '先进先出法',
            unitCost: 14.80,
            calculator: '李四'
        }
    ];
    historyTable.setData(mockHistoryData);

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

// 初始化表单提交
function initFormSubmit() {
    const form = document.getElementById('calculateForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        calculateCost();
    };
}

// 初始化标签页
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.onclick = function() {
            const tabId = this.dataset.tab;
            
            // 切换按钮状态
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 切换内容区域
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId + 'Tab') {
                    pane.classList.add('active');
                }
            });
        };
    });
}

// 计算成本
function calculateCost() {
    const form = document.getElementById('calculateForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API计算成本
    console.log('计算条件:', data);
    
    // 模拟计算结果
    const result = {
        totalQuantity: 1000,
        materialCost: 12500.00,
        laborCost: 3600.00,
        manufacturingCost: 2800.00,
        unitCost: 18.90,
        materials: [
            {
                name: '茶叶原料',
                spec: '特级',
                unit: 'kg',
                quantity: 800,
                price: 15.00,
                amount: 12000.00
            },
            {
                name: '包装材料',
                spec: '标准',
                unit: '套',
                quantity: 1000,
                price: 0.50,
                amount: 500.00
            }
        ],
        labors: [
            {
                name: '炒制',
                hours: 40,
                price: 50.00,
                amount: 2000.00
            },
            {
                name: '包装',
                hours: 32,
                price: 50.00,
                amount: 1600.00
            }
        ],
        manufacturing: [
            {
                name: '水电费',
                standard: '机器工时',
                ratio: '40%',
                amount: 1120.00
            },
            {
                name: '设备折旧',
                standard: '机器工时',
                ratio: '60%',
                amount: 1680.00
            }
        ]
    };

    // 更新显示
    updateResult(result);
    Message.show('计算完成', 'success');
}

// 更新计算结果
function updateResult(result) {
    // 更新汇总数据
    document.getElementById('totalQuantity').textContent = result.totalQuantity;
    document.getElementById('materialCost').textContent = result.materialCost.toFixed(2);
    document.getElementById('laborCost').textContent = result.laborCost.toFixed(2);
    document.getElementById('manufacturingCost').textContent = result.manufacturingCost.toFixed(2);
    document.getElementById('unitCost').textContent = result.unitCost.toFixed(2);

    // 更新明细表格
    const materialTable = new Table('materialTable');
    materialTable.setData(result.materials);

    const laborTable = new Table('laborTable');
    laborTable.setData(result.labors);

    const manufacturingTable = new Table('manufacturingTable');
    manufacturingTable.setData(result.manufacturing);
}

// 导出结果
function exportResult() {
    // TODO: 导出计算结果
    console.log('导出结果');
    Message.show('导出成功', 'success');
}

// 查看详情
function viewDetail(id) {
    // TODO: 显示计算记录详情
    console.log('查看详情:', id);
} 