// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    initProgress();
    initPerformance();
    initLogs();
    initErrors();
    initAnalysis();
});

// 初始化进度信息
function initProgress() {
    const progress = mrpMockData.monitor.progress;
    document.getElementById('mrpProgress').style.width = progress.percentage + '%';
    document.querySelector('.progress-text').textContent = progress.percentage + '%';
    document.querySelector('.status-text').textContent = '预计剩余时间: ' + progress.remainingTime;
}

// 初始化性能信息
function initPerformance() {
    const performance = mrpMockData.monitor.progress.performance;
    document.querySelector('.performance-stats').innerHTML = `
        <div class="stat-item">
            <span class="label">CPU使用率</span>
            <span class="value">${performance.cpu}</span>
        </div>
        <div class="stat-item">
            <span class="label">内存使用</span>
            <span class="value">${performance.memory}</span>
        </div>
        <div class="stat-item">
            <span class="label">运行时长</span>
            <span class="value">${performance.runtime}</span>
        </div>
    `;
}

// 初始化日志
function initLogs() {
    const logViewer = document.getElementById('logViewer');
    logViewer.innerHTML = mrpMockData.monitor.logs.map(log => `
        <div class="log-item ${log.type}">
            <span class="time">[${log.time}]</span>
            <span class="message">${log.message}</span>
        </div>
    `).join('');
    logViewer.scrollTop = logViewer.scrollHeight;
}

// 初始化错误记录
function initErrors() {
    const tbody = document.getElementById('errorTable');
    tbody.innerHTML = mrpMockData.monitor.errors.map(error => `
        <tr>
            <td>${error.time}</td>
            <td>${error.type}</td>
            <td>${error.description}</td>
            <td>${error.impact}</td>
            <td>
                <span class="status-badge warning">${error.status}</span>
            </td>
            <td>
                <button class="standard-button secondary" onclick="handleError('${error.id}')">
                    <i class="fas fa-wrench"></i> 处理
                </button>
            </td>
        </tr>
    `).join('');
}

// 初始化分析图表
function initAnalysis() {
    initDemandChart();
    initMaterialChart();
    initDemandTable();
    initMaterialTable();
    initTabs();
}

// 初始化tab切换
function initTabs() {
    const tabs = document.querySelectorAll('.tab-item');
    const panes = document.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有active类
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));
            
            // 添加active类到当前tab
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-tab');
            document.getElementById(targetId + 'Analysis').classList.add('active');
            
            // 重新渲染图表（解决图表不显示的问题）
            if (targetId === 'demand') {
                const demandChart = echarts.getInstanceByDom(document.getElementById('demandChart'));
                if (demandChart) {
                    demandChart.resize();
                }
            } else if (targetId === 'material') {
                const materialChart = echarts.getInstanceByDom(document.getElementById('materialChart'));
                if (materialChart) {
                    materialChart.resize();
                }
            }
        });
    });
}

// 初始化需求分析图表
function initDemandChart() {
    const chartDom = document.getElementById('demandChart');
    const myChart = echarts.init(chartDom);
    const data = mrpMockData.monitor.analysis.demand;
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['总需求', '订单需求', '预测需求', '安全库存']
        },
        xAxis: {
            type: 'category',
            data: data.products
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '总需求',
                type: 'bar',
                data: data.totalDemand,
                itemStyle: { color: '#8fd4d2' }
            },
            {
                name: '订单需求',
                type: 'bar',
                data: data.orderDemand,
                itemStyle: { color: '#a8e0de' }
            },
            {
                name: '预测需求',
                type: 'bar',
                data: data.forecastDemand,
                itemStyle: { color: '#c5eae8' }
            },
            {
                name: '安全库存',
                type: 'line',
                data: data.safetyStock,
                itemStyle: { color: '#ff9800' }
            }
        ]
    };
    
    myChart.setOption(option);
}

// 初始化物料分析图表
function initMaterialChart() {
    const chartDom = document.getElementById('materialChart');
    const myChart = echarts.init(chartDom);
    const data = mrpMockData.monitor.analysis.material;
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['需求量', '现有库存', '在途库存', '缺口数量']
        },
        xAxis: {
            type: 'category',
            data: data.materials
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '需求量',
                type: 'bar',
                data: data.demand,
                itemStyle: { color: '#8fd4d2' }
            },
            {
                name: '现有库存',
                type: 'bar',
                data: data.stock,
                itemStyle: { color: '#4caf50' }
            },
            {
                name: '在途库存',
                type: 'bar',
                data: data.incoming,
                itemStyle: { color: '#2196f3' }
            },
            {
                name: '缺口数量',
                type: 'bar',
                data: data.shortage,
                itemStyle: { color: '#ff9800' }
            }
        ]
    };
    
    myChart.setOption(option);
}

// 初始化需求分析表格
function initDemandTable() {
    const tbody = document.getElementById('demandAnalysisTable');
    const data = mrpMockData.monitor.analysis.demand;
    tbody.innerHTML = data.products.map((product, index) => `
        <tr>
            <td>${product}</td>
            <td>${data.totalDemand[index]}</td>
            <td>${data.orderDemand[index]}</td>
            <td>${data.forecastDemand[index]}</td>
            <td>${data.safetyStock[index]}</td>
            <td>${data.totalDemand[index] - data.orderDemand[index] - data.forecastDemand[index]}</td>
        </tr>
    `).join('');
}

// 初始化物料分析表格
function initMaterialTable() {
    const tbody = document.getElementById('materialAnalysisTable');
    const data = mrpMockData.monitor.analysis.material;
    tbody.innerHTML = data.materials.map((material, index) => `
        <tr>
            <td>${material}</td>
            <td>${data.demand[index]}</td>
            <td>${data.stock[index]}</td>
            <td>${data.incoming[index]}</td>
            <td>${data.shortage[index]}</td>
            <td>
                <span class="status-badge ${data.shortage[index] > 0 ? 'warning' : 'success'}">
                    ${data.shortage[index] > 0 ? '建议采购' : '库存充足'}
                </span>
            </td>
        </tr>
    `).join('');
}

// 处理错误
function handleError(errorId) {
    // TODO: 实现错误处理逻辑
    alert('处理错误: ' + errorId);
}

// 显示参数调整弹窗
function showAdjustModal() {
    document.getElementById('adjustModal').style.display = 'block';
}

// 显示计划调整弹窗
function showPlanAdjustModal() {
    // TODO: 实现计划调整弹窗
}

// 隐藏弹窗
function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// 保存调整
function saveAdjustment() {
    // TODO: 实现保存调整逻辑
    hideModal('adjustModal');
}

// 重新运算
function rerunMRP() {
    if (confirm('确定要重新运算吗？')) {
        // TODO: 实现重新运算逻辑
    }
} 