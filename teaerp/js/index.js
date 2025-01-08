// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化菜单
    window.Menu.renderMenu();
    // 初始化销售趋势图表
    initSalesChart();
    // 初始化生产计划图表
    initProductionChart();
    // 初始化菜单切换功能
    initMenuToggle();
});

// 初始化菜单切换功能
function initMenuToggle() {
    const toggleBtn = document.querySelector('.toggle-menu');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('expanded');
        });
    }
}

// 初始化销售趋势图表
function initSalesChart() {
    const chart = echarts.init(document.getElementById('salesChart'));
    
    const option = {
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
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '销售额',
            type: 'line',
            data: [12000, 15000, 14000, 18000, 16000, 20000, 22000],
            smooth: true,
            lineStyle: {
                color: '#81D8D0'
            },
            itemStyle: {
                color: '#81D8D0'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(129, 216, 208, 0.3)'
                }, {
                    offset: 1,
                    color: 'rgba(129, 216, 208, 0.1)'
                }])
            }
        }]
    };
    
    chart.setOption(option);
    
    // 监听窗口大小变化，调整图表大小
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// 初始化生产计划图表
function initProductionChart() {
    const chart = echarts.init(document.getElementById('productionChart'));
    
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            bottom: 'bottom'
        },
        series: [{
            name: '生产计划',
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
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 735, name: '已完成', itemStyle: { color: '#81D8D0' } },
                { value: 580, name: '进行中', itemStyle: { color: '#A5E6E1' } },
                { value: 484, name: '未开始', itemStyle: { color: '#C9F0EC' } },
                { value: 300, name: '已延期', itemStyle: { color: '#ff6b6b' } }
            ]
        }]
    };
    
    chart.setOption(option);
    
    // 监听窗口大小变化，调整图表大小
    window.addEventListener('resize', () => {
        chart.resize();
    });
} 