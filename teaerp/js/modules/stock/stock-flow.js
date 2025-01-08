// 初始化页面数据
function initPageData() {
    // 初始化统计数据
    initOverview();
    // 初始化表格数据
    initTableData();
}

// 初始化统计数据
function initOverview() {
    const overviewData = {
        inboundCount: 256,
        outboundCount: 189,
        adjustCount: 12,
        transferCount: 8
    };

    document.querySelector('.overview-item:nth-child(1) .number').textContent = overviewData.inboundCount;
    document.querySelector('.overview-item:nth-child(2) .number').textContent = overviewData.outboundCount;
    document.querySelector('.overview-item:nth-child(3) .number').textContent = overviewData.adjustCount;
    document.querySelector('.overview-item:nth-child(4) .number').textContent = overviewData.transferCount;
}

// 初始化表格数据
function initTableData() {
    const flowData = [
        {
            time: '2023-06-15 14:30:00',
            type: 'in',
            docNo: 'RK202306150001',
            code: 'P001',
            name: '大红袍',
            spec: '250g/盒',
            warehouse: '主仓库',
            change: '+100',
            after: 1200,
            operator: '张三',
            remark: '采购入库'
        },
        {
            time: '2023-06-15 15:20:00',
            type: 'out',
            docNo: 'CK202306150002',
            code: 'P002',
            name: '铁观音',
            spec: '100g/盒',
            warehouse: '主仓库',
            change: '-50',
            after: 250,
            operator: '李四',
            remark: '销售出库'
        },
        {
            time: '2023-06-15 16:10:00',
            type: 'adjust',
            docNo: 'TZ202306150003',
            code: 'P003',
            name: '龙井',
            spec: '50g/盒',
            warehouse: '次仓库',
            change: '+10',
            after: 210,
            operator: '王五',
            remark: '盘盈调整'
        },
        {
            time: '2023-06-15 16:45:00',
            type: 'transfer',
            docNo: 'DB202306150004',
            code: 'P004',
            name: '普洱茶',
            spec: '357g/饼',
            warehouse: '主仓库',
            change: '-100',
            after: 750,
            operator: '赵六',
            remark: '调拨至次仓库'
        }
    ];

    renderFlowTable(flowData);
}

// 渲染流水表格
function renderFlowTable(data) {
    const tbody = document.getElementById('flowTable');
    tbody.innerHTML = data.map(item => `
        <tr>
            <td>${item.time}</td>
            <td><span class="flow-type ${item.type}">${formatFlowType(item.type)}</span></td>
            <td>${item.docNo}</td>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.spec}</td>
            <td>${item.warehouse}</td>
            <td class="flow-change ${item.change.startsWith('+') ? 'positive' : 'negative'}">${item.change}</td>
            <td>${item.after}</td>
            <td>${item.operator}</td>
            <td>${item.remark}</td>
            <td>
                <div class="button-group">
                    <button class="standard-button" onclick="viewDetail('${item.docNo}')">
                        <i class="fas fa-eye"></i> 查看
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 格式化流水类型
function formatFlowType(type) {
    const typeMap = {
        in: '入库',
        out: '出库',
        adjust: '调整',
        transfer: '调拨'
    };
    return typeMap[type] || type;
}

// 查询流水
function searchFlow() {
    // TODO: 实现查询功能
}

// 导出流水
function exportFlow() {
    // TODO: 实现导出功能
}

// 查看详情
function viewDetail(docNo) {
    // TODO: 实现查看详情功能
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initPageData();
}); 