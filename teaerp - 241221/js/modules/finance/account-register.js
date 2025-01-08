// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadCustomers();
    loadReceivables();
    initCharts();
});

// 加载客户列表
function loadCustomers() {
    // 模拟数据
    const customers = [
        { id: 'C001', name: '上海茶叶公司' },
        { id: 'C002', name: '北京茶叶批发市场' }
    ];

    const selects = document.querySelectorAll('select[name="customer"]');
    selects.forEach(select => {
        select.innerHTML = `
            <option value="">请选择客户</option>
            ${customers.map(customer => `
                <option value="${customer.id}">${customer.name}</option>
            `).join('')}
        `;
    });
}

// 加载应收账款列表
function loadReceivables(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                id: 'AR202401001',
                type: 'invoice',
                customer: '上海茶叶公司',
                amount: 100000,
                received: 60000,
                remaining: 40000,
                creditDays: 30,
                dueDate: '2024-02-15',
                status: 'partial'
            }
        ],
        total: 1
    };

    renderReceivableTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染应收账款表格
function renderReceivableTable(receivables) {
    const tbody = document.getElementById('receivableTable');
    tbody.innerHTML = receivables.map(receivable => `
        <tr>
            <td>${receivable.id}</td>
            <td>${getReceivableType(receivable.type)}</td>
            <td>${receivable.customer}</td>
            <td>${formatAmount(receivable.amount)}</td>
            <td>${formatAmount(receivable.received)}</td>
            <td>${formatAmount(receivable.remaining)}</td>
            <td>${receivable.creditDays}</td>
            <td>${receivable.dueDate}</td>
            <td><span class="status-tag ${getReceivableStatusClass(receivable.status)}">
                ${getReceivableStatus(receivable.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewReceivable('${receivable.id}')">查看</a>
                <a href="javascript:void(0)" class="action-link" onclick="editReceivable('${receivable.id}')">编辑</a>
                <a href="javascript:void(0)" class="action-link" onclick="showReceiveModal('${receivable.id}')">收款</a>
            </td>
        </tr>
    `).join('');
}

// 获取应收类型文本
function getReceivableType(type) {
    const types = {
        invoice: '销售发票',
        receipt: '收款单',
        other: '其他'
    };
    return types[type] || '未知';
}

// 获取应收状态文本
function getReceivableStatus(status) {
    const statuses = {
        unpaid: '未收款',
        partial: '部分收款',
        paid: '已收款',
        overdue: '已逾期'
    };
    return statuses[status] || '未知';
}

// 获取应收状态样式
function getReceivableStatusClass(status) {
    const classes = {
        unpaid: 'status-warning',
        partial: 'status-info',
        paid: 'status-success',
        overdue: 'status-error'
    };
    return classes[status] || '';
}

// 格式化金额
function formatAmount(amount) {
    return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
    }).format(amount);
}

// 初始化图表
function initCharts() {
    initTrendChart();
    initAgingChart();
    initCustomerChart();
}

// 初始化趋势图表
function initTrendChart() {
    const chart = echarts.init(document.getElementById('trendChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '应收账款趋势'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['应收金额', '已收金额']
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            name: '金额'
        },
        series: [
            {
                name: '应收金额',
                type: 'line',
                data: [100000, 120000, 150000, 130000, 140000, 160000],
                smooth: true
            },
            {
                name: '已收金额',
                type: 'line',
                data: [80000, 100000, 120000, 100000, 110000, 130000],
                smooth: true
            }
        ]
    };
    chart.setOption(option);
}

// 初始化账龄图表
function initAgingChart() {
    const chart = echarts.init(document.getElementById('agingChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '账龄分析'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'right'
        },
        series: [
            {
                name: '账龄分布',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 50, name: '30天以内' },
                    { value: 30, name: '31-60天' },
                    { value: 15, name: '61-90天' },
                    { value: 5, name: '90天以上' }
                ]
            }
        ]
    };
    chart.setOption(option);
}

// 初始化客户分布图表
function initCustomerChart() {
    const chart = echarts.init(document.getElementById('customerChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '客户应收分布'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'right'
        },
        series: [
            {
                name: '客户分布',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 40, name: '上海茶叶公司' },
                    { value: 30, name: '北京茶叶批发市场' },
                    { value: 30, name: '其他客户' }
                ]
            }
        ]
    };
    chart.setOption(option);
}

// 显示新增应收弹窗
function showAddModal() {
    document.getElementById('receivableForm').reset();
    showModal('receivableModal');
}

// 保存应收账款
function saveReceivable() {
    const form = document.getElementById('receivableForm');
    const formData = new FormData(form);
    const receivable = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存应收账款
    console.log('保存应收账款:', receivable);
    
    hideModal('receivableModal');
    loadReceivables();
    showMessage('应收账款已保存');
}

// 导入应收账款
function importReceivables() {
    // TODO: 实现导入功能
    console.log('导入应收账款');
}

// 导出应收账款
function exportReceivables() {
    // TODO: 实现导出功能
    console.log('导出应收账款');
    showMessage('应收账款已导出');
}

// 查看应收账款
function viewReceivable(id) {
    // TODO: 实现查看功能
    console.log('查看应收账款:', id);
}

// 编辑应收账款
function editReceivable(id) {
    // TODO: 实现编辑功能
    console.log('编辑应收账款:', id);
}

// 显示收款弹窗
function showReceiveModal(id) {
    // TODO: 实现收款功能
    console.log('收款:', id);
}

// 搜索应收账款
function searchReceivables() {
    loadReceivables(1);
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadReceivables(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadReceivables(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadReceivables(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 