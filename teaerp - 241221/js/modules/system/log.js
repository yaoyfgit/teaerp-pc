// 日志管理模块
document.addEventListener('DOMContentLoaded', function() {
    initLogManage();
});

function initLogManage() {
    loadLogList();
    bindEvents();
}

function loadLogList(page = 1) {
    // 模拟API调用
    const mockData = {
        total: 100,
        list: [
            {
                id: 1,
                type: 'login',
                module: '用户认证',
                operator: '张三',
                content: '用户登录',
                ip: '192.168.1.100',
                location: '北京市',
                operateTime: '2024-03-15 10:00:00',
                status: 'success'
            },
            {
                id: 2,
                type: 'operation',
                module: '用户管理',
                operator: '李四',
                content: '新增用户：王五',
                ip: '192.168.1.101',
                location: '上海市',
                operateTime: '2024-03-15 11:00:00',
                status: 'success'
            },
            {
                id: 3,
                type: 'error',
                module: '库存管理',
                operator: '王五',
                content: '库存更新失败：数据库连接异常',
                ip: '192.168.1.102',
                location: '广州市',
                operateTime: '2024-03-15 12:00:00',
                status: 'fail',
                errorStack: 'Error: Database connection failed...'
            }
        ]
    };

    renderLogList(mockData);
    renderPagination(mockData.total);
}

function renderLogList(data) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = data.list.map((log, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                <span class="log-type ${log.type}">
                    ${getLogTypeName(log.type)}
                </span>
            </td>
            <td>${log.module}</td>
            <td>${log.operator}</td>
            <td class="operation-content">${log.content}</td>
            <td>${log.ip}</td>
            <td>${log.location}</td>
            <td>${log.operateTime}</td>
            <td>
                <span class="log-status ${log.status}">
                    ${getStatusName(log.status)}
                </span>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="viewLogDetail(${log.id})" class="action-link">详情</a>
            </td>
        </tr>
    `).join('');
}

function getLogTypeName(type) {
    const types = {
        login: '登录日志',
        operation: '操作日志',
        error: '错误日志'
    };
    return types[type] || type;
}

function getStatusName(status) {
    const statuses = {
        success: '成功',
        fail: '失败'
    };
    return statuses[status] || status;
}

function viewLogDetail(logId) {
    // 模拟获取日志详情
    const mockDetail = {
        id: logId,
        type: 'error',
        module: '库存管理',
        operator: '王五',
        content: '库存更新失败：数据库连接异常',
        ip: '192.168.1.102',
        location: '广州市',
        operateTime: '2024-03-15 12:00:00',
        status: 'fail',
        errorStack: 'Error: Database connection failed...',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...',
        requestMethod: 'POST',
        requestUrl: '/api/stock/update',
        requestParams: '{"id": 1, "quantity": 100}',
        responseData: '{"code": 500, "message": "数据库连接失败"}'
    };

    renderLogDetail(mockDetail);
    showModal('logDetailModal');
}

function renderLogDetail(detail) {
    const container = document.querySelector('.log-detail');
    container.innerHTML = `
        <div class="log-detail-item">
            <div class="log-detail-label">日志类型</div>
            <div class="log-detail-value">
                <span class="log-type ${detail.type}">${getLogTypeName(detail.type)}</span>
            </div>
        </div>
        <div class="log-detail-item">
            <div class="log-detail-label">操作模块</div>
            <div class="log-detail-value">${detail.module}</div>
        </div>
        <div class="log-detail-item">
            <div class="log-detail-label">操作人</div>
            <div class="log-detail-value">${detail.operator}</div>
        </div>
        <div class="log-detail-item">
            <div class="log-detail-label">操作内容</div>
            <div class="log-detail-value">${detail.content}</div>
        </div>
        <div class="log-detail-item">
            <div class="log-detail-label">操作IP</div>
            <div class="log-detail-value">${detail.ip}</div>
        </div>
        <div class="log-detail-item">
            <div class="log-detail-label">操作地点</div>
            <div class="log-detail-value">${detail.location}</div>
        </div>
        <div class="log-detail-item">
            <div class="log-detail-label">操作时间</div>
            <div class="log-detail-value">${detail.operateTime}</div>
        </div>
        <div class="log-detail-item">
            <div class="log-detail-label">操作状态</div>
            <div class="log-detail-value">
                <span class="log-status ${detail.status}">${getStatusName(detail.status)}</span>
            </div>
        </div>
        ${detail.errorStack ? `
            <div class="log-detail-item">
                <div class="log-detail-label">错误堆栈</div>
                <div class="log-detail-value error">${detail.errorStack}</div>
            </div>
        ` : ''}
        <div class="log-detail-item">
            <div class="log-detail-label">请求方法</div>
            <div class="log-detail-value">${detail.requestMethod}</div>
        </div>
        <div class="log-detail-item">
            <div class="log-detail-label">请求地址</div>
            <div class="log-detail-value">${detail.requestUrl}</div>
        </div>
        <div class="log-detail-item">
            <div class="log-detail-label">请求参数</div>
            <div class="log-detail-value">${detail.requestParams}</div>
        </div>
        <div class="log-detail-item">
            <div class="log-detail-label">响应数据</div>
            <div class="log-detail-value">${detail.responseData}</div>
        </div>
    `;
}

function exportLogs() {
    // 导出日志逻辑
    console.log('导出日志');
    alert('日志导出成功');
}

function clearLogs() {
    if (confirm('确定要清空日志吗？此操作不可恢复！')) {
        // 清空日志逻辑
        console.log('清空日志');
        alert('日志清空成功');
        loadLogList();
    }
}

// ... 其他函数 