// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadPlans();
});

// 加载计划列表
function loadPlans(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                id: 'P001',
                name: '2024年Q1生产计划',
                type: 1,
                startDate: '2024-01-01',
                endDate: '2024-03-31',
                progress: 35,
                status: 2
            },
            {
                id: 'P002',
                name: '2024年1月生产计划',
                type: 2,
                startDate: '2024-01-01',
                endDate: '2024-01-31',
                progress: 80,
                status: 2
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
            <td>${getPlanType(item.type)}</td>
            <td>${item.startDate}</td>
            <td>${item.endDate}</td>
            <td>
                <div class="progress-bar">
                    <div class="progress" style="width: ${item.progress}%"></div>
                    <span>${item.progress}%</span>
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

// 获取计划类型文本
function getPlanType(type) {
    const types = {
        1: '总进度计划',
        2: '月度计划',
        3: '周进度计划'
    };
    return types[type] || '未知';
}

// 获取计划状态文本
function getPlanStatus(status) {
    const statuses = {
        1: '未开始',
        2: '进行中',
        3: '已完成',
        4: '已延期'
    };
    return statuses[status] || '未知';
}

// 获取计划状态样式类
function getPlanStatusClass(status) {
    const classes = {
        1: 'status-pending',
        2: 'status-processing',
        3: 'status-completed',
        4: 'status-error'
    };
    return classes[status] || '';
}

// 显示新增计划弹窗
function showAddPlanModal() {
    document.getElementById('modalTitle').textContent = '新增计划';
    document.getElementById('planForm').reset();
    showModal('planModal');
}

// 查看计划
function viewPlan(id) {
    document.getElementById('modalTitle').textContent = '查看计划';
    loadPlanDetail(id);
    showModal('planModal');
}

// 编辑计划
function editPlan(id) {
    document.getElementById('modalTitle').textContent = '编辑计划';
    loadPlanDetail(id);
    showModal('planModal');
}

// 加载计划详情
function loadPlanDetail(id) {
    // 模拟获取计划数据
    const plan = {
        id: 'P001',
        name: '2024年Q1生产计划',
        type: 1,
        startDate: '2024-01-01',
        endDate: '2024-03-31',
        content: '第一季度生产计划内容...',
        resources: '人力资源配置...'
    };
    
    const form = document.getElementById('planForm');
    Object.keys(plan).forEach(key => {
        const input = form.elements[key];
        if (input) {
            input.value = plan[key];
        }
    });
}

// 保存计划
function savePlan() {
    const form = document.getElementById('planForm');
    const formData = new FormData(form);
    const plan = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存数据
    console.log('保存计划:', plan);
    
    hideModal('planModal');
    loadPlans();
    showMessage('保存成功');
}

// 删除计划
function deletePlan(id) {
    if (confirm('确定要删除该计划吗？')) {
        // TODO: 调用API删除数据
        console.log('删除计划:', id);
        loadPlans();
        showMessage('删除成功');
    }
}

// 搜索计划
function searchPlans() {
    loadPlans(1);
}

// 导出计划
function exportPlans() {
    // TODO: 调用导出API
    console.log('导出计划数据');
    showMessage('导出成功');
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