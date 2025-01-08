// 预算管理模块
const BudgetManager = {
    // 图表实例
    executionChart: null,

    // 初始化
    init() {
        this.initChart();
        this.bindEvents();
        this.loadYearOptions();
        this.loadDepartments();
        this.loadDashboard();
        this.loadBudgetList();
    },

    // 初始化图表
    initChart() {
        this.executionChart = echarts.init(document.getElementById('executionChart'));
        
        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            this.executionChart && this.executionChart.resize();
        });
    },

    // 绑定事件
    bindEvents() {
        // 筛选条件变化
        document.getElementById('yearSelect').addEventListener('change', () => this.loadData());
        document.getElementById('departmentSelect').addEventListener('change', () => this.loadData());
        document.getElementById('statusSelect').addEventListener('change', () => this.loadData());
        document.getElementById('periodSelect').addEventListener('change', () => this.updateExecutionChart());

        // 调整类型变化
        const typeSelect = document.querySelector('select[name="type"]');
        if (typeSelect) {
            typeSelect.addEventListener('change', (e) => {
                const transferTo = document.querySelector('.transfer-to');
                if (transferTo) {
                    transferTo.style.display = e.target.value === 'transfer' ? 'block' : 'none';
                }
            });
        }
    },

    // 加载年度选项
    loadYearOptions() {
        const yearSelect = document.getElementById('yearSelect');
        const currentYear = new Date().getFullYear();
        
        for (let i = currentYear - 2; i <= currentYear + 1; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${i}年`;
            if (i === currentYear) option.selected = true;
            yearSelect.appendChild(option);
        }

        // 同时更新预算编制弹窗中的年度选项
        const budgetYearSelect = document.querySelector('#budgetForm select[name="year"]');
        if (budgetYearSelect) {
            budgetYearSelect.innerHTML = yearSelect.innerHTML;
        }
    },

    // 加载部门列表
    async loadDepartments() {
        try {
            const response = await fetch('/api/system/departments');
            if (!response.ok) throw new Error('获取部门列表失败');

            const departments = await response.json();
            const selects = document.querySelectorAll('select[name="department"]');
            
            selects.forEach(select => {
                select.innerHTML = '<option value="">全部</option>' + 
                    departments.map(dept => 
                        `<option value="${dept.id}">${dept.name}</option>`
                    ).join('');
            });
        } catch (error) {
            console.error('加载部门列表失败:', error);
        }
    },

    // 加载仪表盘数据
    async loadDashboard() {
        try {
            const year = document.getElementById('yearSelect').value;
            const response = await fetch(`/api/finance/cost/budget/dashboard?year=${year}`);
            
            if (!response.ok) throw new Error('获取数据失败');

            const data = await response.json();
            
            // 更新仪表盘数据
            document.getElementById('totalBudget').textContent = this.formatNumber(data.totalBudget);
            document.getElementById('executionRate').textContent = this.formatNumber(data.executionRate);
            document.getElementById('executionChange').textContent = this.formatPercent(data.executionChange);
            document.getElementById('adjustmentCount').textContent = data.adjustmentCount;
            document.getElementById('budgetVariance').textContent = this.formatNumber(data.budgetVariance);

            // 更新趋势图标
            this.updateTrendIcon('executionChange', data.executionChange);
        } catch (error) {
            console.error('加载仪表盘数据失败:', error);
        }
    },

    // 加载预算列表
    async loadBudgetList() {
        try {
            const params = {
                year: document.getElementById('yearSelect').value,
                department: document.getElementById('departmentSelect').value,
                status: document.getElementById('statusSelect').value
            };

            const response = await fetch('/api/finance/cost/budget/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });

            if (!response.ok) throw new Error('获取数据失败');

            const data = await response.json();
            this.renderBudgetList(data);
            this.updateExecutionChart();
        } catch (error) {
            console.error('加载预算列表失败:', error);
            alert('加载预算列表失败，请稍后重试');
        }
    },

    // 渲染预算列表
    renderBudgetList(data) {
        const tbody = document.getElementById('budgetList');
        tbody.innerHTML = data.map(budget => `
            <tr>
                <td>${budget.name}</td>
                <td>${budget.department}</td>
                <td>${this.formatNumber(budget.amount)}</td>
                <td>${this.formatNumber(budget.used)}</td>
                <td>${this.formatNumber(budget.remaining)}</td>
                <td>${this.formatPercent(budget.executionRate)}</td>
                <td>${this.getStatusBadge(budget.status)}</td>
                <td>
                    <button class="btn-link" onclick="BudgetManager.viewBudget(${budget.id})">查看</button>
                    ${budget.status === 'draft' ? `
                        <button class="btn-link" onclick="BudgetManager.editBudget(${budget.id})">编辑</button>
                        <button class="btn-link" onclick="BudgetManager.submitBudget(${budget.id})">提交</button>
                    ` : ''}
                    ${budget.status === 'approved' ? `
                        <button class="btn-link" onclick="BudgetManager.adjustBudget(${budget.id})">调整</button>
                    ` : ''}
                </td>
            </tr>
        `).join('');
    },

    // 更新执行情况图表
    updateExecutionChart() {
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['预算金额', '实际支出', '执行率']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', 
                           '7月', '8月', '9月', '10月', '11月', '12月']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '金额',
                    axisLabel: {
                        formatter: '{value} 万元'
                    }
                },
                {
                    type: 'value',
                    name: '执行率',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
            ],
            series: [
                {
                    name: '预算金额',
                    type: 'bar',
                    data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
                },
                {
                    name: '实际支出',
                    type: 'bar',
                    data: [80, 85, 90, 95, 85, 95, 90, 95, 85, 95, 90, 95]
                },
                {
                    name: '执行率',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [80, 85, 90, 95, 85, 95, 90, 95, 85, 95, 90, 95]
                }
            ]
        };

        this.executionChart.setOption(option);
    },

    // 获取状态标签
    getStatusBadge(status) {
        const badges = {
            draft: '<span class="badge">草稿</span>',
            pending: '<span class="badge warning">待审批</span>',
            approved: '<span class="badge success">已审批</span>',
            rejected: '<span class="badge danger">已驳回</span>'
        };
        return badges[status] || status;
    },

    // 更新趋势图标
    updateTrendIcon(elementId, value) {
        const element = document.getElementById(elementId).parentElement;
        const icon = element.querySelector('i');
        icon.className = value > 0 ? 'icon-up' : 'icon-down';
        element.className = `trend ${value > 0 ? 'up' : 'down'}`;
    },

    // 打开预算编制弹窗
    openBudgetModal() {
        document.getElementById('budgetModal').style.display = 'block';
        document.getElementById('budgetForm').reset();
        document.getElementById('budgetItems').innerHTML = this.createBudgetItemRow();
    },

    // 打开预算调整弹窗
    openAdjustmentModal() {
        document.getElementById('adjustmentModal').style.display = 'block';
        document.getElementById('adjustmentForm').reset();
    },

    // 关闭弹窗
    closeModal() {
        document.getElementById('budgetModal').style.display = 'none';
        document.getElementById('adjustmentModal').style.display = 'none';
    },

    // 创建预算项目行
    createBudgetItemRow() {
        return `
            <tr>
                <td><input type="text" name="itemName[]" required></td>
                <td><input type="number" name="q1[]" required onchange="BudgetManager.calculateTotal(this)"></td>
                <td><input type="number" name="q2[]" required onchange="BudgetManager.calculateTotal(this)"></td>
                <td><input type="number" name="q3[]" required onchange="BudgetManager.calculateTotal(this)"></td>
                <td><input type="number" name="q4[]" required onchange="BudgetManager.calculateTotal(this)"></td>
                <td><input type="number" name="total[]" readonly></td>
                <td>
                    <button type="button" class="btn-link danger" onclick="BudgetManager.removeBudgetItem(this)">删除</button>
                </td>
            </tr>
        `;
    },

    // 添加预算项目
    addBudgetItem() {
        const tbody = document.getElementById('budgetItems');
        tbody.insertAdjacentHTML('beforeend', this.createBudgetItemRow());
    },

    // 移除预算项目
    removeBudgetItem(button) {
        const row = button.closest('tr');
        if (document.getElementById('budgetItems').children.length > 1) {
            row.remove();
        }
    },

    // 计算总额
    calculateTotal(input) {
        const row = input.closest('tr');
        const q1 = parseFloat(row.querySelector('input[name="q1[]"]').value) || 0;
        const q2 = parseFloat(row.querySelector('input[name="q2[]"]').value) || 0;
        const q3 = parseFloat(row.querySelector('input[name="q3[]"]').value) || 0;
        const q4 = parseFloat(row.querySelector('input[name="q4[]"]').value) || 0;
        row.querySelector('input[name="total[]"]').value = (q1 + q2 + q3 + q4).toFixed(2);
    },

    // 保存草稿
    async saveDraft() {
        await this.saveBudget('draft');
    },

    // 提交预算
    async submitBudget() {
        await this.saveBudget('pending');
    },

// 保存预算
    async saveBudget(status) {
        try {
    const form = document.getElementById('budgetForm');
    const formData = new FormData(form);
            
            // 构建预算项目数据
            const items = [];
            const names = formData.getAll('itemName[]');
            const q1s = formData.getAll('q1[]');
            const q2s = formData.getAll('q2[]');
            const q3s = formData.getAll('q3[]');
            const q4s = formData.getAll('q4[]');
            const totals = formData.getAll('total[]');

            for (let i = 0; i < names.length; i++) {
                items.push({
                    name: names[i],
                    quarters: [
                        parseFloat(q1s[i]),
                        parseFloat(q2s[i]),
                        parseFloat(q3s[i]),
                        parseFloat(q4s[i])
                    ],
                    total: parseFloat(totals[i])
                });
            }

    const data = {
                year: formData.get('year'),
                department: formData.get('department'),
                description: formData.get('description'),
                status,
                items
            };

            const response = await fetch('/api/finance/cost/budget/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('保存失败');

            alert(status === 'draft' ? '保存成功' : '提交成功');
            this.closeModal();
            this.loadData();
        } catch (error) {
            console.error('保存预算失败:', error);
            alert('保存失败，请稍后重试');
        }
    },

    // 提交调整
    async submitAdjustment() {
        try {
            const form = document.getElementById('adjustmentForm');
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch('/api/finance/cost/budget/adjust', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('提交失败');

            alert('提交成功');
            this.closeModal();
            this.loadData();
        } catch (error) {
            console.error('提交调整失败:', error);
            alert('提交失败，请稍后重试');
        }
    },

    // 导出预算
    async exportBudget() {
        try {
            const params = {
                year: document.getElementById('yearSelect').value,
                department: document.getElementById('departmentSelect').value
            };

            const response = await fetch('/api/finance/cost/budget/export', {
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
            a.download = `预算明细_${params.year}年_${new Date().getTime()}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('导出失败:', error);
            alert('导出失败，请稍后重试');
        }
    },

    // 导出图表
    exportChart(chartId) {
        if (chartId === 'executionChart' && this.executionChart) {
            const url = this.executionChart.getDataURL();
            const a = document.createElement('a');
            a.href = url;
            a.download = `预算执行情况_${new Date().getTime()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
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

    // 加载数据
    loadData() {
        this.loadDashboard();
        this.loadBudgetList();
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => BudgetManager.init()); 