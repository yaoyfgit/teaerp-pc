// 引入组件
import { Chart } from '../../../../../components/chart.js';
import { Message } from '../../../../../components/message.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initCharts();
    initEvents();
});

// 初始化事件监听
function initEvents() {
    // 监听时间范围选择变化
    document.getElementById('timeRange').onchange = function() {
        const dateRange = document.querySelector('.date-range');
        dateRange.style.display = this.value === 'custom' ? 'flex' : 'none';
    };

    // 监听对比类型变化
    document.getElementById('compareType').onchange = function() {
        updateCompareChart();
    };

    // 监听预测周期变化
    document.getElementById('forecastPeriod').onchange = function() {
        updateForecastChart();
    };
}

// 初始化图表
function initCharts() {
    // 销售趋势图
    const trendChart = new Chart('trendChart', {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [
                {
                    label: '销售额',
                    data: [150, 180, 220, 250, 280, 300],
                    borderColor: '#4dabf7',
                    fill: false
                }
            ]
        }
    });

    // 产品结构图
    const productChart = new Chart('productChart', {
        type: 'pie',
        data: {
            labels: ['红茶', '绿茶', '乌龙茶', '普洱茶'],
            datasets: [
                {
                    data: [40, 30, 20, 10],
                    backgroundColor: ['#ff6b6b', '#51cf66', '#339af0', '#ffd43b']
                }
            ]
        }
    });

    // 区域结构图
    const regionChart = new Chart('regionChart', {
        type: 'pie',
        data: {
            labels: ['华东', '华南', '华北', '西南'],
            datasets: [
                {
                    data: [35, 25, 25, 15],
                    backgroundColor: ['#ff6b6b', '#51cf66', '#339af0', '#ffd43b']
                }
            ]
        }
    });

    // 客户结构图
    const customerChart = new Chart('customerChart', {
        type: 'pie',
        data: {
            labels: ['大型客户', '中型客户', '小型客户'],
            datasets: [
                {
                    data: [50, 30, 20],
                    backgroundColor: ['#ff6b6b', '#51cf66', '#339af0']
                }
            ]
        }
    });

    // 销售对比图
    const compareChart = new Chart('compareChart', {
        type: 'bar',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [
                {
                    label: '本期',
                    data: [150, 180, 220, 250, 280, 300],
                    backgroundColor: '#4dabf7'
                },
                {
                    label: '上期',
                    data: [130, 160, 200, 230, 260, 280],
                    backgroundColor: '#ff6b6b'
                }
            ]
        }
    });

    // 销售预测图
    const forecastChart = new Chart('forecastChart', {
        type: 'line',
        data: {
            labels: ['7月', '8月', '9月', '10月', '11月', '12月'],
            datasets: [
                {
                    label: '预测值',
                    data: [320, 340, 360, 380, 400, 420],
                    borderColor: '#4dabf7',
                    borderDash: [5, 5],
                    fill: false
                },
                {
                    label: '置信区间',
                    data: [
                        [300, 340],
                        [320, 360],
                        [340, 380],
                        [360, 400],
                        [380, 420],
                        [400, 440]
                    ],
                    backgroundColor: 'rgba(77, 171, 247, 0.2)'
                }
            ]
        }
    });
}

// 更新销售对比图
function updateCompareChart() {
    const type = document.getElementById('compareType').value;
    // TODO: 根据选择的对比类型加载数据
    console.log('更新对比图:', type);
}

// 更新销售预测图
function updateForecastChart() {
    const period = document.getElementById('forecastPeriod').value;
    // TODO: 根据选择的预测周期加载数据
    console.log('更新预测图:', period);
}

// 分析数据
function analyzeData() {
    const dimension = document.getElementById('analysisDimension').value;
    const timeRange = document.getElementById('timeRange').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // TODO: 调用API分析数据
    console.log('分析数据:', { dimension, timeRange, startDate, endDate });
}

// 导出报表
function exportReport() {
    // TODO: 导出报表
    console.log('导出报表');
    Message.show('报表导出成功', 'success');
} 