// 初始化页面数据
function initPageData() {
    // 初始化统计数据
    initOverview();
    // 初始化表格数据
    initTableData();
    // 初始化表单事件
    initFormEvents();
}

// 初始化统计数据
function initOverview() {
    const overviewData = {
        pendingCount: 3,
        ongoingCount: 2,
        completedCount: 8,
        diffCount: 15
    };

    document.querySelector('.overview-item:nth-child(1) .number').textContent = overviewData.pendingCount;
    document.querySelector('.overview-item:nth-child(2) .number').textContent = overviewData.ongoingCount;
    document.querySelector('.overview-item:nth-child(3) .number').textContent = overviewData.completedCount;
    document.querySelector('.overview-item:nth-child(4) .number').textContent = overviewData.diffCount;
}

// 初始化表格数据
function initTableData() {
    const checkData = [
        {
            id: 1,
            code: 'PD202401200001',
            warehouse: '主仓库',
            scope: 'all',
            productCount: 120,
            diffCount: 5,
            status: 'pending',
            creator: '张三',
            createTime: '2024-01-20 10:30:00',
            completeTime: '-'
        },
        {
            id: 2,
            code: 'PD202401200002',
            warehouse: '次仓库',
            scope: '乌龙茶',
            productCount: 45,
            diffCount: 2,
            status: 'ongoing',
            creator: '李四',
            createTime: '2024-01-20 14:20:00',
            completeTime: '-'
        },
        {
            id: 3,
            code: 'PD202401190003',
            warehouse: '主仓库',
            scope: 'A区',
            productCount: 80,
            diffCount: 8,
            status: 'completed',
            creator: '王五',
            createTime: '2024-01-19 09:15:00',
            completeTime: '2024-01-19 16:30:00'
        }
    ];

    renderCheckTable(checkData);
}

// 渲染盘点表格
function renderCheckTable(data) {
    const tbody = document.getElementById('checkTable');
    tbody.innerHTML = data.map(item => `
        <tr>
            <td>${item.code}</td>
            <td>${item.warehouse}</td>
            <td>${item.scope}</td>
            <td>${item.productCount}</td>
            <td class="diff-count ${item.diffCount > 0 ? 'negative' : ''}">${item.diffCount}</td>
            <td><span class="check-status ${item.status}">${formatStatus(item.status)}</span></td>
            <td>${item.creator}</td>
            <td>${item.createTime}</td>
            <td>${item.completeTime}</td>
            <td>
                <div class="button-group">
                    ${renderActionButtons(item)}
                </div>
            </td>
        </tr>
    `).join('');
}

// 渲染操作按钮
function renderActionButtons(item) {
    switch (item.status) {
        case 'pending':
            return `
                <button class="standard-button" onclick="startCheck(${item.id})">
                    <i class="fas fa-play"></i> 开始盘点
                </button>
                <button class="standard-button" onclick="viewDetail(${item.id})">
                    <i class="fas fa-eye"></i> 查看
                </button>
            `;
        case 'ongoing':
            return `
                <button class="standard-button primary" onclick="continueCheck(${item.id})">
                    <i class="fas fa-edit"></i> 继续盘点
                </button>
                <button class="standard-button" onclick="viewDetail(${item.id})">
                    <i class="fas fa-eye"></i> 查看
                </button>
            `;
        case 'completed':
            return `
                <button class="standard-button" onclick="viewDetail(${item.id})">
                    <i class="fas fa-eye"></i> 查看
                </button>
                <button class="standard-button" onclick="exportDetail(${item.id})">
                    <i class="fas fa-file-export"></i> 导出
                </button>
            `;
        default:
            return '';
    }
}

// 格式化状态
function formatStatus(status) {
    const statusMap = {
        draft: '待盘点',
        ongoing: '盘点中',
        pending: '待审核',
        completed: '已完成'
    };
    return statusMap[status] || status;
}

// 初始化表单事件
function initFormEvents() {
    // 监听盘点范围选择
    const scopeSelect = document.querySelector('select[name="scope"]');
    if (scopeSelect) {
        scopeSelect.addEventListener('change', function() {
            const categoryGroup = document.getElementById('categoryGroup');
            const locationGroup = document.getElementById('locationGroup');
            
            // 隐藏所有附加选项
            categoryGroup.style.display = 'none';
            locationGroup.style.display = 'none';
            
            // 根据选择显示对应选项
            switch (this.value) {
                case 'category':
                    categoryGroup.style.display = 'block';
                    break;
                case 'location':
                    locationGroup.style.display = 'block';
                    break;
            }
        });
    }
}

// 新建盘点
function createCheck() {
    showModal('createModal');
}

// 提交新建
function submitCreate() {
    const form = document.getElementById('createForm');
    const formData = new FormData(form);

    // TODO: 发送创建请求到后端
    console.log('创建盘点:', {
        warehouse: formData.get('warehouse'),
        scope: formData.get('scope'),
        category: formData.get('category'),
        location: formData.get('location'),
        remark: formData.get('remark')
    });

    hideModal('createModal');
    form.reset();
}

// 开始盘点
function startCheck(id) {
    // TODO: 实现开始盘点功能
    console.log('开始盘点:', id);
}

// 继续盘点
function continueCheck(id) {
    // TODO: 实现继续盘点功能
    console.log('继续盘点:', id);
}

// 查看详情
function viewDetail(id) {
    // TODO: 实现查看详情功能
    console.log('查看详情:', id);
}

// 导出详情
function exportDetail(id) {
    // TODO: 实现导出详情功能
    console.log('导出详情:', id);
}

// 查询盘点
function searchCheck() {
    // TODO: 实现查询功能
}

// 导出盘点
function exportCheck() {
    // TODO: 实现导出功能
}

// 显示弹窗
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

// 隐藏弹窗
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initPageData();
});
 