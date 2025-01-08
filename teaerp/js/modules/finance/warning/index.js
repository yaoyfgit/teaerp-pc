// 财务预警模块
const FinanceWarning = {
    // 当前选中的预警ID
    selectedWarningId: null,

    // 初始化
    init() {
        this.bindEvents();
        this.loadDashboard();
        this.loadWarningList();
    },

    // 绑定事件
    bindEvents() {
        // 关闭弹窗
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        // 搜索功能
        const searchBtn = document.querySelector('.search-box .btn');
        searchBtn.addEventListener('click', () => this.handleSearch());

        // 筛选条件变化
        document.querySelectorAll('.filter-bar select').forEach(select => {
            select.addEventListener('change', () => this.loadWarningList());
        });

        // 全选/取消全选
        const selectAll = document.querySelector('thead input[type="checkbox"]');
        selectAll.addEventListener('change', (e) => {
            document.querySelectorAll('#warningList input[type="checkbox"]')
                .forEach(checkbox => checkbox.checked = e.target.checked);
        });
    },

    // 加载仪表盘数据
    async loadDashboard() {
        try {
            const response = await fetch('/api/finance/warning/dashboard');
            if (!response.ok) throw new Error('获取数据失败');

            const data = await response.json();
            
            // 更新统计数据
            document.getElementById('highRiskCount').textContent = data.highRisk;
            document.getElementById('mediumRiskCount').textContent = data.mediumRisk;
            document.getElementById('lowRiskCount').textContent = data.lowRisk;
            document.getElementById('ruleCount').textContent = data.activeRules;
        } catch (error) {
            console.error('加载仪表盘数据失败:', error);
        }
    },

    // 加载预警列表
    async loadWarningList(page = 1) {
        try {
            const filters = this.getFilters();
            const response = await fetch(`/api/finance/warning/list?page=${page}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filters)
            });

            if (!response.ok) throw new Error('获取数据失败');

            const data = await response.json();
            this.renderWarningList(data.items);
            this.renderPagination(data.total, page);
        } catch (error) {
            console.error('加载预警列表失败:', error);
            alert('加载预警列表失败，请稍后重试');
        }
    },

    // 获取筛选条件
    getFilters() {
        const selects = document.querySelectorAll('.filter-bar select');
        return {
            riskLevel: selects[0].value,
            type: selects[1].value,
            status: selects[2].value,
            keyword: document.querySelector('.search-box input').value
        };
    },

    // 渲染预警列表
    renderWarningList(warnings) {
        const tbody = document.getElementById('warningList');
        tbody.innerHTML = warnings.map(warning => `
            <tr>
                <td><input type="checkbox" value="${warning.id}"></td>
                <td>${warning.warningTime}</td>
                <td>${this.getWarningTypeName(warning.type)}</td>
                <td>${this.getRiskLevelBadge(warning.riskLevel)}</td>
                <td>${warning.content}</td>
                <td>${warning.triggerValue}</td>
                <td>${this.getConditionText(warning.condition, warning.threshold)}</td>
                <td>${this.getStatusBadge(warning.status)}</td>
                <td>
                    <button class="btn-link" onclick="FinanceWarning.viewWarning(${warning.id})">查看</button>
                    ${warning.status === 'pending' ? `
                        <button class="btn-link" onclick="FinanceWarning.processWarning(${warning.id})">处理</button>
                    ` : ''}
                </td>
            </tr>
        `).join('');
    },

    // 获取预警类型名称
    getWarningTypeName(type) {
        const types = {
            cash: '现金流预警',
            debt: '负债预警',
            profit: '利润预警',
            cost: '成本预警'
        };
        return types[type] || type;
    },

    // 获取风险等级标签
    getRiskLevelBadge(level) {
        const badges = {
            high: '<span class="badge danger">高风险</span>',
            medium: '<span class="badge warning">中风险</span>',
            low: '<span class="badge info">低风险</span>'
        };
        return badges[level] || level;
    },

    // 获取条件文本
    getConditionText(condition, threshold) {
        const conditions = {
            gt: '> ',
            lt: '< ',
            gte: '≥ ',
            lte: '≤ ',
            eq: '= ',
            neq: '≠ '
        };
        return (conditions[condition] || '') + threshold;
    },

    // 获取状态标签
    getStatusBadge(status) {
        const badges = {
            pending: '<span class="badge warning">待处理</span>',
            processing: '<span class="badge info">处理中</span>',
            resolved: '<span class="badge success">已解决</span>',
            ignored: '<span class="badge">已忽略</span>'
        };
        return badges[status] || status;
    },

    // 打开新增规则弹窗
    openAddRuleModal() {
        document.getElementById('addRuleModal').style.display = 'block';
        document.getElementById('ruleForm').reset();
    },

    // 打开处理预警弹窗
    processWarning(id) {
        this.selectedWarningId = id;
        document.getElementById('processWarningModal').style.display = 'block';
        document.getElementById('processForm').reset();
    },

    // 关闭弹窗
    closeModal() {
        document.getElementById('addRuleModal').style.display = 'none';
        document.getElementById('processWarningModal').style.display = 'none';
        this.selectedWarningId = null;
    },

    // 保存规则
    async saveRule() {
        try {
            const form = document.getElementById('ruleForm');
            const formData = new FormData(form);
            
            // 处理多选的通知方式
            const notifyMethods = Array.from(formData.getAll('notifyMethods'));
            formData.delete('notifyMethods');
            
            const data = {
                ...Object.fromEntries(formData.entries()),
                notifyMethods
            };

            const response = await fetch('/api/finance/warning/rule/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('保存失败');

            alert('保存成功');
            this.closeModal();
            this.loadDashboard();
        } catch (error) {
            console.error('保存规则失败:', error);
            alert('保存失败，请稍后重试');
        }
    },

    // 提交处理结果
    async submitProcess() {
        if (!this.selectedWarningId) return;

        try {
            const form = document.getElementById('processForm');
            const formData = new FormData(form);
            const data = {
                id: this.selectedWarningId,
                ...Object.fromEntries(formData.entries())
            };

            const response = await fetch('/api/finance/warning/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('处理失败');

            alert('处理成功');
            this.closeModal();
            this.loadWarningList();
            this.loadDashboard();
        } catch (error) {
            console.error('处理预警失败:', error);
            alert('处理失败，请稍后重试');
        }
    },

    // 查看预警详情
    async viewWarning(id) {
        try {
            const response = await fetch(`/api/finance/warning/${id}`);
            if (!response.ok) throw new Error('获取详情失败');

            const warning = await response.json();
            // 实现查看详情的展示逻辑
        } catch (error) {
            console.error('获取预警详情失败:', error);
            alert('获取详情失败，请稍后重试');
        }
    },

    // 批量处理
    async batchProcess() {
        const selectedIds = Array.from(document.querySelectorAll('#warningList input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        if (selectedIds.length === 0) {
            alert('请选择要处理的预警');
            return;
        }

        this.selectedWarningId = selectedIds;
        document.getElementById('processWarningModal').style.display = 'block';
        document.getElementById('processForm').reset();
    },

    // 搜索处理
    handleSearch() {
        this.loadWarningList(1);
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => FinanceWarning.init()); 