// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadDepartments();
    loadMaterials();
    loadMaterialRecords();
    loadReturnRecords();
    loadLossRecords();
    initCharts();
});

// 加载部门列表
function loadDepartments() {
    // 模拟数据
    const departments = [
        { id: 'D001', name: '生产部' },
        { id: 'D002', name: '包装部' }
    ];

    const selects = document.querySelectorAll('select[name="department"]');
    selects.forEach(select => {
        select.innerHTML = `
            <option value="">请选择部门</option>
            ${departments.map(dept => `
                <option value="${dept.id}">${dept.name}</option>
            `).join('')}
        `;
    });
}

// 加载材料列表
function loadMaterials() {
    // 模拟数据
    const materials = [
        { id: 'M001', name: '茶叶原料', type: 'raw' },
        { id: 'M002', name: '包装盒', type: 'package' }
    ];

    const selects = document.querySelectorAll('select[name="material"]');
    selects.forEach(select => {
        select.innerHTML = `
            <option value="">请选择材料</option>
            ${materials.map(material => `
                <option value="${material.id}">${material.name}</option>
            `).join('')}
        `;
    });
}

// 加载材料领用记录
function loadMaterialRecords(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                id: 'MR202401001',
                type: 'raw',
                material: '茶叶原料',
                quantity: 100,
                price: 50,
                amount: 5000,
                department: '生产部',
                date: '2024-01-15',
                status: 'pending'
            }
        ],
        total: 1
    };

    renderMaterialTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染材料领用表格
function renderMaterialTable(records) {
    const tbody = document.getElementById('materialTable');
    tbody.innerHTML = records.map(record => `
        <tr>
            <td><input type="checkbox" value="${record.id}"></td>
            <td>${record.id}</td>
            <td>${getMaterialType(record.type)}</td>
            <td>${record.material}</td>
            <td>${record.quantity}</td>
            <td>${formatAmount(record.price)}</td>
            <td>${formatAmount(record.amount)}</td>
            <td>${record.department}</td>
            <td>${record.date}</td>
            <td><span class="status-tag ${getStatusClass(record.status)}">
                ${getStatus(record.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewMaterial('${record.id}')">查看</a>
                ${record.status === 'pending' ? `
                    <a href="javascript:void(0)" class="action-link" onclick="editMaterial('${record.id}')">编辑</a>
                    <a href="javascript:void(0)" class="action-link" onclick="deleteMaterial('${record.id}')">删除</a>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

// 加载材料退库记录
function loadReturnRecords() {
    // 模拟数据
    const returns = [
        {
            id: 'RT202401001',
            type: 'raw',
            material: '茶叶原料',
            quantity: 10,
            price: 50,
            amount: 500,
            reason: '质量不合格',
            date: '2024-01-15',
            status: 'pending'
        }
    ];

    renderReturnTable(returns);
}

// 渲染材料退库表格
function renderReturnTable(returns) {
    const tbody = document.getElementById('returnTable');
    tbody.innerHTML = returns.map(record => `
        <tr>
            <td>${record.id}</td>
            <td>${getMaterialType(record.type)}</td>
            <td>${record.material}</td>
            <td>${record.quantity}</td>
            <td>${formatAmount(record.price)}</td>
            <td>${formatAmount(record.amount)}</td>
            <td>${record.reason}</td>
            <td>${record.date}</td>
            <td><span class="status-tag ${getStatusClass(record.status)}">
                ${getStatus(record.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewReturn('${record.id}')">查看</a>
                ${record.status === 'pending' ? `
                    <a href="javascript:void(0)" class="action-link" onclick="editReturn('${record.id}')">编辑</a>
                    <a href="javascript:void(0)" class="action-link" onclick="deleteReturn('${record.id}')">删除</a>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

// 加载材料损耗记录
function loadLossRecords() {
    // 模拟数据
    const losses = [
        {
            id: 'LS202401001',
            type: 'raw',
            material: '茶叶原料',
            quantity: 5,
            price: 50,
            amount: 250,
            lossType: 'normal',
            reason: '生产过程正常损耗',
            date: '2024-01-15'
        }
    ];

    renderLossTable(losses);
}

// 渲染材料损耗表格
function renderLossTable(losses) {
    const tbody = document.getElementById('lossTable');
    tbody.innerHTML = losses.map(record => `
        <tr>
            <td>${record.id}</td>
            <td>${getMaterialType(record.type)}</td>
            <td>${record.material}</td>
            <td>${record.quantity}</td>
            <td>${formatAmount(record.price)}</td>
            <td>${formatAmount(record.amount)}</td>
            <td>${getLossType(record.lossType)}</td>
            <td>${record.reason}</td>
            <td>${record.date}</td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewLoss('${record.id}')">查看</a>
                <a href="javascript:void(0)" class="action-link" onclick="editLoss('${record.id}')">编辑</a>
                <a href="javascript:void(0)" class="action-link" onclick="deleteLoss('${record.id}')">删除</a>
            </td>
        </tr>
    `).join('');
}

// 初始化图表
function initCharts() {
    initTrendChart();
    initStructureChart();
    initLossChart();
}

// 初始化趋势图表
function initTrendChart() {
    const chart = echarts.init(document.getElementById('trendChart'));
    const option = {
        title: {
            text: '材料成本趋势'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['领用金额', '退库金额', '损耗金额']
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
                name: '领用金额',
                type: 'line',
                data: [100000, 120000, 150000, 130000, 140000, 160000],
                smooth: true
            },
            {
                name: '退库金额',
                type: 'line',
                data: [5000, 8000, 12000, 7000, 9000, 11000],
                smooth: true
            },
            {
                name: '损耗金额',
                type: 'line',
                data: [3000, 4000, 6000, 4500, 5000, 7000],
                smooth: true
            }
        ]
    };
    chart.setOption(option);
}

// 初始化成本构成图表
function initStructureChart() {
    const chart = echarts.init(document.getElementById('structureChart'));
    const option = {
        title: {
            text: '材料成本构成'
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
                name: '成本构成',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 60, name: '原料' },
                    { value: 25, name: '辅料' },
                    { value: 15, name: '包装材料' }
                ]
            }
        ]
    };
    chart.setOption(option);
}

