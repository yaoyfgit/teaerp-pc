// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    initOverview();
    initProgressChart();
    initWarningTable();
});

// 初始化概览数据
function initOverview() {
    document.querySelector('.status-card:nth-child(1) .number').textContent = mockData.monitor.overview.totalPlans;
    document.querySelector('.status-card:nth-child(2) .number').textContent = mockData.monitor.overview.inProgress;
    document.querySelector('.status-card:nth-child(3) .number').textContent = mockData.monitor.overview.delayed;
    document.querySelector('.status-card:nth-child(4) .number').textContent = mockData.monitor.overview.completed;
}

// 初始化进度图表
function initProgressChart() {
    const chartDom = document.getElementById('progressChart');
    const myChart = echarts.init(chartDom);
    const option = {
        title: {
            text: '生产进度趋势',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['计划进度', '实际进度'],
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '60px',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: mockData.monitor.progressData.dates
        },
        yAxis: {
            type: 'value',
            name: '完成数量(kg)'
        },
        series: [
            {
                name: '计划进度',
                type: 'line',
                data: mockData.monitor.progressData.planned,
                itemStyle: {
                    color: '#8fd4d2'
                }
            },
            {
                name: '实际进度',
                type: 'line',
                data: mockData.monitor.progressData.actual,
                itemStyle: {
                    color: '#ff9800'
                }
            }
        ]
    };
    myChart.setOption(option);
}

// 初始化预警表格
function initWarningTable() {
    const tbody = document.getElementById('warningTable');
    tbody.innerHTML = mockData.monitor.warningList.map(item => `
        <tr>
            <td>${item.planId}</td>
            <td>${item.planName}</td>
            <td>${item.planType}</td>
            <td>${item.originalEndDate}</td>
            <td>${item.expectedEndDate}</td>
            <td>${item.delayDays}天</td>
            <td>
                <span class="status-badge warning">${item.status}</span>
            </td>
            <td>
                <button class="standard-button secondary" onclick="showAdjustModal('${item.planId}')">
                    <i class="fas fa-edit"></i> 调整
                </button>
            </td>
        </tr>
    `).join('');
}

// 显示调整计划弹窗
function showAdjustModal(planId) {
    const modal = document.getElementById('adjustModal');
    modal.style.display = 'block';
}

// 隐藏弹窗
function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// 保存调整
function saveAdjustment() {
    // TODO: 实现保存逻辑
    hideModal('adjustModal');
} 