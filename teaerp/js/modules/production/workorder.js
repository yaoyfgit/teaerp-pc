// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadWorkOrderList();
});

// 加载工单列表
function loadWorkOrderList(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                orderNo: 'WO202403001',
                productCode: 'P001',
                productName: '特级大红袍',
                planQty: 1000,
                completedQty: 500,
                startDate: '2024-03-20',
                endDate: '2024-03-25',
                status: 'processing'
            }
        ],
        total: 1
    };

    renderWorkOrderTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染工单表格
function renderWorkOrderTable(items) {
    const tbody = document.getElementById('workOrderTable');
    tbody.innerHTML = items.map(item => `
        <tr>
            <td>${item.orderNo}</td>
            <td>${item.productCode}</td>
            <td>${item.productName}</td>
            <td>${item.planQty}</td>
            <td>${item.completedQty}</td>
            <td>${item.startDate}</td>
            <td>${item.endDate}</td>
            <td><span class="status-tag ${getStatusClass(item.status)}">
                ${getStatusText(item.status)}
            </span></td>
            <td>
                <a href="javascript:void(0)" onclick="viewWorkOrder('${item.orderNo}')">查看</a>
                <a href="javascript:void(0)" onclick="reportProgress('${item.orderNo}')">报工</a>
                <a href="javascript:void(0)" onclick="closeWorkOrder('${item.orderNo}')">关闭</a>
            </td>
        </tr>
    `).join('');
}

// 从计划生成工单
function createFromPlan() {
    showModal('planSelectorModal');
    loadPlansForWorkOrder();
}

// 加载可生成工单的计划列表
function loadPlansForWorkOrder() {
    // 模拟数据
    const mockPlans = [
        {
            planNo: 'PP202403001',
            productCode: 'P001',
            productName: '特级大红袍',
            planQty: 1000,
            generatedQty: 500,
            planDate: '2024-03-20'
        }
    ];

    renderPlanSelectorTable(mockPlans);
}

// 渲染计划选择表格
function renderPlanSelectorTable(plans) {
    const tbody = document.getElementById('planSelectorTable');
    tbody.innerHTML = plans.map(plan => `
        <tr>
            <td><input type="checkbox" value="${plan.planNo}"></td>
            <td>${plan.planNo}</td>
            <td>${plan.productCode}</td>
            <td>${plan.productName}</td>
            <td>${plan.planQty}</td>
            <td>${plan.generatedQty}</td>
            <td>${plan.planDate}</td>
        </tr>
    `).join('');
}

// 生成工单
function generateWorkOrders() {
    const selectedPlans = Array.from(document.querySelectorAll('#planSelectorTable input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    
    if (selectedPlans.length === 0) {
        Message.show('请选择需要生成工单的计划', 'warning');
        return;
    }
    
    // TODO: 调用API生成工单
    console.log('生成工单:', selectedPlans);
    
    hideModal('planSelectorModal');
    Message.show('工单生成成功', 'success');
    loadWorkOrderList();
}

// 状态相关函数
function getStatusClass(status) {
    const statusMap = {
        pending: 'status-pending',
        processing: 'status-processing',
        completed: 'status-completed',
        closed: 'status-error'
    };
    return statusMap[status] || 'status-pending';
}

function getStatusText(status) {
    const statusMap = {
        pending: '待生产',
        processing: '生产中',
        completed: '已完成',
        closed: '已关闭'
    };
    return statusMap[status] || '未知';
}

// 查看工单详情
function viewWorkOrder(orderNo) {
    // 模拟获取工单详情数据
    const mockDetail = {
        orderNo: 'WO202403001',
        productCode: 'P001',
        productName: '特级大红袍',
        planQty: 1000,
        completedQty: 500,
        startDate: '2024-03-20',
        endDate: '2024-03-25',
        status: 'processing',
        planNo: 'PP202403001',
        bom: {
            code: 'BOM001',
            version: 'V1.0'
        },
        process: {
            code: 'PROC001',
            version: 'V1.0'
        },
        progressList: [
            {
                date: '2024-03-20',
                quantity: 200,
                operator: '张三',
                remark: '正常生产'
            },
            {
                date: '2024-03-21',
                quantity: 300,
                operator: '李四',
                remark: '设备调试后生产'
            }
        ]
    };

    showWorkOrderDetail(mockDetail);
}

// 显示工单详情
function showWorkOrderDetail(detail) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'workOrderDetailModal';
    
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h3>工单详情 - ${detail.orderNo}</h3>
                <span class="close" onclick="hideModal('workOrderDetailModal')">&times;</span>
            </div>
            <div class="modal-body">
                <div class="detail-section">
                    <h4>基本信息</h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>产品编码：</label>
                            <span>${detail.productCode}</span>
                        </div>
                        <div class="info-item">
                            <label>产品名称：</label>
                            <span>${detail.productName}</span>
                        </div>
                        <div class="info-item">
                            <label>计划数量：</label>
                            <span>${detail.planQty}</span>
                        </div>
                        <div class="info-item">
                            <label>已完成数量：</label>
                            <span>${detail.completedQty}</span>
                        </div>
                        <div class="info-item">
                            <label>开始日期：</label>
                            <span>${detail.startDate}</span>
                        </div>
                        <div class="info-item">
                            <label>结束日期：</label>
                            <span>${detail.endDate}</span>
                        </div>
                        <div class="info-item">
                            <label>生产状态：</label>
                            <span class="status-tag ${getStatusClass(detail.status)}">${getStatusText(detail.status)}</span>
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>生产进度记录</h4>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>日期</th>
                                <th>完成数量</th>
                                <th>操作人</th>
                                <th>备注</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${detail.progressList.map(progress => `
                                <tr>
                                    <td>${progress.date}</td>
                                    <td>${progress.quantity}</td>
                                    <td>${progress.operator}</td>
                                    <td>${progress.remark}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    showModal('workOrderDetailModal');
}

// 报工
function reportProgress(orderNo) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'progressReportModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>生产报工</h3>
                <span class="close" onclick="hideModal('progressReportModal')">&times;</span>
            </div>
            <div class="modal-body">
                <form id="progressForm">
                    <input type="hidden" name="orderNo" value="${orderNo}">
                    <div class="form-group">
                        <label>报工日期</label>
                        <input type="date" name="date" value="${new Date().toISOString().split('T')[0]}" required>
                    </div>
                    <div class="form-group">
                        <label>完成数量</label>
                        <input type="number" name="quantity" min="1" required>
                    </div>
                    <div class="form-group">
                        <label>备注说明</label>
                        <textarea name="remark" rows="3"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="button" onclick="hideModal('progressReportModal')">取消</button>
                <button type="button" class="button primary" onclick="submitProgress()">提交</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    showModal('progressReportModal');
}

// 提交报工
function submitProgress() {
    const form = document.getElementById('progressForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API提交报工数据
    console.log('提交报工:', data);
    
    hideModal('progressReportModal');
    Message.show('报工成功', 'success');
    loadWorkOrderList();
}

// 关闭工单
function closeWorkOrder(orderNo) {
    if (confirm('确定要关闭该工单吗？')) {
        // TODO: 调用API关闭工单
        console.log('关闭工单:', orderNo);
        Message.show('工单已关闭', 'success');
        loadWorkOrderList();
    }
} 