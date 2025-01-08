// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadProcessList();
});

// 显示新增工艺路线模态框
function showAddProcessModal() {
    // 清空表单
    document.getElementById('processForm').reset();
    // 显示模态框
    showModal('processModal');
}

// 保存工艺路线
function saveProcess() {
    const form = document.getElementById('processForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存工艺路线数据
    console.log('保存工艺路线数据:', data);
    
    // 关闭模态框
    hideModal('processModal');
    // 显示成功提示
    Message.show('工艺路线已保存', 'success');
    // 重新加载列表
    loadProcessList();
}

// 加载工艺路线列表
function loadProcessList(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                code: 'P001',
                name: '特级大红袍',
                version: 'V1.0',
                steps: 5,
                creator: '张三',
                createTime: '2024-01-01',
                status: 1
            },
            {
                code: 'P002',
                name: '特级铁观音',
                version: 'V2.0',
                steps: 6,
                creator: '李四',
                createTime: '2024-01-02',
                status: 1
            }
        ],
        total: 2
    };

    renderProcessTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染工艺路线表格
function renderProcessTable(items) {
    const tbody = document.getElementById('processTable');
    tbody.innerHTML = items.map(item => `
        <tr>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.version}</td>
            <td>${item.steps}</td>
            <td>${item.creator}</td>
            <td>${item.createTime}</td>
            <td><span class="status-tag ${item.status === 1 ? 'status-completed' : 'status-error'}">
                ${item.status === 1 ? '启用' : '停用'}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewProcess('${item.code}')">查看</a>
                <a href="javascript:void(0)" class="action-link" onclick="editProcess('${item.code}')">编辑</a>
                <a href="javascript:void(0)" class="action-link" onclick="toggleProcessStatus('${item.code}')">
                    ${item.status === 1 ? '停用' : '启用'}
                </a>
            </td>
        </tr>
    `).join('');
}

// 查看工艺路线
function viewProcess(code) {
    document.getElementById('modalTitle').textContent = '工艺路线查看';
    loadProcessSteps(code);
    showModal('processModal');
}

// 加载工序步骤
function loadProcessSteps(code) {
    // 模拟工序数据
    const mockSteps = [
        {
            step: 1,
            name: '挑选',
            time: 30,
            description: '选择优质茶叶'
        },
        {
            step: 2,
            name: '萎凋',
            time: 120,
            description: '自然萎凋'
        },
        {
            step: 3,
            name: '摇青',
            time: 60,
            description: '适度摇青'
        },
        {
            step: 4,
            name: '炒制',
            time: 45,
            description: '控制火候'
        },
        {
            step: 5,
            name: '包装',
            time: 15,
            description: '真空包装'
        }
    ];

    renderProcessSteps(mockSteps);
}

// 渲染工序步骤
function renderProcessSteps(steps) {
    const stepsContainer = document.getElementById('processSteps');
    stepsContainer.innerHTML = steps.map(step => `
        <div class="process-step">
            <div class="step-header">
                <span class="step-number">${step.step}</span>
                <span class="step-name">${step.name}</span>
                <span class="step-time">${step.time}分钟</span>
            </div>
            <div class="step-body">
                <p>${step.description}</p>
            </div>
        </div>
    `).join('');
}

// 编辑工艺路线
function editProcess(code) {
    document.getElementById('modalTitle').textContent = '工艺路线编辑';
    loadProcessSteps(code);
    showModal('processModal');
}

// 切换工艺路线状态
function toggleProcessStatus(code) {
    // TODO: 调用API切换状态
    console.log('切换工艺路线状态:', code);
    loadProcessList();
    showMessage('状态已更新');
}

// 搜索工艺路线
function searchProcess() {
    loadProcessList(1);
}

// 导出工艺路线
function exportProcess() {
    // TODO: 调用导出API
    console.log('导出工艺路线数据');
    showMessage('导出成功');
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadProcessList(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadProcessList(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadProcessList(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 