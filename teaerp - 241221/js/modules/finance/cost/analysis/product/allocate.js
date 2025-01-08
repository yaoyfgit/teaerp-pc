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
    initChart();
});

// 加载产品类别
function loadCategories() {
    // 模拟数据
    const categories = [
        { id: 'C001', name: '红茶' },
        { id: 'C002', name: '绿茶' },
        { id: 'C003', name: '乌龙茶' }
    ];

    const selects = document.querySelectorAll('select[name="categoryId"], #searchCategory');
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
function initTables() {
    // 分配明细表格
    const detailTable = new Table('detailTable', {
        columns: [
            { title: '成本项目', key: 'name' },
            { title: '总金额', key: 'totalAmount' },
            { title: '分配基数', key: 'baseAmount' },
            { title: '分配比例', key: 'ratio' },
            { title: '分配金额', key: 'amount' },
            { title: '分配说明', key: 'remark' }
        ]
    });

    // 分配历史表格
    const historyTable = new Table('historyTable', {
        columns: [
            { title: '分配日期', key: 'allocateDate' },
            { title: '产品类别', key: 'categoryName' },
            { title: '分配期间', key: 'period' },
            { title: '分配方式', key: 'method' },
            { title: '分配总额', key: 'totalAmount' },
            { title: '分配人员', key: 'allocator' },
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
            id: 'A001',
            allocateDate: '2024-03-15',
            categoryName: '红茶',
            period: '2024-02',
            method: '产量比例',
            totalAmount: 28900.00,
            allocator: '张三'
        },
        {
            id: 'A002',
            allocateDate: '2024-03-15',
            categoryName: '绿茶',
            period: '2024-02',
            method: '工时比例',
            totalAmount: 24800.00,
            allocator: '李四'
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
    const form = document.getElementById('allocateForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        allocateCost();
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

// 初始化图表
function initChart() {
    const chart = new Chart('allocateChart', {
        type: 'pie',
        data: {
            labels: ['待分配', '已分配'],
            datasets: [{
                data: [0, 0],
                backgroundColor: ['#ff6b6b', '#51cf66']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: '成本分配情况'
            }
        }
    });
}

// 分配成本
function allocateCost() {
    const form = document.getElementById('allocateForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API分配成本
    console.log('分配条件:', data);
    
    // 模拟分配结果
    const result = {
        totalAmount: 28900.00,
        allocatedAmount: 28900.00,
        allocateRate: '100%',
        details: [
            {
                name: '水电费',
                totalAmount: 12000.00,
                baseAmount: 1000,
                ratio: '40%',
                amount: 4800.00,
                remark: '按产量分配'
            },
            {
                name: '设备折旧',
                totalAmount: 16900.00,
                baseAmount: 1000,
                ratio: '60%',
                amount: 10140.00,
                remark: '按产量分配'
            }
        ]
    };

    // 更新显示
    updateResult(result);
    Message.show('分配完成', 'success');
}

// 更新分配结果
function updateResult(result) {
    // 更新汇总数据
    document.getElementById('totalAmount').textContent = result.totalAmount.toFixed(2);
    document.getElementById('allocatedAmount').textContent = result.allocatedAmount.toFixed(2);
    document.getElementById('allocateRate').textContent = result.allocateRate;

    // 更新明细表格
    const detailTable = new Table('detailTable');
    detailTable.setData(result.details);

    // 更新图表
    const chart = new Chart('allocateChart');
    chart.setData({
        labels: ['待分配', '已分配'],
        datasets: [{
            data: [
                result.totalAmount - result.allocatedAmount,
                result.allocatedAmount
            ],
            backgroundColor: ['#ff6b6b', '#51cf66']
        }]
    });
}

// 导出结果
function exportResult() {
    // TODO: 导出分配结果
    console.log('导出结果');
    Message.show('导出成功', 'success');
}

// 搜索记录
function searchRecords() {
    const category = document.getElementById('searchCategory').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // TODO: 根据条件重新加载数据
    console.log('搜索条件:', { category, startDate, endDate });
}

// 查看详情
function viewDetail(id) {
    // TODO: 显示分配记录详情
    console.log('查看详情:', id);
} 