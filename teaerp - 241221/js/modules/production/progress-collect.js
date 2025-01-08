// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadTasks();
    loadRecords();
});

// 加载任务列表
function loadTasks() {
    // 模拟数据
    const tasks = [
        { id: 'T001', name: '特级大红袍生产任务' },
        { id: 'T002', name: '特级铁观音生产任务' }
    ];
    
    const select = document.querySelector('.search-bar select');
    tasks.forEach(task => {
        const option = document.createElement('option');
        option.value = task.id;
        option.textContent = task.name;
        select.appendChild(option);
    });
}

// 加载任务详情
function loadTaskDetail(taskId) {
    if (!taskId) {
        document.getElementById('progressTable').innerHTML = '';
        return;
    }

    // 模拟数据
    const processes = [
        {
            id: 'P001',
            name: '炒制',
            planQuantity: 1000,
            completedQuantity: 800,
            operator: '张三',
            remark: ''
        },
        {
            id: 'P002',
            name: '揉捻',
            planQuantity: 1000,
            completedQuantity: 700,
            operator: '李四',
            remark: ''
        }
    ];

    renderProgressTable(processes);
}

// 渲染进度表格
function renderProgressTable(processes) {
    const tbody = document.getElementById('progressTable');
    tbody.innerHTML = processes.map(process => `
        <tr>
            <td>${process.name}</td>
            <td>${process.planQuantity}</td>
            <td>${process.completedQuantity}</td>
            <td>
                <input type="number" class="form-control" style="width: 100px" 
                    value="${process.planQuantity - process.completedQuantity}">
            </td>
            <td>
                <input type="datetime-local" class="form-control">
            </td>
            <td>${process.operator}</td>
            <td>
                <input type="text" class="form-control" value="${process.remark}">
            </td>
            <td>
                <a href="javascript:void(0)" class="action-link" 
                    onclick="showCompletionModal('${process.id}', '${process.name}')">录入</a>
            </td>
        </tr>
    `).join('');
}

// 加载完工记录
function loadRecords(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                id: 'C001',
                taskId: 'T001',
                process: '炒制',
                quantity: 100,
                completionTime: '2024-01-15 10:00',
                operator: '张三',
                remark: '正常完工'
            }
        ],
        total: 1
    };

    renderRecordTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染记录表格
function renderRecordTable(records) {
    const tbody = document.getElementById('recordTable');
    tbody.innerHTML = records.map(record => `
        <tr>
            <td>${record.id}</td>
            <td>${record.taskId}</td>
            <td>${record.process}</td>
            <td>${record.quantity}</td>
            <td>${record.completionTime}</td>
            <td>${record.operator}</td>
            <td>${record.remark}</td>
        </tr>
    `).join('');
}

// 显示完工录入弹窗
function showCompletionModal(processId, processName) {
    const form = document.getElementById('completionForm');
    form.elements['processId'].value = processId;
    form.elements['processName'].value = processName;
    form.elements['completionTime'].value = new Date().toISOString().slice(0, 16);
    showModal('completionModal');
}

// 保存完工数据
function saveCompletion() {
    const form = document.getElementById('completionForm');
    const formData = new FormData(form);
    const completion = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存完工数据
    console.log('保存完工:', completion);
    
    hideModal('completionModal');
    loadTaskDetail(completion.taskId);
    loadRecords();
    showMessage('完工数据已保存');
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadRecords(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadRecords(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadRecords(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 