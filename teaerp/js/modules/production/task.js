// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadTasks();
    initCharts();
    loadIssues();
    loadEmployees();
});

// 加载任务列表
function loadTasks(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                id: 'T001',
                name: '特级大红袍生产任务',
                source: 'plan',
                sourceName: '2024年1月生产计划',
                product: '特级大红袍',
                quantity: 1000,
                startTime: '2024-01-15 08:00',
                endTime: '2024-01-20 17:00',
                assignee: '张三',
                progress: 75,
                status: 'processing'
            }
        ],
        total: 1
    };

    renderTaskTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染任务表格
function renderTaskTable(tasks) {
    const tbody = document.getElementById('taskTable');
    tbody.innerHTML = tasks.map(task => `
        <tr>
            <td><input type="checkbox" value="${task.id}"></td>
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${getTaskSource(task.source)}<br>${task.sourceName}</td>
            <td>${task.product}</td>
            <td>${task.quantity}</td>
            <td>${task.startTime}</td>
            <td>${task.endTime}</td>
            <td>${task.assignee || '-'}</td>
            <td>
                <div class="progress-bar">
                    <div class="progress" style="width: ${task.progress}%"></div>
                    <span class="progress-text">${task.progress}%</span>
                </div>
            </td>
            <td><span class="status-tag ${getTaskStatusClass(task.status)}">
                ${getTaskStatus(task.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewTask('${task.id}')">查看</a>
                <a href="javascript:void(0)" class="action-link" onclick="editTask('${task.id}')">编辑</a>
                ${task.status === 'pending' ? `
                    <a href="javascript:void(0)" class="action-link" onclick="showAssignModal('${task.id}')">分配</a>
                ` : ''}
                ${task.status === 'processing' ? `
                    <a href="javascript:void(0)" class="action-link" onclick="updateProgress('${task.id}')">更新���度</a>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

// 获取任务来源文本
function getTaskSource(source) {
    const sources = {
        plan: '生产计划',
        order: '销售订单',
        manual: '手工创建'
    };
    return sources[source] || '未知';
}

// 获取任务状态文本
function getTaskStatus(status) {
    const statuses = {
        pending: '待分配',
        assigned: '已分配',
        processing: '进行中',
        completed: '已完成'
    };
    return statuses[status] || '未知';
}

// 获取任务状态样式类
function getTaskStatusClass(status) {
    const classes = {
        pending: 'status-warning',
        assigned: 'status-info',
        processing: 'status-processing',
        completed: 'status-success'
    };
    return classes[status] || '';
}

// 初始化图表
function initCharts() {
    initProgressChart();
    initResourceChart();
}

// 初始化进度图表
function initProgressChart() {
    const chart = echarts.init(document.getElementById('progressChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '任务进度趋势'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['计划进度', '实际进度']
        },
        xAxis: {
            type: 'category',
            data: ['1/15', '1/16', '1/17', '1/18', '1/19']
        },
        yAxis: {
            type: 'value',
            max: 100,
            name: '完成率(%)'
        },
        series: [
            {
                name: '计划进度',
                type: 'line',
                data: [20, 40, 60, 80, 100],
                smooth: true
            },
            {
                name: '实际进度',
                type: 'line',
                data: [15, 35, 55, 75, 85],
                smooth: true
            }
        ]
    };
    chart.setOption(option);
}

// 初始化资源图表
function initResourceChart() {
    const chart = echarts.init(document.getElementById('resourceChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '资源使用情况'
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
                name: '资源使用',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 45, name: '人力资源' },
                    { value: 30, name: '设备资源' },
                    { value: 25, name: '物料资源' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    chart.setOption(option);
}

// 加载问题列表
function loadIssues() {
    // 模拟数据
    const issues = [
        {
            id: 'I001',
            type: 'quality',
            description: '产品色泽不均匀',
            status: 'pending',
            createTime: '2024-01-15 10:00'
        },
        {
            id: 'I002',
            type: 'equipment',
            description: '设备故障需要维修',
            status: 'processing',
            createTime: '2024-01-15 11:00'
        }
    ];

    const issueList = document.getElementById('issueList');
    issueList.innerHTML = issues.map(issue => `
        <div class="issue-item ${issue.status}">
            <div class="issue-header">
                <span class="issue-type">${getIssueType(issue.type)}</span>
                <span class="issue-time">${issue.createTime}</span>
            </div>
            <div class="issue-content">${issue.description}</div>
            <div class="issue-footer">
                <span class="status-tag ${getIssueStatusClass(issue.status)}">
                    ${getIssueStatus(issue.status)}
                </span>
                <a href="javascript:void(0)" onclick="handleIssue('${issue.id}')">处理</a>
            </div>
        </div>
    `).join('');
}

// 获取问题类型文本
function getIssueType(type) {
    const types = {
        quality: '质量问题',
        equipment: '设备问题',
        material: '物料问题',
        personnel: '人员问题'
    };
    return types[type] || '其他问题';
}

// 获取问题状态文本
function getIssueStatus(status) {
    const statuses = {
        pending: '待处理',
        processing: '处理中',
        resolved: '已解决'
    };
    return statuses[status] || '未知';
}

// 获取问题状态样式类
function getIssueStatusClass(status) {
    const classes = {
        pending: 'status-warning',
        processing: 'status-processing',
        resolved: 'status-success'
    };
    return classes[status] || '';
}

// 加载员工列表
function loadEmployees() {
    // 模拟数据
    const employees = [
        { id: 'E001', name: '张三' },
        { id: 'E002', name: '李四' },
        { id: 'E003', name: '王五' }
    ];
    
    const select = document.querySelector('select[name="assignee"]');
    employees.forEach(emp => {
        const option = document.createElement('option');
        option.value = emp.id;
        option.textContent = emp.name;
        select.appendChild(option);
    });
}

// 显示任务分配弹窗
function showAssignModal(taskId) {
    document.querySelector('input[name="taskIds"]').value = taskId;
    showModal('assignModal');
}

// 批量分配任务
function batchAssign() {
    const selectedTasks = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value)
        .filter(id => id);
    
    if (selectedTasks.length === 0) {
        showMessage('请选择要分配的任务');
        return;
    }
    
    document.querySelector('input[name="taskIds"]').value = selectedTasks.join(',');
    showModal('assignModal');
}

// 保存任务分配
function saveAssignment() {
    const form = document.getElementById('assignForm');
    const formData = new FormData(form);
    const assignment = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存分配
    console.log('保存分配:', assignment);
    
    hideModal('assignModal');
    loadTasks();
    showMessage('任务已分配');
}

// 更新任务进度
function updateProgress(taskId) {
    const progress = prompt('请��入最新进度(0-100):', '');
    if (progress === null) return;
    
    const num = parseInt(progress);
    if (isNaN(num) || num < 0 || num > 100) {
        showMessage('请输入0-100之间的数字', 'error');
        return;
    }
    
    // TODO: 调用API更新进度
    console.log('更新进度:', taskId, num);
    loadTasks();
    showMessage('进度已更新');
}

// 处理问题
function handleIssue(issueId) {
    // TODO: 显示问题处理弹窗
    console.log('处理问题:', issueId);
}

// 导出任务
function exportTasks() {
    // TODO: 实现任务导出功能
    console.log('导出任务');
    showMessage('任务已导出');
}

// 搜索任务
function searchTasks() {
    loadTasks(1);
}

// 全选/取消全选
function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (cb !== checkbox) {
            cb.checked = checkbox.checked;
        }
    });
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadTasks(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadTasks(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadTasks(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 