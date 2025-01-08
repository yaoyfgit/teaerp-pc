// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadPlans();
    loadResources();
});

// 加载计划列表
function loadPlans(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                id: 'P001',
                name: '2024年1月生产计划',
                source: 'mrp',
                period: 'month',
                startDate: '2024-01-01',
                endDate: '2024-01-31',
                quantity: 10000,
                progress: 75,
                status: 'executing'
            },
            {
                id: 'P002',
                name: '2024年第2周生产计划',
                source: 'manual',
                period: 'week',
                startDate: '2024-01-08',
                endDate: '2024-01-14',
                quantity: 2000,
                progress: 0,
                status: 'draft'
            }
        ],
        total: 2
    };

    renderPlanTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染计划表格
function renderPlanTable(items) {
    const tbody = document.getElementById('planTable');
    tbody.innerHTML = items.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${getPlanSource(item.source)}</td>
            <td>${getPlanPeriod(item.period)}</td>
            <td>${item.startDate}</td>
            <td>${item.endDate}</td>
            <td>${item.quantity}</td>
            <td>
                <div class="progress-bar">
                    <div class="progress" style="width: ${item.progress}%"></div>
                    <span class="progress-text">${item.progress}%</span>
                </div>
            </td>
            <td><span class="status-tag ${getPlanStatusClass(item.status)}">
                ${getPlanStatus(item.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewPlan('${item.id}')">查看</a>
                <a href="javascript:void(0)" class="action-link" onclick="editPlan('${item.id}')">编辑</a>
                <a href="javascript:void(0)" class="action-link" onclick="deletePlan('${item.id}')">删除</a>
            </td>
        </tr>
    `).join('');
}

// 获取计划来源文本
function getPlanSource(source) {
    const sources = {
        mrp: 'MRP运算',
        manual: '手工制定'
    };
    return sources[source] || '未知';
}

// 获取计划周期文本
function getPlanPeriod(period) {
    const periods = {
        day: '日计划',
        week: '周计划',
        month: '月计划'
    };
    return periods[period] || '未知';
}

// 获取计划状态文本
function getPlanStatus(status) {
    const statuses = {
        draft: '草稿',
        confirmed: '已确认',
        executing: '执行中',
        completed: '已完成'
    };
    return statuses[status] || '未知';
}

// 获取计划状态样式类
function getPlanStatusClass(status) {
    const classes = {
        draft: 'status-pending',
        confirmed: 'status-info',
        executing: 'status-processing',
        completed: 'status-completed'
    };
    return classes[status] || '';
}

// 加载资源配置
function loadResources() {
    // TODO: 从后端获取资源数据
    // 已在HTML中静态展示
}

// 显示新增计划弹窗
function showAddPlanModal() {
    document.getElementById('planForm').reset();
    showModal('planModal');
}

// 查看计划
function viewPlan(id) {
    // TODO: 跳转到计划详情页面
    console.log('查看计划:', id);
}

// 编辑计划
function editPlan(id) {
    // TODO: 加载计划数据
    const plan = {
        name: '2024年1月生产计划',
        source: 'mrp',
        period: 'month',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        quantity: 10000,
        target: '完成特级茶叶生产',
        resources: '人员50人，设备10台'
    };
    
    const form = document.getElementById('planForm');
    Object.keys(plan).forEach(key => {
        const input = form.elements[key];
        if (input) {
            input.value = plan[key];
        }
    });
    
    showModal('planModal');
}

// 删除计划
function deletePlan(id) {
    if (confirm('确定要删除该计划吗？')) {
        // TODO: 调用API删除计划
        console.log('删除计划:', id);
        loadPlans();
        showMessage('计划已删除');
    }
}

// 保存计划
function savePlan() {
    const form = document.getElementById('planForm');
    const formData = new FormData(form);
    const plan = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存计划
    console.log('保存计划:', plan);
    
    hideModal('planModal');
    loadPlans();
    showMessage('计划已保存');
}

// 导入计划
function importPlan() {
    // TODO: 实现计划导入功能
    console.log('导入计划');
}

// 导出计划
function exportPlan() {
    // TODO: 实现计划导出功能
    console.log('导���计划');
    showMessage('计划已导出');
}

// 搜索计划
function searchPlans() {
    loadPlans(1);
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadPlans(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadPlans(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadPlans(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 