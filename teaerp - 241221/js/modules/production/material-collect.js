// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadTasks();
    initCharts();
    loadSuggestions();
});

// 加载任务列表
function loadTasks() {
    // 模拟数据
    const tasks = [
        { id: 'T001', name: '特级大红袍生产任务' },
        { id: 'T002', name: '特级铁观音生产任务' }
    ];
    
    const select = document.querySelector('.search-bar select');
    tasks.forEach(task => {
        const option = document.createElement('option');
        option.value = task.id;
        option.textContent = task.name;
        select.appendChild(option);
    });
}

// 加载物料清单
function loadMaterialList(taskId) {
    if (!taskId) {
        document.getElementById('materialTable').innerHTML = '';
        return;
    }

    // 模拟数据
    const materials = [
        {
            id: 'M001',
            code: 'M001',
            name: '大红袍原料',
            specification: '特级',
            planQuantity: 1000,
            consumed: 800,
            unit: 'kg'
        },
        {
            id: 'M002',
            code: 'M002',
            name: '包装袋',
            specification: '100g',
            planQuantity: 10000,
            consumed: 8000,
            unit: '个'
        }
    ];

    renderMaterialTable(materials);
}

// 渲染物料表格
function renderMaterialTable(materials) {
    const tbody = document.getElementById('materialTable');
    tbody.innerHTML = materials.map(material => `
        <tr>
            <td>${material.code}</td>
            <td>${material.name}</td>
            <td>${material.specification}</td>
            <td>${material.planQuantity}${material.unit}</td>
            <td>${material.consumed}${material.unit}</td>
            <td>
                <input type="number" class="form-control" style="width: 100px">
            </td>
            <td>
                <select class="form-control">
                    <option value="normal">正常生产</option>
                    <option value="waste">报废损耗</option>
                    <option value="test">试验调试</option>
                    <option value="other">其他原因</option>
                </select>
            </td>
            <td>
                <a href="javascript:void(0)" class="action-link" 
                    onclick="showConsumptionModal('${material.id}', '${material.name}')">录入</a>
            </td>
        </tr>
    `).join('');
}

// 初始化图表
function initCharts() {
    initConsumptionChart();
    initAbnormalChart();
}

// 初始化消耗趋势图表
function initConsumptionChart() {
    const chart = echarts.init(document.getElementById('consumptionChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '物料消耗趋势'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['计划用量', '实际消耗']
        },
        xAxis: {
            type: 'category',
            data: ['1/15', '1/16', '1/17', '1/18', '1/19']
        },
        yAxis: {
            type: 'value',
            name: '数量'
        },
        series: [
            {
                name: '计划用量',
                type: 'line',
                data: [1000, 1000, 1000, 1000, 1000],
                smooth: true
            },
            {
                name: '实际消耗',
                type: 'line',
                data: [950, 980, 1020, 990, 1010],
                smooth: true
            }
        ]
    };
    chart.setOption(option);
}

// 初始化异常分析图表
function initAbnormalChart() {
    const chart = echarts.init(document.getElementById('abnormalChart'));
    // TODO: 从后端获取图表数据
    const option = {
        title: {
            text: '异常消耗分析'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'right'
        },
        series: [
            {
                name: '异常原因',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 60, name: '正常生产' },
                    { value: 20, name: '报废损耗' },
                    { value: 15, name: '试验调试' },
                    { value: 5, name: '其他原因' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    chart.setOption(option);
}

// 加载改进建议
function loadSuggestions() {
    // 模拟数据
    const suggestions = [
        {
            type: 'warning',
            content: '大红袍原料消耗超出计划5%，建议优化生产工艺减少损耗'
        },
        {
            type: 'info',
            content: '包装材料损耗率较低，可作为标杆在其他���品线推广'
        }
    ];

    const suggestionList = document.getElementById('suggestionList');
    suggestionList.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item ${suggestion.type}">
            <i class="fas fa-${suggestion.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${suggestion.content}</span>
        </div>
    `).join('');
}

// 显示消耗录入弹窗
function showConsumptionModal(materialId, materialName) {
    const form = document.getElementById('consumptionForm');
    form.elements['materialId'].value = materialId;
    form.elements['materialName'].value = materialName;
    showModal('consumptionModal');
}

// 保存消耗数据
function saveConsumption() {
    const form = document.getElementById('consumptionForm');
    const formData = new FormData(form);
    const consumption = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存消耗数据
    console.log('保存消耗:', consumption);
    
    hideModal('consumptionModal');
    loadMaterialList(consumption.taskId);
    showMessage('消耗数据已保存');
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 