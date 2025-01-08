// 财务分析模块
const FinanceAnalysis = {
    // 图表实例
    charts: {
        trend: null,
        revenue: null,
        cost: null
    },

    // 初始化
    init() {
        this.initCharts();
        this.bindEvents();
        this.setDefaultDates();
        this.loadData();
    },

    // 初始化图表
    initCharts() {
        this.charts.trend = echarts.init(document.getElementById('trendChart'));
        this.charts.revenue = echarts.init(document.getElementById('revenueChart'));
        this.charts.cost = echarts.init(document.getElementById('costChart'));

        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            Object.values(this.charts).forEach(chart => chart && chart.resize());
        });
    },

    // 绑定事件
    bindEvents() {
        document.getElementById('periodSelect').addEventListener('change', () => this.loadData());
        document.getElementById('startDate').addEventListener('change', () => this.loadData());
        document.getElementById('endDate').addEventListener('change', () => this.loadData());
    },

    // 设置默认日期范围
    setDefaultDates() {
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);
        
        document.getElementById('startDate').value = this.formatYearMonth(startDate);
        document.getElementById('endDate').value = this.formatYearMonth(now);
    },

    // 格式化年月
    formatYearMonth(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    },

    // 加载数据
    async loadData() {
        try {
            const params = {
                period: document.getElementById('periodSelect').value,
                startDate: document.getElementById('startDate').value,
                endDate: document.getElementById('endDate').value
            };

            const response = await fetch('/api/finance/analysis/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });

            if (!response.ok) throw new Error('获取数据失败');

            const data = await response.json();
            this.updateDashboard(data.dashboard);
            this.updateCharts(data.charts);
            this.updateIndicators(data.indicators);
        } catch (error) {
            console.error('加载数据失败:', error);
            alert('加载数据失败，请稍后重试');
        }
    },

    // 更新仪表盘数据
    updateDashboard(data) {
        // 更新营业收入
        document.getElementById('revenue').textContent = this.formatNumber(data.revenue);
        document.getElementById('revenueGrowth').textContent = this.formatPercent(data.revenueGrowth);
        this.updateTrendIcon('revenueGrowth', data.revenueGrowth);

        // 更新净利润
        document.getElementById('profit').textContent = this.formatNumber(data.profit);
        document.getElementById('profitGrowth').textContent = this.formatPercent(data.profitGrowth);
        this.updateTrendIcon('profitGrowth', data.profitGrowth);

        // 更新经营现金流
        document.getElementById('cashFlow').textContent = this.formatNumber(data.cashFlow);
        document.getElementById('cashFlowGrowth').textContent = this.formatPercent(data.cashFlowGrowth);
        this.updateTrendIcon('cashFlowGrowth', data.cashFlowGrowth);

        // 更新资产负债率
        document.getElementById('debtRatio').textContent = this.formatNumber(data.debtRatio);
        document.getElementById('debtRatioChange').textContent = this.formatPercent(data.debtRatioChange);
        this.updateTrendIcon('debtRatioChange', -data.debtRatioChange); // 负债率下降为好
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
        // 收入与利润趋势图
        const trendOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['营业收入', '净利润', '经营现金流']
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
                    name: '营业收入',
                    type: 'line',
                    data: data.trend.revenue
                },
                {
                    name: '净利润',
                    type: 'line',
                    data: data.trend.profit
                },
                {
                    name: '经营现金流',
                    type: 'line',
                    data: data.trend.cashFlow
                }
            ]
        };
        this.charts.trend.setOption(trendOption);

        // 收入构成饼图
        const revenueOption = {
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
                    data: data.revenue.map(item => ({
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
        this.charts.revenue.setOption(revenueOption);

        // 成本构成饼图
        const costOption = {
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
                    data: data.cost.map(item => ({
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
        this.charts.cost.setOption(costOption);
    },

    // 更新财务指标表格
    updateIndicators(indicators) {
        const tbody = document.getElementById('indicatorsList');
        tbody.innerHTML = indicators.map(indicator => `
            <tr>
                <td>${indicator.name}</td>
                <td>${this.formatNumber(indicator.current)}</td>
                <td>${this.formatNumber(indicator.previous)}</td>
                <td class="${this.getChangeClass(indicator.change)}">
                    ${this.formatPercent(indicator.change)}
                </td>
                <td>${this.formatNumber(indicator.industryAvg)}</td>
                <td>
                    <span class="badge ${this.getEvaluationClass(indicator.evaluation)}">
                        ${indicator.evaluation}
                    </span>
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

    // 获取评估结果的样式类
    getEvaluationClass(evaluation) {
        const classes = {
            '优秀': 'success',
            '良好': 'info',
            '一般': 'warning',
            '较差': 'danger'
        };
        return classes[evaluation] || '';
    },

    // 导出图表为图片
    exportChart(chartId) {
        const chart = this.charts[chartId.replace('Chart', '')];
        if (!chart) return;

        const url = chart.getDataURL();
        const a = document.createElement('a');
        a.href = url;
        a.download = `财务分析_${chartId}_${new Date().getTime()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },

    // 导出财务指标
    async exportIndicators() {
        try {
            const params = {
                period: document.getElementById('periodSelect').value,
                startDate: document.getElementById('startDate').value,
                endDate: document.getElementById('endDate').value
            };

            const response = await fetch('/api/finance/analysis/export', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });

            if (!response.ok) throw new Error('导出失败');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '财务分析报告.xlsx';
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
document.addEventListener('DOMContentLoaded', () => FinanceAnalysis.init()); 