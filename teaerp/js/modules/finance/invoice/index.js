// 发票管理模块
const InvoiceManager = {
    // 初始化
    init() {
        this.bindEvents();
        this.loadInvoiceList();
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
            element.addEventListener('change', () => this.loadInvoiceList());
        });
    },

    // 加载发票列表
    async loadInvoiceList(page = 1) {
        try {
            const filters = this.getFilters();
            const response = await fetch(`/api/finance/invoice/list?page=${page}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filters)
            });

            if (!response.ok) throw new Error('获取数据失败');

            const data = await response.json();
            this.renderInvoiceList(data.items);
            this.renderPagination(data.total, page);
        } catch (error) {
            console.error('加载发票列表失败:', error);
            alert('加载发票列表失败，请稍后重试');
        }
    },

    // 获取筛选条件
    getFilters() {
        return {
            type: document.querySelector('select[name="type"]').value,
            status: document.querySelector('select[name="status"]').value,
            startDate: document.querySelector('.date-picker:first-child').value,
            endDate: document.querySelector('.date-picker:last-child').value,
            keyword: document.querySelector('.search-box input').value
        };
    },

    // 渲染发票列表
    renderInvoiceList(invoices) {
        const tbody = document.getElementById('invoiceList');
        tbody.innerHTML = invoices.map(invoice => `
            <tr>
                <td><input type="checkbox" value="${invoice.id}"></td>
                <td>${invoice.invoiceNo}</td>
                <td>${this.getInvoiceTypeName(invoice.type)}</td>
                <td>${invoice.invoiceDate}</td>
                <td>${invoice.partner}</td>
                <td>${invoice.amount.toFixed(2)}</td>
                <td>${invoice.taxAmount.toFixed(2)}</td>
                <td>${this.getStatusBadge(invoice.status)}</td>
                <td>
                    <button class="btn-link" onclick="InvoiceManager.viewInvoice(${invoice.id})">查看</button>
                    <button class="btn-link" onclick="InvoiceManager.editInvoice(${invoice.id})">编辑</button>
                    <button class="btn-link danger" onclick="InvoiceManager.invalidateInvoice(${invoice.id})">作废</button>
                </td>
            </tr>
        `).join('');
    },

    // 获取发票类型名称
    getInvoiceTypeName(type) {
        const types = {
            input: '进项发票',
            output: '销项发票'
        };
        return types[type] || type;
    },

    // 获取状态标签
    getStatusBadge(status) {
        const badges = {
            pending: '<span class="badge warning">待认证</span>',
            verified: '<span class="badge success">已认证</span>',
            invalid: '<span class="badge danger">已作废</span>'
        };
        return badges[status] || status;
    },

    // 渲染分页
    renderPagination(total, currentPage) {
        // 实现分页逻辑
    },

    // 打开新增发票弹窗
    openAddInvoiceModal() {
        document.getElementById('addInvoiceModal').style.display = 'block';
        document.getElementById('invoiceForm').reset();
    },

    // 关闭弹窗
    closeModal() {
        document.getElementById('addInvoiceModal').style.display = 'none';
    },

    // 保存发票
    async saveInvoice() {
        try {
            const form = document.getElementById('invoiceForm');
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch('/api/finance/invoice/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('保存失败');

            alert('保存成功');
            this.closeModal();
            this.loadInvoiceList();
        } catch (error) {
            console.error('保存发票失败:', error);
            alert('保存失败，请稍后重试');
        }
    },

    // 查看发票详情
    async viewInvoice(id) {
        // 实现查看详情逻辑
    },

    // 编辑发票
    async editInvoice(id) {
        // 实现编辑逻辑
    },

    // 作废发票
    async invalidateInvoice(id) {
        if (!confirm('确定要作废该发票吗？')) return;

        try {
            const response = await fetch(`/api/finance/invoice/invalidate/${id}`, {
                method: 'POST'
            });

            if (!response.ok) throw new Error('作废失败');

            alert('作废成功');
            this.loadInvoiceList();
        } catch (error) {
            console.error('作废发票失败:', error);
            alert('作废失败，请稍后重试');
        }
    },

    // 批量导出
    async batchExport() {
        const selectedIds = Array.from(document.querySelectorAll('#invoiceList input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        if (selectedIds.length === 0) {
            alert('请选择要导出的发票');
            return;
        }

        try {
            const response = await fetch('/api/finance/invoice/export', {
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
            a.download = '发票清单.xlsx';
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
        this.loadInvoiceList(1);
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => InvoiceManager.init()); 