// 引入组件
import { Table } from '../../../../components/table.js';
import { Pagination } from '../../../../components/pagination.js';
import { Message } from '../../../../components/message.js';

// 弹窗相关函数
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

// 查看计划详情
window.viewPlan = function(planId) {
    // 模拟数据
    const planData = {
        'PL202403200001': {
            id: 'PL202403200001',
            scope: '公司',
            type: '销售计划',
            name: '2024年Q1销售目标',
            value: 1000,
            progress: 60,
            startDate: '2024-01-01',
            endDate: '2024-03-31',
            status: '进行中',
            description: '第一季度销售目标计划'
        },
        'PL202403200002': {
            id: 'PL202403200002',
            scope: '部门',
            type: '成本计划',
            name: '生产部Q1成本控制',
            value: 50,
            progress: 100,
            startDate: '2024-01-01',
            endDate: '2024-03-31',
            status: '已完成',
            description: '生产部第一季度成本控制计划'
        },
        'PL202403200003': {
            id: 'PL202403200003',
            scope: '员工',
            type: '销售计划',
            name: '张三Q1销售任务',
            value: 100,
            progress: 0,
            startDate: '2024-01-01',
            endDate: '2024-03-31',
            status: '未开始',
            description: '张三第一季度个人销售任务'
        }
    };

    const plan = planData[planId];
    if (plan) {
        // 填充查看弹窗内容
        const viewForm = document.querySelector('#viewModal .view-form');
        viewForm.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label>计划编号：</label>
                    <span>${plan.id}</span>
                </div>
                <div class="form-group">
                    <label>计划范围：</label>
                    <span>${plan.scope}</span>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>计划类型：</label>
                    <span>${plan.type}</span>
                </div>
                <div class="form-group">
                    <label>计划名称：</label>
                    <span>${plan.name}</span>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>计划值：</label>
                    <span>${plan.value}万</span>
                </div>
                <div class="form-group">
                    <label>当前进度：</label>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${plan.progress}%;">${plan.progress}%</div>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>开始日期：</label>
                    <span>${plan.startDate}</span>
                </div>
                <div class="form-group">
                    <label>结束日期：</label>
                    <span>${plan.endDate}</span>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>完成状态：</label>
                    <span class="status ${getStatusClass(plan.status)}">${plan.status}</span>
                </div>
            </div>
            <div class="form-row full-width">
                <div class="form-group">
                    <label>计划说明：</label>
                    <p>${plan.description}</p>
                </div>
            </div>
        `;
        
        showModal('viewModal');
    } else {
        Message.show('未找到计划信息', 'error');
    }
}

// 更新进度
window.updateProgress = function(planId) {
    // 模拟数据
    const planData = {
        'PL202403200001': {
            progress: 60,
            name: '2024年Q1销售目标'
        },
        'PL202403200002': {
            progress: 100,
            name: '生产部Q1成本控制'
        },
        'PL202403200003': {
            progress: 0,
            name: '张三Q1销售任务'
        }
    };

    const plan = planData[planId];
    if (plan) {
        // 填充进度表单
        const form = document.getElementById('progressForm');
        const progressInput = form.querySelector('input[name="progress"]');
        if (progressInput) {
            progressInput.value = plan.progress;
        }
        
        // 设置当前计划ID用于保存
        form.dataset.planId = planId;
        
        showModal('progressModal');
    } else {
        Message.show('未找到计划信息', 'error');
    }
}

// 保存进度
window.saveProgress = function() {
    const form = document.getElementById('progressForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const planId = form.dataset.planId;
    const progress = form.elements['progress'].value;
    const description = form.elements['description'].value;

    // TODO: 实际项目中这里应该调用后端API
    console.log('保存进度:', { planId, progress, description });
    
    hideModal('progressModal');
    Message.show('进度更新成功！', 'success');
    
    // 更新页面上的进度显示
    const progressBar = document.querySelector(`tr[data-plan-id="${planId}"] .progress-bar .progress`);
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${progress}%`;
    }
}

// 辅助函数
function getStatusClass(status) {
    const statusMap = {
        '未开始': 'not-started',
        '进行中': 'in-progress',
        '已完成': 'completed',
        '已逾期': 'overdue',
        '即将到期': 'warning'
    };
    return statusMap[status] || '';
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initScopeSelector();
    updateStats();
    initTable();
});

// 更新统计数据
function updateStats() {
    // 模拟数据
    const stats = {
        total: 100,
        completed: 45,
        inProgress: 35,
        notStarted: 20
    };

    document.getElementById('totalTargets').textContent = stats.total;
    document.getElementById('completedTargets').textContent = stats.completed;
    document.getElementById('inProgressTargets').textContent = stats.inProgress;
    document.getElementById('notStartedTargets').textContent = stats.notStarted;
}

// 初始化表格
function initTable() {
    const table = new Table('targetTable', {
        columns: [
            { title: '目标编号', key: 'code' },
            { title: '目标名称', key: 'name' },
            { title: '目标值', key: 'value' },
            { title: '当前进度', key: 'progress' },
            { title: '完成率', key: 'completion' },
            { title: '状态', key: 'status' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="updateProgress('${row.id}')">
                    <i class="fas fa-edit"></i> 更新进度
                </button>
            `}
        ]
    });

    // 模拟数据
    const mockData = [
        {
            id: '1',
            code: 'T2024001',
            name: '2024年销售目标',
            value: '1000万',
            progress: '450万',
            completion: '45%',
            status: '进行中'
        },
        {
            id: '2',
            code: 'T2024002',
            name: '客户满意度目标',
            value: '95%',
            progress: '92%',
            completion: '96.8%',
            status: '进行中'
        },
        {
            id: '3',
            code: 'T2024003',
            name: '成本控制目标',
            value: '成本率<15%',
            progress: '当前17%',
            completion: '85%',
            status: '需关注'
        }
    ];

    table.setData(mockData);
}

// 添加进度更新函数
function updateProgress(id) {
    // TODO: 实现进度更新逻辑
    console.log('更新目标进度:', id);
    Message.show('进度更新功能开发中...', 'info');
} 