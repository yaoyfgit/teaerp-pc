// 页面功能函数
window.showModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

window.hideModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// 初始化表单事件监听
document.addEventListener('DOMContentLoaded', function() {
    // 监听计划范围选择变化
    const scopeSelect = document.querySelector('select[name="scope"]');
    if (scopeSelect) {
        scopeSelect.addEventListener('change', function() {
            const departmentGroup = document.querySelector('.department-group');
            const employeeGroup = document.querySelector('.employee-group');
            
            // 隐藏所有相关字段
            departmentGroup.style.display = 'none';
            employeeGroup.style.display = 'none';
            
            // 根据选择显示相应字段
            switch(this.value) {
                case 'department':
                    departmentGroup.style.display = 'block';
                    loadDepartments();
                    break;
                case 'employee':
                    employeeGroup.style.display = 'block';
                    loadEmployees();
                    break;
            }
        });
    }
});

// 加载部门列表
function loadDepartments() {
    const departmentSelect = document.querySelector('select[name="departmentId"]');
    if (!departmentSelect) return;

    // 模拟部门数据
    const departments = [
        { id: 1, name: '销售部' },
        { id: 2, name: '生产部' },
        { id: 3, name: '财务部' },
        { id: 4, name: '人力资源部' },
        { id: 5, name: '研发部' }
    ];

    departmentSelect.innerHTML = '<option value="">请选择部门</option>' +
        departments.map(dept => `<option value="${dept.id}">${dept.name}</option>`).join('');
}

// 加载员工列表
function loadEmployees() {
    const employeeSelect = document.querySelector('select[name="employeeId"]');
    if (!employeeSelect) return;

    // 模拟员工数据
    const employees = [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
        { id: 3, name: '王五' },
        { id: 4, name: '赵六' }
    ];

    employeeSelect.innerHTML = '<option value="">请选择员工</option>' +
        employees.map(emp => `<option value="${emp.id}">${emp.name}</option>`).join('');
}

// 保存计划
window.savePlan = function() {
    // TODO: 实现保存逻辑
    hideModal('planModal');
    alert('计划保存成功！');
}

// 查看计划
window.viewPlan = function(id) {
    // 模拟计划数据
    const planData = {
        'PL202403200001': {
            id: 'PL202403200001',
            scope: '公司',
            type: '销售计划',
            name: '2024年Q1销售目标',
            value: 1000,
            progress: 75,
            completedValue: 750,
            startDate: '2024-01-01',
            endDate: '2024-03-31',
            status: '进行中',
            description: '第一季度销售目标计划'
        }
    };

    const plan = planData[id];
    if (plan) {
        // 填充计划基本信息
        document.getElementById('viewPlanId').textContent = plan.id;
        document.getElementById('viewPlanScope').textContent = plan.scope;
        document.getElementById('viewPlanType').textContent = plan.type;
        document.getElementById('viewPlanName').textContent = plan.name;
        document.getElementById('viewPlanValue').textContent = formatNumber(plan.value) + '万';
        document.getElementById('viewPlanStartDate').textContent = plan.startDate;
        document.getElementById('viewPlanEndDate').textContent = plan.endDate;
        document.getElementById('viewPlanDescription').textContent = plan.description;

        // 更新进度条
        const progressBar = document.querySelector('#viewPlanModal .progress-bar .progress');
        const progressText = progressBar.querySelector('.progress-text');
        const progressTooltip = progressBar.parentElement.querySelector('.progress-tooltip');
        
        progressBar.style.width = `${plan.progress}%`;
        progressText.textContent = `${plan.progress}%`;
        progressTooltip.innerHTML = `计划值：${formatNumber(plan.value)}万<br>已完成：${formatNumber(plan.completedValue)}万`;

        // 加载销售订单数据
        loadPlanOrders(id);
    }
    
    showModal('viewPlanModal');
}

// 加载计划相关的销售订单
function loadPlanOrders(planId) {
    // 模拟订单数据
    const orders = [
        {
            id: 'SO202403200001',
            customer: '上海茶叶有限公司',
            amount: 200,
            date: '2024-01-15',
            status: 'completed'
        },
        {
            id: 'SO202403200002',
            customer: '北京茶业贸易有限公司',
            amount: 150,
            date: '2024-02-01',
            status: 'completed'
        },
        {
            id: 'SO202403200003',
            customer: '广州茶叶批发市场',
            amount: 250,
            date: '2024-02-20',
            status: 'in-progress'
        },
        {
            id: 'SO202403200004',
            customer: '深圳茶业连锁店',
            amount: 150,
            date: '2024-03-05',
            status: 'pending'
        }
    ];

    const orderTable = document.getElementById('orderTable');
    if (!orderTable) return;

    // 生成订单列表HTML
    orderTable.innerHTML = orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${formatNumber(order.amount)}</td>
            <td>${order.date}</td>
            <td><span class="status ${order.status}">${getStatusText(order.status)}</span></td>
        </tr>
    `).join('');
}

// 获取状态文本
function getStatusText(status) {
    const statusMap = {
        'completed': '已完成',
        'in-progress': '进行中',
        'pending': '待处理'
    };
    return statusMap[status] || status;
}

// 格式化数字
function formatNumber(number) {
    return new Intl.NumberFormat('zh-CN').format(number);
}

// 初始化进度条提示
function initProgressTooltips() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const progress = bar.querySelector('.progress');
        const tooltip = bar.querySelector('.progress-tooltip');
        
        if (progress && tooltip) {
            bar.addEventListener('mousemove', (e) => {
                const rect = bar.getBoundingClientRect();
                tooltip.style.left = (e.clientX - rect.left) + 'px';
                tooltip.style.top = '-40px';
            });
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化其他功能
    initProgressTooltips();
    
    // 监听计划范围选择变化
    const scopeSelect = document.querySelector('select[name="scope"]');
    if (scopeSelect) {
        scopeSelect.addEventListener('change', function() {
            const departmentGroup = document.querySelector('.department-group');
            const employeeGroup = document.querySelector('.employee-group');
            
            // 隐藏所有相关字段
            departmentGroup.style.display = 'none';
            employeeGroup.style.display = 'none';
            
            // 根据选择显示相应字段
            switch(this.value) {
                case 'department':
                    departmentGroup.style.display = 'block';
                    loadDepartments();
                    break;
                case 'employee':
                    employeeGroup.style.display = 'block';
                    loadEmployees();
                    break;
            }
        });
    }
});

// 编辑计划
window.editPlan = function(id) {
    // TODO: 加载计划详情并打开编辑弹窗
    showModal('planModal');
}

// 审批计划
window.approvePlan = function(id) {
    // TODO: 加载计划详情并打开审批弹窗
    showModal('approveModal');
}

// 批准计划
window.approvePlan = function() {
    // TODO: 实现批准逻辑
    hideModal('approveModal');
    alert('计划已批准！');
}

// 驳回计划
window.rejectPlan = function() {
    // TODO: 实现驳回逻辑
    hideModal('approveModal');
    alert('计划已驳回！');
}

// 辅助函数
function formatDate(date) {
    return new Date(date).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function formatNumber(number) {
    return new Intl.NumberFormat('zh-CN').format(number);
} 