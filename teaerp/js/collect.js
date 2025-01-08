// 数据采集页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化标签页切换
    initTabs();
    // 初始化模态框
    initModal();
    // 绑定按钮事件
    bindEvents();
});

// 初始化标签页
function initTabs() {
    const tabItems = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');

    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有激活状态
            tabItems.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 激活当前标签页
            item.classList.add('active');
            const tabId = item.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// 初始化模态框
function initModal() {
    const modal = document.getElementById('collectModal');
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = modal.querySelector('.btn-default');

    // 关闭按钮事件
    closeBtn.addEventListener('click', () => {
        closeModal();
    });

    // 取消按钮事件
    cancelBtn.addEventListener('click', () => {
        closeModal();
    });

    // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// 绑定按钮事件
function bindEvents() {
    // 新增按钮
    const addBtn = document.querySelector('.btn-success');
    addBtn.addEventListener('click', () => {
        openModal('新增数据采集');
    });

    // 编辑按钮
    const editBtns = document.querySelectorAll('.btn-primary');
    editBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal('编辑数据采集');
            // TODO: 加载数据到表单
        });
    });

    // 删除按钮
    const deleteBtns = document.querySelectorAll('.btn-danger');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('确定要删除这条记录吗？')) {
                // TODO: 执行删除操作
            }
        });
    });

    // 查询按钮
    const searchBtn = document.querySelector('.search-actions .btn-primary');
    searchBtn.addEventListener('click', () => {
        // TODO: 执行查询操作
        console.log('执行查询');
    });

    // 导出按钮
    const exportBtn = document.querySelector('.btn-info');
    exportBtn.addEventListener('click', () => {
        // TODO: 执行导出操作
        console.log('执行导出');
    });
}

// 打开模态框
function openModal(title) {
    const modal = document.getElementById('collectModal');
    const modalTitle = modal.querySelector('.modal-header h3');
    modalTitle.textContent = title;
    modal.classList.add('active');
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('collectModal');
    modal.classList.remove('active');
    // 清空表单
    const form = modal.querySelector('.modal-body');
    form.reset();
}

// 加载数据
function loadData() {
    // TODO: 从服务器加载数据
    console.log('加载数据');
}

// 保存数据
function saveData(data) {
    // TODO: 保存数据到服务器
    console.log('保存数据', data);
}

// 删除数据
function deleteData(id) {
    // TODO: 从服务器删除数据
    console.log('删除数据', id);
}

// 导出数据
function exportData() {
    // TODO: 导出数据
    console.log('导出数据');
}

// 格式化日期
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 格式化数字
function formatNumber(num) {
    return num.toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
} 