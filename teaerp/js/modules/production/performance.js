// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化菜单
    initMenu();
    // 初始化图表
    initOutputStatsChart();
    initOutputTrendChart();
    initOutputCompareChart();
    initCostStatsChart();
    initCostTrendChart();
    initCostCompareChart();
    initSuggestions();
    // 设置当前菜单激活状态
    setActiveMenu();
});

// 初始化菜单
function initMenu() {
    // 获取菜单容器
    const menuContainer = document.getElementById('sidebarMenu');
    if (!menuContainer) return;

    // 加载菜单数据
    fetch('../../../js/menu-config.js')
        .then(response => response.text())
        .then(data => {
            // 解析菜单配置
            const menuConfig = JSON.parse(data);
            // 渲染菜单
            renderMenu(menuContainer, menuConfig);
        })
        .catch(error => console.error('加载菜单配置失败:', error));
}

// 设置当前菜单激活状态
function setActiveMenu() {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentPath) {
            item.classList.add('active');
            // 展开父级菜单
            let parent = item.parentElement;
            while (parent) {
                if (parent.classList.contains('sub-menu')) {
                    parent.style.display = 'block';
                    const parentItem = parent.closest('.menu-item');
                    if (parentItem) {
                        parentItem.classList.add('expanded');
                    }
                }
                parent = parent.parentElement;
            }
        }
    });
}

// 产量统计图表
function initOutputStatsChart() {
    const chart = echarts.init(document.getElementById('outputStatsChart'));
    const option = {
        title: {
            text: '各产品线产量统计',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['产品线A', '产品线B', '产品线C', '产品线D']
        },
        yAxis: {
            type: 'value',
            name: '产量(件)'
        },
        series: [{
            name: '产量',
            type: 'bar',
            data: [1200, 980, 1400, 1100],
            itemStyle: {
                color: '#81D8D0'
            }
        }]
    };
    chart.setOption(option);
}

// 产量趋势图表
function initOutputTrendChart() {
    const chart = echarts.init(document.getElementById('outputTrendChart'));
    const option = {
        title: {
            text: '月度产量趋势',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            name: '产量(件)'
        },
        series: [{
            name: '产量',
            type: 'line',
            data: [1000, 1200, 1100, 1400, 1300, 1500],
            smooth: true,
            itemStyle: {
                color: '#81D8D0'
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#81D8D0'
                    }, {
                        offset: 1,
                        color: 'rgba(129, 216, 208, 0.1)'
                    }]
                }
            }
        }]
    };
    chart.setOption(option);
}

// 产量对比图表
function initOutputCompareChart() {
    const chart = echarts.init(document.getElementById('outputCompareChart'));
    const option = {
        title: {
            text: '计划vs实际产量对比',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['计划产量', '实际产量'],
            top: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['产品线A', '产品线B', '产品线C', '产品线D']
        },
        yAxis: {
            type: 'value',
            name: '产量(件)'
        },
        series: [{
            name: '计划产量',
            type: 'bar',
            data: [1000, 1200, 1300, 1100],
            itemStyle: {
                color: '#81D8D0'
            }
        }, {
            name: '实际产量',
            type: 'bar',
            data: [1200, 980, 1400, 1100],
            itemStyle: {
                color: '#5DADE2'
            }
        }]
    };
    chart.setOption(option);
}

// 成本统计图表
function initCostStatsChart() {
    const chart = echarts.init(document.getElementById('costStatsChart'));
    const option = {
        title: {
            text: '成本构成分析',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            top: 30,
            data: ['原材料', '人工', '制造费用', '其他']
        },
        series: [{
            name: '成本构成',
            type: 'pie',
            radius: ['50%', '70%'],
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
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 45, name: '原材料', itemStyle: {color: '#81D8D0'}},
                {value: 25, name: '人工', itemStyle: {color: '#5DADE2'}},
                {value: 20, name: '制造费用', itemStyle: {color: '#48C9B0'}},
                {value: 10, name: '其他', itemStyle: {color: '#76D7C4'}}
            ]
        }]
    };
    chart.setOption(option);
}

// 成本趋势图表
function initCostTrendChart() {
    const chart = echarts.init(document.getElementById('costTrendChart'));
    const option = {
        title: {
            text: '月度成本趋势',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['总成本', '单位成本'],
            top: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: [{
            type: 'value',
            name: '总成本(万元)',
            position: 'left'
        }, {
            type: 'value',
            name: '单位成本(元)',
            position: 'right'
        }],
        series: [{
            name: '总成本',
            type: 'line',
            yAxisIndex: 0,
            data: [120, 110, 125, 130, 128, 135],
            smooth: true,
            itemStyle: {
                color: '#81D8D0'
            }
        }, {
            name: '单位成本',
            type: 'line',
            yAxisIndex: 1,
            data: [85, 82, 88, 90, 87, 92],
            smooth: true,
            itemStyle: {
                color: '#5DADE2'
            }
        }]
    };
    chart.setOption(option);
}

// 成本对比图表
function initCostCompareChart() {
    const chart = echarts.init(document.getElementById('costCompareChart'));
    const option = {
        title: {
            text: '预算vs实际成本对比',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['预算成本', '实际成本'],
            top: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['原材料', '人工', '制造费用', '其他']
        },
        yAxis: {
            type: 'value',
            name: '成本(万元)'
        },
        series: [{
            name: '预算成本',
            type: 'bar',
            data: [50, 30, 25, 12],
            itemStyle: {
                color: '#81D8D0'
            }
        }, {
            name: '实际成本',
            type: 'bar',
            data: [45, 25, 20, 10],
            itemStyle: {
                color: '#5DADE2'
            }
        }]
    };
    chart.setOption(option);
}

// 初始化建议列表
function initSuggestions() {
    const outputSuggestions = [
        '建议优化产品线A的生产流程，提高产能利用率',
        '产品线B产量未达标，需要分析原因并制定改进计划',
        '产品线C表现优异，可以总结经验并推广到其他产线',
        '建议对产品线D进行设备升级，提高生产效率'
    ];

    const costSuggestions = [
        '原材料成本占比较高，建议优化采购策略',
        '人工成本趋势上升，需要评估自动化改造的可能性',
        '制造费用控制良好，继续保持现有管理措施',
        '其他成本项目占比合理，符合行业标准'
    ];

    const outputList = document.getElementById('outputSuggestionList');
    const costList = document.getElementById('costSuggestionList');

    outputSuggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.style.padding = '8px';
        div.style.marginBottom = '8px';
        div.style.borderLeft = '3px solid #81D8D0';
        div.style.backgroundColor = '#fff';
        div.textContent = suggestion;
        outputList.appendChild(div);
    });

    costSuggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.style.padding = '8px';
        div.style.marginBottom = '8px';
        div.style.borderLeft = '3px solid #81D8D0';
        div.style.backgroundColor = '#fff';
        div.textContent = suggestion;
        costList.appendChild(div);
    });
}

// 监听窗口大小变化，调整图表大小
window.addEventListener('resize', function() {
    const charts = document.querySelectorAll('.standard-chart');
    charts.forEach(chartDom => {
        const chart = echarts.getInstanceByDom(chartDom);
        if (chart) {
            chart.resize();
        }
    });
}); 