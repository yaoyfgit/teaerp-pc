// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initCharts();
    loadWarnings();
});

// 初始化图表
function initCharts() {
    const chart = echarts.init(document.getElementById('progressChart'));
    
    // 模拟数据
    const option = {
        title: {
            text: '生产进度趋势'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['计划进度', '实际进度']
        },
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
                data: [30, 40, 50, 60, 70, 80, 90],
                smooth: true
            },
            {
                name: '实际进度',
                type: 'line',
                data: [28, 35, 45, 55, 62, 70, 75],
                smooth: true
            }
        ]
    };

    chart.setOption(option);
    
    // 响应窗口大小变化
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// 加载延期预警数据
function loadWarnings() {
    // 模拟数据
    const warnings = [
        {
            id: 'P001',
            name: '2024年Q1生产计划',
            type: 1,
            originalEndDate: '2024-03-31',
            expectedEndDate: '2024-04-15',
            delayDays: 15,
            status: 'warning'
        },
        {
            id: 'P002',
            name: '2024年1月生产计划',
            type: 2,
            originalEndDate: '2024-01-31',
            expectedEndDate: '2024-02-10',
            delayDays: 10,
            status: 'warning'
        }
    ];

    renderWarningTable(warnings);
}

// 渲染预警表格
function renderWarningTable(warnings) {
    const tbody = document.getElementById('warningTable');
    tbody.innerHTML = warnings.map(warning => `
        <tr>
            <td>${warning.id}</td>
            <td>${warning.name}</td>
            <td>${getPlanType(warning.type)}</td>
            <td>${warning.originalEndDate}</td>
            <td>${warning.expectedEndDate}</td>
            <td><span class="delay-days">${warning.delayDays}天</span></td>
            <td><span class="status-tag status-warning">延期</span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="showAdjustModal('${warning.id}')">调整计划</a>
                <a href="javascript:void(0)" class="action-link" onclick="viewDetail('${warning.id}')">查看详情</a>
            </td>
        </tr>
    `).join('');
}

// 获取计划类型文本
function getPlanType(type) {
    const types = {
        1: '总进度计划',
        2: '月度计划',
        3: '周进度计划'
    };
    return types[type] || '未知';
}

// 显示调整计划弹窗
function showAdjustModal(id) {
    // TODO: 加载计划详情
    showModal('adjustModal');
}

// 保存调整
function saveAdjustment() {
    const form = document.getElementById('adjustForm');
    const formData = new FormData(form);
    const adjustment = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存调整
    console.log('保存调整:', adjustment);
    
    hideModal('adjustModal');
    loadWarnings();
    showMessage('调整已保存');
}

// 查看详情
function viewDetail(id) {
    // TODO: 跳转到详情页面
    console.log('查看详情:', id);
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息��示组件
    alert(message);
} 