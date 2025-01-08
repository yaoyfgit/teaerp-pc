// 图表实例缓存
const chartInstances = new Map();

// 初始化所有图表
function initCharts() {
    // 初始化并缓存所有图表实例
    const chartIds = [
        'trendChart',
        'amountPieChart',
        'quantityPieChart',
        'turnoverChart',
        'turnoverRankChart',
        'accuracyChart',
        'utilizationChart'
    ];

    chartIds.forEach(id => {
        const chart = echarts.init(document.getElementById(id));
        chartInstances.set(id, chart);
        initChart(id, chart);
    });
}

// 初始化单个图表
function initChart(id, chart) {
    const options = {
        trendChart: getTrendChartOption(),
        amountPieChart: getAmountPieChartOption(),
        quantityPieChart: getQuantityPieChartOption(),
        turnoverChart: getTurnoverChartOption(),
        turnoverRankChart: getTurnoverRankChartOption(),
        accuracyChart: getAccuracyChartOption(),
        utilizationChart: getUtilizationChartOption()
    };

    chart.setOption(options[id]);
}

// 获取趋势图配置
function getTrendChartOption() {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' }
        },
        legend: {
            data: ['库存金额', '库存数量']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: { title: '保存图片' },
                dataView: { title: '数据视图', readOnly: true },
                magicType: {
                    type: ['line', 'bar'],
                    title: {
                        line: '切换为折线图',
                        bar: '切换为柱状图'
                    }
                }
            }
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: [
            {
                type: 'value',
                name: '金额',
                axisLabel: { formatter: '¥{value}' }
            },
            {
                type: 'value',
                name: '数量',
                axisLabel: { formatter: '{value}件' }
            }
        ],
        series: [
            {
                name: '库存金额',
                type: 'line',
                smooth: true,
                data: [150000, 145000, 160000, 155000, 165000, 170000]
            },
            {
                name: '库存数量',
                type: 'bar',
                yAxisIndex: 1,
                data: [1500, 1450, 1600, 1550, 1650, 1700]
            }
        ]
    };
}

// 获取金额占比图配置
function getAmountPieChartOption() {
    return {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: ¥{c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center'
        },
        toolbox: {
            feature: {
                saveAsImage: { title: '保存图片' },
                dataView: { title: '数据视图', readOnly: true }
            }
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: { show: false },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                },
                data: [
                    { value: 100000, name: '茶叶' },
                    { value: 50000, name: '茶具' },
                    { value: 30000, name: '包装材料' }
                ]
            }
        ]
    };
}

// 获取数量占比图配置
function getQuantityPieChartOption() {
    return {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}件 ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center'
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                },
                data: [
                    { value: 1000, name: '茶叶' },
                    { value: 500, name: '茶具' },
                    { value: 300, name: '包装材料' }
                ]
            }
        ]
    };
}

// 获取周转天数分析图配置
function getTurnoverChartOption() {
    return {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            name: '天数',
            axisLabel: {
                formatter: '{value}天'
            }
        },
        series: [
            {
                type: 'line',
                data: [45, 42, 40, 38, 35, 32],
                markLine: {
                    data: [
                        {
                            type: 'average',
                            name: '平均值'
                        }
                    ]
                }
            }
        ]
    };
}

// 获取周转率排名图配置
function getTurnoverRankChartOption() {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'value',
            name: '周转率'
        },
        yAxis: {
            type: 'category',
            data: ['大红袍', '铁观音', '普洱茶', '龙井', '毛尖']
        },
        series: [
            {
                type: 'bar',
                data: [8.2, 7.5, 6.8, 6.2, 5.5]
            }
        ]
    };
}

// 获取库存准确率分析图配置
function getAccuracyChartOption() {
    return {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            name: '准确率',
            axisLabel: {
                formatter: '{value}%'
            },
            max: 100
        },
        series: [
            {
                type: 'line',
                data: [95, 96, 97, 98, 98, 99],
                markLine: {
                    data: [
                        {
                            yAxis: 95,
                            name: '目标值'
                        }
                    ]
                }
            }
        ]
    };
}

// 获取库存利用率分析图配置
function getUtilizationChartOption() {
    return {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            name: '利用率',
            axisLabel: {
                formatter: '{value}%'
            },
            max: 100
        },
        series: [
            {
                type: 'line',
                data: [75, 78, 80, 82, 85, 88],
                markLine: {
                    data: [
                        {
                            yAxis: 80,
                            name: '目标值'
                        }
                    ]
                }
            }
        ]
    };
}

// 更新图表数据
async function updateCharts() {
    try {
        // 显示加载状态
        chartInstances.forEach(chart => {
            chart.showLoading();
        });

        // 获取时间范围
        const period = document.querySelector('.search-bar select').value;
        const startDate = document.querySelector('.date-range input:first-child').value;
        const endDate = document.querySelector('.date-range input:last-child').value;

        // 模拟数据，实际项目中应该调用后端API
        const data = {
            trend: {
                dates: ['1月', '2月', '3月', '4月', '5月', '6月'],
                inbound: [100, 120, 140, 130, 150, 160],
                outbound: [90, 110, 130, 120, 140, 150]
            },
            // ... 其他模拟数据
        };

        // 更新各个图表
        updateTrendChart(data.trend);
        // ... 更新其他图表

        showToast('更新成功');
    } catch (error) {
        console.error('更新图表失败:', error);
        // 使用默认数据更新图表，避免显示空白
        initCharts();
    } finally {
        // 隐藏加载状态
        chartInstances.forEach(chart => {
            chart.hideLoading();
        });
    }
}

// 模拟获取分析数据
async function fetchAnalysisData(period, startDate, endDate) {
    // TODO: 替换为实际的API调用
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                trend: {/* 趋势数据 */},
                amount: {/* 金额数据 */},
                quantity: {/* 数量数据 */},
                turnover: {/* 周转数据 */},
                rank: {/* 排名数据 */},
                accuracy: {/* 准确率数据 */},
                utilization: {/* 利用率数据 */}
            });
        }, 1000);
    });
}

// 导出报表
async function exportReport() {
    const period = document.querySelector('.search-bar select').value;
    const startDate = document.querySelector('.date-range input:first-child').value;
    const endDate = document.querySelector('.date-range input:last-child').value;
    
    if (!startDate || !endDate) {
        alert('请选择日期范围');
        return;
    }

    try {
        // TODO: 这里应该调用后端接口导出报表
        await exportAnalysisReport(period, startDate, endDate);
        alert('报表导出成功');
    } catch (error) {
        console.error('导出报表失败:', error);
        alert('导出报表失败，请重试');
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化图表
    initCharts();
    
    // 设置默认日期范围
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endDate = new Date(today.getFullYear(), today.getMonth(), 0);
    
    document.querySelector('.date-range input:first-child').value = 
        startDate.toISOString().split('T')[0];
    document.querySelector('.date-range input:last-child').value = 
        endDate.toISOString().split('T')[0];
    
    // 初始加载数据
    updateCharts();
    
    // 监听窗口大小变化
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            chartInstances.forEach(chart => chart.resize());
        }, 250);
    });
}); 