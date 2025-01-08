// 物料管理模块
const MaterialManager = {
    // 初始化
    init() {
        // 确保在页面加载完成后执行
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    },

    // 设置
    setup() {
        // 强制隐藏所有弹窗
        this.hideAllModals();
        // 绑定事件
        this.bindEvents();
        // 加载数据
        this.loadMaterials();
    },

    // 隐藏所有弹窗
    hideAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
            modal.classList.remove('show');
        });
    },

    // 绑定事件
    bindEvents() {
        // 新建按钮
        const addBtn = document.getElementById('addMaterialBtn');
        if (addBtn) {
            addBtn.onclick = (e) => {
                e.preventDefault();
                this.showModal('new');
            };
        }

        // 关闭按钮
        const closeBtn = document.getElementById('closeModalBtn');
        if (closeBtn) {
            closeBtn.onclick = (e) => {
                e.preventDefault();
                this.hideModal();
            };
        }

        // 取消按钮
        const cancelBtn = document.getElementById('cancelBtn');
        if (cancelBtn) {
            cancelBtn.onclick = (e) => {
                e.preventDefault();
                this.hideModal();
            };
        }

        // 保存按钮
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.onclick = (e) => {
                e.preventDefault();
                this.saveMaterial();
            };
        }

        // 点击弹窗外部关闭
        const modal = document.getElementById('materialModal');
        if (modal) {
            modal.onclick = (e) => {
                if (e.target === modal) {
                    this.hideModal();
                }
            };
        }
    },

    // 显示弹窗
    showModal(type, data = null) {
        const modal = document.getElementById('materialModal');
        const form = document.getElementById('materialForm');
        const title = document.getElementById('modalTitle');

        if (!modal || !form || !title) return;

        // 重置表单
        form.reset();

        // 设置标题
        title.textContent = type === 'new' ? '新建物料' : '编辑物料';

        // 如果是编辑模式，填充数据
        if (type === 'edit' && data) {
            Object.keys(data).forEach(key => {
                const input = form.elements[key];
                if (input) {
                    input.value = data[key];
                }
            });
        }

        // 显示弹窗
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 0);
    },

    // 隐藏弹窗
    hideModal() {
        const modal = document.getElementById('materialModal');
        if (!modal) return;

        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    },

    // 加载物料列表
    loadMaterials(page = 1) {
        // 模拟数据
        const mockData = {
            items: [
                {
                    code: 'M001',
                    name: '大红袍茶叶',
                    specification: '特级',
                    type: 1,
                    unit: 'kg',
                    createTime: '2024-01-01',
                    status: 1
                }
            ],
            total: 1
        };

        this.renderTable(mockData.items);
    },

    // 渲染表格
    renderTable(items) {
        const tbody = document.getElementById('materialTableBody');
        if (!tbody) return;

        tbody.innerHTML = items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.specification}</td>
                <td>${this.getMaterialType(item.type)}</td>
                <td>${item.unit}</td>
                <td>${item.createTime}</td>
                <td>
                    <span class="status-tag ${item.status === 1 ? 'active' : 'inactive'}">
                        ${item.status === 1 ? '启用' : '停用'}
                    </span>
                </td>
                <td>
                    <button class="action-btn" onclick="MaterialManager.editMaterial('${item.code}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn" onclick="MaterialManager.toggleStatus('${item.code}')">
                        ${item.status === 1 ? '<i class="fas fa-ban"></i>' : '<i class="fas fa-check"></i>'}
                    </button>
                </td>
            </tr>
        `).join('');
    },

    // 获取物料类型文本
    getMaterialType(type) {
        const types = {
            1: '原材料',
            2: '半成品',
            3: '成品'
        };
        return types[type] || '未知';
    },

    // 编辑物料
    editMaterial(code) {
        // 模拟获取数据
        const mockData = {
            code: code,
            name: '测试物料',
            specification: '规格',
            type: 1,
            unit: 'kg',
            description: '描述'
        };

        this.showModal('edit', mockData);
    },

    // 保存物料
    saveMaterial() {
        const form = document.getElementById('materialForm');
        if (!form) return;

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // TODO: 调用保存API
        console.log('保存物料:', data);

        this.hideModal();
        this.loadMaterials();
        this.showMessage('保存成功');
    },

    // 切换状态
    toggleStatus(code) {
        // TODO: 调用API切换状态
        console.log('切换状态:', code);
        this.loadMaterials();
        this.showMessage('状态已更新');
    },

    // 显示消息
    showMessage(message) {
        alert(message);
    }
};

// 初始化模块
MaterialManager.init(); 