// 初始化损耗分析图表
function initLossChart() {
    const chart = echarts.init(document.getElementById('lossChart'));
    const option = {
        title: {
            text: '材料损耗分析'
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
                name: '损耗构成',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 40, name: '正常损耗' },
                    { value: 30, name: '质量问题' },
                    { value: 20, name: '工艺损耗' },
                    { value: 10, name: '其他损耗' }
                ]
            }
        ]
    };
    chart.setOption(option);
}

// 获取材料类型文本
function getMaterialType(type) {
    const types = {
        raw: '原料',
        auxiliary: '辅料',
        package: '包装材料'
    };
    return types[type] || '未知';
}

// 获取损耗类型文本
function getLossType(type) {
    const types = {
        normal: '正常损耗',
        quality: '质量问题',
        process: '工艺损耗',
        other: '其他损耗'
    };
    return types[type] || '未知';
}

// 获取状态文本
function getStatus(status) {
    const statuses = {
        pending: '待确认',
        confirmed: '已确认',
        rejected: '已驳回'
    };
    return statuses[status] || '未知';
}

// 获取状态样式
function getStatusClass(status) {
    const classes = {
        pending: 'status-warning',
        confirmed: 'status-success',
        rejected: 'status-error'
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

// 显示材料领用弹窗
function showMaterialModal() {
    document.getElementById('materialForm').reset();
    showModal('materialModal');
}

// 保存材料领用
function saveMaterial() {
    const form = document.getElementById('materialForm');
    const formData = new FormData(form);
    const material = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存材料领用
    console.log('保存材料领用:', material);
    
    hideModal('materialModal');
    loadMaterialRecords();
    showMessage('材料领用已保存');
}

// 显示材料退库弹窗
function showReturnModal() {
    document.getElementById('returnForm').reset();
    showModal('returnModal');
}

// 保存材料退库
function saveReturn() {
    const form = document.getElementById('returnForm');
    const formData = new FormData(form);
    const returnData = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存材料退库
    console.log('保存材料退库:', returnData);
    
    hideModal('returnModal');
    loadReturnRecords();
    showMessage('材料退库已保存');
}

// 显示材料损耗弹窗
function showLossModal() {
    document.getElementById('lossForm').reset();
    showModal('lossModal');
}

// 保存材料损耗
function saveLoss() {
    const form = document.getElementById('lossForm');
    const formData = new FormData(form);
    const loss = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存材料损耗
    console.log('保存材料损耗:', loss);
    
    hideModal('lossModal');
    loadLossRecords();
    showMessage('材料损耗已保存');
}

// 批量确认
function batchConfirm() {
    const selectedIds = getSelectedIds();
    if (selectedIds.length === 0) {
        showMessage('请选择要确认的记录', 'error');
        return;
    }

    if (confirm(`确定要确认选中的${selectedIds.length}条记录吗？`)) {
        // TODO: 调用API批量确认
        console.log('批量确认:', selectedIds);
        loadMaterialRecords();
        showMessage('记录已确认');
    }
}

// 获取选中的记录ID
function getSelectedIds() {
    const checkboxes = document.querySelectorAll('#materialTable input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// 全选/取消全选
function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('#materialTable input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (cb !== checkbox) {
            cb.checked = checkbox.checked;
        }
    });
}

// 搜索材料领用
function searchMaterials() {
    loadMaterialRecords(1);
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadMaterialRecords(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadMaterialRecords(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadMaterialRecords(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 