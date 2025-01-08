// 引入组件
import { Chart } from '../../../components/chart.js';
import { Message } from '../../../components/message.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadDepartments();
    initCharts();
});

// 加载部门列表
function loadDepartments() {
    // 模拟数据
    const departments = [
        { id: 'D001', name: '生产部' },
        { id: 'D002', name: '包装部' },
        { id: 'D003', name: '质检部' },
        { id: 'D004', name: '仓储部' }
    ];

    const select = document.getElementById('department');
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept.id;
        option.textContent = dept.name;
        select.appendChild(option);
    });
}

// 初始化图表
function initCharts() {
    // 成本构成分析图表
    const structureChart = new Chart('costStructureChart', {
        type: 'pie'
    });

    // 模拟数据
    const structureData = {
        series: [{
            name: '成本构成',
            data: [
                { name: '基本工资', value: 88000 },
                { name: '加班工资', value: 15600 },
                { name: '社保成本', value: 32500 },
                { name: '其他成本', value: 5000 }
            ],
            options: {
                radius: ['50%', '70%'],
                label: {
                    formatter: '{b}: {d}%'
                }
            }
        }]
    };
    structureChart.setData(structureData);

    // 同比环比分析图表
    const compareChart = new Chart('compareChart');

    // 模拟数据
    const compareData = {
        xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
        series: [
            {
                name: '今年',
                data: [128500, 131000, 135000, 138000, 142000, 145000],
                options: {
                    type: 'line'
                }
            },
            {
                name: '去年',
                data: [120000, 122000, 125000, 128000, 130000, 132000],
                options: {
                    type: 'line'
                }
            }
        ]
    };
    compareChart.setData(compareData);

    // 生成分析结论
    generateConclusions();
}

// 生成分析结论
function generateConclusions() {
    const conclusions = [
        {
            type: 'info',
            content: '本月人工成本较上月增长3.2%，主要是由于加班时间增加导致。'
        },
        {
            type: 'warning',
            content: '生产部门加班成本占比较高，建议优化人员排班。'
        },
        {
            type: 'success',
            content: '通过优化工作流程，人均产值提升5.8%。'
        }
    ];

    const container = document.getElementById('analysisConclusions');
    container.innerHTML = conclusions.map(item => `
        <div class="conclusion-item ${item.type}">
            <i class="fas fa-${item.type === 'info' ? 'info-circle' : item.type === 'warning' ? 'exclamation-triangle' : 'check-circle'}"></i>
            <span>${item.content}</span>
        </div>
    `).join('');
}

// 执行分析
function analyzeData() {
    const timeRange = document.getElementById('timeRange').value;
    const department = document.getElementById('department').value;
    const costType = document.getElementById('costType').value;

    // TODO: 根据选择的条件重新加载数据和图表
    Message.show('分析完成', 'success');
} 