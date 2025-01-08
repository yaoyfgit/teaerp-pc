// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    initReportTable();
});

// 初始化报告表格
function initReportTable() {
    const tbody = document.getElementById('reportTable');
    tbody.innerHTML = mockData.reports.map(item => `
        <tr>
            <td>${item.reportId}</td>
            <td>${item.reportType}</td>
            <td>${item.reportDate}</td>
            <td>${item.completion}</td>
            <td>
                <span class="status-badge ${item.issueCount > 0 ? 'warning' : 'success'}">
                    ${item.issueCount}
                </span>
            </td>
            <td>${item.creator}</td>
            <td>${item.createTime}</td>
            <td class="operation-column">
                <button class="standard-button secondary" onclick="showReportModal('${item.reportId}')">
                    <i class="fas fa-edit"></i> 编辑
                </button>
                <button class="standard-button secondary" onclick="deleteReport('${item.reportId}')">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </td>
        </tr>
    `).join('');
}

// 搜索报告
function searchReports() {
    // TODO: 实现搜索逻辑
}

// 导出报告
function exportReports() {
    // TODO: 实现导出逻辑
}

// 显示报告弹窗
function showReportModal(reportId) {
    const modal = document.getElementById('reportModal');
    modal.style.display = 'block';
    if (reportId) {
        // 编辑模式：加载报告数据
        const report = mockData.reports.find(r => r.reportId === reportId);
        if (report) {
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit"></i> 编辑报告';
            const form = document.getElementById('reportForm');
            form.type.value = report.reportType;
            form.reportDate.value = report.reportDate;
            form.completion.value = report.completion;
        }
    } else {
        // 新增模式：清空表单
        document.getElementById('modalTitle').innerHTML = '<i class="fas fa-plus"></i> 新增报告';
        document.getElementById('reportForm').reset();
    }
}

// 隐藏弹窗
function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// 保存报告
function saveReport() {
    // TODO: 实现保存逻辑
    hideModal('reportModal');
}

// 删除报告
function deleteReport(reportId) {
    if (confirm('确定要删除该报告吗？')) {
        // TODO: 实现删除逻辑
    }
} 