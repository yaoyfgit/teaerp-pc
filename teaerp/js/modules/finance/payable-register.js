// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadSuppliers();
    loadPayables();
    initCharts();
});

// 加载供应商列表
function loadSuppliers() {
    // 模拟数据
    const suppliers = [
        { id: 'S001', name: '云南茶叶供应商' },
        { id: 'S002', name: '福建茶叶供应商' }
    ];

    const selects = document.querySelectorAll('select[name="supplier"]');
    selects.forEach(select => {
        select.innerHTML = `
            <option value="">请选择供应商</option>
            ${suppliers.map(supplier => `
                <option value="${supplier.id}">${supplier.name}</option>
            `).join('')}
        `;
    });
}

// 加载应付账款列表
function loadPayables(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                id: 'AP202401001',
                type: 'invoice',
                supplier: '云南茶叶供应商',
                amount: 100000,
                paid: 60000,
                remaining: 40000,
                creditDays: 30,
                dueDate: '2024-02-15',
                status: 'partial'
            }
        ],
        total: 1
    };

    renderPayableTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染应付账款表格
function renderPayableTable(payables) {
    const tbody = document.getElementById('payableTable');
    tbody.innerHTML = payables.map(payable => `
        <tr>
            <td>${payable.id}</td>
            <td>${getPayableType(payable.type)}</td>
            <td>${payable.supplier}</td>
            <td>${formatAmount(payable.amount)}</td>
            <td>${formatAmount(payable.paid)}</td>
            <td>${formatAmount(payable.remaining)}</td>
            <td>${payable.creditDays}</td>
            <td>${payable.dueDate}</td>
            <td><span class="status-tag ${getPayableStatusClass(payable.status)}">
                ${getPayableStatus(payable.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewPayable('${payable.id}')">查看</a>
                <a href="javascript:void(0)" class="action-link" onclick="editPayable('${payable.id}')">编辑</a>
                <a href="javascript:void(0)" class="action-link" onclick="showPaymentModal('${payable.id}')">付款</a>
            </td>
        </tr>
    `).join('');
}

// 初始化图表
function initCharts() {
    initTrendChart();
    initAgingChart();
    initSupplierChart();
}

// 初始化趋势图表
function initTrendChart() {
    const chart = echarts.init(document.getElementById('trendChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '应付账款趋势'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['应付金额', '已付金额']
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
                name: '应付金额',
                type: 'line',
                data: [100000, 120000, 150000, 130000, 140000, 160000],
                smooth: true
            },
            {
                name: '已付金额',
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

// 初始化供应商分布图表
function initSupplierChart() {
    const chart = echarts.init(document.getElementById('supplierChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '供应商应付分布'
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
                name: '供应商分布',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 40, name: '云南���叶供应商' },
                    { value: 30, name: '福建茶叶供应商' },
                    { value: 30, name: '其他供应商' }
                ]
            }
        ]
    };
    chart.setOption(option);
}

// 获取应付类型文本
function getPayableType(type) {
    const types = {
        invoice: '采购发票',
        payment: '付款单',
        other: '其他'
    };
    return types[type] || '未知';
}

// 获取应付状态文本
function getPayableStatus(status) {
    const statuses = {
        unpaid: '未付款',
        partial: '部分付款',
        paid: '已付款',
        overdue: '已逾期'
    };
    return statuses[status] || '未知';
}

// 获取应付状态样式
function getPayableStatusClass(status) {
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

// 显示应付账款登记弹窗
function showPayableModal() {
    document.getElementById('payableForm').reset();
    showModal('payableModal');
}

// 保存应付账款
function savePayable() {
    const form = document.getElementById('payableForm');
    const formData = new FormData(form);
    const payable = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存应付账款
    console.log('保存应付账款:', payable);
    
    hideModal('payableModal');
    loadPayables();
    showMessage('应付账款已保存');
}

// 导入应付账款
function importPayables() {
    // TODO: 实现导入功能
    console.log('导入应付账款');
}

// 导出应付账款
function exportPayables() {
    // TODO: 实现导出功能
    console.log('导出应付账款');
    showMessage('应付账款已导出');
}

// 查看应付账款
function viewPayable(id) {
    // TODO: 实现查看功能
    console.log('查看应付账款:', id);
}

// 编辑应付账款
function editPayable(id) {
    // TODO: 实现编辑功能
    console.log('编辑应付账款:', id);
}

// 显示付款弹窗
function showPaymentModal(id) {
    // TODO: 实现付款功能
    console.log('付款:', id);
}

// 搜索应付账款
function searchPayables() {
    loadPayables(1);
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadPayables(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadPayables(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadPayables(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 