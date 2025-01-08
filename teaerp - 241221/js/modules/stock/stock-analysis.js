document.addEventListener('DOMContentLoaded', function() {
    // 库存趋势分析图表
    const trendChart = echarts.init(document.getElementById('trendChart'));
    trendChart.setOption({
        title: { text: '库存趋势分析' },
        tooltip: { trigger: 'axis' },
        legend: { data: ['库存数量', '入库量', '出库量'] },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: { type: 'value' },
        series: [
            {
                name: '库存数量',
                type: 'line',
                data: [1200, 1350, 1450, 1300, 1480, 1600]
            },
            {
                name: '入库量',
                type: 'bar',
                data: [320, 350, 300, 280, 380, 420]
            },
            {
                name: '出库量',
                type: 'bar',
                data: [280, 300, 250, 260, 340, 380]
            }
        ]
    });

    // 库存金额占比图表
    const amountPieChart = echarts.init(document.getElementById('amountPieChart'));
    amountPieChart.setOption({
        title: { text: '库存金额占比' },
        tooltip: { trigger: 'item' },
        series: [{
            type: 'pie',
            radius: '60%',
            data: [
                {value: 335, name: '大红袍'},
                {value: 310, name: '铁观音'},
                {value: 234, name: '普洱'},
                {value: 135, name: '龙井'},
                {value: 148, name: '其他'}
            ]
        }]
    });

    // 自适应窗口大小
    window.addEventListener('resize', function() {
        trendChart.resize();
        amountPieChart.resize();
    });
}); 