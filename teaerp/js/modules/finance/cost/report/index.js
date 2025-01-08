// 成本报表模块
const CostReport = {
    // 当前选中的报表类型
    currentReport: 'summary',

    // 初始化
    init() {
        this.bindEvents();
        this.setDefaultDates();
        this.loadData();
        this.setActiveTab();
    },

    // 绑定事件
    bindEvents() {
        // 筛选条件变化
        document.getElementById('periodSelect').addEventListener('change', () => this.loadData());
        document.getElementById('costTypeSelect').addEventListener('change', () => this.loadData());
        document.getElementById('startDate').addEventListener('change', () => this.loadData());
        document.getElementById('endDate').addEventListener('change', () => this.loadData());

        // 标签页切换
        document.querySelectorAll('.nav-tabs .tab-item').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const href = tab.getAttribute('href');
                this.currentReport = href.split('/').pop().replace('.html', '');
                this.setActiveTab();
                this.loadData();
            });
        });
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

    // 设置活动标签页
    setActiveTab() {
        document.querySelectorAll('.nav-tabs .tab-item').forEach(tab => {
            const href = tab.getAttribute('href');
            if (href.includes(this.currentReport)) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    },

    // 加载数据
    async loadData() {
        try {
            const params = {
                period: document.getElementById('periodSelect').value,
                costType: document.getElementById('costTypeSelect').value,
                startDate: document.getElementById('startDate').value,
                endDate: document.getElementById('endDate').value
            };

            const response = await fetch(`/api/finance/cost/report/${this.currentReport}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });

            if (!response.ok) throw new Error('获取数据失败');

            const data = await response.json();
            this.updateDashboard(data.dashboard);
            this.renderReport(data.report);
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

        // 更新成本差异
        document.getElementById('costVariance').textContent = this.formatNumber(data.costVariance);

        // 更新成本率
        document.getElementById('costRate').textContent = this.formatNumber(data.costRate);
        document.getElementById('costRateChange').textContent = this.formatPercent(data.costRateChange);
        this.updateTrendIcon('costRateChange', -data.costRateChange);

        // 更新成本效率
        document.getElementById('costEfficiency').textContent = this.formatNumber(data.costEfficiency);
        document.getElementById('efficiencyChange').textContent = this.formatPercent(data.efficiencyChange);
        this.updateTrendIcon('efficiencyChange', data.efficiencyChange);
    },

    // 更新趋势图标
    updateTrendIcon(elementId, value) {
        const element = document.getElementById(elementId).parentElement;
        const icon = element.querySelector('i');
        icon.className = value > 0 ? 'icon-up' : 'icon-down';
        element.className = `trend ${value > 0 ? 'up' : 'down'}`;
    },

    // 渲染报表内容
    renderReport(data) {
        const content = document.getElementById('reportContent');
        
        switch (this.currentReport) {
            case 'summary':
                content.innerHTML = this.renderSummaryReport(data);
                break;
            case 'variance':
                content.innerHTML = this.renderVarianceReport(data);
                break;
            case 'trend':
                content.innerHTML = this.renderTrendReport(data);
                break;
        }
    },

    // 渲染成本汇总表
    renderSummaryReport(data) {
        return `
            <div class="report-section">
                <div class="report-header">
                    <h3>成本汇总表</h3>
                    <button class="btn" onclick="CostReport.exportReport('summary')">导出</button>
                </div>
                <div class="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>成本项目</th>
                                <th>本期金额（万元）</th>
                                <th>占比</th>
                                <th>上期金额（万元）</th>
                                <th>环比</th>
                                <th>同期金额（万元）</th>
                                <th>同比</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.items.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${this.formatNumber(item.current)}</td>
                                    <td>${this.formatPercent(item.ratio)}</td>
                                    <td>${this.formatNumber(item.previous)}</td>
                                    <td class="${this.getChangeClass(-item.monthOnMonth)}">
                                        ${this.formatPercent(item.monthOnMonth)}
                                    </td>
                                    <td>${this.formatNumber(item.lastYear)}</td>
                                    <td class="${this.getChangeClass(-item.yearOnYear)}">
                                        ${this.formatPercent(item.yearOnYear)}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    // 渲染成本差异表
    renderVarianceReport(data) {
        return `
            <div class="report-section">
                <div class="report-header">
                    <h3>成本差异表</h3>
                    <button class="btn" onclick="CostReport.exportReport('variance')">导出</button>
                </div>
                <div class="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>成本项目</th>
                                <th>计划金额（万元）</th>
                                <th>实际金额（万元）</th>
                                <th>差异金额（万元）</th>
                                <th>差异率</th>
                                <th>原因分析</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.items.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${this.formatNumber(item.planned)}</td>
                                    <td>${this.formatNumber(item.actual)}</td>
                                    <td class="${this.getChangeClass(-item.variance)}">
                                        ${this.formatNumber(item.variance)}
                                    </td>
                                    <td class="${this.getChangeClass(-item.varianceRate)}">
                                        ${this.formatPercent(item.varianceRate)}
                                    </td>
                                    <td>${item.analysis}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    // 渲染成本趋势表
    renderTrendReport(data) {
        return `
            <div class="report-section">
                <div class="report-header">
                    <h3>成本趋势表</h3>
                    <button class="btn" onclick="CostReport.exportReport('trend')">导出</button>
                </div>
                <div class="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>成本项目</th>
                                ${data.periods.map(period => `<th>${period}</th>`).join('')}
                                <th>平均值</th>
                                <th>趋势</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.items.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    ${item.values.map(value => `
                                        <td>${this.formatNumber(value)}</td>
                                    `).join('')}
                                    <td>${this.formatNumber(item.average)}</td>
                                    <td class="${this.getTrendClass(item.trend)}">
                                        ${this.getTrendIcon(item.trend)}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
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

    // 获取趋势的样式类
    getTrendClass(trend) {
        const classes = {
            up: 'trend-up',
            down: 'trend-down',
            stable: 'trend-stable'
        };
        return classes[trend] || '';
    },

    // 获取趋势图标
    getTrendIcon(trend) {
        const icons = {
            up: '↑',
            down: '↓',
            stable: '→'
        };
        return icons[trend] || '';
    },

    // 导出报表
    async exportReport(type) {
        try {
            const params = {
                period: document.getElementById('periodSelect').value,
                costType: document.getElementById('costTypeSelect').value,
                startDate: document.getElementById('startDate').value,
                endDate: document.getElementById('endDate').value
            };

            const response = await fetch(`/api/finance/cost/report/${type}/export`, {
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
            a.download = `成本${type === 'summary' ? '汇总' : type === 'variance' ? '差异' : '趋势'}表_${new Date().getTime()}.xlsx`;
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
document.addEventListener('DOMContentLoaded', () => CostReport.init()); 