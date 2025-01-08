// 费用管理模块
const ExpenseManager = {
    // 初始化
    init() {
        this.bindEvents();
        this.loadDepartments();
        this.loadExpenseList();
    },

    // 绑定事件
    bindEvents() {
        // 关闭弹窗
        document.querySelector('.close-btn').addEventListener('click', this.closeModal);
        
        // 搜索功能
        const searchBtn = document.querySelector('.search-box .btn');
        searchBtn.addEventListener('click', () => this.handleSearch());

        // 筛选条件变化
        document.querySelectorAll('.filter-bar select, .filter-bar .date-picker').forEach(element => {
            element.addEventListener('change', () => this.loadExpenseList());
        });

        // 文件上传预览
        const fileInput = document.querySelector('input[name="attachments"]');
        fileInput.addEventListener('change', this.handleFileSelect);
    },

    // 加载部门列表
    async loadDepartments() {
        try {
            const response = await fetch('/api/system/departments');
            if (!response.ok) throw new Error('获取部门列表失败');

            const departments = await response.json();
            const select = document.querySelector('select[name="department"]');
            select.innerHTML = departments.map(dept => 
                `<option value="${dept.id}">${dept.name}</option>`
            ).join('');
        } catch (error) {
            console.error('加载部门列表失败:', error);
        }
    },

    // 加载费用列表
    async loadExpenseList(page = 1) {
        try {
            const filters = this.getFilters();
            const response = await fetch(`/api/finance/expense/list?page=${page}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filters)
            });

            if (!response.ok) throw new Error('获取数据失败');

            const data = await response.json();
            this.renderExpenseList(data.items);
            this.renderPagination(data.total, page);
        } catch (error) {
            console.error('加载费用列表失败:', error);
            alert('加载费用列表失败，请稍后重试');
        }
    },

    // 获取筛选条件
    getFilters() {
        return {
            type: document.querySelector('.filter-bar select:first-child').value,
            status: document.querySelector('.filter-bar select:nth-child(2)').value,
            startDate: document.querySelector('.date-picker:first-child').value,
            endDate: document.querySelector('.date-picker:last-child').value,
            keyword: document.querySelector('.search-box input').value
        };
    },

    // 渲染费用列表
    renderExpenseList(expenses) {
        const tbody = document.getElementById('expenseList');
        tbody.innerHTML = expenses.map(expense => `
            <tr>
                <td><input type="checkbox" value="${expense.id}"></td>
                <td>${expense.code}</td>
                <td>${this.getExpenseTypeName(expense.type)}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>${expense.expenseDate}</td>
                <td>${expense.department}</td>
                <td>${expense.applicant}</td>
                <td>${this.getStatusBadge(expense.status)}</td>
                <td>
                    <button class="btn-link" onclick="ExpenseManager.viewExpense(${expense.id})">查看</button>
                    ${expense.status === 'pending' ? `
                        <button class="btn-link" onclick="ExpenseManager.editExpense(${expense.id})">编辑</button>
                        <button class="btn-link danger" onclick="ExpenseManager.cancelExpense(${expense.id})">撤销</button>
                    ` : ''}
                </td>
            </tr>
        `).join('');
    },

    // 获取费用类型名称
    getExpenseTypeName(type) {
        const types = {
            travel: '差旅费',
            office: '办公费',
            salary: '工资',
            rent: '房租',
            utility: '水电费',
            other: '其他'
        };
        return types[type] || type;
    },

    // 获取状态标签
    getStatusBadge(status) {
        const badges = {
            pending: '<span class="badge warning">待审批</span>',
            approved: '<span class="badge success">已审批</span>',
            rejected: '<span class="badge danger">已驳回</span>'
        };
        return badges[status] || status;
    },

    // 处理文件选择
    handleFileSelect(event) {
        const files = event.target.files;
        if (files.length > 5) {
            alert('最多只能上传5个附件');
            event.target.value = '';
            return;
        }

        const maxSize = 10 * 1024 * 1024; // 10MB
        for (let file of files) {
            if (file.size > maxSize) {
                alert(`文件 ${file.name} 超过10MB限制`);
                event.target.value = '';
                return;
            }
        }
    },

    // 打开新增费用弹窗
    openAddExpenseModal() {
        document.getElementById('addExpenseModal').style.display = 'block';
        document.getElementById('expenseForm').reset();
    },

    // 关闭弹窗
    closeModal() {
        document.getElementById('addExpenseModal').style.display = 'none';
    },

    // 保存费用
    async saveExpense() {
        try {
            const form = document.getElementById('expenseForm');
            const formData = new FormData(form);

            const response = await fetch('/api/finance/expense/save', {
                method: 'POST',
                body: formData // 直接发送FormData以支持文件上传
            });

            if (!response.ok) throw new Error('保存失败');

            alert('提交成功');
            this.closeModal();
            this.loadExpenseList();
        } catch (error) {
            console.error('保存费用失败:', error);
            alert('保存失败，请稍后重试');
        }
    },

    // 查看费用详情
    async viewExpense(id) {
        try {
            const response = await fetch(`/api/finance/expense/${id}`);
            if (!response.ok) throw new Error('获取详情失败');

            const expense = await response.json();
            // 实现查看详情的展示逻辑
        } catch (error) {
            console.error('获取费用详情失败:', error);
            alert('获取详情失败，请稍后重试');
        }
    },

    // 编辑费用
    async editExpense(id) {
        try {
            const response = await fetch(`/api/finance/expense/${id}`);
            if (!response.ok) throw new Error('获取数据失败');

            const expense = await response.json();
            this.openAddExpenseModal();
            
            // 填充表单数据
            const form = document.getElementById('expenseForm');
            Object.keys(expense).forEach(key => {
                const input = form.elements[key];
                if (input) input.value = expense[key];
            });
        } catch (error) {
            console.error('编辑费用失败:', error);
            alert('获取数据失败，请稍后重试');
        }
    },

    // 撤销费用申请
    async cancelExpense(id) {
        if (!confirm('确定要撤销该费用申请吗？')) return;

        try {
            const response = await fetch(`/api/finance/expense/cancel/${id}`, {
                method: 'POST'
            });

            if (!response.ok) throw new Error('撤销失败');

            alert('撤销成功');
            this.loadExpenseList();
        } catch (error) {
            console.error('撤销费用失败:', error);
            alert('撤销失败，请稍后重试');
        }
    },

    // 批量导出
    async batchExport() {
        const selectedIds = Array.from(document.querySelectorAll('#expenseList input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        if (selectedIds.length === 0) {
            alert('请选择要导出的费用记录');
            return;
        }

        try {
            const response = await fetch('/api/finance/expense/export', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ids: selectedIds })
            });

            if (!response.ok) throw new Error('导出失败');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '费用清单.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('导出失败:', error);
            alert('导出失败，请稍后重试');
        }
    },

    // 搜索处理
    handleSearch() {
        this.loadExpenseList(1);
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => ExpenseManager.init()); 