// 成本分析模块
const CostAnalysis = {
    // 图表实例
    charts: {
        trend: null,
        type: null,
        structure: null
    },

    // 初始化
    init() {
        this.initCharts();
        this.bindEvents();
        this.loadData();
    },

    // 初始化图表
    initCharts() {
        this.charts.trend = echarts.init(document.getElementById('trendChart'));
        this.charts.type = echarts.init(document.getElementById('typeChart'));
        this.charts.structure = echarts.init(document.getElementById('structureChart'));

        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            Object.values(this.charts).forEach(chart => chart && chart.resize());
        });
    },

    // 绑定事件
    bindEvents() {
        document.getElementById('periodSelect').addEventListener('change', () => this.loadData());
        document.getElementById('rankType').addEventListener('change', () => this.loadRankingData());
    },

    // 加载数据
    async loadData() {
        try {
            const period = document.getElementById('periodSelect').value;
            const response = await fetch(`/api/finance/cost/analysis/overview?period=${period}`);
            
            if (!response.ok) throw new Error('获取数据失败');

            const data = await response.json();
            this.updateDashboard(data.dashboard);
            this.updateCharts(data.charts);
            this.loadRankingData();
        } catch (error) {
            console.error('加载数据失败:', error);
            alert('加载数据失败，请稍后重试');
        }
    },

    // 更新仪表盘数据
    updateDashboard(data) {
        // 更新总成本
        document.getElementById('totalCost').textContent = this.formatNumber(data.totalCost);
        document.getElementById('totalCostGrowth').textContent = this.formatPercent(data.totalCostGrowth);
        this.updateTrendIcon('totalCostGrowth', -data.totalCostGrowth); // 成本下降为好

        // 更新产品成本
        document.getElementById('productCostRatio').textContent = this.formatNumber(data.productCostRatio);
        document.getElementById('productCostGrowth').textContent = this.formatPercent(data.productCostGrowth);
        this.updateTrendIcon('productCostGrowth', -data.productCostGrowth);

        // 更新部门成本
        document.getElementById('departmentCostRatio').textContent = this.formatNumber(data.departmentCostRatio);
        document.getElementById('departmentCostGrowth').textContent = this.formatPercent(data.departmentCostGrowth);
        this.updateTrendIcon('departmentCostGrowth', -data.departmentCostGrowth);

        // 更新项目成本
        document.getElementById('projectCostRatio').textContent = this.formatNumber(data.projectCostRatio);
        document.getElementById('projectCostGrowth').textContent = this.formatPercent(data.projectCostGrowth);
        this.updateTrendIcon('projectCostGrowth', -data.projectCostGrowth);
    },

    // 更新趋势图标
    updateTrendIcon(elementId, value) {
        const element = document.getElementById(elementId).parentElement;
        const icon = element.querySelector('i');
        icon.className = value > 0 ? 'icon-up' : 'icon-down';
        element.className = `trend ${value > 0 ? 'up' : 'down'}`;
    },

    // 更新图表
    updateCharts(data) {
        // 成本趋势图
        const trendOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['总成本', '产品成本', '部门成本', '项目成本']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: data.trend.dates
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} 万元'
                }
            },
            series: [
                {
                    name: '总成本',
                    type: 'line',
                    data: data.trend.total
                },
                {
                    name: '产品成本',
                    type: 'line',
                    data: data.trend.product
                },
                {
                    name: '部门成本',
                    type: 'line',
                    data: data.trend.department
                },
                {
                    name: '项目成本',
                    type: 'line',
                    data: data.trend.project
                }
            ]
        };
        this.charts.trend.setOption(trendOption);

        // 成本类型分布图
        const typeOption = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} 万元 ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    data: data.type.map(item => ({
                        name: item.name,
                        value: item.value
                    })),
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
        this.charts.type.setOption(typeOption);

        // 成本结构分析图
        const structureOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['直接成本', '间接成本', '固定成本', '变动成本']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}%'
                }
            },
            yAxis: {
                type: 'category',
                data: data.structure.categories
            },
            series: [
                {
                    name: '直接成本',
                    type: 'bar',
                    stack: 'total',
                    data: data.structure.direct
                },
                {
                    name: '间接成本',
                    type: 'bar',
                    stack: 'total',
                    data: data.structure.indirect
                },
                {
                    name: '固定成本',
                    type: 'bar',
                    stack: 'total',
                    data: data.structure.fixed
                },
                {
                    name: '变动成本',
                    type: 'bar',
                    stack: 'total',
                    data: data.structure.variable
                }
            ]
        };
        this.charts.structure.setOption(structureOption);
    },

    // 加载排名数据
    async loadRankingData() {
        try {
            const type = document.getElementById('rankType').value;
            const response = await fetch(`/api/finance/cost/analysis/ranking?type=${type}`);
            
            if (!response.ok) throw new Error('获取数据失败');

            const data = await response.json();
            this.renderRanking(data);
        } catch (error) {
            console.error('加载排名数据失败:', error);
            alert('加载排名数据失败，请稍后重试');
        }
    },

    // 渲染排名表格
    renderRanking(data) {
        const tbody = document.getElementById('rankingList');
        tbody.innerHTML = data.map((item, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${this.formatNumber(item.cost)}</td>
                <td>${this.formatPercent(item.ratio)}</td>
                <td class="${this.getChangeClass(-item.monthOnMonth)}">
                    ${this.formatPercent(item.monthOnMonth)}
                </td>
                <td class="${this.getChangeClass(-item.yearOnYear)}">
                    ${this.formatPercent(item.yearOnYear)}
                </td>
            </tr>
        `).join('');
    },

    // 格式化数字
    formatNumber(value) {
        return new Intl.NumberFormat('zh-CN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        }).format(value);
    },

    // 格式化百分比
    formatPercent(value) {
        return `${(value * 100).toFixed(2)}%`;
    },

    // 获取变化趋势的样式类
    getChangeClass(value) {
        if (value > 0) return 'trend-up';
        if (value < 0) return 'trend-down';
        return '';
    },

    // 导出图表为图片
    exportChart(chartId) {
        const chart = this.charts[chartId.replace('Chart', '')];
        if (!chart) return;

        const url = chart.getDataURL();
        const a = document.createElement('a');
        a.href = url;
        a.download = `成本分析_${chartId}_${new Date().getTime()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },

    // 导出排名数据
    async exportRanking() {
        try {
            const type = document.getElementById('rankType').value;
            const response = await fetch(`/api/finance/cost/analysis/ranking/export?type=${type}`);

            if (!response.ok) throw new Error('导出失败');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `成本排名_${type}_${new Date().getTime()}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('导出失败:', error);
            alert('导出失败，请稍后重试');
        }
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => CostAnalysis.init()); 