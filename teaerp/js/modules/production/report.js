// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadReports();
});

// 加载报告列表
function loadReports(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                id: 'R001',
                type: 1,
                reportDate: '2024-01-15',
                completion: '90%',
                issueCount: 2,
                creator: '张三',
                createTime: '2024-01-15 18:00'
            },
            {
                id: 'R002',
                type: 2,
                reportDate: '2024-01-14',
                completion: '85%',
                issueCount: 1,
                creator: '李四',
                createTime: '2024-01-14 18:00'
            }
        ],
        total: 2
    };

    renderReportTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染报告表格
function renderReportTable(items) {
    const tbody = document.getElementById('reportTable');
    tbody.innerHTML = items.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${getReportType(item.type)}</td>
            <td>${item.reportDate}</td>
            <td>${item.completion}</td>
            <td>${item.issueCount}</td>
            <td>${item.creator}</td>
            <td>${item.createTime}</td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="viewReport('${item.id}')">查看</a>
                <a href="javascript:void(0)" class="action-link" onclick="editReport('${item.id}')">编辑</a>
                <a href="javascript:void(0)" class="action-link" onclick="deleteReport('${item.id}')">删除</a>
            </td>
        </tr>
    `).join('');
}

// 获取报告类型文本
function getReportType(type) {
    const types = {
        1: '日报',
        2: '周报',
        3: '月报'
    };
    return types[type] || '未知';
}

// 显示新增报告弹窗
function showAddReportModal() {
    document.getElementById('modalTitle').textContent = '新增报告';
    document.getElementById('reportForm').reset();
    showModal('reportModal');
}

// 查看报告
function viewReport(id) {
    document.getElementById('modalTitle').textContent = '查看报告';
    loadReportDetail(id);
    showModal('reportModal');
}

// 编辑报告
function editReport(id) {
    document.getElementById('modalTitle').textContent = '编辑报��';
    loadReportDetail(id);
    showModal('reportModal');
}

// 加载报告详情
function loadReportDetail(id) {
    // 模拟获取报告数据
    const report = {
        id: 'R001',
        type: 1,
        reportDate: '2024-01-15',
        completion: '今日完成产品A生产100件，产品B生产80件...',
        issues: '设备A出现故障，已维修',
        solutions: '更换零件，增加维护频率',
        nextPlan: '明日计划生产产品C 150件'
    };
    
    const form = document.getElementById('reportForm');
    Object.keys(report).forEach(key => {
        const input = form.elements[key];
        if (input) {
            input.value = report[key];
        }
    });
}

// 保存报告
function saveReport() {
    const form = document.getElementById('reportForm');
    const formData = new FormData(form);
    const report = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存数据
    console.log('保存报告:', report);
    
    hideModal('reportModal');
    loadReports();
    showMessage('保存成功');
}

// 删除报告
function deleteReport(id) {
    if (confirm('确定要删除该报告吗？')) {
        // TODO: 调用API删除数据
        console.log('删除报告:', id);
        loadReports();
        showMessage('删除成功');
    }
}

// 搜索报告
function searchReports() {
    loadReports(1);
}

// 导出报告
function exportReports() {
    // TODO: 调用导出API
    console.log('导出报告数据');
    showMessage('导出成功');
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadReports(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadReports(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadReports(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 