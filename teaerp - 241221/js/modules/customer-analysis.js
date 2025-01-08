// 等待文档加载完成并确保地图数据加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 检查并等待地图数据加载
    checkAndLoadMap().then(() => {
        // 初始化所有图表
        initAllCharts();
        // 设置日期选择器默认值为近30天
        setDefaultDateRange();
    }).catch(error => {
        console.error('地图数据加载失败:', error);
    });
});

// 检查并加载地图数据
function checkAndLoadMap() {
    return new Promise((resolve, reject) => {
        try {
            // 检查地图数据是否已加载
            if (echarts.getMap('china')) {
                resolve();
                return;
            }

            // 加载本地地图数据
            const script = document.createElement('script');
            script.src = '../../js/libs/china.js';
            
            script.onload = () => {
                if (echarts.getMap('china')) {
                    console.log('地图数据加载成功');
                    resolve();
                } else {
                    reject(new Error('地图数据加载异常'));
                }
            };

            script.onerror = () => {
                reject(new Error('地图数据加载失败'));
            };

            document.head.appendChild(script);
        } catch (error) {
            reject(error);
        }
    });
}

// 初始化所有图表
function initAllCharts() {
    try {
        console.log('开始初始化图表...');
        
        // 存储所有图表实例
        window.chartInstances = {};
        
        // 按顺序初始化图表，每个都加入错误处理
        const charts = [
            { name: '来源分析', init: initSourceChart },
            { name: '行业分布', init: initIndustryChart },
            { name: '地域分布', init: initRegionChart },
            { name: '等级分布', init: initLevelChart },
            { name: '规模分布', init: initScaleChart },
            { name: '发展趋势', init: initTrendChart },
            { name: '流失分析', init: initChurnChart },
            { name: '贡献分析', init: initContributionChart },
            { name: '满意度分析', init: initSatisfactionChart }
        ];

        charts.forEach(chart => {
            try {
                chart.init();
                console.log(`${chart.name}图表初始化完成`);
            } catch (error) {
                console.error(`${chart.name}图表初始化失败:`, error);
            }
        });

        // 添加窗口大小变化时的自适应
        window.addEventListener('resize', function() {
            Object.values(window.chartInstances).forEach(chart => {
                if (chart) {
                    try {
                        chart.resize();
                    } catch (error) {
                        console.error('图表重置大小失败:', error);
                    }
                }
            });
        });

        console.log('所有图表初始化完成');
    } catch (error) {
        console.error('图表初始化失败:', error);
    }
}

// 客户来源分析图表
function initSourceChart() {
    const chart = echarts.init(document.getElementById('sourceChart'));
    window.chartInstances.source = chart;
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            data: ['直接访问', '搜索引擎', '合作伙伴', '老客户推荐', '其他']
        },
        series: [{
            name: '客户来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '搜索引擎'},
                {value: 234, name: '合作伙伴'},
                {value: 135, name: '老客户推荐'},
                {value: 148, name: '其他'}
            ]
        }]
    };
    chart.setOption(option);
}

// 客户行业分布图表
function initIndustryChart() {
    const chart = echarts.init(document.getElementById('industryChart'));
    window.chartInstances.industry = chart;
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: ['制造业', '服务业', '零售业', '批发业', '其他']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70],
            type: 'bar'
        }]
    };
    chart.setOption(option);
}

