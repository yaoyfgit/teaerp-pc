// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initMonitoring();
    loadLogs();
    loadErrors();
    initAnalysis();
    loadAdjustments();
});

// 初始化监控
function initMonitoring() {
    updateProgress();
    updatePerformance();
    setInterval(() => {
        updateProgress();
        updatePerformance();
    }, 5000);
}

// 更新进度
function updateProgress() {
    const progress = document.getElementById('mrpProgress');
    // TODO: 从后端获取实际进度
    const percent = 75;
    progress.style.width = `${percent}%`;
    progress.parentElement.querySelector('.progress-text').textContent = `${percent}%`;
}

// 更新性能数据
function updatePerformance() {
    // TODO: 从后端获取实际性能数据
    const stats = {
        cpu: '45%',
        memory: '2.5GB',
        runtime: '15分钟'
    };
    
    document.querySelectorAll('.performance-stats .stat-item').forEach(item => {
        const label = item.querySelector('.label').textContent;
        const value = item.querySelector('.value');
        if (label.includes('CPU')) {
            value.textContent = stats.cpu;
        } else if (label.includes('内存')) {
            value.textContent = stats.memory;
        } else if (label.includes('时长')) {
            value.textContent = stats.runtime;
        }
    });
}

// 加载运算日志
function loadLogs() {
    const logViewer = document.getElementById('logViewer');
    // TODO: 从后端获取日志数据
    const logs = [
        { time: '2024-01-15 10:00:00', level: 'INFO', message: '开始MRP运算' },
        { time: '2024-01-15 10:00:05', level: 'INFO', message: '正在收集需求数据' },
        { time: '2024-01-15 10:00:10', level: 'WARNING', message: '发现部分物料库存不足' }
    ];
    
    logViewer.innerHTML = logs.map(log => `
        <div class="log-item ${log.level.toLowerCase()}">
            <span class="log-time">${log.time}</span>
            <span class="log-level">${log.level}</span>
            <span class="log-message">${log.message}</span>
        </div>
    `).join('');
}

// 加载错误记录
function loadErrors() {
    const tbody = document.getElementById('errorTable');
    // TODO: 从后端获取错误数据
    const errors = [
        {
            time: '2024-01-15 10:05:00',
            type: '数据异常',
            description: '物料M001库存数据不一致',
            scope: '库存核查',
            status: '待处理'
        }
    ];
    
    tbody.innerHTML = errors.map(error => `
        <tr>
            <td>${error.time}</td>
            <td>${error.type}</td>
            <td>${error.description}</td>
            <td>${error.scope}</td>
            <td><span class="status-tag status-warning">${error.status}</span></td>
            <td>
                <a href="javascript:void(0)" onclick="handleError('${error.id}')">处理</a>
            </td>
        </tr>
    `).join('');
}

// 初始化分析图表
function initAnalysis() {
    initDemandChart();
    initMaterialChart();
    loadDemandAnalysis();
    loadMaterialAnalysis();
}

// 初始化需求分析图表
function initDemandChart() {
    const chart = echarts.init(document.getElementById('demandChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '需求分布'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['订单需求', '预测需求', '安全库存需求']
        },
        xAxis: {
            type: 'category',
            data: ['产品A', '产品B', '产品C']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '订单需求',
                type: 'bar',
                stack: 'total',
                data: [320, 302, 301]
            },
            {
                name: '预测需求',
                type: 'bar',
                stack: 'total',
                data: [120, 132, 101]
            },
            {
                name: '安全库存需求',
                type: 'bar',
                stack: 'total',
                data: [220, 182, 191]
            }
        ]
    };
    chart.setOption(option);
}

// 初始化物料分析图表
function initMaterialChart() {
    const chart = echarts.init(document.getElementById('materialChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '物料缺口分析'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['需求量', '可用量', '缺口量']
        },
        xAxis: {
            type: 'category',
            data: ['物料A', '物料B', '物料C']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '需求量',
                type: 'bar',
                data: [500, 420, 350]
            },
            {
                name: '可用量',
                type: 'bar',
                data: [300, 250, 200]
            },
            {
                name: '缺口量',
                type: 'line',
                data: [200, 170, 150]
            }
        ]
    };
    chart.setOption(option);
}

// 加载需求分析数据
function loadDemandAnalysis() {
    const tbody = document.getElementById('demandAnalysisTable');
    // TODO: 从后端获取分析数据
    const demands = [
        {
            product: '特级大红袍',
            total: 1500,
            order: 1000,
            forecast: 300,
            safety: 200,
            shortage: 100
        }
    ];
    
    tbody.innerHTML = demands.map(demand => `
        <tr>
            <td>${demand.product}</td>
            <td>${demand.total}</td>
            <td>${demand.order}</td>
            <td>${demand.forecast}</td>
            <td>${demand.safety}</td>
            <td>${demand.shortage}</td>
        </tr>
    `).join('');
}

// 加载物料分析数据
function loadMaterialAnalysis() {
    const tbody = document.getElementById('materialAnalysisTable');
    // TODO: 从后端获取分析数据
    const materials = [
        {
            name: '大红袍原料',
            demand: 1200,
            stock: 800,
            inTransit: 200,
            shortage: 200,
            suggestion: '建议采购'
        }
    ];
    
    tbody.innerHTML = materials.map(material => `
        <tr>
            <td>${material.name}</td>
            <td>${material.demand}</td>
            <td>${material.stock}</td>
            <td>${material.inTransit}</td>
            <td>${material.shortage}</td>
            <td>${material.suggestion}</td>
        </tr>
    `).join('');
}

// 加载调整历史
function loadAdjustments() {
    const tbody = document.getElementById('adjustmentTable');
    // TODO: 从后端获取调整历史数据
    const adjustments = [
        {
            time: '2024-01-15 09:30:00',
            type: '参数调整',
            content: '修改安全库存系数为1.5',
            operator: '张三',
            reason: '考虑春节备货',
            scope: '所有产品'
        }
    ];
    
    tbody.innerHTML = adjustments.map(adj => `
        <tr>
            <td>${adj.time}</td>
            <td>${adj.type}</td>
            <td>${adj.content}</td>
            <td>${adj.operator}</td>
            <td>${adj.reason}</td>
            <td>${adj.scope}</td>
        </tr>
    `).join('');
}

// 显示参数调整弹窗
function showAdjustModal() {
    showModal('adjustModal');
}

// 保存参数调整
function saveAdjustment() {
    const form = document.getElementById('adjustForm');
    const formData = new FormData(form);
    const adjustment = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存调整
    console.log('保存调整:', adjustment);
    
    hideModal('adjustModal');
    loadAdjustments();
    showMessage('调整已保存');
}

// 重新运行MRP
function rerunMRP() {
    if (confirm('确定要重新运行MRP运算吗？')) {
        // TODO: 调用API重新运行MRP
        console.log('重新运行MRP');
        showMessage('MRP运算已重新启动');
    }
}

// 处理错误
function handleError(errorId) {
    // TODO: 显示错误处理弹窗
    console.log('处理错误:', errorId);
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 