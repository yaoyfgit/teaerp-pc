// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化菜单
    Menu.renderMenu();
    // 初始化菜单切换功能
    initMenuToggle();
    // 初始化Tab切换
    initTabs();
    // 初始化表单事件
    initFormEvents();
});

// Tab切换功能
function initTabs() {
    const tabItems = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');

    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            tabItems.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            item.classList.add('active');
            const tabId = item.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// 表单事件
function initFormEvents() {
    // 科目选择事件
    const subjectSelects = document.querySelectorAll('.standard-select');
    subjectSelects.forEach(select => {
        select.addEventListener('change', () => {
            // TODO: 根据选择的科目加载对应的账簿数据
        });
    });

    // 日期选择事件
    const dateInputs = document.querySelectorAll('input[type="date"], input[type="month"]');
    dateInputs.forEach(input => {
        input.addEventListener('change', () => {
            // TODO: 根据选择的日期范围加载账簿数据
        });
    });
}

// 查询账簿数据
function queryBook() {
    // TODO: 实现账簿数据查询逻辑
}

// 重置查询条件
function resetQuery() {
    const form = document.querySelector('.standard-toolbar');
    form.querySelectorAll('input, select').forEach(element => {
        element.value = '';
    });
}

// 打印账簿
function printBook() {
    // TODO: 实现打印功能
    window.print();
}

// 导出账簿
function exportBook() {
    // TODO: 实现导出功能
} 