// 客户地域分布图表
function initRegionChart() {
    try {
        const chart = echarts.init(document.getElementById('regionChart'));
        window.chartInstances.region = chart;

        const option = {
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
                data: ['北京', '上海', '广东', '浙江', '江苏', '山东', '四川', '湖北', '福建', '河南'],
                axisLabel: {
                    interval: 0,
                    rotate: 30
                }
            },
            yAxis: {
                type: 'value',
                name: '客户数量'
            },
            series: [{
                name: '客户数量',
                type: 'bar',
                data: [200, 180, 150, 120, 100, 90, 80, 70, 60, 50],
                itemStyle: {
                    color: '#43a2ca'
                },
                label: {
                    show: true,
                    position: 'top'
                }
            }]
        };

        chart.setOption(option);
        console.log('地域分布图表初始化成功');

    } catch (error) {
        console.error('初始化地域分布图表失败:', error);
        const container = document.getElementById('regionChart');
        if (container) {
            container.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <div style="color: #f56c6c;">图表加载失败</div>
                </div>`;
        }
    }
}

// 客户等级分布图表
function initLevelChart() {
    const chart = echarts.init(document.getElementById('levelChart'));
    window.chartInstances.level = chart;
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'horizontal',
            bottom: 10,
            data: ['A级', 'B级', 'C级', 'D级']
        },
        series: [{
            name: '客户等级',
            type: 'pie',
            radius: '55%',
            data: [
                {value: 235, name: 'A级'},
                {value: 274, name: 'B级'},
                {value: 310, name: 'C级'},
                {value: 135, name: 'D级'}
            ]
        }]
    };
    chart.setOption(option);
}

// 客户规模分布图表
function initScaleChart() {
    const chart = echarts.init(document.getElementById('scaleChart'));
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['企业数量']
        },
        xAxis: {
            type: 'category',
            data: ['大型企业', '中型企业', '小型企业', '微型企业']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '企业数量',
            type: 'bar',
            data: [120, 180, 240, 160]
        }]
    };
    chart.setOption(option);
}

// 客户发展趋势图表
function initTrendChart() {
    const chart = echarts.init(document.getElementById('trendChart'));
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '新增客户',
            type: 'line',
            data: [150, 230, 224, 218, 135, 147]
        }]
    };
    chart.setOption(option);
}

// 客户流失分析图表
function initChurnChart() {
    const chart = echarts.init(document.getElementById('churnChart'));
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['流失率']
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}%'
            }
        },
        series: [{
            name: '流失率',
            type: 'line',
            data: [2.0, 2.2, 3.3, 4.5, 3.0, 2.0]
        }]
    };
    chart.setOption(option);
}

// 客户贡献分析图表
function initContributionChart() {
    const chart = echarts.init(document.getElementById('contributionChart'));
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['销售额']
        },
        xAxis: {
            type: 'category',
            data: ['重要客户', '普通客户', '低价值客户']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '销售额',
            type: 'bar',
            data: [8200, 4500, 2300]
        }]
    };
    chart.setOption(option);
}

// 客户满意度分析图表
function initSatisfactionChart() {
    const chart = echarts.init(document.getElementById('satisfactionChart'));
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            data: ['非常满意', '满意', '一般', '不满意']
        },
        series: [{
            name: '满意度',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            data: [
                {value: 435, name: '���常满意'},
                {value: 310, name: '满意'},
                {value: 234, name: '一般'},
                {value: 135, name: '不满意'}
            ]
        }]
    };
    chart.setOption(option);
}

// 设置默认日期范围
function setDefaultDateRange() {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    const dateInputs = document.querySelectorAll('.date-range input');
    dateInputs[0].value = formatDate(startDate);
    dateInputs[1].value = formatDate(endDate);
}

// 格式化日期
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// 更新图表数据
function updateCharts() {
    // 获取日期范围
    const dateInputs = document.querySelectorAll('.date-range input');
    const startDate = dateInputs[0].value;
    const endDate = dateInputs[1].value;
    
    // 获取分析类型
    const analysisType = document.querySelector('.search-bar select').value;
    
    // 这里添加从后端获取数据并更新图表的逻辑
    // fetchDataAndUpdateCharts(startDate, endDate, analysisType);
}

// 导出报表
function exportReport() {
    // 实现导出报表的逻辑
    alert('报表导出功能开发中...');
}

// 监听窗口大小变化，调整图表大小
window.addEventListener('resize', function() {
    const charts = document.querySelectorAll('.chart');
    charts.forEach(chartDiv => {
        const chart = echarts.getInstanceByDom(chartDiv);
        if (chart) {
            chart.resize();
        }
    });
}); 